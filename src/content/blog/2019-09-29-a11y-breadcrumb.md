---
title: 實作無障礙網頁功能：麵包屑 Breadcrumb
pubDate: '2019-09-29'
updatedDate: '2026-10-27'
description: >-
  麵包屑其實就是一組有序的位置提示，是導覽列的做法之一。本文借用 codyhouse 的現成範例，透過 nav、aria-label 與 aria-current 將它改成無障礙加強版。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - Breadcrumb
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 14（[原文連結](https://ithelp.ithome.com.tw/articles/10222429)）。
>
> 2026-10-27 校訂：失效連結已更新為 ARIA Authoring Practices Guide（APG）與 WAI-ARIA 1.2。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

![codyhouse 麵包屑與多步驟指示器範例插圖](/images/ironman-a11y/day14-1.webp)

（圖片來源：[codyhouse](https://codyhouse.co/gem/css-breadcrumbs-and-multi-step-indicator)）

## 麵包屑 Breadcrumb（打開[文件](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)）

> 3.4 Breadcrumb  
> A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.

大家應該對「麵包屑」不陌生吧，我們在瀏覽很多網站時，為了要讓身為使用者的我們隨時知道當前的頁面相對於網站結構中的位置，就可以從麵包屑一目瞭然。麵包屑其實就是一組有序的位置提示，這個提示可以是超連結或是純文字，是導覽列的做法之一。

在今天的文章當中，不是要教你怎麼製作麵包屑，而是從 [codyhouse](https://codyhouse.co/gem/css-breadcrumbs-and-multi-step-indicator) 借了個現成的範例（開源的），挑一個我喜歡的麵包屑，將它改成無障礙加強版！它雖不在 WAI-ARIA 的「角色 Role」之一，卻是我們在網站中常常會出現的組件。

---

## 鍵盤的可訪問性

- `breadcrumb` 不需要支援鍵盤的操作。

---

## Roles、States、Properties

1. 麵包屑的容器請使用具有導航的角色（[Navigation Landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html)）中
2. 容器要使用 `aria-label` 或 `aria-labelledby` 為它標上說明。
   - `aria-label` 屬性中，填寫的「文字內容」作為麵包屑的標題，在瀏覽器中不可見的，螢幕閱讀器則會朗讀。
   - `aria-labelledby` 屬性中，填寫的值是某個元素的 `id`，某元素的內容一樣會作為麵包屑的標題。
3. 針對當前所在連結，要加上 `aria-current` 屬性作為標示，值是 `page`，但如果當前所在位置只是「文字」，並非超連結的話，那麼這個屬性是選擇性，看你要不要加上去。

---

## 實踐開始囉！

今天要提高現成的麵包屑可訪問性！因為發現前兩次的內容，預設情境，寫得很久，也無法讓很多人理解「概念」，這次不管樣式的部分，直接針對 HTML 結構變化，來理解概念吧！

希望能做到：

- [x] 支援螢幕閱讀器

![codyhouse 原本的 Custom Separator 麵包屑](/images/ironman-a11y/day14-2.webp)

### 原本的 HTML

```html
<nav>
    <ol class="cd-breadcrumb custom-separator">
        <li><a href="#0">Home</a></li>
        <li><a href="#0">Gallery</a></li>
        <li><a href="#0">Web</a></li>
        <li class="current"><em>Project</em></li>
    </ol>
</nav>
```

- 已經使用具有 navigation landmark 的 `<nav>` 作為容器，可是沒有做標題 `aria-label` 的標示。如果你是使用 `<div>`，記得要加上 `role="navigation"` 。
- 使用有序的清單元素做排列，清楚表達語義。
- 當前的頁面是文字而非超連結， `aria-current` 要加不加隨意，為了練習，還是加一下吧！

## 無障礙網頁結構加強版

```html
<!-- 1. 含有 navigation 的角色  -->
<!-- 2. 使用 aria-label 賦予標籤（名稱）  -->
<nav aria-label="Breadcrumb">
    <ol class="cd-breadcrumb custom-separator">
        <li><a href="#0">Home</a></li>
        <li><a href="#0">Gallery</a></li>
        <li><a href="#0">Web</a></li>

        <!-- 3. 使用 aria-current="page" 告知當前所在頁面  -->
        <li class="current"><em aria-current="page">Project</em></li>
    </ol>
</nav>
```

- `<nav>` 上的 `aria-label` 填上「 `Breadcrumb` 」，它也可以是小寫 breadcrumb，也能[使用複數](https://www.w3.org/WAI/WCAG20/Techniques/working-examples/G65/ex3.html) Breadcrumbs，只要能清楚表明它是麵包屑即可。
- 在最後一個選項加上 `aria-current="page"` 就大功告成了。
- 記得超連結要是有意義的連結喔！或是有意義的錨點。

今天的範例很簡單，原始碼在 [Codepen](https://codepen.io/askie/pen/aborYdy)！

![調整顏色對比度後的麵包屑](/images/ironman-a11y/day14-3.webp)

- 我使用無障礙檢測工具發現，現成麵包屑的文字的顏色對比度太低了，以一般內文的顏色對比度要 4.5:1，所以有調整。

---

## Reference

- [WAI-ARIA 1.2 — aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current) - W3C
- [WAI-ARIA Authoring Practices Guide — Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) - W3C
- [Breadcrumbs & Multi-Step Indicator](https://codyhouse.co/gem/css-breadcrumbs-and-multi-step-indicator) - Code House

## 更正紀錄

- 2026-10-27：內容經比對 APG Breadcrumb Pattern 無需更正；將失效的 WAI-ARIA Practices 1.1 連結更新為 APG，Reference 中誤植的錨點改為 WAI-ARIA 1.2 的 `aria-current` 與 APG Breadcrumb Pattern。
