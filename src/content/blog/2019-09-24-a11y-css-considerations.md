---
title: 無障礙網站之 CSS 注意事項
pubDate: '2019-09-24'
updatedDate: '2026-10-27'
description: >-
  實踐無障礙網站時，關於 CSS 的注意事項，主要分為幾個大原則，都是以「資訊呈現、語義」之於螢幕閱讀器為主軸。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - CSS
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 9（[原文連結](https://ithelp.ithome.com.tw/articles/10220158)）。
>
> 2026-10-27 依 MDN、Can I use 與 Bootstrap 官方文件校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

![桌上的筆電正顯示一個產品網頁](/images/ironman-a11y/day09-1.webp)

（Photo by [Igor Miske](https://unsplash.com/@igormiske) on Unsplash）

## 為所有人考量樣式的呈現

使用 CSS 可以使網頁變得炫彩奪目、時尚、應用任何漂亮的效果及排版，學習 CSS 命名風格、CSS Modules 或是 CSS in JS 讓它可以有條理的被管理跟操控，這都一再地證明了我們的價值所在，這也是我們一步一步建構起來的技術能力。每個網站有自己設定的受眾，根據不同受眾，每個網站有各自想傳達的內容，這個出發點是完全沒錯的，這不一定是商業網站，但我們總希望能為最願意買單或是最有某個需要被滿足需求的人們，提供他們該有的便利。

在寫無障礙文章之前，我從來沒想過網站可訪問性是這麼的重要以及被大眾忽略（包括我自己），讓我想到學習網頁開發的初衷，是希望有某些重要的訊息能夠傳出去，傳得越遠越好、越廣越好，這不就是網頁的本質嗎？而在我梳理眾多資源的過程中，發現提升可訪問性，完全是能提升使用者體驗的實踐技術之一，相信使用者體驗也是很多公司現在非常關注的領域，應該也會想對這個技術多點瞭解吧！

這篇文章主要想提的是實踐無障礙網站時，關於 CSS 的注意事項，主要分為幾個大原則，都是以「資訊呈現、語義」之於螢幕閱讀器為主軸。

---

## DOM 順序就是一切。

> WCAG 2.1 - Meaningful Sequence 1.3.2 (Understanding 1.3.2)  
> When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.

閱讀順序與 DOM 順序相符。

大部分人用看的方式瀏覽網頁，有些人用聽的瞭解內容，這時確保元素順序與所呈現訊息的邏輯順序相符很重要，要簡單檢測最快的方式是刪除 CSS 樣式，並檢查內容的順序是否合理。

### 你看到設計稿，會想怎麼安排你的 HTML 結構？

![W3C 範例的商品卡片設計稿：左側紫色高筒鞋圖片，右側為標題 Space trainers、描述文字與 Add to cart 按鈕](/images/ironman-a11y/day09-2.webp)

（範例與圖片來源：[W3C](https://www.w3.org/WAI/tips/developing/#reflect-the-reading-order-in-the-code-order)）

**你會想以這樣的順序切版嗎？至少第一霎那，菜菜如我有冒出來，但不太確定答案。**

```html
<img src="images/trainer.png" alt="...">
<h3>Space trainers</h3>
<p>Space...</p>
<a href="...">Add to cart</a>
```

- 這是不正確的結構：標題 `<h3>` 應該作為一個區塊的第一個元素，將 `<img>` 安排在標題之前，很可能會讓螢幕閱讀器漏掉訊息。

**下面是 WAI Tutorial 建議結構：**

```html
<article class="product">
  <h3 class="name">Space trainers</h3>
  <img alt="Purple high top trainer with white laces, empty white dot on outside ankle, and white toe cap" src="images/trainer.png">
  <p class="desc">Space trainer for a classic and stylish look.</p>
  <p class="buy"><a href="javascript:return false"><svg class="icon"><use xlink:href="#cart-plus"/></svg> Add to cart</a></p>
</article>
```

- 把它放在 CSS 注意事項是因為突然看到這個官方教學，發現這將跟我們怎麼撰寫 CSS 有很大的關係，比如說你要怎麼對圖片做 CSS 設定。
- SVG 中的 `<use xlink:href="#cart-plus"/>` 這個用法在 [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href) 看到 從 SVG 2開始就不推薦使用此特性，並已經從標準中刪除。SVG 2 刪除了對 `xlink` 名稱空間的需求，因此您應該使用 `href` 而不是 `xlink:href` 詳見[連結](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href)或是[這篇文章](https://css-tricks.com/on-xlinkhref-being-deprecated-in-svg/)。
- 可以學到的是：
  - 一個區塊一定要包含標題。
  - 標題建議在第一個順序。
- 範例針對圖片下的替代文字是簡明並具有敘述性的。

### 適當使用浮動 float

最初因排版需求，浮動屬性被使用在 inline 元素上，透過 `<img>` 元素 ，讓我們能用文繞圖的方式優化資訊，後來因為可以透過清除浮動的方式，讓兩個不同容器輕鬆達到併排，演變成早期常拿來排版的 CSS 屬性。

若我們將 `float: right` 下在某個你想要他放在右邊的 controls 如 `<button>` ，將造成介面閱讀順序不一致，影響螢幕閱讀器的資訊讀取流程。

---

## 可見與不可見的內容

螢幕閱讀器需要的內容，是資訊，它不需要網頁上漂亮的樣式，所以我們要特別注意有些 CSS 屬性的設定，會讓螢幕閱讀器無法讀取。

這邊想透過一個 library：a11y-css-reset 的內容來講解「可見與不可見」的概念。

### 無障礙的 CSS Reset： `a11y-css-reset`

> Global CSS rules to improve accessibility in your site and make your life easier from a11y-css-reset.

分為兩個版本，reset.css 與 combo.css。

一、reset.css：基礎的 Reset，只針對基礎元素做統一。

```css
/* apply a natural box layout model to all elements, but allowing components to change
 * https://www.paulirish.com/2012/box-sizing-border-box-ftw/
 */
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
}
```

二、combo.css：除了 Reset 外，再加上為無障礙寫好的 CSS。

```css
/* apply a natural box layout model to all elements, but allowing components to change
 * https://www.paulirish.com/2012/box-sizing-border-box-ftw/
 */
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
}
*:focus:not(:focus-visible),
*::before:focus:not(:focus-visible),
*::after:focus:not(:focus-visible) {
  outline: none;
}

/* https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939 */
.visually-hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}

/* https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html */
.plain-list {
  list-style: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E");
  padding-left: 0;
}

/* prettier-ignore */
@media(prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
```

### 1. 絕對不要移除 outline 的樣式，除非...

`outline` ~~在 `box-sizing` 中，是位於 `margin` 外的外框線~~ <ins>是畫在元素 border 外側的外框線</ins>，不佔 box 的空間，樣式則因各家瀏覽器實作有一點差異，我們平常看不見 `outline`的 ，除非該元素被 focus，這時會看到藍藍的外框，以前還常用來因應切版方便，下個 `outline` 的值，標出所有元素的空間。

> [!更正]
> `outline` 和 `box-sizing` 沒有關係，它是畫在 border 外側的線，而且不佔版面空間、不影響排版，並不是「位於 margin 之外」。
>
> 來源：[MDN — outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)

我們絕對不該移除 outline 的樣式，比如說： `outline: none` 。因為元素被 focus 時，表示使用者正在使用的元件就是「它」，如果看不出任何差異，會有辨識的困難。

但上面看到了一個方案是：

```css
*:focus:not(:focus-visible),
*::before:focus:not(:focus-visible),
*::after:focus:not(:focus-visible) {
  outline: none;
}
```

這邊提到了一個選取器 `:focus-visible` ，意思是當你使用滑鼠點擊任何焦點元素時，這裡假設是一顆按鈕，那麼那顆按鈕將不會有 outline 的樣式，但如果是鍵盤使用者，用 `tab` 鍵 focus 到按鈕，請幫我維持樣式的呈現。

但因為這個選取器 `:focus-visible` 的[支援度](https://caniuse.com/css-focus-visible)~~目前還很低，這裡有個 [Polyfill](https://github.com/WICG/focus-visible)~~ <ins>現在主流瀏覽器都已支援，不需要再用 Polyfill</ins>。

> [!更正]
> `:focus-visible` 從 2022 年 3 月起所有主流瀏覽器都支援了。而且瀏覽器現在本來就會用自己的判斷規則顯示焦點框：例如用滑鼠點擊按鈕時通常不顯示，而用鍵盤操作時一定要看得到焦點，所以上面 `*:focus:not(:focus-visible) { outline: none; }` 這段多半已經不需要。想自訂焦點樣式的話，直接寫在 `:focus-visible` 上就好：
>
> ```css
> :focus-visible {
>   outline: 3px solid #00a988;
>   outline-offset: 2px;
> }
> ```
>
> 來源：[MDN — :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)、[Can I use — :focus-visible](https://caniuse.com/css-focus-visible)

### 2. `.visually-hidden` 影響資訊是否能被讀取

會有這個 class 的設定是因為 `visibility: hidden` & `display: none` 這兩種屬性的設定，都是在可視介面上隱藏元素，基本上會讓螢幕閱讀器的使用者受到影響，他們的輔助工具也將遺漏你設定隱藏的資訊。

所以說，如果我們想要讓「漢堡選單」讓螢幕閱讀器可以讀得出來，就可以將備註元素套用 `.visually-hidden` ，這樣一來，螢幕閱讀器就能順利接收而又不影響 UI 呈現囉！

```css
.visually-hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
```

來看 Bootstrap 4 的[無障礙頁面](https://getbootstrap.com/docs/4.3/getting-started/accessibility/#visually-hidden-content)，它設計 `.sr-only` 這個 class 也是相同概念：

```html
<p class="text-danger">
  <span class="sr-only">Danger: </span>
  This action is not reversible
</p>
```

> [!更正]
> Bootstrap 5 已經把 `.sr-only`、`.sr-only-focusable` 改名為 `.visually-hidden`、`.visually-hidden-focusable`，用新版的話請改用新名稱。
>
> 來源：[Bootstrap 5 — Migrating to v5](https://getbootstrap.com/docs/5.0/migration/)、[Bootstrap 5.3 — Visually hidden](https://getbootstrap.com/docs/5.3/helpers/visually-hidden/)

### 3. `.plain-list` 拿列表來做導航列？

如我們使用 `<ul>` ... `<li>` 來製作導航列，我們常會把 `list-style-type` 設為 `none` ，沒想到 Safari 上面的 VoiceOver 會有遺失語義的問題，這在大多數新的瀏覽器都支援，看看[這篇文章](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html)。

```css
.plain-list {
  list-style: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E");
  padding-left: 0;
}
```

### 4. Media Queries `prefers-reduced-motion`

當使用者自己將瀏覽器的顯示設定，設為「減少模式」時，取消所有的轉場跟動畫。~~殘念的是，目前還在草案階段，瀏覽器除了 IE 及 Edge 以外都支持...。~~ <ins>它定義在仍是草案的 Media Queries Level 5，但從 2020 年 1 月起主流瀏覽器（包含 Edge）都已支援。</ins>

> [!更正]
> `prefers-reduced-motion` 現在是各瀏覽器都能用的功能，MDN 標示為 Baseline Widely available，從 2020 年 1 月起各主流瀏覽器都已支援，包含 Edge。
>
> 來源：[MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)、[Can I use — prefers-reduced-motion](https://caniuse.com/prefers-reduced-motion)、[Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)

```css
@media(prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
```

---

太多啦！還有想知道的嗎？

- [不要把重要資訊塞在偽元素？](https://thatdevgirl.com/blog/before-after-accessibility)
- [讓互動元素容易點擊](https://a11yproject.com/posts/large-touch-targets/)：擴大手指及滑鼠觸及區。
- [動畫的注意事項](https://a11yproject.com/posts/understanding-vestibular-disorders/)

---

## Reference

- [Reflect the reading order in the code order](https://www.w3.org/WAI/tips/developing/#reflect-the-reading-order-in-the-code-order) - W3C
- [The A11Y Project](https://a11yproject.com/)
- [a11y-css-reset](https://github.com/mike-engel/a11y-css-reset) ＠npm

## 更正紀錄

- 2026-10-27：依 MDN、Can I use 更正 `outline` 的說明、`:focus-visible` 與 `prefers-reduced-motion` 的瀏覽器支援度；補充 Bootstrap 5 的 `.visually-hidden` 改名；更新 `:focus-visible` 的 Can I use 連結。
