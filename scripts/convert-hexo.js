// scripts/convert-hexo.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const hexoDir = '/Users/askie/Desktop/backup-hexo/source/_posts';
const astroDir = './src/content/blog';

const files = fs.readdirSync(hexoDir);

for (const file of files) {
  if (!file.endsWith('.md')) continue;

  const filePath = path.join(hexoDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  const { data, content: body } = matter(content);

  const astroFrontmatter = {
    title: data.title || 'Untitled',
    pubDate: new Date(data.date).toISOString().split('T')[0],
    description:
      data.description || body.slice(0, 100).replace(/\n/g, '') + '...',
    author: 'Askie Lin',
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
  };

  const newContent = matter.stringify(body, astroFrontmatter);

  const targetPath = path.join(astroDir, file);
  fs.writeFileSync(targetPath, newContent, 'utf-8');

  console.log(`✅ 已轉換 ${file} -> ${targetPath}`);
}
