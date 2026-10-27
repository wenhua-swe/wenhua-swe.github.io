---
title: 實踐無障礙網站一定要先知道的 WAI-ARIA 的 5 個重要觀念
pubDate: '2019-09-21'
updatedDate: '2026-10-27'
description: >-
  當我們需要自訂組件去達成某些功能時，輔助科技無法透過 Accessibility Tree 去理解網頁功能，本篇文章要帶大家來了解「如何傳達 HTML 無法表達的語義」：學習 WAI-ARIA。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - Accessibility Tree
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 6（[原文連結](https://ithelp.ithome.com.tw/articles/10218749)）。
>
> 2026-10-27 依 ARIA Authoring Practices Guide（APG）校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

## 打造無障礙網站的基礎

無障礙的每個頁面內容需要在「表單」、「語義」、「結構」、「互動行為」下功夫，使用輔助科技的人們就能接受到真正的資訊。

以下基礎知識在前幾篇文章已經帶大家瞭解：

- DOM：掌握元素順序
- Focus：取得焦點
- Keyboard：鍵盤操作方式
- Semantics：使用具有語義的標籤、替代文字內容

HTML 提供給使用者操作的元素本身是隱含語義的，如 `<input>` 、 `<button>` ，不過當我們需要自訂組件（Widget）去達成某些功能時，就會複合使用 `<div>`、 `<span>` 這樣的組合來實現，這時輔助科技（如螢幕閱讀器）無法透過 Accessibility Tree 去理解網頁功能，本篇文章內容要帶大家來了解「如何傳達HTML 無法表達的語義」：學習 **WAI-ARIA**。

---

## 1. WAI-ARIA 是什麼？

是由一個無障礙組織與一個重要標準規範組成，分別以它們的縮寫名稱的串接，可以簡稱 ARIA：

- WAI：
  - Web Accessibility Initiative
  - Web 可訪問性計畫組織
- ARIA：
  - Accessible Rich Internet Applications Suite
  - 可訪問的豐富網路應用程式規範

---

## 2. 為什麼要使用學習 WAI-ARIA？

這裡使用 Udacity 免費課程中的簡單範例來講解：原生與自訂的 checkbox 差異。

下面範例圖片都是以左邊的 HTML 結構，瀏覽器渲染成右上角的 UI，並產生右下角的語義。

右下角的語義內容，在完整的內容將包含： `role` 、 `name` 、 `state`、 `value` 。

### 使用原生的 checkbox

![原生 checkbox 的 HTML 結構、渲染出的 UI 與 Accessibility Tree 語義](/images/ironman-a11y/day06-1.webp)

（圖片來源：[Udacity 課程](https://github.com/udacity/ud891)）

`input[type="checkbox"]`：

- 可以使用鍵盤取得焦點、操縱
- 提供給 Accessibility Tree 語義
  - 角色 role：checkbox
  - 名稱 name： Receive promotional offers
  - 狀態 state：checked
- **VoiceOver 將念出 Accessibility Tree 取得的名稱 name、 角色 role 與狀態 state**

### 自訂的 checkbox

![自訂 checkbox 的 HTML 結構、渲染出的 UI 與 Accessibility Tree 語義](/images/ironman-a11y/day06-2.webp)

- 可以使用鍵盤取得焦點、操縱
- 提供給 Accessibility Tree 語義
  - 角色 role：text
  - 值 value： Receive promotional offers
- **VoiceOver 念出 Accessibility Tree 取得的所有內容**

---

## 3. Accessibility Tree 在哪兒？

> 擷取的 DOM + ARIA = Accessibility Tree

輔助工具是去讀取我們的 Accessibility Tree 的內容，再結合 Audio UI 轉成聲音介面念出資訊給使用者，詳細介紹請參考[之前寫的文章](/blog/2020-08-30-web-accessibility-html-semantic-elements/)，而這棵樹其實就在開發者工具當中，以 Chrome 為例，打開開發者工具，再切換到「Elements > Accessibility」，可以看到左手邊的 DOM ，點擊 DOM 上任何元素去看看這棵樹及 ARIA 包含的屬性。

![Chrome 開發者工具 Elements > Accessibility 面板中的 Accessibility Tree](/images/ironman-a11y/day06-3.webp)

---

## 4. 不要誤解 WAI-ARIA 的行為

WAI-ARIA 其實是「**只修改或補充 Accessibility Tree 的標示或資訊」！**

- WAI-ARIA 絕對不會：
  - \[X\] 它不影響元素外觀、它不影響元素的行為
  - \[X\] 它無法新增取得焦點的能力（Focusability）
  - \[X\] 它無法監聽鍵盤事件處理器（Event Handler）

---

## 5. WAI-ARIA 可以做到的事

- 在沒有隱含語義的元素加上語義，如 `<div>`。
- 修改隱含語義元素的「現有語義」，如 `<button>` 實現 switch，需要加上 `role` 設定。
- 表達不存在語義的 UI patterns，如巢狀的 ul ，透過 `role` 表達群組的概念。
- 額外的標籤（label）與描述（descriptions）
- 表達元素與元素之間的關係。
- 因應基於時間或事件的變化而根據重新渲染的畫面提供資訊給使用者知曉。

---

在實踐無障礙之前要注意地方：

> **~~2.1~~ No ARIA is better than Bad ARIA** ~~wai-aria-practices-1.1~~ <ins>[APG — Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)</ins>:  
> Functionally, ARIA roles, states, and properties are analogous to a CSS for assistive technologies. For screen reader users, ARIA controls the rendering of their non-visual experience. Incorrect ARIA misrepresents visual experiences, with potentially devastating effects on their corresponding non-visual experiences.

ARIA 角色、狀態和屬性之於輔助技術（螢幕閱讀器），就好像瀏覽器的 CSS 一樣，對於使用者，ARIA 控制的不是視覺體驗的呈現，所以不正確的 ARIA 設定將誤導整個操作經驗，而我們也需要瞭解使用者介面元素的含義和目的，否則將是個雙面刃，可能造成潛在的破壞性影響。

接下來還會有其他層面的無障礙介紹，就會來實作了，敬請期待～

---

## Reference

- [Using Aria](https://w3c.github.io/using-aria/) - W3C
- [WAI-ARIA Authoring Practices Guide（APG）](https://www.w3.org/WAI/ARIA/apg/) - W3C
- [ARIA 簡介](https://web.dev/articles/semantics-aria) - Google Developers

## 更正紀錄

- 2026-10-27：「No ARIA is better than Bad ARIA」的出處改為現行的 ARIA Authoring Practices Guide（APG）；更新 WAI-ARIA Authoring Practices 1.1、Google Web Fundamentals（改為 web.dev）與 Udacity 課程的失效連結。
