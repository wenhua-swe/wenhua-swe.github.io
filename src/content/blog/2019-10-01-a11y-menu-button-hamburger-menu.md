---
title: 實作無障礙網頁功能：真・button —— RWD 漢堡選單應用
pubDate: '2019-10-01'
updatedDate: '2026-10-27'
description: >-
  今天想介紹按鈕之於漢堡選單的應用，也就是 Menu Button！引用 Bootstrap v4.3 的 Navbar 來看看，CSS 知名框架是怎麼處理
  A11Y 的呢？
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - Menu Button
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 16（[原文連結](https://ithelp.ithome.com.tw/articles/10223475)）。
>
> 2026-10-27 依 WAI-ARIA 1.2 與 ARIA Authoring Practices Guide（APG）校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

---

## 選單按鈕 Menu Button（打開[文件](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)）

> 3.16 Menu Button  
> A menu button is a button that opens a menu. It is often styled as a typical push button with a downward pointing arrow or triangle to hint that activating the button will display a menu.

前篇的「[真・button——按鈕的世界比你想像複雜，別再用 div 刻假按鈕了！](/blog/2019-09-30-a11y-button/)」主要介紹了：

- 使用 `<div>` 或 `<button>` 製作按鈕的差異。
- 介紹 WAI-ARIA 除了按鈕 button 被觸發的基本行為外，按鈕類型支援 Toggle Button 與 Menu Button。前篇就是介紹一般的按鈕與需要切換狀態的 Toggle Button。

想再複習的請點前篇文章，今天想介紹按鈕之於漢堡選單的應用，也就是 Menu Button！

---

## 漢堡選單 The Hamburger Menu

![三條槓的漢堡選單圖示](/images/ironman-a11y/day16-1.webp)

（圖片來源：[UXPlanet](https://uxplanet.org/the-ultimate-guide-to-the-hamburger-menu-and-its-alternatives-e2da8dc7f1db)）

如上圖是三條槓或多條槓的呈現，現代應用程式因為導覽列放置的超連結通常都是三到五個起跳，在行動裝置有較小的版面狀況下，常會透過漢堡選單的視覺，固定覆蓋在畫面最上方，引導讓使用者那個位置可以點選，裡面放著網站的導覽超連結。

這裡就不探討漢堡選單的利弊，我們可以知道的是目前大多數使用者的使用習慣已經受應用程式介面影響，當他需要拜訪其他頁面時，直覺會想點擊漢堡選單到達目的地。

---

## 鍵盤的可訪問性

### 按鈕 Menu Button

- Enter 或 Space
  - 能打開選單（Menu），並將焦點放在選單的第一個選項（Menu Item）
- （選擇性）方向鍵 `上` 與 `下`，可依選項的順序操作焦點。
- 選單開啟後，針對的鍵盤操作定義在 `Menu or Menu bar` （這也是 Widgets 之一）。

### 選單 Menu

內容太多了，涉獵巢狀的選單行為，請點擊[文件](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#keyboardinteraction)查看更多鍵盤操作的說明，這裡有 Element UI 團隊整理的簡中版本。

也許日後找機會整理，做成圖片說明比較合適！

---

## Roles、States、Properties

### 按鈕 Menu Button

- 按鈕的角色是 `button`，如果不是原生 `<button>`，應該要加上 `role="button"`。
- 為按鈕加上 `aria-haspopup` 屬性，值為 `true` 或是 `menu`，表示按鈕將~~啟動一個視窗~~ <ins>開啟一個 `menu` 類型的彈出元件</ins>，屬性說明點[這裡](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup)。
- 如果選單開啟就幫按鈕加上 `aria-expanded` 屬性，值設為 `true`。選單關閉時，~~建議直接隱藏 `aria-expanded`屬性設定，如果選單在關閉的狀態時，你已經為按鈕加上 `aria-expanded`屬性，不打算透過 JavaScript 移除屬性，那麼就把值設為 `false`吧~~ <ins>把 `aria-expanded` 的值設為 `false`</ins>。
- （選擇性）可以為按鈕定義關聯它將開啟的選單 `id`，方式是為按鈕加上 ~~`aria-control="Menu角色元素的id"`~~ <ins>`aria-controls="Menu角色元素的id"`</ins>。

> [!更正]
> `aria-haspopup` 表示的是按鈕會開啟「哪一種」彈出元件，可用的值是 `menu`、`listbox`、`tree`、`grid`、`dialog`（`true` 等同 `menu`），而且彈出的容器角色必須和這個值相符；它不是「開啟一個視窗」的意思，要開啟對話框時應該用 `dialog`。另外，現在的 APG 改成選單隱藏時把 `aria-expanded` 設為 `false`，不再建議移除屬性。關聯屬性的正確名稱是 `aria-controls`（有 s）。
>
> 來源：[WAI-ARIA 1.2 — aria-haspopup](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup)、[WAI-ARIA APG — Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)

### 選單 Menu

- 透過按鈕開啟的選單，必須具有 `menu` 的角色設定。
- 內容太多了，涉獵巢狀的選單行為，請點擊[文件](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#wai-ariaroles,states,andproperties)查看更多鍵盤操作的說明。

---

## 實踐開始囉！

今天想引用 Bootstrap v4.3 的 Navbar 來看看，CSS 知名框架是怎麼處理 A11Y 的呢？一起檢視 `Menu Button` 的最佳建議是不是都實現了呢？

希望能做到：

- [x] 支援螢幕閱讀器
- [x] 可使用鍵盤操作

![使用鍵盤操作 Bootstrap Navbar 漢堡選單的示範動畫](/images/ironman-a11y/day16-2.webp)

### 原始 HTML，[官方文件](https://getbootstrap.com/docs/4.3/components/navbar/)

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">我們來看 Bootstrap 4.3 Navbar 的可訪問性</a>
  <!-- 1. 按鈕角色、3. 定義按鈕能觸發選單、4. 建立選單與按鈕之間的關聯 -->
  <!-- a. 注意細節: aria-label -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <!-- 5. 沒有選單角色 -->
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <!-- b. 注意細節: .sr-only -->
      <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#">Features</a>
      <a class="nav-item nav-link" href="#">Pricing</a>
      <!-- c. 注意細節: disabled 的處理 -->
      <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    </div>
  </div>
</nav>
```

### 檢查 Roles, States, and Properties：

1. [ V ] 按鈕角色：打開選單的「按鈕」的角色是 `button`。
2. [ X ] 定義按鈕能觸發選單：為按鈕加上 `aria-haspopup` 屬性，值為 `true` 或是 `menu`。
3. [ V ] 選單是否展開：如果選單開啟就幫按鈕加上 `aria-expanded` 屬性，值設為 `true`，反之亦然。
4. [ V ]（選擇性）建立選單與按鈕之間的關聯：可以為按鈕定義關聯它將開啟的選單 `id`，方式是為按鈕加上 ~~`aria-control="Menu角色元素的id"`~~ <ins>`aria-controls="Menu角色元素的id"`</ins>。

### 檢查 Menu：

5. [ X ] 選單角色：透過按鈕開啟的選單，必須具有 `menu` 的角色設定。註：此範例不是巢狀選單， `menu` 角色其餘的行為這裡不檢查。

> Bootstrap 對於沒加上 role="menu" 的說明：  
> The WAI ARIA standard defines an actual role="menu" widget, but this is specific to application-like menus which trigger actions or functions. ARIA menus can only contain menu items, checkbox menu items, radio button menu items, radio button groups, and sub-menus. Bootstrap’s dropdowns, on the other hand, are designed to be generic and applicable to a variety of situations and markup structures. For instance, it is possible to create dropdowns that contain additional inputs and form controls, such as search fields or login forms. For this reason, Bootstrap does not expect (nor automatically add) any of the role and aria- attributes required for true ARIA menus. Authors will have to include these more specific attributes themselves.

> [!更正]
> 回頭看，第 2、5 項打 X 是我套錯模式了。Menu Button 打開的是 ARIA 的 `menu`，指的是像桌面應用程式那樣執行動作的選單，必須由 `menuitem` 組成，輔助科技也會期待它具備方向鍵移動等複雜操作。漢堡選單裡放的是網站導覽連結，APG 的導覽範例特別說明：一般網站導覽不需要 menu／menubar 那些鍵盤操作，所以不使用 `menu` 角色，而是用 Disclosure（顯示／隱藏）模式：按鈕加上 `aria-expanded` 與 `aria-controls`，展開的是一般的連結清單。所以 Bootstrap 只用 `aria-expanded` 加 `aria-controls`、不加 `role="menu"` 與 `aria-haspopup`，對導覽選單來說才是對的，上面引用的 Bootstrap 說明也沒有錯。
>
> 來源：[WAI-ARIA APG — Example Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)、[WAI-ARIA APG — Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

### 注意細節！

a. 按鈕本身有加上 `aria-label="Toggle navigation"`在 Accessibility Tree 上為自己補充名稱，因為按鈕的內容是「漢堡圖示」 `<span class="navbar-toggler-icon"></span>`，所以一定要加上 `aria-label` 唷！

b. `.sr-only` 這個樣式是要給螢幕閱讀器讀取的，它消失在瀏覽器的畫面上，卻不是真正的消失。

真正消失是指使用 `display: none` 或是 `visibility: hidden` 或是 HTML5 的 `hidden` 屬性。

不是真正的消失指的作法如下：

```scss
<a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>

/* _screen-reader.scss */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

我可以想到的另外一種做法是：在超連結上使用 `aria-current="page"`，表示目前是當前頁面。

```html
<a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
```

c. disabled 的處理：

- `tabindex="-1"` ，~~螢幕閱讀器無法 focus 被 `disabled` 的元素~~ <ins>讓鍵盤按 Tab 時跳過這個元素</ins>。
- `aria-disabled="true"` ，螢幕閱讀器會知道這是一個 `disabled`的超連結。

> [!更正]
> `tabindex="-1"` 只是讓元素不在 Tab 鍵的順序裡，元素還是能用滑鼠點擊，`href` 也照樣有效；`aria-disabled="true"` 則只是告訴輔助科技它是停用的，不會真的停用連結。WAI-ARIA 1.2 也提醒，不要對無法單靠 HTML 本身停用的元素（例如 `<a href>`）用 `aria-disabled`。真的要停用，就移除 `href`（沒有 `href` 的 `<a>` 只是佔位，不是連結），或另外用 JavaScript 擋掉點擊；更簡單的做法是不要把停用的項目放進導覽。
>
> 來源：[MDN — tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex)、[MDN — aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)、[WAI-ARIA 1.2 — aria-disabled](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)、[HTML Standard — The a element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)

## 改良的作法：把上面的 X 補上囉！

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">我們來看 Bootstrap 4.3 Navbar 的可訪問性</a>
  <!-- 1. 按鈕角色、3. 定義按鈕能觸發選單、4. 建立選單與按鈕之間的關聯、加上 aria-haspopup -->
  <!-- a. 注意細節: aria-label -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" aria-haspopup="menu">
    <span class="navbar-toggler-icon"></span>
  </button>
  <!-- 5. 選單角色 -->
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup" role="menu">
    <div class="navbar-nav">
      <!-- b. 注意細節: 移除 .sr-only 改成 aria-current -->
      <a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
      <a class="nav-item nav-link" href="#">Features</a>
      <a class="nav-item nav-link" href="#">Pricing</a>
      <!-- c. 注意細節: disabled 的處理 -->
      <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    </div>
  </div>
</nav>
```

> [!更正]
> 這個「改良版」反而讓選單變得不正確：
>
> - `role="menu"` 規定只能包含 `menuitem`、`menuitemcheckbox`、`menuitemradio`（可以再用 `group` 分組），這裡底下是一層 `div` 和一般的 `<a>`，是無效的 ARIA 結構。
> - 加了 `menu` 之後，輔助科技會期待它具備 menu 該有的方向鍵操作與焦點管理，但範例完全沒有實作這些行為。
> - `aria-haspopup="menu"` 要求彈出的容器真的是 `menu`，導覽連結清單不符合。
>
> 網站導覽請照 APG 的 Disclosure Navigation Menu：保留 Bootstrap 原本的 `aria-expanded` 與 `aria-controls`，拿掉 `role="menu"` 和 `aria-haspopup`，目前頁面用 `aria-current="page"` 標示，連結用清單包起來，再補上 Escape 收合：
>
> ```html
> <nav class="navbar" aria-label="主要導覽">
>   <a class="navbar-brand" href="/">我們來看 Bootstrap 4.3 Navbar 的可訪問性</a>
>   <button type="button" class="navbar-toggler" aria-expanded="false" aria-controls="main-nav" aria-label="Toggle navigation">
>     <span class="navbar-toggler-icon"></span>
>   </button>
>   <ul class="navbar-nav" id="main-nav" hidden>
>     <li><a class="nav-link" href="/" aria-current="page">Home</a></li>
>     <li><a class="nav-link" href="/features/">Features</a></li>
>     <li><a class="nav-link" href="/pricing/">Pricing</a></li>
>   </ul>
> </nav>
> ```
>
> ```js
> const toggler = document.querySelector('.navbar-toggler');
> const menu = document.getElementById(toggler.getAttribute('aria-controls'));
>
> const setOpen = (isOpen) => {
>   toggler.setAttribute('aria-expanded', String(isOpen));
>   menu.hidden = !isOpen;
> };
>
> toggler.addEventListener('click', () => {
>   setOpen(toggler.getAttribute('aria-expanded') !== 'true');
> });
>
> // 選單展開時按 Escape：收合選單，焦點回到按鈕
> toggler.closest('nav').addEventListener('keydown', (event) => {
>   if (event.key === 'Escape' && toggler.getAttribute('aria-expanded') === 'true') {
>     setOpen(false);
>     toggler.focus();
>   }
> });
> ```
>
> 寬螢幕不顯示漢堡按鈕時，用 CSS 媒體查詢讓清單常駐顯示即可（例如 `@media (min-width: 992px) { .navbar-toggler { display: none; } .navbar-nav[hidden] { display: flex; } }`）。Tab 和 Shift + Tab 就能在按鈕和連結之間移動，不需要額外處理方向鍵。
>
> 來源：[WAI-ARIA APG — Example Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)、[WAI-ARIA 1.2 — menu role](https://www.w3.org/TR/wai-aria-1.2/#menu)、[WAI-ARIA 1.2 — aria-haspopup](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup)

最後，這裡還是有為選單加上 `role="menu"`，因為我看 [menu 這個角色的官方定義](https://www.w3.org/TR/wai-aria-1.2/#menu)沒有像 BS 說的只能容納 checkbox、radio 等元件，而且在這個範例中，它就是我的選單呀～所以在此例補充語義會比較完善。

> [!更正]
> 我當時看錯了。WAI-ARIA 1.2 的 `menu` 角色在「Required Owned Elements」明確列出只能是 `menuitem`、`menuitemcheckbox`、`menuitemradio`，或由 `group` 包住的這三種，和 Bootstrap 的說明一致；規範也說明 `menu` 適用於「像桌面應用程式的選單」。網站導覽不該加 `role="menu"`，正確做法見上方的更正。
>
> 來源：[WAI-ARIA 1.2 — menu role](https://www.w3.org/TR/wai-aria-1.2/#menu)、[WAI-ARIA APG — Example Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

[codepen](https://codepen.io/askie/pen/KKPOwNW?editors=1000) 在這裏，快來使用鍵盤操作看看吧！還想看更多範例嗎？那就參考 [APG 的選單範例](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/)吧。

---

## Reference

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) - W3C
- [WAI-ARIA Authoring Practices Guide — Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) - W3C
- [WAI-ARIA 實踐](https://elemefe.github.io/WAI-ARIA-Practices/#/button) - Element UI Front-end 餓了麼前端
- [Recommended WAI-ARIA implementation for navigation bar/menu](https://stackoverflow.com/questions/12279113/recommended-wai-aria-implementation-for-navigation-bar-menu?noredirect=1&lq=1) - StackOverflow
- [Navbar](https://getbootstrap.com/docs/4.3/components/navbar/) - Bootstrap v4.3

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、APG 更正網站導覽誤用 `role="menu"`／`aria-haspopup` 的改良範例（改為 Disclosure Navigation Menu，附 HTML 與 JavaScript）、`menu` 角色定義的誤讀、`aria-haspopup` 與 `aria-expanded` 的說明、`aria-controls` 拼字、`tabindex="-1"` 與 `aria-disabled` 的作用；將失效的 WAI-ARIA Practices 1.1 連結更新為 APG。
