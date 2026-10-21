import type { ImageMetadata } from 'astro';

// Web copies live in src/assets/photos (long edge 2560px, metadata stripped).
// Shooting data was read from the originals before stripping.
export const categories = ['花木', '海港', '城市', '夜色', '日常'] as const;

export interface Photo {
  file: string;
  // Short display name, like a product name
  title: string;
  // Optional story behind the photo, shown in the detail view
  description?: string;
  category: (typeof categories)[number];
  alt: string;
  date: string;
  focal: number;
  aperture: number;
  shutter: number;
  iso: number;
  // Average colour, shown while the image loads
  color: string;
  image: ImageMetadata;
  no: string;
}

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', {
  eager: true,
});

const list: Omit<Photo, 'image' | 'no'>[] = [
  { file: 'dscf0211', title: '粉櫻', category: '花木', description: '每一年過年都和爸媽去賞櫻，這一次是和孩子去。', alt: '藍天下盛開的粉紅色櫻花', date: '2025-02-16', focal: 55, aperture: 5, shutter: 1 / 220, iso: 125, color: '#907084' },
  { file: 'dscf0262', title: '飛過的飛機', category: '城市', alt: '陰天裡建築剪影，遠處有一架飛機', date: '2025-03-12', focal: 55, aperture: 8, shutter: 1 / 450, iso: 125, color: '#858b8f' },
  { file: 'dscf0274', title: '黃鈴木', category: '花木', description: '國家歌劇院外盛開的黃花閃閃動人。', alt: '藍天前盛開的黃色風鈴木', date: '2025-03-12', focal: 55, aperture: 6.4, shutter: 1 / 320, iso: 125, color: '#9a9988' },
  { file: 'dscf0309', title: '細枝', category: '花木', alt: '淡灰天空前細長的綠色枝芽', date: '2025-03-12', focal: 28.9, aperture: 3.2, shutter: 1 / 150, iso: 125, color: '#a6afae' },
  { file: 'dscf0420', title: '風車與夕照', category: '海港', alt: '夕陽下的海灘，遠方有風車和散步的人影', date: '2025-08-23', focal: 40.7, aperture: 9, shutter: 1 / 850, iso: 125, color: '#b2b1a9' },
  { file: 'dscf0489', title: '圓滾滾的', category: '花木', alt: '一整片圓滾滾的綠色地膚草', date: '2025-08-30', focal: 32.9, aperture: 5.6, shutter: 1 / 160, iso: 125, color: '#799838' },
  { file: 'dscf0523', title: '摩天輪', category: '城市', alt: '雲層下的摩天輪和建築屋頂', date: '2025-08-30', focal: 34.3, aperture: 5.6, shutter: 1 / 640, iso: 125, color: '#a7a9ad' },
  { file: 'dscf0537', title: '水上聖誕', category: '夜色', alt: '夜裡燈飾倒映在水面上', date: '2025-08-30', focal: 28.9, aperture: 3.2, shutter: 1 / 42, iso: 4000, color: '#0b0805' },
  { file: 'dscf0750', title: '葉隙的光', category: '花木', alt: '從樹下往上看，陽光穿過綠葉', date: '2026-04-19', focal: 18, aperture: 7.1, shutter: 1 / 680, iso: 2500, color: '#516b47' },
  { file: 'dscf0821', title: '藍綠色的海', category: '海港', alt: '藍綠色的海和沙灘', date: '2026-05-30', focal: 18, aperture: 16, shutter: 1 / 100, iso: 125, color: '#b4b0ac' },
  { file: 'dscf0883', title: '澎湖小希臘', category: '海港', alt: '從高處俯瞰海港邊的白色房屋與漁船', date: '2026-05-31', focal: 28.9, aperture: 5.6, shutter: 1 / 340, iso: 10000, color: '#cbc0bb' },
  { file: 'dscf0923', title: '停泊小船', category: '海港', alt: '藍天下的港口與停泊的小船', date: '2026-06-01', focal: 52.7, aperture: 20, shutter: 1 / 2000, iso: 5000, color: '#6b8ea5' },
  { file: 'dscf0924', title: '排好隊的樹', category: '花木', alt: '藍天前一排高聳的松樹', date: '2026-06-01', focal: 35.8, aperture: 18, shutter: 1 / 2000, iso: 5000, color: '#7c9ab2' },
  { file: 'dscf0985', title: '花火節', category: '夜色', alt: '夜空中綻放的煙火', date: '2026-06-01', focal: 18, aperture: 18, shutter: 1, iso: 800, color: '#060403' },
  { file: 'dscf1149', title: 'Brook 布魯克', category: '日常', description: '試拍新鏡頭，好糊啊', alt: '黑白色的貓 Brook 直直看著鏡頭', date: '2026-09-09', focal: 23, aperture: 1.4, shutter: 1 / 34, iso: 320, color: '#b7a993' },
  { file: 'dscf1152', title: 'Nami 娜美', category: '日常', alt: '橘貓 Nami 坐著望向一旁', date: '2026-09-09', focal: 23, aperture: 1.4, shutter: 1 / 34, iso: 500, color: '#c8ad96' },
  { file: 'dscf1153', title: 'Sanji 香吉士', category: '日常', alt: '虎斑白貓 Sanji 在碗邊舔嘴', date: '2026-09-09', focal: 23, aperture: 1.4, shutter: 1 / 34, iso: 320, color: '#c0a896' },
  { file: 'dscf1162', title: '為自己備餐', category: '日常', alt: '木桌上的一盤早午餐沙拉', date: '2026-09-12', focal: 23, aperture: 1.4, shutter: 1 / 34, iso: 160, color: '#c5a484' },
];

// Numbered oldest-first like a catalogue (N°01 is the earliest), listed newest first
export const photos: Photo[] = list
  .map((p) => ({ ...p, image: images[`../assets/photos/${p.file}.jpg`].default }))
  .sort((a, b) => a.date.localeCompare(b.date))
  .map((p, i) => ({ ...p, no: `N°${String(i + 1).padStart(2, '0')}` }))
  .reverse();

export function shortDate(p: Photo) {
  return p.date.slice(0, 7).replace('-', '.');
}

export function exposure(p: Photo) {
  const shutter = p.shutter >= 1 ? `${p.shutter}s` : `1/${Math.round(1 / p.shutter)}s`;
  return `${Math.round(p.focal)}mm · f/${p.aperture} · ${shutter} · ISO ${p.iso}`;
}
