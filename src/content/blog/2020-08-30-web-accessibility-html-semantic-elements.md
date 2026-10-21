---
title: 無障礙網站：HTML 元素與客製化控制組件的語義
pubDate: '2020-08-30'
description: >-
  使用者看到網頁內容，立即知道該怎麼操作，這不僅是因為我們看得見它，也是 UI/UX 的示能性。瀏覽器或螢幕閱讀器獲取網頁結構，立即知道元素代表的意義，這是
  HTML 的示能性。而這篇文章要談的就是 HTML 的之於的示能性！
author: Askie Lin
tags:
  - the Accessibility Tree
  - AOM
  - DOM
  - 無障礙網站
  - 可及性網站
  - 親和力網站
  - 包容性網站
---

## TL;DR

本篇文章學習目的：

- 理解 HTML 之於瀏覽器與的示能性
- 理解 HTML 元素與客製化控制組件的語義賦予方式之差異

---

## Affordance 示能性

大家知道 affordance 是什麼嗎？講到 affordance ，大多數的慣例都會使用一個茶壺來做舉例！

![茶壺擁有高示能性](https://i.imgur.com/XFxFPZh.jpg)

（圖片出處：[unsplash](https://unsplash.com/photos/4aJ9GCwB3Gw)）

我們看到茶壺（目標物），不用怎麼細細思考，就能知道茶壺可以拿起來倒茶（功能性），這就是 affordance 示能性。

使用者看到網頁內容，立即知道該怎麼操作，這不僅是因為我們看得見它，也是 UI/UX 的示能性。瀏覽器或螢幕閱讀器獲取網頁結構，立即知道元素代表的意義，這是 HTML 的示能性。而這篇文章要談的就是 HTML 的之於的示能性！

---

## 讓網站符合 HTML 規範

符合 HTML 規範的網站，本身就具有良好的可訪問性（Accessibility），有助於提升 SEO，也將提升螢幕閱讀器對於網頁元素的理解程度，撰寫這樣的網站是作為工程師的使命，維護每個人公平獲取資訊的權利。

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

比如 `<div>` 元素的基礎定義代表的是群組，在 VoiceOver 讀出時是「Group」，使用者無法透過「Group」瞭解區塊的內容。可是 `<button>` 就不同了，當 VoiceOver 讀出時是「Button」，使用者可以預測它的操作行為：這個區塊可以「點擊」，至於點擊會發生什麼事情，就要倚靠 `<button>` 中提供清晰的指示內容了。

範例一、當螢幕閱讀器使用者遇到 `<button>` 的日常：

- Where？
  - 噢，我現在停在登入表單的送出按鈕上！
- What？
  - 螢幕閱讀器告訴我，「它」是一顆按鈕，所以我可以「點」進去看看。
- How？
  - 按鈕上的「註冊」文字，讓我知道點擊代表的動作，預測按下按鈕可以完成註冊。

範例二、HTML 5 的語義標籤

HTML 5 中，採用了 `<figure>` 與 `<figcaption>` 元素來做到更完整的語意標記。

更有效的分離「圖片的說明」與圖說「想要傳達的概念」，讓內容更具結構。

    <figure>
      <img src="picture.jpg" class="picture" alt="這是人在使用手機的圖片" />
      <figcaption>手機改變了這世界</figcaption>
    </figure>

補充：[HTML 4 的元素列表](https://www.w3.org/TR/html4/index/elements.html)、[HTML 5 標籤在各瀏覽器的支援程度](https://www.html5accessibility.com/)、[使用 HTML 5 語義標籤的頁面](https://www.html5accessibility.com/html5elements/)（你可以使用各種裝置來瀏覽測試看看）。

備註：不要糾結 `<section>` 與 `<article>` 是誰包誰，全看結構是否符合其[元素的描述](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)。

### 客製化控制項的語義化

- 什麼是客製化控制項？
  - 就是組合多個具有語義、無語義的 HTML 標籤，透過 JavaScript 操控，讓使用者可以操作的組件，比如：照片燈箱 Modal。

我們現在的網站都已經演變成較複雜的應用程式，即使再簡單的網站，都因應手機時代來臨，智慧型裝置的顯示畫面較小，所以縮減某些區塊呈現範圍的需求，比如說，導航列到手機的介面會呈顯成一個「漢堡」的形狀，點擊那顆「漢堡」選單將收合導覽列的內容。

- 如何讓螢幕閱讀器知道「漢堡選單」的開關？

這時候 WAI-ARIA 就派上用場了！目前需要使用 `aria` 屬性來操作 Accessibility Tree（新增、覆蓋、刪除），我們也能夠過開發者工具來檢視 Accessibility Tree。

## 什麼是 The Accessibility Tree？我只聽過 DOM Tree

[![Yes](https://img.youtube.com/vi/rvYXa2nGE04/0.jpg)](https://www.youtube.com/watch?v=rvYXa2nGE04)

> 上面的影片是關於 The Accessibility Tree 的簡單介紹。

### DOM 與 AOM、The Accessibility Tree 之間的關係

![瀏覽網站過程倚靠開發者對於可訪問性技術的理解](https://i.imgur.com/tNOcm4x.png)
（圖片出處：[AOM - WICG](http://wicg.github.io/aom/)）

- The Accessibility Tree：
  - 基於 DOM Tree 創建出的「無障礙樹」，實際上是擷取出螢幕閱讀器需要的資訊（節點），限於螢幕閱讀器如 NVDA、VoiceOver 解析，這些輔助科技將會與 Audio UI、Spoken UI 結合，念出畫面中的資訊給使用者聽。現階段工程師能實踐無障礙的做法。
- [DOM](https://css-tricks.com/dom/)：
  - JavaScript 可操縱的介面，由瀏覽器 Google Chrome、Firefox、Safari 解析，渲染成 GUI 可視的人機操作介面。
- [AOM](https://github.com/WICG/aom)：
  - 目前還在標準草稿的新 API 計畫！全名 Accessibility Object Model，由 Google 的 Alice Boxhall、Dominic Mazzoni，Apple 的 James Craig 及 Mozilla 的 Alexander Surkov 協作開發，創建聲明式的 JavaScript API。將分為四個階段導入。現階段各瀏覽器的實作狀態請查看[這份文件](https://github.com/WICG/aom/blob/gh-pages/caniuse.md)。
  - Apple 也發布[官方聲明](https://support.apple.com/en-us/HT209655)（2019-05-17），說明在 iOS 與 macOS 中如何開啟實驗性的 AOM。

---

## Reference

- [AOM](https://github.com/WICG/aom) - WICG @githbub
- [The Accessibility Tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) - Google Developers
- [Playing with the Accessibility Object Model (AOM)](https://tink.uk/playing-with-the-accessibility-object-model-aom/)
- [Meaning without markup: Accessibility Object Model](https://hiddedevries.nl/en/blog/2019-07-22-meaning-without-markup-accessibility-object-model)
- [AOM at me bro](http://shortdiv.com/posts/aom-at-me-bro/) - `<shortdiv />`
