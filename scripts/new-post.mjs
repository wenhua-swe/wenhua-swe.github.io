// Start a new draft from a template.
//
//   yarn new
//
// Asks for the kind (reading note or post), title, URL slug and description, then writes
// src/content/<books|blog>/<today>-<slug>.md with draft: true. Never overwrites a file.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const kinds = {
  1: { label: '心得（閱讀筆記）', dir: 'src/content/books', template: 'book.md' },
  2: { label: '文章（技術和生活）', dir: 'src/content/blog', template: 'blog.md' },
};
const templates = 'scripts/templates';

// Read line by line instead of rl.question(), which drops lines that arrive before it asks
const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();
const read = async (question) => {
  process.stdout.write(question);
  const { value, done } = await lines.next();
  if (done) process.exit(1);
  return value.trim();
};
const ask = async (question, valid = (answer) => answer !== '', hint = '') => {
  for (;;) {
    const answer = await read(question);
    if (valid(answer)) return answer;
    if (hint) console.log(hint);
  }
};

const kind = kinds[await ask('類型（1 心得／2 文章）：', (a) => a in kinds, '請輸入 1 或 2')];
const title = await ask('標題：');
const slug = await ask(
  '網址用的英文 slug（例：atomic-habits）：',
  (a) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(a),
  '只能用小寫英文、數字和連字號，例：atomic-habits',
);
const description = await read('一句話摘要（可以先空著，發布前再補）：');
rl.close();

// Local date, so a post started late at night isn't dated tomorrow in UTC
const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, '0')).join('-');
const file = join(kind.dir, `${date}-${slug}.md`);
if (existsSync(file)) {
  console.error(`\n${file} 已經存在，沒有覆蓋。換一個 slug 再試一次。`);
  process.exit(1);
}

// JSON strings are valid YAML, so titles with colons or quotes stay safe
const values = {
  title: JSON.stringify(title),
  description: JSON.stringify(description || '一句話摘要，會出現在列表、RSS、搜尋結果和社群分享'),
  date,
};
const body = readFileSync(join(templates, kind.template), 'utf8').replace(/\{\{(\w+)\}\}/g, (_, key) => values[key]);
mkdirSync(kind.dir, { recursive: true });
writeFileSync(file, `${body}\n${readFileSync(join(templates, 'cheatsheet.md'), 'utf8')}`);

console.log(`\n已建立${kind.label}草稿：${file}`);
console.log('用 yarn dev 開 http://localhost:4321 邊寫邊看；寫完把 draft 改成 false。');
