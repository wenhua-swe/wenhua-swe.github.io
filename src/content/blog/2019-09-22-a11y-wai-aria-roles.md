---
title: 無障礙網站之 WAI-ARIA 的角色介紹（Role）
pubDate: '2019-09-22'
updatedDate: '2026-10-27'
description: >-
  認識 ARIA 的基本要素：瞭解何時才需要使用 ARIA、知道角色是一種加在 HTML 上的屬性，以及角色的分類。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - role
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 7（[原文連結](https://ithelp.ithome.com.tw/articles/10219158)）。
>
> 2026-10-27 依 WAI-ARIA 1.2、ARIA Authoring Practices Guide（APG）與 HTML Living Standard 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

## Hi there!

讀過前篇文章，對 WAI-ARIA 已經有基本認知，就可以來認識 ARIA 的基本要素：角色、狀態、屬性，它提供特殊的可訪問性「屬性 Attributes」，可以添加到任何標記中。

## TL;DR

本篇文章學習目的：

- 瞭解何時才需要使用 ARIA
- 知道角色是一種加在 HTML 上的屬性
- 知道角色的分類

### 使用原生語法時，不需用 ARIA 覆蓋原生語義

```html
<input type="checkbox"> <!-- 不用加上 role="checkbox" -->
```

### 需要使用 ARIA 的狀況

以 [MDN 的進度條範例](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role)說明：

```html
<div id="percent-loaded" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" /></div>
```

> [!更正]
> 這個範例有幾個地方要修正：
>
> - `<div>` 不是空元素，`<div ... />` 的 `/` 會被 HTML 解析器忽略，寫了反而容易誤會，直接寫 `<div ...></div>` 就好。
> - `progressbar` 角色規定一定要有無障礙名稱，範例少了 `aria-labelledby` 或 `aria-label`，螢幕閱讀器不知道這是什麼的進度。
> - 下面說的「HTML 4 沒有語義標記」已經過時，現在 HTML 有原生的 `<progress>`，MDN 也建議優先使用它，不必自己用 `<div>` 加 ARIA：
>
> ```html
> <label for="percent-loaded">載入進度</label>
> <progress id="percent-loaded" value="75" max="100">75%</progress>
> ```
>
> 真的需要用 `<div>` 自訂時，記得補上名稱：
>
> ```html
> <span id="loading-label">載入進度</span>
> <div id="percent-loaded" role="progressbar" aria-labelledby="loading-label" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
> ```
>
> 來源：[MDN — progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role)、[MDN — `<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress)、[WAI-ARIA 1.2 — progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)、[HTML Standard — Parse errors](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-non-void-html-element-start-tag-with-trailing-solidus)

這個進度條是使用 `<div>` 建立的，它不是非常具有描述性。

- HTML 4 中沒有更多的語義標記可供開發人員使用，因此我們需要包含 ARIA 角色和屬性。 通過向元素添加屬性來指定這些屬性。在這個範例中， `role` 的值「 progressbar」通知瀏覽器該元素實際上是一個基於 JavaScript 的進度條 Widget。
- `aria-valuemin` 和 `aria-valuemax` 屬性指定進度條的最小值和最大值， `aria-valuenow` 描述其當前狀態。

```js
// 找到 <div> 客製的進度條
var progressBar = document.getElementById("percent-loaded");

// 透過 JS 加上 ARIA 屬性，使輔助工具可以知道它是什麼，並且設好最小值與最大值
progressBar.setAttribute("role", "progressbar");
progressBar.setAttribute("aria-valuemin", 0);
progressBar.setAttribute("aria-valuemax", 100);

// 建立一個準備作為 callback 的 function，當進度一更動，將設定值改成目前進度。
function updateProgress(percentComplete) {
  progressBar.setAttribute("aria-valuenow", percentComplete);
}
```

---

## 角色 Role

> ~~2.1~~ <ins>4.1</ins> [WAI-ARIA Roles](https://www.w3.org/TR/wai-aria-1.2/#introroles) in WAI-ARIA ~~1.1~~ <ins>1.2</ins>  
> A WAI-ARIA role is set on an element using a role attribute, similar to the role attribute defined in Role Attribute.

WAI-ARIA 中定義一系列的角色模型，讓我們可以賦予給元素，充當沒有提供定義結構的 UI Widget，每個角色有其定位與可以使用的 `aria-*` 屬性，以讓使用者能夠預期該功能的操作行為。

角色一共分為六類

1. [Abstract Roles](https://www.w3.org/TR/wai-aria-1.2/#abstract_roles) 抽象：用於定義通用角色概念，開發者不可使用。
   - [command](https://www.w3.org/TR/wai-aria-1.2/#command)、[composite](https://www.w3.org/TR/wai-aria-1.2/#composite)、[input](https://www.w3.org/TR/wai-aria-1.2/#input)、[landmark](https://www.w3.org/TR/wai-aria-1.2/#landmark)、[range](https://www.w3.org/TR/wai-aria-1.2/#range) 、[roletype](https://www.w3.org/TR/wai-aria-1.2/#roletype)、[section](https://www.w3.org/TR/wai-aria-1.2/#section)、[sectionhead](https://www.w3.org/TR/wai-aria-1.2/#sectionhead) 、[select](https://www.w3.org/TR/wai-aria-1.2/#select)、[structure](https://www.w3.org/TR/wai-aria-1.2/#structure)、[widget](https://www.w3.org/TR/wai-aria-1.2/#widget)、[window](https://www.w3.org/TR/wai-aria-1.2/#window)。
2. [Document Structure Roles](https://www.w3.org/TR/wai-aria-1.2/#document_structure_roles) 文件結構：描述文件頁面內容的結構，通常不是可互動式的。
   - [application](https://www.w3.org/TR/wai-aria-1.2/#application)、[article](https://www.w3.org/TR/wai-aria-1.2/#article)、[cell](https://www.w3.org/TR/wai-aria-1.2/#cell)、[columnheader](https://www.w3.org/TR/wai-aria-1.2/#columnheader)、[definition](https://www.w3.org/TR/wai-aria-1.2/#definition)、[directory](https://www.w3.org/TR/wai-aria-1.2/#directory)、[document](https://www.w3.org/TR/wai-aria-1.2/#document)、[feed](https://www.w3.org/TR/wai-aria-1.2/#feed) 、[figure](https://www.w3.org/TR/wai-aria-1.2/#figure)、[group](https://www.w3.org/TR/wai-aria-1.2/#group)、[heading](https://www.w3.org/TR/wai-aria-1.2/#heading)、[img](https://www.w3.org/TR/wai-aria-1.2/#img)、[list](https://www.w3.org/TR/wai-aria-1.2/#list)、[listitem](https://www.w3.org/TR/wai-aria-1.2/#listitem)、[math](https://www.w3.org/TR/wai-aria-1.2/#math)、[none](https://www.w3.org/TR/wai-aria-1.2/#none)、[note](https://www.w3.org/TR/wai-aria-1.2/#note)、[presentation](https://www.w3.org/TR/wai-aria-1.2/#presentation)、[row](https://www.w3.org/TR/wai-aria-1.2/#row)、[rowgroup](https://www.w3.org/TR/wai-aria-1.2/#rowgroup)、[rowheader](https://www.w3.org/TR/wai-aria-1.2/#rowheader)、[separator](https://www.w3.org/TR/wai-aria-1.2/#separator)(當無法取得焦點時)、[table](https://www.w3.org/TR/wai-aria-1.2/#table)、[term](https://www.w3.org/TR/wai-aria-1.2/#term)、[toolbar](https://www.w3.org/TR/wai-aria-1.2/#toolbar) 、[tooltip](https://www.w3.org/TR/wai-aria-1.2/#tooltip)

   > [!更正]
   > 這份清單是 WAI-ARIA 1.1 的版本。現行的 WAI-ARIA 1.2 中，`directory` 已經棄用（deprecated），請改用 `list` 或 HTML 的清單元素；文件結構角色也新增了 `blockquote`、`caption`、`deletion`、`emphasis`、`generic`、`insertion`、`meter`、`paragraph`、`strong`、`subscript`、`superscript`、`time`。其他五類角色的清單在 1.2 沒有變動。
   >
   > 來源：[WAI-ARIA 1.2 — Categorization of Roles](https://www.w3.org/TR/wai-aria-1.2/#roles_categorization)、[WAI-ARIA 1.2 — directory role](https://www.w3.org/TR/wai-aria-1.2/#directory)
3. [Widget Roles](https://www.w3.org/TR/wai-aria-1.2/#widget_roles) 組件功能：
   - 作為小組件或較大組件中的小項目之一：
     - [button](https://www.w3.org/TR/wai-aria-1.2/#button)、[checkbox](https://www.w3.org/TR/wai-aria-1.2/#checkbox)、[gridcell](https://www.w3.org/TR/wai-aria-1.2/#gridcell)、[link](https://www.w3.org/TR/wai-aria-1.2/#link)、[menuitem](https://www.w3.org/TR/wai-aria-1.2/#menuitem)、[menuitemcheckbox](https://www.w3.org/TR/wai-aria-1.2/#menuitemcheckbox)、[menuitemradio](https://www.w3.org/TR/wai-aria-1.2/#menuitemradio)、[option](https://www.w3.org/TR/wai-aria-1.2/#option)、[progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)、[radio](https://www.w3.org/TR/wai-aria-1.2/#radio)、[scrollbar](https://www.w3.org/TR/wai-aria-1.2/#scrollbar)、[searchbox](https://www.w3.org/TR/wai-aria-1.2/#searchbox)、[separator](https://www.w3.org/TR/wai-aria-1.2/#separator)（當可取得焦點時）、[slider](https://www.w3.org/TR/wai-aria-1.2/#slider)、[spinbutton](https://www.w3.org/TR/wai-aria-1.2/#spinbutton)、[switch](https://www.w3.org/TR/wai-aria-1.2/#switch)、[tab](https://www.w3.org/TR/wai-aria-1.2/#tab)、[tabpanel](https://www.w3.org/TR/wai-aria-1.2/#tabpanel)、[textbox](https://www.w3.org/TR/wai-aria-1.2/#textbox)、[treeitem](https://www.w3.org/TR/wai-aria-1.2/#treeitem)。
   - 通常做為組件的容器的角色：
     - [combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)、[grid](https://www.w3.org/TR/wai-aria-1.2/#grid)、[listbox](https://www.w3.org/TR/wai-aria-1.2/#listbox)、[menu](https://www.w3.org/TR/wai-aria-1.2/#menu)、[menubar](https://www.w3.org/TR/wai-aria-1.2/#menubar)、[radiogroup](https://www.w3.org/TR/wai-aria-1.2/#radiogroup)、[tablist](https://www.w3.org/TR/wai-aria-1.2/#tablist)、[tree](https://www.w3.org/TR/wai-aria-1.2/#tree)、[treegrid](https://www.w3.org/TR/wai-aria-1.2/#treegrid)。
4. [Landmark Roles](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles) 標誌：最容易實現的 Role 角色之一，也是為螢幕閱讀器使用者提供顯著直接好處的屬性之一
   - [banner](https://www.w3.org/TR/wai-aria-1.2/#banner)、[complementary](https://www.w3.org/TR/wai-aria-1.2/#complementary)、[contentinfo](https://www.w3.org/TR/wai-aria-1.2/#contentinfo)、[form](https://www.w3.org/TR/wai-aria-1.2/#form)、[main](https://www.w3.org/TR/wai-aria-1.2/#main)、[navigation](https://www.w3.org/TR/wai-aria-1.2/#navigation)、[region](https://www.w3.org/TR/wai-aria-1.2/#region)、[search](https://www.w3.org/TR/wai-aria-1.2/#search)。

   ```html
   <!-- 一個頁面中若有重複的導航列 -->
   <div role="navigation" aria-label="Main menu"> ... </div>
   <div role="navigation" aria-label="User menu"> ... </div>
   ```

   > [!更正]
   > 頁面上有多個導覽區時，每個都要有不同的名稱，這點範例做得對；不過現在應該優先用 HTML 原生的 `<nav>`，它本身就是 `navigation` 地標，不必在 `<div>` 加 `role`。`<main>`、`<aside>`、`<search>`，以及位在 `<body>` 層級的 `<header>`、`<footer>` 也都會產生對應的地標：
   >
   > ```html
   > <nav aria-label="Main menu"> ... </nav>
   > <nav aria-label="User menu"> ... </nav>
   > ```
   >
   > 來源：[WAI-ARIA APG — Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)、[HTML-AAM — nav](https://www.w3.org/TR/html-aam-1.0/#el-nav)

5. [Live Region Roles](https://www.w3.org/TR/wai-aria-1.2/#live_region_roles) 實時區域：隨時依據狀況更新的角色。
   - [alert](https://www.w3.org/TR/wai-aria-1.2/#alert)、[log](https://www.w3.org/TR/wai-aria-1.2/#log)、[marquee](https://www.w3.org/TR/wai-aria-1.2/#marquee)、[status](https://www.w3.org/TR/wai-aria-1.2/#status)、[timer](https://www.w3.org/TR/wai-aria-1.2/#timer)。
6. [Window Roles](https://www.w3.org/TR/wai-aria-1.2/#window_roles) 視窗：在應用程式中作為新視窗來展示資訊的角色。
   - [alertdialog](https://www.w3.org/TR/wai-aria-1.2/#alertdialog)、[dialog](https://www.w3.org/TR/wai-aria-1.2/#dialog)。

詳細的角色分類列表與其定義請直接參考 [5.3 Categorization of Roles](https://www.w3.org/TR/wai-aria-1.2/#roles_categorization) 。

角色分成這麼多類型，還真的都有其目的與走向，看了有點眼花！不過我們也不用全背，這篇文章只是根據官方文件先整理起來的快速查閱表，之後實作會以 3~5 為主，這是我比較想知道的地方！

---

## Reference

- [ARIA 標籤和關係](https://web.dev/articles/aria-labels-and-relationships) - Google Developers
- ~~[ARIA Landmark Roles](https://www.washington.edu/accessibility/web/landmarks/) - University of Washington~~ <ins>原連結已失效，可改看 [Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) - W3C APG</ins>
- [Using ARIA](https://w3c.github.io/using-aria/) - ~~Working Draft of W3C~~ <ins>W3C（已停止更新的草稿）</ins>
- ~~[Introduction to WAI ARIA](https://dev.opera.com/articles/introduction-to-wai-aria/) - Opera~~ <ins>原連結已失效</ins>

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、APG 與 HTML Living Standard 更正進度條範例（改用 `<progress>`、補上名稱）、地標範例（改用 `<nav>`），補充 1.2 的角色異動（`directory` 棄用與新增的文件結構角色）；角色連結改指向 WAI-ARIA 1.2，更新 MDN、web.dev、University of Washington、Opera 等失效連結，Using ARIA 標註為已停止更新；刪除原文就已缺圖的「（來源：Google Developers）」說明。
