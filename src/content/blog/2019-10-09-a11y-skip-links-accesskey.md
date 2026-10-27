---
title: '實作無障礙網頁功能：無障礙定位點（導盲磚 `:::`）'
pubDate: '2019-10-09'
updatedDate: '2026-10-27'
description: >-
  導盲磚其實是結合了兩個概念，「跳過連結」與「快速鍵」。本文介紹 NCC 對於無障礙定位點的說明、跳過連結的原理、accesskey
  如何實現，以及 accesskey 的注意事項。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - accesskey
  - skip link
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 24（[原文連結](https://ithelp.ithome.com.tw/articles/10226489)）。
>
> 2026-10-27 依 MDN Web Docs 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

![人行道上的導盲磚](/images/ironman-a11y/day24-1.webp)

（圖片來源：[人行道上，該不該放導盲磚？ - 余虹儀](https://opinion.cw.com.tw/blog/profile/428/article/7812)）

今天的實踐內容，並不是 WAI-ARIA 實踐的角色之一，是大家都在做政府網站都一定會需要知道的導盲磚。

## 無障礙定位點 （打開 [NCC 無障礙空間服務網](https://accessibility.moda.gov.tw/Questions/Detail/82?Category=33)）

如果大家沒聽過定位點，或是導盲磚這個功能的話，那麼首先，文章的第一 Part 要完全引用 NCC 對於[無障礙定位點](https://accessibility.moda.gov.tw/Questions/Detail/82?Category=33)的說明：

> 所謂定位點（原名導盲磚），其顯示方式是利用三個冒號（`:::`）來代表，且需要搭配快速鍵設計來使用。

### 主要用途

主要用途在於幫助使用者快速定位及搜尋。

主要優點有以下：

1. 快速跳躍至網頁不同區塊，可避免使用者迷失在網頁中。
2. 方便使用者在各框架頁（`frame`）間快速移動。
3. 可導引使用者依自己需要，跳至所需的區塊中。

### 定位點的設計程式碼如下

```html
<a accesskey="L" href="intro.jsp" title="左側區域"> ::: </a>
<a accesskey="C" href="intro.jsp" title="中間區域"> ::: </a>
<a accesskey="R" href="intro.jsp" title="右側區域"> ::: </a>
```

`title` 屬性文字方便語音合成器告知使用者，是在網頁中的哪一個區塊。每一個瀏覽器都有搜尋的功能，可以讓使用者搜尋所需資訊的地方。在 HTML 4.0 中 `accesskey` 的功能可以搭配 `alt` 鍵使用，跳到所需的區塊。請將網頁定位點（`:::`）搭配快速鍵的使用說明，描述於網站導覽或明顯處供使用者瞭解，請不要隱藏於 `:::` 的連結處，以提供各種使用者使用。

> [!更正]
> 「搭配 `alt` 鍵」是 HTML 4.0 時代的說法。觸發 `accesskey` 的組合鍵依瀏覽器和作業系統而不同，例如 Windows 上的 Firefox 是 Alt + Shift + 鍵，Mac 上多半是 Control + Option + 鍵，下方 MDN 的對照表有完整列表。
>
> 來源：[MDN — accesskey](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)

---

了解完上面 NCC 對於無障礙的說明之後，發現要實現無障礙定位點，也就是俗稱的「導盲磚」，原理非常簡單，讓我們繼續往下看。

## 導盲磚

導盲磚其實是結合了兩個概念，「跳過連結」與「快速鍵」。跳過連結（Skip links or Skip Nav）功能的存在是因為在現今龐大的網站設計當中，我們會將最常用的連結，也就是網頁主結構的超連結（導覽列）放置在每一頁的頁首中（為了維持設計的一致性），而習慣使用鍵盤操作或是輔助裝置的使用者，透過鍵盤上的 `tab 鍵` 去移動網頁上的焦點，這時會造成使用上的巨大困難，因為超連結 `<a>` 是可以成為焦點的元素，使用者必須一個一個焦點慢慢的切換，才能到主內容區塊取得重要資訊。

這樣的操作流程對於鍵盤操作者來說，非常辛苦，因而在設計之初，便可以先設想好整個資訊架構於網頁呈現時該如何佈局，比如說假設資訊內容將依性質分為「導覽列、主要內容、側邊欄、頁尾」等區域的話，將各區域劃分清楚並給予 `id` 與 `accesskey`屬性，實踐 「跳過連結」與「快速鍵」，完成導盲磚功能。

通常會將導盲磚的介紹放置在網站導覽頁面（可參考 [BBC](https://www.bbc.com/) 作法，喜歡！），此通往介紹的超連結會放在頁首，使用者可以在剛開始使用網站時，認識整體使用方法與整個網站結構，因為，若是視覺能力缺失的使用者，他們對於網站結構只能全憑想像。

---

### 跳過連結的原理

因為超連結 `<a>` 在設定 href 屬性時，值就是我們的參考，這個參考可以是其他頁面的 URI ，或是當前頁面的定位點，也就是某個區塊的 `id`，若是要導向至當前頁面的定位點，值會以 `#` 開頭。

```html
<a href="#main" class="skip-nav">skip to main</a>
<main id="main">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet impedit officiis aut facilis assumenda ipsum suscipit fugiat eligendi. Nesciunt tempore magnam quis pariatur deserunt explicabo voluptatum eveniet tempora aperiam quidem.</main>
```

我們會將這個可以跳到主要內容的超連結，成為在 DOM 中第一個可被 focus 的元素。不過這個作法對於大多數的團隊來說，會認為這種做法喪失了品牌設計感，所以在此可以結合另一個視覺上隱藏元素的技巧，透過 CSS 將它隱藏在螢幕之外，然後在其獲得鍵盤焦點時（`:focus`）將其放置在螢幕上。

```scss
.skip-nav {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  // 可以在此設定基本樣式

  &:focus {
    // 在這裡設定成為焦點時的位置
  }
}
```

- 如果使用 `display: none;` 或 `visibility: hidden;` 都會使元素從~~可視層（visual flow）~~ <ins>無障礙樹（accessibility tree）</ins>移除，所以也會被螢幕閱讀器忽略。
- 寬度 `width` 與高度 `height` 是設定容器的大小，若將值設為 `0`，也將被螢幕閱讀器設為不存在。
- 上面的作法適用於現代各瀏覽器，當元素內容大於寬高 `1px`時，將被隱藏（`overflow: hidden;`）會剪掉（`clip: rect(1px, 1px, 1px, 1px);`）。

> [!更正]
> `visibility: hidden` 只是不繪製元素，元素仍然佔著原本的空間、照常影響版面；`display: none` 才會讓元素不產生框、不佔空間。兩者共同的地方是都會把元素從無障礙樹移除，所以螢幕閱讀器不會念，這才是跳過連結不能用它們隱藏的原因。
>
> 來源：[MDN — visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)、[MDN — display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

針對跳過連結的實作細節可以查看 WebAIM 的 ["Skip Navigation" Links](https://webaim.org/techniques/skipnav/) 與 [CSS in Action: Invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/) 兩篇文章。

---

### accesskey 如何實現

假設主要內容區塊分為：導覽列、主要內容、側邊欄、頁尾，可以為每個區塊加上 `accesskey` 屬性，值就是鍵盤上的按鍵，而 `accesskey` 是任何元素都可以使用的屬性，所以我們會偏向將它加在每個區塊的第一個超連結，讓每個區塊都可以成為焦點，讓我們可以在各個區塊間快速切換，而在超連結名稱上，我們搭配 `:::`作為超連結內容，以及 `title` 屬性說明如何操作。

> 注意！若 `accesskey` 的值是英文字母，有「大小寫」之分。

```html
<nav><a id="nav" accesskey="U" title="常用快速鍵：ALT+U">:::</a> ... </nav>
<main><a id="main" accesskey="C">:::</a> ... </main>
<aside><a id="aside" accesskey="R">:::</a> ... </aside>
<footer><a id="footer" accesskey="F">:::</a> ... </footer>
```

之後點擊鍵盤的快速鍵，就能切換區域的焦點，而鍵盤快速鍵因作業系統不同而有差異。

- 看 MDN 的 [accesskey 介紹](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)：

![MDN 上各瀏覽器與作業系統的 accesskey 快速鍵對照表](/images/ironman-a11y/day24-2.webp)

### 實踐 skip-nav 與 accesskey

將以上概念都結合之後，趕快來我的 [codepen](https://codepen.io/askie/full/PooPBBG) 操作看看，以及看看原始碼，如何用最簡單的概念實踐「導盲磚」。

![在 Codepen 上以鍵盤操作跳過連結與快速鍵的示範](/images/ironman-a11y/day24-3.webp)

## `accesskey` 的注意事項

- 同一個頁面，最多只能有四個定位點，否則使用者會很混淆。
- `accesskey` 屬性因為可以套用到任何元素中，我們可以客製自己想要的快速鍵，可是因為沒有標準化，大家可以隨意客製，再加上各作業系統對於快速鍵的按法不一，使用者不會熟悉。
- 更多的可能是，使用者幾乎不會知道開發者有設置快速鍵，因為在畫面上沒有任何顯示，我們除了可以在網站導覽頁面中設置說明、使用 `title` 屬性以外，還可以參考 Stuart Robertson 寫的[此篇文章](https://alistapart.com/article/accesskeys/)及 Andrew Beacock 的 [Firefox hack to display "accesskey" keyboard shortcuts](https://blog.andrewbeacock.com/2007/06/firefox-hack-to-display-accesskey.html) 來看看我們如何為快速鍵優雅的加上說明，如果是希望不顯示說明，而只讓螢幕閱讀器透過 Audio UI 念出來的話，使用 `title` 或是 `aria-describedby="某元素id"`。

其實 `accesskey` 在國際網頁開發中，很少看見使用了，而也有很多不建議的說法，總歸原因為以下三點：

- 不同的快捷方式值
- 瀏覽器和屏幕閱讀器之間的衝突
- 可發現性

針對這三點的說明都在以上內容提及了，雖然立意不錯，但這三點已經讓本來想要實踐無障礙的作法變得更難訪問，台灣目前還是將 `accesskey`列為無障礙做法之一，除非建立標準化，否則真的值得再思考。

---

## Reference

- ["Skip Navigation" Links](https://webaim.org/techniques/skipnav/) - WebAIM
- [CSS in Action: Invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/) - WebAIM
- [什麼是定位點(原名導盲磚)？](https://accessibility.moda.gov.tw/Questions/Detail/82?Category=33) - 國家通訊傳播委員會 無障礙網路空間服務網

## 更正紀錄

- 2026-10-27：依 MDN 更正 `visibility: hidden` 的說明（不會從版面移除，而是從無障礙樹移除），補充 `accesskey` 組合鍵依瀏覽器與作業系統而異；更新失效的規範連結，無障礙網路空間服務網改連數位發展部的新網址。
