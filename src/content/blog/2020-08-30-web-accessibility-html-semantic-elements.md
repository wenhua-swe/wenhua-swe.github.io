---
title: 無障礙網站：HTML 元素與客製化控制組件的語義
pubDate: '2019-09-18'
updatedDate: '2026-10-27'
description: >-
  使用者看到網頁內容，立即知道該怎麼操作，這不僅是因為我們看得見它，也是 UI/UX 的示能性。瀏覽器或螢幕閱讀器獲取網頁結構，立即知道元素代表的意義，這是
  HTML 的示能性。而這篇文章要談的就是 HTML 之於瀏覽器與螢幕閱讀器的示能性！
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - the Accessibility Tree
  - AOM
  - DOM
  - 無障礙網站
  - 可及性網站
  - 親和力網站
  - 包容性網站
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 3（[原文連結](https://ithelp.ithome.com.tw/articles/10217056)）。
>
> 2026-10-27 依 WAI-ARIA 1.2、HTML-AAM、Core-AAM 1.2 與 WCAG 2.2 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

## TL;DR

本篇文章學習目的：

- 理解 HTML 之於瀏覽器與螢幕閱讀器的示能性
- 理解 HTML 元素與客製化控制組件的語義賦予方式之差異

---

## Affordance 示能性

大家知道 affordance 是什麼嗎？講到 affordance ，大多數的慣例都會使用一個茶壺來做舉例！

![茶壺擁有高示能性](/images/ironman-a11y/day03-1.webp)

（圖片出處：[unsplash](https://unsplash.com/photos/4aJ9GCwB3Gw)）

我們看到茶壺（目標物），不用怎麼細細思考，就能知道茶壺可以拿起來倒茶（功能性），這就是 affordance 示能性。

使用者看到網頁內容，立即知道該怎麼操作，這不僅是因為我們看得見它，也是 UI/UX 的示能性。瀏覽器或螢幕閱讀器獲取網頁結構，立即知道元素代表的意義，這是 HTML 的示能性。而這篇文章要談的就是 HTML 之於瀏覽器與螢幕閱讀器的示能性！

---

## 讓網站符合 HTML 規範

符合 HTML 規範的網站，~~本身就具有良好的可訪問性（Accessibility）~~ <ins>就打好了可訪問性（Accessibility）的基礎</ins>，有助於提升 SEO，也將提升螢幕閱讀器對於網頁元素的理解程度，撰寫這樣的網站是作為工程師的使命，維護每個人公平獲取資訊的權利。

> [!更正]
> 符合 HTML 規範不等於無障礙：表單欄位沒有 label、顏色對比不足、自訂組件沒處理焦點，HTML 一樣可以通過驗證。WCAG 2.2 也已經把 4.1.1 Parsing（語法解析）標為過時並移除。正確使用語義化的 HTML 是無障礙的基礎，但還是要對照 WCAG 逐項檢查。
>
> 來源：[Understanding SC 4.1.1: Parsing (Obsolete and removed)](https://www.w3.org/WAI/WCAG22/Understanding/parsing.html)、[WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 語義 Semantics

### 瀏覽過程

瀏覽網站的過程，是一個連貫的操作行為，包含上下瀏覽（導覽） ⇒ 查找（操作） ⇒ 確認 ⇒ 獲得資訊。

整個過程中，確保使用者隨時能知曉：

- Where：「自己身在網站何處？」
- What：「目前操作的是什麼功能啊？這是我要的資訊嗎？」
- How：「預期操作之後會發生什麼事？」

---

以下分為「HTML 元素」與「客製化控制項」，來解釋語義。

### HTML 元素的語義

> HTML 元素本身已經具有其「基礎定義」，但是能否讓瀏覽器、螢幕閱讀器、爬蟲知曉元素的意義，要看這個基礎定義是否能清楚代表其內容，比如說 HTML 5 提供的語義標籤就非常清楚。

比如 ~~`<div>` 元素的基礎定義代表的是群組，在 VoiceOver 讀出時是「Group」，使用者無法透過「Group」瞭解區塊的內容。~~ <ins>`<div>` 元素本身沒有語義（角色是 `generic`），螢幕閱讀器沒有角色可以唸，使用者無法從它瞭解區塊的內容。</ins>可是 `<button>` 就不同了，當 VoiceOver 讀出時是「Button」，使用者可以預測它的操作行為：這個區塊可以「點擊」，至於點擊會發生什麼事情，就要倚靠 `<button>` 中提供清晰的指示內容了。

> [!更正]
> `<div>` 對應的 ARIA 角色是 `generic`，規範的定義是「本身沒有語義的無名容器」，它不是群組；ARIA 的群組是另一個角色 `group`。所以 `<div>` 不會像 `<button>` 那樣提供角色資訊給螢幕閱讀器。
>
> 來源：[HTML-AAM — div](https://www.w3.org/TR/html-aam-1.0/#el-div)、[WAI-ARIA 1.2 — generic role](https://www.w3.org/TR/wai-aria-1.2/#generic)

範例一、當螢幕閱讀器使用者遇到 `<button>` 的日常：

- Where？
  - 噢，我現在停在登入表單的送出按鈕上！
- What？
  - 螢幕閱讀器告訴我，「它」是一顆按鈕，所以我可以「點」進去看看。
- How？
  - 按鈕上的「註冊」文字，讓我知道點擊代表的動作，預測按下按鈕可以完成註冊。

範例二、HTML 5 的語義標籤

HTML 5 中，採用了 `<figure>` 與 `<figcaption>` 元素來做到更完整的語義標記。

更有效的分離「圖片的說明」與圖說「想要傳達的概念」，讓內容更具結構。

    <figure>
      <img src="picture.jpg" class="picture" alt="這是人在使用手機的圖片" />
      <figcaption>手機改變了這世界</figcaption>
    </figure>

> [!更正]
> 範例的替代文字用了「這是……的圖片」，螢幕閱讀器本來就會告訴使用者這是圖片，再說一次就重複了，Day 4 的替代文字原則也提到要避免。直接描述圖片內容就好：
>
> ```html
> <figure>
>   <img src="picture.jpg" class="picture" alt="一個人低頭滑手機" />
>   <figcaption>手機改變了這世界</figcaption>
> </figure>
> ```
>
> 來源：[WebAIM — Alternative Text](https://webaim.org/techniques/alttext/)

補充：[HTML 4 的元素列表](https://www.w3.org/TR/html4/index/elements.html)、[HTML 5 標籤在各瀏覽器的支援程度](https://www.html5accessibility.com/)、[使用 HTML 5 語義標籤的頁面](https://www.html5accessibility.com/html5elements/)（你可以使用各種裝置來瀏覽測試看看）。

備註：不要糾結 `<section>` 與 `<article>` 是誰包誰，全看結構是否符合其[元素的描述](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)。

### 客製化控制項的語義化

- 什麼是客製化控制項？
  - 就是組合多個具有語義、無語義的 HTML 標籤，透過 JavaScript 操控，讓使用者可以操作的組件，比如：照片燈箱 Modal。

我們現在的網站都已經演變成較複雜的應用程式，即使再簡單的網站，都因應手機時代來臨，智慧型裝置的顯示畫面較小，所以縮減某些區塊呈現範圍的需求，比如說，導航列到手機的介面會呈現成一個「漢堡」的形狀，點擊那顆「漢堡」選單將收合導覽列的內容。

- 如何讓螢幕閱讀器知道「漢堡選單」的開關？

這時候 WAI-ARIA 就派上用場了！目前需要使用 `aria` 屬性來操作 Accessibility Tree（新增、覆蓋、刪除），我們也能透過開發者工具來檢視 Accessibility Tree。

## 什麼是 The Accessibility Tree？我只聽過 DOM Tree

[![影片：The Accessibility Tree（Udacity）](/images/ironman-a11y/day03-2.webp)](https://www.youtube.com/watch?v=rvYXa2nGE04)

> 上面的影片是關於 The Accessibility Tree 的簡單介紹。

### DOM 與 AOM、The Accessibility Tree 之間的關係

![瀏覽網站過程倚靠開發者對於可訪問性技術的理解](/images/ironman-a11y/day03-3.webp)
（圖片出處：[AOM - WICG](https://wicg.github.io/aom/)）

- The Accessibility Tree：
  - 基於 DOM Tree 創建出的「無障礙樹」，實際上是擷取出~~螢幕閱讀器~~ <ins>輔助科技</ins>需要的資訊（節點），~~限於螢幕閱讀器如 NVDA、VoiceOver 解析~~ <ins>瀏覽器透過作業系統的無障礙 API 提供給各種輔助科技，不只螢幕閱讀器（如 NVDA、VoiceOver）</ins>，這些輔助科技將會與 Audio UI、Spoken UI 結合，唸出畫面中的資訊給使用者聽。現階段工程師能實踐無障礙的做法。
- [DOM](https://css-tricks.com/dom/)：
  - JavaScript 可操縱的介面，由瀏覽器 Google Chrome、Firefox、Safari 解析，渲染成 GUI 可視的人機操作介面。
- [AOM](https://github.com/WICG/aom)：
  - ~~目前還在標準草稿的新 API 計畫！~~ <ins>WICG 社群孵化中的 API 提案，部分已經落地（見下方更正框）。</ins>全名 Accessibility Object Model，由 Google 的 Alice Boxhall、Dominic Mazzoni，Apple 的 James Craig 及 Mozilla 的 Alexander Surkov 協作開發，創建聲明式的 JavaScript API。將分為四個階段導入。現階段各瀏覽器的實作狀態請查看[這份文件](https://github.com/WICG/aom/blob/gh-pages/caniuse.md)。
  - Apple 也發布[官方聲明](https://support.apple.com/en-us/101960)（2019-05-17），說明在 iOS 與 macOS 中如何開啟實驗性的 AOM。

> [!更正]
> 無障礙樹不只給螢幕閱讀器用。瀏覽器會把它對應到各平台的無障礙 API（Windows 的 UIA、MSAA／IAccessible2，macOS 的 AX API，Linux 的 ATK／AT-SPI），螢幕放大器、語音辨識、點字顯示器、切換裝置等輔助科技都是從這裡取得資訊。
>
> AOM 的部分是 2019 年的狀態。AOM 至今仍是 WICG（Web Platform Incubator Community Group）孵化中的提案，官網也註明規格草稿沒有持續更新。已經落地、現在就能用的有兩塊：
>
> - ARIA 屬性反映：`el.role`、`el.ariaLabel` 這類 JavaScript 屬性已寫進 WAI-ARIA 1.2 的 `ARIAMixin`，MDN 標示 2023 年 10 月起主流瀏覽器都支援。
> - 自訂元素可以透過 `attachInternals()` 取得 `ElementInternals`，直接設定預設的角色與狀態，不必在元素上加 `role` 屬性：
>
> ```js
> class MySwitch extends HTMLElement {
>   constructor() {
>     super();
>     this.internals = this.attachInternals();
>     this.internals.role = 'switch';
>     this.internals.ariaChecked = 'false';
>   }
> }
> customElements.define('my-switch', MySwitch);
> ```
>
> 這只處理語義，焦點與鍵盤操作還是要自己實作。Apple 那份說明現在的標題是「About Accessibility Events」，內容是 macOS 10.14.3、iOS 12.3 當時的實驗開關。
>
> 來源：[Core-AAM 1.2](https://www.w3.org/TR/core-aam-1.2/)、[WAI-ARIA 1.2 — Assistive Technologies](https://www.w3.org/TR/wai-aria-1.2/#dfn-assistive-technology)、[WICG — AOM](https://wicg.github.io/aom/)、[WAI-ARIA 1.2 — ARIAMixin](https://www.w3.org/TR/wai-aria-1.2/#ARIAMixin)、[MDN — Element.ariaLabel](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaLabel)、[MDN — ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals)

---

## Reference

- [AOM](https://github.com/WICG/aom) - WICG @GitHub
- [The Accessibility Tree](https://web.dev/articles/the-accessibility-tree) - Google Developers
- [Playing with the Accessibility Object Model (AOM)](https://tink.uk/playing-with-the-accessibility-object-model-aom/)
- [Meaning without markup: Accessibility Object Model](https://hidde.blog/aom/)
- [AOM at me bro](https://shortdiv.com/posts/aom-at-me-bro/) - `<shortdiv />`

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、HTML-AAM、Core-AAM 1.2 與 WCAG 2.2 更正 `<div>` 的語義、無障礙樹的使用對象、figure 範例的替代文字、「符合 HTML 規範就無障礙」的說法，補充 AOM 的現況；更新 web.dev、Apple、hidde.blog 等失效或已搬移的連結。
