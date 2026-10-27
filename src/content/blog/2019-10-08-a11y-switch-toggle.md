---
title: 實作無障礙網頁功能：此 Switch 非彼 Switch，可訪問的雙狀態開關作法。
pubDate: '2019-10-08'
updatedDate: '2026-10-27'
description: >-
  switch 這個角色是「開關」的意思。拿以前做過、沒有考慮到訪問性的粉紅色開關，改成無障礙的版本：定義 switch 角色、設定
  aria-checked 屬性，並加上成為焦點時該有的樣式。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - switch
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 23（[原文連結](https://ithelp.ithome.com.tw/articles/10226158)）。
>
> 2026-10-27 依 WAI-ARIA 1.2 與 ARIA Authoring Practices Guide（APG）校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

![開關按鈕的照片](/images/ironman-a11y/day23-1.webp)

（圖片來源：[Unsplash](https://unsplash.com/photos/ynfmVbvunQU)）

## 開關 Switch（打開[文件](https://www.w3.org/TR/wai-aria-1.2/#switch)）

> 本篇文章介紹的 `switch` 是 WAI-ARIA 的角色之一，~~不是前幾天的 WAI-ARIA Practice 1.1 中的設計模式。~~ <ins>現在 APG 也有 [Switch 設計模式](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)了。</ins>  
> A type of checkbox that represents on/off values, as opposed to checked/unchecked values. See related checkbox.

不是任天堂的 `switch` 啊...

![任天堂 Switch 遊戲主機](/images/ironman-a11y/day23-2.webp)

（圖片來源：[NINTENDO](https://www.nintendo.com/switch/buy-now/)）

`switch` 這個角色是「開關」的意思。我還記得我對真正對 switch 有印象的是 iPhone 的介面中，有個開關，我還因此也跑去找像這樣的介面該怎麼刻？這是那時候的 Codepen：[checkbox for the toggling bar](https://codepen.io/askie/pen/LbgmEr)，就...做了一個粉紅色的這樣。那時候完全沒有考慮到訪問性的問題，因為對網頁無障礙方面沒任何認知。所以今天想拿這個以前做過的東西，改成無障礙的版本！

![以前在 Codepen 做的粉紅色開關](/images/ironman-a11y/day23-3.webp)

---

## 鍵盤的可訪問性

- 要確保 `switch` 可以成為焦點（focusable）。

---

## Roles、States、Properties

- 開關的容器要指定角色屬性 `role` 為 `switch`。
  - `switch` 這個角色繼承自 `checkbox` 角色（Superclass）。
- 設定 `aria-checked` 的值，為 `true` 或 `false`。
  - 這代表了這個「開關」功能的開與關。針對 `checkbox` 可以提供的第三個值 `mixed` 在此無效。

> 重要註記：  
> `switch` 角色提供了與 `checkbox` 和 `toggle button` 幾乎相同的功能，但我們指定 `switch` 作為角色的值，而不是使用 `checkbox` ，是因為輔助科技能以與其螢幕外觀一致的方式顯示我們的 widget。

---

拿以前做過的開關組件來改善吧！請打開 Codepen 看看我以前亂寫的東西：[checkbox for the toggling bar](https://codepen.io/askie/pen/LbgmEr)。

## 原本的原始碼

### HTML

```html
<div class="carousel_box">
  <input type="checkbox" class="carousel_online" id="toggle-1" name="online" checked>
  <label for="toggle-1">
    <span class="online"></span>
  </label>
</div>
```

- 沒有定義角色 `switch`，也沒有必要屬性 `aria-checked`設定開關值。
- 原本就想做粉紅色的開關...，不過沒意識到對比度非常低，且粉紅色對開與關的狀態沒什麼指示性，所以決定改個做法。
- 這個開關小組件沒有成為焦點時需要存在的 focus ring，但可以使用鍵盤操作。
- 標籤 `<label>` 沒有標示這個元件的名稱，反而把名稱放到偽元素。
- 以前的 CSS class 命名看不懂啦？！而且以前不知道 SCSS （>＿＿<）

## 更改後的原始碼，快來 [Codepen](https://codepen.io/askie/pen/RwwPVov?editors=1100) 操作看看

![改善後的綠色開關以鍵盤操作的示範](/images/ironman-a11y/day23-4.webp)

### HTML

```html
<div class="switch" role="switch" aria-checked="false">
  <input type="checkbox" class="switch__checkbox" id="toggle-1" name="online">
  <label for="toggle-1" class="switch__label">
    <span class="switch__status-message">Online</span>
  </label>
</div>
```

> [!更正]
> 這樣寫反而有問題：`role="switch"` 放在外層的 `<div>` 上，但這個 `<div>` 不能成為焦點，`aria-checked="false"` 也不會跟著切換；真正能被 focus、被操作的是裡面的原生 checkbox，它對輔助科技來說仍是 `checkbox`。結果螢幕閱讀器可能念出兩個控制項，或是一個狀態永遠是「關」的開關，也違反前面說的「要確保 `switch` 可以成為焦點」。依 APG，直接把 `role="switch"` 加在 `<input type="checkbox">` 上，開關狀態由原生的 `checked` 提供，不需要再寫 `aria-checked`：
>
> ```html
> <div class="switch">
>   <input type="checkbox" role="switch" class="switch__checkbox" id="toggle-1" name="online">
>   <label for="toggle-1" class="switch__label">
>     <span class="switch__status-message">Online</span>
>   </label>
> </div>
> ```
>
> 如果不用原生 checkbox，就改用 `<button type="button" role="switch" aria-checked="false">`，再用 JavaScript 在點擊時切換 `aria-checked`。
>
> 來源：[WAI-ARIA APG — Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)、[WAI-ARIA APG — Switch Example Using HTML Checkbox Input](https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-checkbox/)

- 開關容器定義了 `switch` 角色，設定了 `aria-checked` 屬性。
- 開關改成綠色，這個綠色我去偷吸 Element UI 的 Switch 顏色～
- 為這個開關組件，加上了一個成為焦點時該有的樣式。
- 將 `<label>` 中放置的狀態提出來，如果可以做更多的話，應該是使用 JavaScript 做狀態的初始化。
- 改善 CSS 命名、權重、改用 SCSS 整理一遍。

現在可以使用鍵盤操作，狀態也都看得很清楚，需要實現無障礙的 Switch 的人請自行再模組化吧！

開心～

---

## Reference

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) - W3C
- [WAI-ARIA Authoring Practices Guide — Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) - W3C
- [Switch](https://elemefe.github.io/WAI-ARIA-Practices/#/switch) - Element UI 前端團隊
- [Slide Toggle](https://material.angular.io/components/slide-toggle/overview) - Angular Material

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、APG 更正改善後的開關 HTML（`role="switch"` 應放在原生 checkbox 上），補充 APG 已有 Switch 設計模式；更新失效的規範連結。
