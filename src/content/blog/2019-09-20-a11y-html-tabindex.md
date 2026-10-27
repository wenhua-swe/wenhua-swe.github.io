---
title: 無障礙網站之 HTML 屬性介紹：tabindex
pubDate: '2019-09-20'
updatedDate: '2026-10-27'
description: >-
  瞭解讓功能可以使用鍵盤操作功能的重要性、怎麼透過鍵盤瀏覽網頁，以及 tabindex 的用法。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - tabindex
  - focus
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 5（[原文連結](https://ithelp.ithome.com.tw/articles/10218282)）。
>
> 2026-10-27 依 WCAG 2.2、HTML Living Standard 與 Apple 官方使用手冊校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

## TL;DR

本篇文章學習之重點：

- 瞭解讓功能可以使用鍵盤操作功能的重要性
- 瞭解怎麼透過鍵盤瀏覽網頁
- 瞭解 tabindex 的用法

## Focus 焦點

### 什麼是 focus？

當我們使用電腦載入 Facebook 或 Twitter 的網站時，會要求註冊或是登入才能擁有瀏覽網頁的權限，這時候我們需要填寫「帳號」、「密碼」等資訊，整個操作情境是：

1. 我們將滑鼠游標移向「帳號」的欄位
2. 在欄位上面「點擊」一下
3. 可以開始輸入你的帳號

而這個點一下的動作，會使你的帳號欄位（也就是 `input[type="text"]` 元素）成為焦點，我們稱為 **focus**，成為焦點就可以開始打字，輸入資訊。

### 使用鍵盤 `tab` 鍵也可以讓 input 取得焦點

在 WCAG 2.0 及 2.1 中，提及「頁面上的所有功能都應該可透過鍵盤操作。」，除非像是無法使用鍵盤操作的功能，如：手寫功能。

> **WCAG 2.1 - 2.1.1 Keyboard**  
> All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.

而以上提及的臉書登入情境，有些人也許會更習慣全程使用鍵盤操作：

- 常使用電腦的人、對電腦非常熟悉的人：熟知鍵盤快捷鍵，操作起來更加有效率。
- 無法使用滑鼠的身障人士、車禍受傷的人。

沒想到擁有合理的網頁焦點策略，能讓所有使用者獲得更完善的使用者體驗！這將是實踐無障礙很棒也很重要的起始點，現在就來學學吧！

---

### 我們也使用鍵盤試試看

首先，學會使用鍵盤瀏覽網頁，親自操作過才能更加瞭解元素的行為表現。

以[維基百科](https://en.wikipedia.org/wiki/Accessibility)為例：擁有焦點的元素，會產生一個類似邊框的線，叫做 `outline` ， `outline` 的樣式會因為瀏覽器實作而有些微差異。

- Chrome

![Chrome 使用 tab 瀏覽網頁](/images/ironman-a11y/day05-1.webp)

- `Tab`：正向選取對焦。
- `Shift` + `Tab`：反向選取對焦。
- 使用 `方向鍵` 可以在 select 元素中切換選項。

---

- Safari

![Safari 使用 tab 瀏覽網頁](/images/ironman-a11y/day05-2.webp)

- `Option` + `Tab`：正向選取對焦。
- `Option` + `Shift` + `Tab`：反向選取對焦。
- 使用 `方向鍵` 可以在 select 元素中切換選項。

### MacOS 的鍵盤設定

MacOS 可以在設定中透過修改要對焦的項目：~~「系統偏好設定」>「鍵盤」>「快速鍵」中，將全面鍵盤操控的選項改為「所有控制選項」~~ <ins>「系統設定」>「鍵盤」中，開啟「鍵盤導覽」</ins>設定讓 Safari 更容易瀏覽。

![MacOS 設定讓 Safari 更容易瀏覽](/images/ironman-a11y/day05-3.webp)

> [!更正]
> 新版 macOS 的設定位置改了：選擇「蘋果」選單 >「系統設定」，按一下側邊欄的「鍵盤」，開啟「鍵盤導覽」，就能用 Tab、Shift + Tab 在控制項目間移動。上面的截圖是舊版「系統偏好設定」的畫面。
>
> Safari 的 `Tab` 與 `Option` + `Tab` 也跟 Safari 自己的設定有關：預設 `Tab` 只會反白欄位和彈出式選單，`Option` + `Tab` 才會再包含連結等可點選項目；開啟「鍵盤導覽」後，兩者也會反白按鈕和其他控制項目。如果想讓 `Tab` 直接走過網頁上的每個項目，可以在 Safari「設定」>「進階」開啟「按下 Tab 鍵來特別標明網頁上的每個項目」，`Tab` 和 `Option` + `Tab` 的行為就會互換。
>
> 來源：[使用「全面鍵盤操控」導覽 Mac - Apple 支援](https://support.apple.com/zh-tw/guide/mac-help/mchlc06d1059/mac)、[Mac 上 Safari 的鍵盤快速鍵和手勢 - Apple 支援](https://support.apple.com/zh-tw/guide/safari/cpsh003/mac)、[在 Mac 上的 Safari 中更改「進階」設定 - Apple 支援](https://support.apple.com/zh-tw/guide/safari/ibrw1075/mac)

---

### 頁面的焦點順序

發現頁面上元素的焦點有其順序，而作為開發者，保持焦點跟 UI 相同的順序非常重要，這代表不論受眾是誰，都能以平等方式獲取我們在網頁上精心安排的內容。

- 天生就能 focus 的元素：本身保有 tab 順序，可被 JavaScript 監聽鍵盤事件處理器（Event Handler）。
  - `<input>`
  - `<button>`
  - `<select>`
- 並不是全部的元素都可以被 focus：

![有些不需互動的元素，天生無法使用 tab 獲得焦點](/images/ironman-a11y/day05-4.webp)  
（圖片來源：[Udacity 課程](https://github.com/udacity/ud891)）

- 畫面上的 `<h1>` 標籤
- 段落 `<p>`
- 右邊的 `<img>`

上述元素都沒辦法透過鍵盤 focus，因為是不需與使用者互動的元素，天生無法使用 tab 獲得焦點，自然沒有自帶的 tab 順序，自然也無法用鍵盤事件處理，[閱讀 W3C 文件](https://html.spec.whatwg.org/multipage/interaction.html#focus)。

---

### 按鈕與DOM的順序關係

> **WCAG 2.1 - 1.3.2 Meaningful Sequence**  
> When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.

試試 `tab` 以下範例！

1. 原始順序  
   [https://codepen.io/askie/pen/wvwQELB?editors=1100](https://codepen.io/askie/pen/wvwQELB?editors=1100)

   ```html
   <button>First</button>
   <button>Second</button>
   <button>Last</button>
   ```

2. 使用 CSS 更動元素視覺順序  
   [https://codepen.io/askie/pen/GRKwYJV?editors=1010](https://codepen.io/askie/pen/GRKwYJV?editors=1010)

   ```html
   <button style="float: right;">First</button>
   <button>Second</button>
   <button>Last</button>
   ```

感覺到差異了嗎？若是倚靠鍵盤的使用者會覺得極度難用啊！所以在使用 CSS 去更動元素視覺順序都要盡量避免。

---

### 控制 tab 的順序：使用 `tabindex` 屬性

開發網頁時，有時我們會需要去調整 tab 的順序，在 HTML 中，有一個叫做 `tabindex` 的屬性可以幫我們辦到這件事情，那麼什麼時候會需要呢？比如說當我們刻一些組件，如下拉式選單（Dropdown）、僅在顯示時需要 focus 的燈箱（Modal）...等。

#### `tabindex` 介紹

- 可以使用在任何一個 HTML 元素上。
- 值：填寫數字，可以是一系列數字，成為 tab order
  - `tabindex="-1"`
    - 不會遵守 tab 鍵的控制順序。
    - 但是可以透過 JavaScript `focus()` 方法取得焦點。
  - `tabindex="0"`
    - 按照 tab 鍵的控制順序。
    - 一樣可以透過 JavaScript `focus()` 方法取得焦點。
  - `tabindex="5"` 這是 Anti-pattern，不建議！
    - 按照 tab 鍵的控制順序。
    - **無論元素位於 DOM 哪個位置，在按下 `tab` 時，都會成為最開始 focus 的那一個，改變了一般瀏覽流程的認知順序。**
    - 如果有好幾個 **> 0** 的元素，將以**最小值**為第一個 focus 的對象。

搜尋無障礙資料，會發現很多教學跟文章內容提及這個屬性，但通常不建議針對 `<h1>` 主標題、 `<p>` 段落文字、 `<img>` 圖片等內容加上 `tabindex` 屬性喔！針對「需要和使用者互動的元件」加上「對焦的行為」才是最合適的，比如：按鈕、頁籤、搜尋框或任何要使用者輸入資料的元素。

#### 使用 `tabindex` 之前，不妨想想：這個東西需要與使用者「互動（Interact）」嗎？

至於 `tabindex` 在組件上該怎麼實作，就留到之後的實作時間吧！

---

註：即使覺得圖片很重要，但只要加上合適的替代文字，螢幕閱讀器的使用者一樣能知道你要表達什麼內容。

---

## Reference

- [tabindex](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex) - MDN
- [Google and Udacity course on Accessibility.](https://github.com/udacity/ud891) @GitHub
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) - W3C
- ~~[Google 無障礙課程](https://classroom.udacity.com/courses/ud891) @Udacity~~ <ins>Udacity 課程頁已失效，教材請見上方的 GitHub；Google 現行的無障礙課程是 [Learn Accessibility](https://web.dev/learn/accessibility) - web.dev</ins>

## 更正紀錄

- 2026-10-27：依 Apple 官方使用手冊更正 macOS 鍵盤導覽的設定位置，補充 Safari 的 Tab 設定；W3C HTML5 文件連結改為 HTML Living Standard，WCAG 2.1 連結改為 WCAG 2.2，失效的 Udacity 課程連結改為 GitHub 教材與 web.dev。
