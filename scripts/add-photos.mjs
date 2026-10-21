// Turn camera originals into web copies and print entries for src/data/photos.ts.
//
//   yarn add-photos ~/Desktop/攝影作品
//
// Each JPG becomes src/assets/photos/<name>.jpg: long edge 2560px, rotated upright,
// all metadata (EXIF, GPS) stripped. Shooting data is read from the original's EXIF
// before stripping. Files already converted are skipped.
import { existsSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import exifReader from 'exif-reader';
import sharp from 'sharp';

const src = process.argv[2];
if (!src) {
  console.error('用法：yarn add-photos <照片資料夾>');
  process.exit(1);
}
const out = 'src/assets/photos';

const shutterExpr = (seconds) => (seconds >= 1 ? String(seconds) : `1 / ${Math.round(1 / seconds)}`);

for (const file of readdirSync(src).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
  const name = basename(file).replace(/\.jpe?g$/i, '').toLowerCase();
  const dest = join(out, `${name}.jpg`);
  if (existsSync(dest)) {
    console.error(`略過 ${name}（已經轉過）`);
    continue;
  }
  const original = join(src, file);
  const { exif } = await sharp(original).metadata();
  const photo = exif ? (exifReader(exif).Photo ?? {}) : {};
  await sharp(original)
    .rotate()
    .resize(2560, 2560, { fit: 'inside' })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(dest);

  const { channels } = await sharp(dest).resize(32).stats();
  const color = '#' + channels.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, '0')).join('');
  // Cameras store local time without a zone; exif-reader reads it as UTC, so the date part is right
  const date = photo.DateTimeOriginal?.toISOString().slice(0, 10) ?? '';
  const focal = photo.FocalLength ?? 0;
  const aperture = photo.FNumber ?? 0;
  const shutter = photo.ExposureTime ?? 1;
  const iso = photo.ISOSpeedRatings ?? 0;

  // Paste into the `list` array in src/data/photos.ts, then fill in title / category / alt
  console.log(
    `  { file: '${name}', title: '', category: '日常', alt: '', date: '${date}', focal: ${focal}, aperture: ${aperture}, shutter: ${shutterExpr(shutter)}, iso: ${iso}, color: '${color}' },`,
  );
}
