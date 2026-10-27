---
title: 以設計層面來思考無障礙網站
pubDate: '2019-09-26'
updatedDate: '2026-10-27'
description: >-
  網站的製作可不是僅靠工程師的力量而已，本文從可讀性與可操作性整理無障礙設計的相關資源，包含指示性的超連結、顏色對比度與為狀態設計。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - 設計
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 11（[原文連結](https://ithelp.ithome.com.tw/articles/10221060)）。
>
> 2026-10-27 依 WCAG 2.2 與 W3C COGA 指引校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

![Microsoft Inclusive Design 插圖：單手、手臂受傷、單手抱嬰兒的人](/images/ironman-a11y/day11-1.webp)

（圖片來源：[Inclusive Design - Microsoft](https://www.microsoft.com/design/inclusive/)）

設計雖不是我的專業，不過網站的製作可不是僅靠工程師的力量而已啊啊，所以也將找到的相關資源稍微整理一下。

講到設計應該可以拜讀一下 Google Material Design 針對[無障礙的設計實踐](https://m2.material.io/design/usability/accessibility.html#color-contrast)，有很好的圖像說明，蠻完整的。

目前有很多公司針對自己的網站或是軟體提供可訪問性指南，更多是一開始便以通用設計 Universal Design、包容性設計 Inclusive Design 來作為產品設計的出發點。

- 無障礙一定會知道的組織：~~[The Paciello Group](https://inclusivedesignprinciples.org/)~~ <ins>The Paciello Group（網站現在會導向 [Vispero](https://vispero.com/)）</ins>
- [Google](https://www.google.com/accessibility/)
- [Apple](https://www.apple.com/accessibility/)
- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Microsoft](https://www.microsoft.com/design/inclusive/)
- [IBM](https://www.ibm.com/able/)
- [Opera](https://dev.opera.com/tags/accessibility/)
- [Adobe](https://www.adobe.com/accessibility.html)
- [Facebook](https://www.facebook.com/help/accessibility)

... 等等。

> [!更正]
> 第一項原本的連結其實是 Inclusive Design Principles 的網站，不是 The Paciello Group；而且這個網域現在已經變成和無障礙無關的網站，所以我拿掉了連結。The Paciello Group 原本的網址（developer.paciellogroup.com、tpgi.com）現在都會導向 Vispero，官網上的部落格也標示為「Vispero Blog（formerly TPGi Blog）」。
>
> 來源：[Vispero](https://vispero.com/)

---

## 可讀性

### 資訊的設計

> 在做資訊（甚至不止於資訊領域）設計時，需要預先思考其前提。—— [Bobby Tung](https://medium.com/@bobtung/%E5%BE%9E%E6%B3%A8%E9%9F%B3%E5%AD%97%E9%AB%94%E8%AB%87%E8%B3%87%E8%A8%8A%E8%A8%AD%E8%A8%88-14cb09ff9d52)

#### 指示性的超連結 （WCAG2.1 - [2.4.4: Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)）

- 連結文字以有意義的文字為主，如以「前往購票」取代「進入頁面」、以「閱讀書籍簡介」取代「更多介紹」。

#### 彈性的設計

「當使用者將螢幕或字型放大時，是否仍保有良好的閱讀性？ 」

「關鍵的元素是否消失？」

「功能是否可正常使用？在畫面上會不會重疊？」

—— 參考至卡斯伯翻譯的 [Google Material Design 正體中文版](https://wcc723.gitbooks.io/google_design_translate/content/usability-accessibility.html)

- 文字的大小：
  - 看卡斯伯的鐵人：[你的網頁文字是否足夠清楚呢？](https://ithelp.ithome.com.tw/articles/10204034)，我第一次知道開發者工具可以這樣選色！！！
  - 設計師要知道：標題 18px 以上，內文 16px 以上。
  - 工程師要知道：字級大不代表標題級別大，如 CSS 設定 `font-size: 18px` 不等於它的 HTML 標籤就一定該是 `<h2>` ，而是要以資訊重要程度來安排 HTML 結構；並且裝置開放螢幕可縮放，文字要可以放大至 200% 還可以正常閱讀。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### 導航的一致性（WCAG 2.1 - [3.2.3: Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html)）

導航以相同的順序出現在網站的每一頁，幫助認知障礙及視力低下的使用者，更容易預測。

#### 替代文字的設計

- 圖片的替代文字，或是說明文字都要以符合上下文為主，可以練習看看，用講的整個頁面的內容，講到圖片時，你會如何介紹呢？

### 顏色的無障礙

#### 顏色對比度 AA級（[WCAG2.1 - 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)）

> [!更正]
> 標題的成功準則編號寫錯了：顏色對比度 AA 級是 1.4.3 Contrast (Minimum)；1.4.1 Use of Color 講的是「不要只用顏色傳達資訊」，對應的是下面「不要使用顏色作為唯一傳遞重要訊息的方法」那一段。
>
> 來源：[Understanding WCAG 2.2 — 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)、[Understanding WCAG 2.2 — 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)

- 根據字的級距 [[W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)]
  - `3：1` 標題 18pt 以上 或是 14pt 的粗體（CSS 1pt = 1.333px，因此 14pt 和 18pt 大約等於 18.5px 和 24px）。
  - `4.5：1` 一般內文。
- 提供幾個顏色工具：[colorsafe](http://colorsafe.co/)、[colorable](https://colorable.jxnblk.com/1d0066/00ffa2)、[contrast-ratio](https://contrast-ratio.com/#)。

#### 不要使用顏色作為唯一傳遞重要訊息的方法

![Trello 色盲友善模式的標籤以圖紋區分](/images/ironman-a11y/day11-2.webp)

（圖片來源：[We are colorblind](https://wearecolorblind.com/examples/trello-colorblind-friendly-mode/)）

那麼可以怎麼做呢？

- 以形狀代替顏色識別
- 在色彩上面加上文字說明
- 透過字體大小、粗體、斜體等區分訊息的重要程度
- 為色彩加入材質，像是 trello

## 可操作性

- 元素的被點擊面積至少 48x48 px
- 元素之間的距離 8 dp

> [!更正]
> 48×48 是 Google 在 Android／Material Design 的建議，單位是 dp，不是 WCAG 的規定。WCAG 2.2 的要求是：2.5.8 Target Size (Minimum)（AA 級，WCAG 2.2 新增）點擊目標至少 24×24 CSS 像素，或與其他目標保持足夠間距；2.5.5 Target Size (Enhanced)（AAA 級）至少 44×44 CSS 像素。兩者都有例外情況，例如行內文字連結。
>
> 來源：[Understanding WCAG 2.2 — 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)、[Understanding WCAG 2.2 — 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)、[Android Developers — Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/apps)

### 為狀態設計

- 按鈕點擊的狀態，也分為點擊前、點擊時、點擊後、以及「成為焦點時（focus）」的狀態。
- 使用 ARIA 對狀態進行樣式化：將在 ARIA 狀態與元素外觀之間同時建立邏輯關係和語義關係、縮減額外程式碼。

```css
/* 工程師，你可以這樣做 */
.toggle[aria-pressed="true"] { ... }
```

### 其他議題：為焦慮設計（[參考文章](https://developer.paciellogroup.com/blog/2018/11/a-web-of-anxiety-accessibility-for-people-with-anxiety-and-panic-disorders-part-2/)）

- 為焦慮症和恐慌症患者思考，少一點~~黑暗模式~~ <ins>[欺騙性設計（dark patterns）](https://www.fastcompany.com/3060553/why-dark-patterns-wont-go-away)</ins>...。
- 不要給使用者限時的完成任務。
- WCAG 沒有太多針對焦慮的原則，~~不過現在正在努力規劃中。~~ <ins>不過 W3C 已在 2021 年發布認知與學習障礙的設計指引，WCAG 2.2 也新增了幾條和認知負擔有關的成功準則。</ins>

> [!更正]
> 原文連結的文章談的是「dark patterns」：用來誘騙、困住使用者的介面設計，我改譯為「欺騙性設計」。它和深色主題的「黑暗模式（dark mode）」是兩回事，寫成黑暗模式容易誤會。
>
> 另外，W3C 在 2021 年 4 月發布了 [Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/)（COGA）指引，其中也談到焦慮與認知壓力；WCAG 2.2 則新增了 3.2.6 Consistent Help、3.3.7 Redundant Entry、3.3.8 Accessible Authentication (Minimum) 等和認知障礙者相關的成功準則。
>
> 來源：[FTC — Bringing Dark Patterns to Light](https://www.ftc.gov/reports/bringing-dark-patterns-light)、[W3C — Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/)、[What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)

---

其實文章內文對於規範的連結沒有完善，請各位設計師，或是想了解如何做出更多人使用的工程師，看看這兩篇文章：[Designing for accessibility is not that hard](https://uxdesign.cc/designing-for-accessibility-is-not-that-hard-c04cc4779d94)、[Accessibility guidelines for UX Designers](https://uxdesign.cc/accessibility-guidelines-for-a-ux-designer-c3ba775539be)。

如果你現在也開始重視起所有人從網頁上獲得資訊的權利，那麼吸收完概念起，不要覺得可怕，就從你已經知道的技術開始下手就好，我們也不是天才，每個閱讀文章的人，就從現在開始，一天一天改善網站的可訪問性吧！

![投影片：每天改善可訪問性。你不可能在一天內創造一艘宇宙飛船。](/images/ironman-a11y/day11-3.webp)

（圖片來源：[Hsiaoming Yang](https://lepture.com)）

---

## Reference

- [成為一流的前端工程師：打造專業的 UX 網站](https://www.tenlong.com.tw/products/9789864341122?list_name=srh) - 彭其捷
- [Google Material Design 正體中文版](https://wcc723.gitbooks.io/google_design_translate/content/usability-accessibility.html) - 卡斯伯
- [We are colorblind](https://wearecolorblind.com/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) - W3C
- [可訪問的樣式](https://web.dev/learn/accessibility/) - Google Developers
- [不被重視的 HTML：Accessibility](https://lepture.com/zh/2014/talk-on-accessibility-jsdc2014) - Hsiaoming Yang

## 更正紀錄

- 2026-10-27：依 WCAG 2.2 更正顏色對比度標題的成功準則編號、點擊目標尺寸的出處與數值；依 W3C COGA 指引與 WCAG 2.2 更新焦慮與認知相關的說明；更正「黑暗模式」為欺騙性設計（dark patterns）；移除已變成無關網站的 The Paciello Group 連結；更新 WCAG 2.1／2.0、Material Design、Google Developers、MDN、IBM 的失效連結。
