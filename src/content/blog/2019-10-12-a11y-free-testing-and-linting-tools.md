---
title: 開發無障礙網頁：免費檢測工具介紹（Testing & Linting）
pubDate: '2019-10-12'
updatedDate: '2026-10-27'
description: >-
  介紹檢測訪問性的步驟（來自 W3C 的網站可訪問性一致性評估方法 WCAG-EM），以及 axe、Accessibility Insights for
  Web、vue-axe、eslint-plugin-vue-a11y 等檢測訪問性的工具。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - axe
  - WCAG-EM
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 27（[原文連結](https://ithelp.ithome.com.tw/articles/10227458)）。
>
> 2026-10-27 依 WCAG 2.2、WCAG-EM 與各工具的官方文件、GitHub 專案說明校訂，改動處以刪除線或「更正」框標示，失效連結已標註。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 在前一篇文章當中，介紹了瀏覽器的開發者工具中有工具哪些能適時幫助我們建立可訪問的網站。

而今天要來介紹的內容將涵蓋：

- 檢測訪問性的步驟
- 檢測訪問性的工具

## 檢測訪問性的步驟

由於 WCAG 2.1 與 WCAG 2.0 訪問性規範定義的是對於訪問性的「一致性要求」，若想對自己的網站做初步的檢測，但你從來沒這麼試過，很可能想做卻不知道從何開始，所以接下來想介紹一下評估的步驟（來自 W3C 的 網站可訪問性一致性評估方法 [WCAG-EM](https://www.w3.org/TR/WCAG-EM/)）雖~~目前此份文件狀態還是草案~~ <ins>此份文件是 W3C 的工作小組筆記（Working Group Note），不是正式標準</ins>，但當中提及的評估步驟還是很有參考價值，很適合讓作為大家在沒頭緒時的第一步，這裡有[線上工具](https://www.w3.org/WAI/eval/report-tool/#/)，主要是依據 [WCAG-EM](https://www.w3.org/TR/WCAG-EM/) 方法生成報告。

> [!更正]
> 我當時引用的 WCAG-EM 1.0 在 2014 年就已經以 W3C Working Group Note 發布，不是草案；Note 不是 W3C 推薦標準（Recommendation），內容是參考性（informative）的評估指引。現在 `https://www.w3.org/TR/WCAG-EM/` 指向的是 2026 年 7 月發布的 WCAG-EM 2.0，同樣分成定義範圍、探索目標、選擇樣本、評估樣本、報告結果五個步驟，但用詞已改成適用各種「數位產品」；下方各步驟是依 1.0 整理的，1.0 原文在[這裡](https://www.w3.org/TR/2014/NOTE-WCAG-EM-20140710/)。另外，WCAG 現行版本已是 2023 年 10 月發布的 WCAG 2.2。
>
> 來源：[WCAG-EM 1.0（W3C Working Group Note, 2014）](https://www.w3.org/TR/2014/NOTE-WCAG-EM-20140710/)、[WCAG-EM 2.0](https://www.w3.org/TR/WCAG-EM/)、[WCAG 2.2 publication history](https://www.w3.org/standards/history/WCAG22/)

![WCAG-EM 評估流程圖](/images/ironman-a11y/day27-1.webp)

（圖片來源：[WCAG-EM](https://www.w3.org/TR/WCAG-EM/)）

### 第一步、定義評估範圍

1.1 **定義網站範圍**：

網站是不是有使用第三方服務？就算不同網址的商店，也涵蓋在網站範圍之內？

1.2 **確定達成目標**：

WCAG 符合級別（A，AA，AAA），以 AA 為公認最推薦的級別。

1.3 **定義支援的基準**：

也就是整理出我們要支援的瀏覽器與輔助科技裝置（Assistive Technology）列表，我們網頁中可訪問的功能都需要支援列表上的項目。

1.4（選擇性）選擇專業的評估人員，討論評估要求後，產生共識後擬訂文件。

### 第二步、瀏覽目標網站

評估人員將探索要評估的目標網站，以初步了解該網站及其用途，目的和功能，隨後識別網站的所有常見網頁的列表、基本功能、網路內容的類型與所需的技術等等。

### 第三步、選擇一個代表性樣品

當無法評估網站上的每個網頁時，針對結構化和隨機選擇的網頁的指南。

### 第四步、審核選定的樣品

確定滿足WCAG 的成功和失敗、網站功能的無障礙支持，並記錄評估步驟。

### 第五步、報告結果

匯總和報告評估結果，做出評估聲明，並計算總體得分。

---

## 檢測工具

### 一定要知道「Deque」這間公司

世界知名的公司 [deque](https://www.deque.com/axe/) 的開源專案 [axe-core](https://github.com/dequelabs/axe-core) ，包含 Google Lighthouse 在內，很多工具都是倚靠他們的開源專案作為核心來開發的，而 deque 長期專注於提升數位產品的可訪問性，他們也有協助公司來培訓訪問性的觀念與實務應用。

#### 1. axe - 一款 deque 推出的 Chrome Extension

在瀏覽器上裝了 deque 所開發的擴充套件，會在你的開發者工具安裝一個 Tab。

![axe 擴充套件在開發者工具中的檢測結果分頁](/images/ironman-a11y/day27-2.webp)

真的非常好用！

擴充套件特點：

- 檢測該頁面後會列出問題、節點、規則與解決方法。
- 使用 `Inspect Node` 就會直接跳到有問題的節點。
- 使用 `Highlight` 就會直接在左側的 UI 中，使用 `outline` 標記出有問題的元素。
- 可以略過你認為目前不是問題的 Issues，並且這些都是有紀錄的。

> [!更正]
> 這個擴充套件現在叫 Axe DevTools，Chrome、Firefox、Edge 都有免費版。依 Deque 官方說明，免費版只提供自動檢測、一次檢測一個頁面，更進階的功能放在付費的 Pro 版，所以上面列的部分功能（截圖是 2019 年的介面）不一定還在免費版裡。
>
> 來源：[Deque — Axe DevTools Browser Extensions](https://www.deque.com/axe/browser-extensions/)

#### 2. Accessibility Insights for Web - 相依於 deque 核心的 Chrome Extension

![Accessibility Insights for Web 擴充套件的自動檢測畫面](/images/ironman-a11y/day27-3.webp)

擴充套件特點：

- 可自訂快捷鍵啟動自動檢測、顏色、標示標題區域等。
- 自動檢測直接在 UI 上標出不符合標準的部分，點選 `!` 都會有違反的規則。
- 因為相依 deque ，規則蠻齊全的。
- 多種模式，其中提供 Assessment 模式，有詳盡的檢測內容，我們可以根據分類一樣樣的來擊破，如下圖。

![Accessibility Insights for Web 的 Assessment 模式檢測項目](/images/ironman-a11y/day27-4.webp)

#### 3. [vue-axe](https://github.com/vue-a11y/vue-axe) - 相依於 deque 核心的 Node Package

![vue-axe 在開發者工具 console 印出的訪問性問題](/images/ironman-a11y/day27-5.webp)

在使用 Vue.js 作為框架開發時，我使用的套件，在每次 `HMR` 重新編譯後，會在開發者工具中的 `console` 印出「問題」與違反的規則。

**規則寫法**

- 可以制定你要符合的規範，也可以更細部的客製自己的規則，詳細規則可以[查看規則說明](https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter-examples)。

  ```js
  {
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa"]
    }
  }
  ```

- 查看更多關於 Vue 的訪問性實踐：
  - [Getting Started with Web Accessibility in Vue](https://medium.com/@emilymears/17e2c4ea0842) - Emily Mears @Medium

#### 4. [eslint-plugin-vue-a11y](https://github.com/maranran/eslint-plugin-vue-a11y) - Linter

![eslint-plugin-vue-a11y 在編輯器中以紅線標示錯誤](/images/ironman-a11y/day27-6.webp)

- 在有錯誤時，會即時顯示紅線。
- `.eslintrc` 中的 `parser` 設定要特別注意設定唷！

> [!更正]
> 這兩個 Vue 套件都是 Vue 2 時代的版本：vue-axe 的說明文件寫明 Vue 3 要改用 [vue-axe-next](https://github.com/vue-a11y/vue-axe-next)；eslint-plugin-vue-a11y 的 GitHub 專案最後更新停在 2022 年，現在 vue-a11y 社群維護的是 [eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility)。
>
> 來源：[vue-a11y/vue-axe](https://github.com/vue-a11y/vue-axe)、[maranran/eslint-plugin-vue-a11y](https://github.com/maranran/eslint-plugin-vue-a11y)、[vue-a11y/eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility)

### React

![web.dev 上關於 React 訪問性檢測的文章](/images/ironman-a11y/day27-7.webp)

（圖片來源：[web.dev](https://web.dev/accessibility-auditing-react)，原文章已下架，網址現在會轉到其他頁面）

因為我目前是使用 Vue.js 作為專案的框架，因此上面介紹了幾個都是與 Vue.js 互相搭配的檢測工具，如果你想了解 React 該使用什麼比較好，請參考以下內容：

1. [react-a11y](https://github.com/reactjs/react-a11y)
2. [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
3. 查看更多關於 React 的訪問性實踐
   - [Getting Started with Web Accessibility in React](https://medium.com/@emilymears/9e591fdb0d52) - Emily Mears @Medium

> [!更正]
> react-a11y 已經停止維護，專案說明寫明改推 Deque 的 [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)；不過 @axe-core/react 本身也註明不支援 React 18 以上版本。現在的 React 專案，靜態檢查可以用上面的 eslint-plugin-jsx-a11y，執行時的檢測則改用瀏覽器擴充套件或在測試中跑 axe-core。
>
> 來源：[reactjs/react-a11y](https://github.com/reactjs/react-a11y)、[@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)

更多的訪問性檢測工具列表：[Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/ER/tools/)。

---

## Reference

- [Testing Web Accessibility - Adrián Bolonio (Accessibility Talks - August 2019)](https://www.youtube.com/watch?v=Nq6UhL_QvZk&t=428s) @Accessibility Talks
- [WCAG-EM Overview:Website Accessibility Conformance Evaluation Methodology](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/) - W3C
- [Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/ER/tools/) - W3C
- [Accessibility Guidebook for Web Development](https://www.telerik.com/blogs/web-accessibility-guidebook-for-developers?utm_medium=email&utm_source=eloqua&utm_campaign=kendo-ui-general-whitepaper-accessibility-nurture&elqTrackId=E2E5439C6D9A1CEBEF9230CC8592F7DA&elq=25aea6d687ac4b39968c05275aa7cc1d&elqaid=18083&elqat=1&elqCampaignId=18549) - Telerik

## 更正紀錄

- 2026-10-27：依 W3C 的 WCAG-EM 1.0／2.0、WCAG 2.2 發布紀錄更正 WCAG-EM「還是草案」的說法並補充現行版本；依 Deque 官方頁面補充 axe 擴充套件改名 Axe DevTools 與免費版限制；依各 GitHub 專案說明補充 vue-axe、eslint-plugin-vue-a11y、react-a11y 的現況；標註 web.dev 圖片來源文章已下架。
