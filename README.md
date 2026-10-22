# Wen-Hua Lin

在書頁邊緣寫下的想法、工作中學到的事，還有路上拍到的光。

網站：<https://wenhua-swe.github.io>　·　用 [Astro](https://astro.build) 建置，推到 `master` 後由 GitHub Actions 自動部署到 GitHub Pages。

## 本機預覽

```sh
yarn install
yarn dev        # http://localhost:4321，存檔就會自動更新；草稿也看得到
yarn build      # 產生正式網站到 dist/，草稿不會出現
yarn preview    # 預覽 build 結果；站內搜尋只有在這裡才能用
```

## 寫一篇文章

| 分類 | 放在 | 網址 |
|---|---|---|
| 閱讀筆記 | `src/content/books/` | `/books/<檔名>/` |
| 技術和生活 | `src/content/blog/` | `/blog/<檔名>/` |

1. 複製 `src/content/books/_template.md`，改名成 `YYYY-MM-DD-英文-slug.md`。底線開頭的檔案不會發布。
2. 填好最上面的 frontmatter。技術和生活的文章不需要 `book:` 那一段。
3. 寫的時候保持 `draft: true`，只會在 `yarn dev` 看到；寫完改成 `false` 再 push 才會上線。

```yaml
---
title: 文章標題
description: 一句話摘要，會出現在列表、RSS、搜尋結果和社群分享
pubDate: 2026-10-22
updatedDate: 2026-11-01 # 選填，改過內容時填，也會讓「可能過時」的提醒重新計算
heroImage: /images/cover.jpg # 選填
tags: [閱讀, 心理學]
draft: true
book: # 只有閱讀筆記需要
  title: 書名
  author: 作者
  rating: 4 # 1-5，選填
---
```

寫作小抄（程式碼強調、目錄、圖片）在 `_template.md` 最下面的註解裡。

- `##`、`###` 標題會自動出現在左側目錄；內文請從 `##` 開始，`#` 留給文章標題。
- 圖片一定要寫替代文字：`![畫面描述](網址)`，讀螢幕軟體會唸出來。
- 超過兩年沒更新的文章，頂部會自動顯示「可能已經過時」。

## 加照片

```sh
yarn add-photos ~/Desktop/攝影作品
```

- 每張 JPG 會轉成 `src/assets/photos/<檔名>.jpg`：長邊 2560px、自動轉正、移除所有 EXIF 和 GPS。原始檔不會被改動，也不會放進 repo。
- 已經轉過的照片會略過。
- 終端機會印出每張照片的資料，貼進 `src/data/photos.ts` 的 `list`，再補上：
  - `title`：照片名稱
  - `category`：`花木`、`海港`、`城市`、`夜色`、`貓`、`日常` 其中一個（要新增分類就改同一個檔案裡的 `categories`）
  - `alt`：畫面描述，給看不到圖片的讀者
  - `description`：選填，照片背後的故事，點開照片時顯示
- 想放上首頁的照片，改 `src/pages/index.astro` 裡的 `heroPhoto`（橫幅）和 `featured`（四張卡片）。

網站 build 時會再產生各種尺寸的 AVIF／WebP，讀者只會下載符合螢幕大小的版本。

## 其他設定

| 想改什麼 | 檔案 |
|---|---|
| 網站名稱、描述、GitHub／LinkedIn 連結 | `src/consts.ts` |
| 顏色（淺色、深色模式）、字型、內文樣式 | `src/styles/global.css` |
| 導覽列 | `src/components/Header.astro` |
| 關於頁 | `src/pages/about.astro` |
| 留言（Giscus，存在這個 repo 的 Discussions） | `src/components/Comments.astro` |
| 程式碼高亮、圖片延遲載入 | `astro.config.mjs` |
