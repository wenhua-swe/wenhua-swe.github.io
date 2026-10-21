---
title: 輕鬆地提交 Hexo 部落格的 Sitemap.xml 到 Google Search Console
pubDate: '2019-08-07'
description: >-
  在 Hexo 這樣的靜態網頁產生器，沒想到提交 Sitemap 這麼地容易，簡單做個紀錄。有一個 Plugin 叫做
  hexo-generator-sitemap，可以幫助你產生 `Sitemap.xml`，就可以拿這份檔案去提交了唷！來看以下簡單三個步驟。
author: Askie Lin
tags:
  - sitemap
  - google search console
  - seo
  - hexo
  - blog
---

## 查看使用者搜尋什麼關鍵字

想提升 SEO ，所以之前就有把我的[部落格網址](https://askiebaby.github.io/)提交到 [Google Search Console](https://search.google.com/search-console/)，在後台能了解：

1. 成效報表：網頁搜尋總點擊次數
2. 使用者點擊錯誤的網址數量
3. 使用者會搜尋什麼關鍵字而到你的部落格
4. 使用者是從哪些國家搜尋
5. 行動裝置可用性...等等

### 其中，蠻喜歡這幾個功能

- 「索引 > 涵蓋範圍 > 排除』：能去看哪些是被檢索後但失效的。
- 「連結」：查看外部連結，哪些最熱門，來你的部落格的人又是點擊了哪些外部連結。

## 產生 Sitemap.xml

在 Hexo 這樣的靜態網頁產生器，沒想到提交 Sitemap 這麼地容易，簡單做個紀錄。有一個 Plugin 叫做 [hexo-generator-sitemap](https://www.npmjs.com/package/hexo-generator-sitemap)，可以幫助你產生 `Sitemap.xml`，就可以拿這份檔案去提交了唷！來看以下簡單三個步驟。

1. 安裝 Install

   Terminal 在部落格路徑下，輸入以下指令

```bash
npm install hexo-generator-sitemap --save
```

2. 設定 Config

   打開你的部落格資料夾，打開根目錄的 `_config.yml`，在最後面貼上：

```bash
# 注意：yml 非常在意縮排。
sitemap:
    path: sitemap.xml
    template: ./sitemap_template.xml # 這行非必填，除非你想設定自訂的樣板
```

3. 重新編譯一次，發布新內容：

```bash
hexo g -d
```

檢查看看有沒有順利產生 `Sitemap.xml`？

```plain
https://askie.today/sitemap.xml => 我的
```

## 提交至 Google Search Console

1. 打開 [Google Search Console](https://search.google.com/search-console/)

2. 進入「索引 > Sitemap」
3. 「新增 Sitemap」：sitemap.xml

如果成功，就可以在頁面下方的列表看見紀錄與狀態了。

## 結論

Hexo 利用工具就能簡單產出「網站地圖」，真方便！！
