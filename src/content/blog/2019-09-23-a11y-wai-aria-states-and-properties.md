---
title: 無障礙網站 WAI-ARIA 的 States and Properties，都是 Attribute 啊！
pubDate: '2019-09-23'
updatedDate: '2026-10-27'
description: >-
  ARIA 的 States 與 Properties 都是以 aria-* 作為前綴、可以加在 HTML 標籤上的屬性（Attribute），但 State 和 Property 在概念上完全不同。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - aria-label
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 8（[原文連結](https://ithelp.ithome.com.tw/articles/10219564)）。
>
> 2026-10-27 依 WAI-ARIA 1.2 與 ARIA in HTML 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

![按鈕是否被勾選是一種狀態](/images/ironman-a11y/day08-1.webp)

（圖片來源：[How to Make Custom Accessible Checkboxes and Radio Buttons](https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074)）

## 狀態與屬性 States and Properties

> [4.2 WAI-ARIA States and Properties](https://www.w3.org/TR/wai-aria-1.2/#introstates) in WAI-ARIA 1.2  
> WAI-ARIA provides a collection of accessibility states and properties which are used to support platform accessibility APIs on various operating system platforms. Assistive technologies may access this information through an exposed user agent DOM or through a mapping to the platform accessibility API. When combined with roles, the user agent can supply the assistive technologies with user interface information to convey to the user at any time. Changes in states or properties will result in a notification to assistive technologies, which could alert the user that a change has occurred.

## 以 `aria-*` 作為前綴的屬性

這篇文章要來介紹的是關於 ARIA 的 States 與 Properties。

其實這兩個東西都是以 `aria-*` 作為前綴，並可以加在 HTML 標籤上的屬性（Attribute），基本上會直接以「屬性（Attribute）」一詞作為代稱。人家問你說「欸欸欸，你知道 ARIA 的屬性是指什麼嗎？」其實 ARIA 的屬性就是代表 States 與 Properties 這兩個字的合體！

因為 Property 和 Attribute 在中文常被翻成同一個字——「屬性」，在當初學習時，常常造成混淆。所以在這篇文章中，屬性代表的是 Attribute、Attribute、Attribute！

---

## States 與 Properties 代表不同意義

那你一定會奇怪，上面既然說這兩個字可以用「屬性」一詞作為代稱，又何必要分成兩個字呢？因為：**State 和 Property 在概念上完全不同**。

- **Property** 在整個應用程式生命週期中被更改的可能性通常小於 State。它表達的更多是元素與元素之間的關係，或是補充關於該元素的資訊。
  - 比如說 `aria-label="This is an apple."` ，補充該元件的更多說明。
  - 裡頭填寫的值是通常一個具體的內容或 `id`。
- **State** 代表狀態，是可由使用者操作過程中而變動的。
  - 比如說，我們自己刻的 checkbox 有沒有被使用者勾選啦？我們會將這個勾選框的角色設為 `role="checkbox"` ，再設好狀態的預設值 `aria-checked="false"`。被使用者操作之後，我們透過 JavaScript 將值改成 `true` ，那麼螢幕閱讀器就能念出來讓使用者知道，「哦～我現在有選到這個東西了」。
  - 裡頭填寫的值是通常是布林值或是三類值（Tristate： `true` 、 `false` 、 `mixed` ）。

上述並不是寫死的規則，但是這是一個我們可以拿來簡易理解 **State** 和 **Property** 性質差異的原則。

---

## State 和 Property 的分類

**State** 和 **Property 一定要和 Role 來做搭配！這三個是要賦予給「當原生 HTML 標籤無法表明它的功能與含義時」，拿來修改或補充在 Accessibility Tree 的。**

### 以「 `＊` 米字號 」結尾的屬性無法於 HTML5 中使用。

> [!更正]
> 這個說法是錯的：下面標了 `＊` 的 `aria-describedby`、`aria-owns`、`aria-live`、`aria-expanded`、`aria-label` 等屬性，在 HTML 裡都可以正常使用。依 ARIA in HTML，HTML 元素可以使用全域的 `aria-*` 屬性，以及該元素允許的角色所適用的 `aria-*` 屬性，並沒有「HTML5 不能用」的限制。真正要注意的是 WAI-ARIA 1.2 的變動：`aria-dropeffect`、`aria-grabbed` 從 ARIA 1.1 起已棄用；`aria-disabled`、`aria-errormessage`、`aria-haspopup`、`aria-invalid` 在 ARIA 1.2 不再建議當全域屬性使用，只用在支援它們的角色上。
>
> 來源：[WAI-ARIA 1.2 — Global States and Properties](https://www.w3.org/TR/wai-aria-1.2/#global_states)、[ARIA in HTML](https://www.w3.org/TR/html-aria/)

- 不論什麼角色都可以搭配的屬性列表：
  - [aria-atomic](https://www.w3.org/TR/wai-aria-1.2/#aria-atomic)
  - [aria-busy (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-busy)
  - [aria-controls](https://www.w3.org/TR/wai-aria-1.2/#aria-controls)
  - [aria-current (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-current)
  - [aria-describedby](https://www.w3.org/TR/wai-aria-1.2/#aria-describedby) ＊
  - [aria-details](https://www.w3.org/TR/wai-aria-1.2/#aria-details)
  - [aria-disabled (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)
  - [aria-dropeffect](https://www.w3.org/TR/wai-aria-1.2/#aria-dropeffect)
  - [aria-errormessage](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage)
  - [aria-flowto](https://www.w3.org/TR/wai-aria-1.2/#aria-flowto) ＊
  - [aria-grabbed (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-grabbed) ＊
  - [aria-haspopup](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup)
  - [aria-hidden (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden)
  - [aria-invalid (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-invalid)
  - [aria-keyshortcuts](https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts)
  - [aria-label](https://www.w3.org/TR/wai-aria-1.2/#aria-label)
  - [aria-labelledby](https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby)
  - [aria-live](https://www.w3.org/TR/wai-aria-1.2/#aria-live)
  - [aria-owns](https://www.w3.org/TR/wai-aria-1.2/#aria-owns) ＊
  - [aria-relevant](https://www.w3.org/TR/wai-aria-1.2/#aria-relevant) ＊
  - [aria-roledescription](https://www.w3.org/TR/wai-aria-1.2/#aria-roledescription)

### ARIA 的屬性四個類型

> 查看每個屬性在官方文件的[詳細定義](https://www.w3.org/TR/wai-aria-1.2/#state_prop_def)；MDN 也有一個清楚的[屬性列表](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes)，~~可是針對每個屬性的解說還缺很多，倒是~~ <ins>現在每個屬性都有獨立的說明頁，</ins>Role 的[每項說明](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)~~很清楚~~ <ins>也很清楚</ins>。

1. [Widget Attributes 組件屬性](https://www.w3.org/TR/wai-aria-1.2/#attrs_widgets)：常見使用者界面元素的屬性， 這些屬性用於支援組件角色。
   - [aria-autocomplete](https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete)
   - [aria-checked](https://www.w3.org/TR/wai-aria-1.2/#aria-checked)
   - [aria-disabled](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)
   - [aria-errormessage](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage)
   - [aria-expanded](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded) ＊
   - [aria-haspopup](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup)
   - [aria-hidden](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden)
   - [aria-invalid](https://www.w3.org/TR/wai-aria-1.2/#aria-invalid)
   - [aria-label](https://www.w3.org/TR/wai-aria-1.2/#aria-label) ＊
   - [aria-level](https://www.w3.org/TR/wai-aria-1.2/#aria-level) ＊
   - [aria-modal](https://www.w3.org/TR/wai-aria-1.2/#aria-modal)
   - [aria-multiline](https://www.w3.org/TR/wai-aria-1.2/#aria-multiline)
   - [aria-multiselectable](https://www.w3.org/TR/wai-aria-1.2/#aria-multiselectable)
   - [aria-orientation](https://www.w3.org/TR/wai-aria-1.2/#aria-orientation) ＊
   - [aria-placeholder](https://www.w3.org/TR/wai-aria-1.2/#aria-placeholder)
   - [aria-pressed](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed)
   - [aria-readonly](https://www.w3.org/TR/wai-aria-1.2/#aria-readonly)
   - [aria-required](https://www.w3.org/TR/wai-aria-1.2/#aria-required)
   - [aria-selected](https://www.w3.org/TR/wai-aria-1.2/#aria-selected)
   - [aria-sort](https://www.w3.org/TR/wai-aria-1.2/#aria-sort) ＊
   - [aria-valuemax](https://www.w3.org/TR/wai-aria-1.2/#aria-valuemax)
   - [aria-valuemin](https://www.w3.org/TR/wai-aria-1.2/#aria-valuemin)
   - [aria-valuenow](https://www.w3.org/TR/wai-aria-1.2/#aria-valuenow)
   - [aria-valuetext](https://www.w3.org/TR/wai-aria-1.2/#aria-valuetext)
2. [Live Region Attributes 活動區域屬性](https://www.w3.org/TR/wai-aria-1.2/#attrs_liveregions)：以下屬性可以應用於任何元素。 這些屬性的目的是表明內容更改可能在沒有焦點的元素的情況下發生，並向輔助技術提供關於如何處理這些內容更新的訊息。
   - [aria-atomic](https://www.w3.org/TR/wai-aria-1.2/#aria-atomic)
   - [aria-busy](https://www.w3.org/TR/wai-aria-1.2/#aria-busy) ＊
   - [aria-live](https://www.w3.org/TR/wai-aria-1.2/#aria-live) ＊
   - [aria-relevant](https://www.w3.org/TR/wai-aria-1.2/#aria-relevant)
3. [Drag-and-Drop Attributes 拖放屬性](https://www.w3.org/TR/wai-aria-1.2/#attrs_dragdrop)：以直觀方式告訴輔助工具「可拖移的元素」及「其拖放的目標」。
   - [aria-dropeffect](https://www.w3.org/TR/wai-aria-1.2/#aria-dropeffect) ＊
   - [aria-grabbed](https://www.w3.org/TR/wai-aria-1.2/#aria-grabbed)
4. [Relationship Attributes 關係屬性](https://www.w3.org/TR/wai-aria-1.2/#attrs_relationships)：網頁結構中元素間關聯不明確，這些屬性可以建立元素之間的關係或關聯。
   - [aria-activedescendant](https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant) ＊
   - [aria-colcount](https://www.w3.org/TR/wai-aria-1.2/#aria-colcount)
   - [aria-colindex](https://www.w3.org/TR/wai-aria-1.2/#aria-colindex)
   - [aria-colspan](https://www.w3.org/TR/wai-aria-1.2/#aria-colspan)
   - [aria-controls](https://www.w3.org/TR/wai-aria-1.2/#aria-controls)
   - [aria-describedby](https://www.w3.org/TR/wai-aria-1.2/#aria-describedby) ＊
   - [aria-details](https://www.w3.org/TR/wai-aria-1.2/#aria-details)
   - [aria-errormessage](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage)
   - [aria-flowto](https://www.w3.org/TR/wai-aria-1.2/#aria-flowto) ＊
   - [aria-labelledby](https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby) ＊
   - [aria-owns](https://www.w3.org/TR/wai-aria-1.2/#aria-owns) ＊
   - [aria-posinset](https://www.w3.org/TR/wai-aria-1.2/#aria-posinset) ＊
   - [aria-rowcount](https://www.w3.org/TR/wai-aria-1.2/#aria-rowcount)
   - [aria-rowindex](https://www.w3.org/TR/wai-aria-1.2/#aria-rowindex)
   - [aria-rowspan](https://www.w3.org/TR/wai-aria-1.2/#aria-rowspan)
   - [aria-setsize](https://www.w3.org/TR/wai-aria-1.2/#aria-setsize) ＊

> [!更正]
> 第 3 類的拖放屬性 `aria-grabbed` 和 `aria-dropeffect` 從 WAI-ARIA 1.1 起已棄用，規範說它們之後會被新功能取代，建議作者把它們當成棄用屬性，所以新的實作不要再用。
>
> 來源：[WAI-ARIA 1.2 — aria-grabbed](https://www.w3.org/TR/wai-aria-1.2/#aria-grabbed)、[WAI-ARIA 1.2 — aria-dropeffect](https://www.w3.org/TR/wai-aria-1.2/#aria-dropeffect)

---

## 番外篇：做個 ARIA 屬性的比較

> 屬性太多了，先就這兩個 ARIA 屬性進行比較，剩下的就留給實作時慢慢介紹啦～～

### aria-label

#### 用途

- 指定用作可訪問標籤的字，與 `aria-labelledby` 相同意思。

#### 使用

- 定義一字串作為元素的描述，如 `<ul role="navigation" aria-label="This is a pagination list">...</ul>`

> [!更正]
> 這個例子（和下面 `aria-labelledby` 的例子）把 `role="navigation"` 加在 `<ul>` 上，會蓋掉清單原本的語義，而且 ARIA in HTML 允許 `<ul>` 使用的角色裡並沒有 `navigation`。比較好的寫法是用 `<nav>` 包住清單；螢幕閱讀器本來就會念出「導覽」，所以標籤不用再寫 navigation 或 list：
>
> ```html
> <nav aria-label="分頁">
>   <ul>...</ul>
> </nav>
>
> <p id="paginglabel">分頁</p>
> <nav aria-labelledby="paginglabel">
>   <ul>...</ul>
> </nav>
> ```
>
> 來源：[ARIA in HTML — ul](https://www.w3.org/TR/html-aria/#el-ul)、[MDN — navigation role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/navigation_role)

### aria-labelledby

#### 用途

- 標示另一個元素的內容是此元素的敘述，如`<ul role="navigation" aria-labelledby="paginglabel">...</ul>`。

#### 使用

- 對於區塊的描述存在於頁面上就用 `aria-labelledby`。
- 值通常為可視元素的 `id`，如`<p id="paginglabel"></p>`。

#### 備註

- 用途雖與 `aria-label` 相同，但當兩個屬性都存在時，根據 `accessible name` 演算法，`aria-labelledby` 的權重比較高。
- `aria-label` 比 `aria-labelledby` 更加簡潔。

---

## Reference

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) -W3C
- [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) - MDN
- [HTML5 and the myth of WAI-ARIA redundance](https://developer.paciellogroup.com/blog/2010/04/html5-and-the-myth-of-wai-aria-redundance/)

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、ARIA in HTML 更正「＊ 屬性無法於 HTML5 使用」的說法、標註已棄用的拖放屬性、修正 `aria-label`／`aria-labelledby` 範例的 `role="navigation"` 用法、更新 MDN 說明；WAI-ARIA 1.1 連結更新為 1.2。
