---
title: 實作無障礙網頁功能：鍵盤也能操作的手風琴 Accordion
pubDate: '2019-09-27'
updatedDate: '2026-10-27'
description: >-
  手風琴是一組垂直堆疊、可操作的標題，使用者透過與標題的互動，可以顯示或隱藏其關聯的內容。本文依 WAI-ARIA 實踐整理鍵盤操作與 Roles、States、Properties，並實作鍵盤也能操作的手風琴。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - Accordion
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 12（[原文連結](https://ithelp.ithome.com.tw/articles/10221659)）。
>
> 2026-10-27 依 WAI-ARIA 1.2 與 ARIA Authoring Practices Guide（APG）校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

![演奏手風琴的少年](/images/ironman-a11y/day12-1.webp)

（圖片來源：[unsplash](https://unsplash.com/photos/IV4db_thdMA)）

## 手風琴 Accordion（打開[文件](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)）

> 3.1 Accordion  
> An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

我們在網頁實務上也算蠻常使用手風琴這個組件的，通常用來減少頁面上多個區塊內容過長時的捲動，它是一組垂直堆疊、可操作的標題，每個標題的關聯內容可以自定為折疊、不折疊，裡面包含一個小標、內容或能呈現意象的縮圖。使用者透過與標題的互動，可以顯示或隱藏其關聯的內容。

### 標題容器｜Accordion Header

提供給使用者用滑鼠點選、用鍵盤操作的標題區塊。

### 內容容器｜Accordion Panel

與各個標題區塊，各自相關的內容。

我的第一個手風琴是在 [W3Schools](https://www.w3schools.com/howto/howto_js_accordion.asp) 學習刻出來的！

以前都不知道 `outline: none;` 其實是不好的做法，我用得很爽啊啊啊。（大驚）

---

## 鍵盤的可訪問性

- Enter 或 Space（必要）
  - 顯示區塊相關內容（Accordion Panel）
- Tab（必要）
  - 能 Focus，從第一個標題到下一個標題（與 DOM 正序）
- Shift Tab（必要）
  - 能 Focus，從最後一個標題到第一個標題（與 DOM 反序）

更多選擇性的按鍵操控，請閱讀文件。

---

## Roles、States、Properties

- 每一個 Accordion Header 中的「標題名稱」需要使用角色是 [button](https://www.w3.org/TR/wai-aria-1.2/#button) 的元素當容器，也就是說原生語義標籤已經是 `button` 的不用管它，但是非語義標籤需要新增 `role="button"`。
- 包裹「標題名稱」的 `button` 每個可摺疊標題按鈕都包裝在一個元素角色為 ~~`headings`~~ <ins>`heading`</ins> 的標籤，加上 `aria-level="層級"` ，層級的值要符合於頁面架構。
  - 如果使用原生的標題標籤 `<h3>`，那麼已經含有 `aria-level` 的意義，就不用再設定 `aria-level="3"`。
  - ~~`headings`~~ <ins>`heading`</ins> 角色的元素裡，只能有一個 `button` 角色的元素。如果還有其他一定要呈現的視覺內容，就放在 ~~`headings`~~ <ins>`heading`</ins> 之外。
- ~~`headings > button`~~ <ins>`heading > button`</ins>
  - 當手風琴的某個區塊內容是顯示的， `button` 加上 `aria-expanded="true"`
  - 反之，隱藏的話，加上`aria-expanded="false"`。
  - 加上 `aria-controls`，值是 Accordion Panel 容器的 `id`。
- 當前顯示的區塊內容，而功能上「不允許使用者點擊 `button` 去隱藏當前顯示的內容」，如果有這樣的需求，就在 `button` 上加上 `aria-disabled="true"`。
- 最後這一點是選擇性的，看你要不要將「關聯內容 panel 的容器」加上 `role="region"`，再加上 `aria-labelledby`，值為 ~~`headings > button`~~ <ins>`heading > button`</ins> 的 `id`。
  - 角色 `region` 對於螢幕閱讀器理解結構是很有幫助的。
  - 不過不要把 `region` 用在你同時展開六個以上區塊內容的時候，這樣很混淆。換句話說，要用的話，你可以做一個六個區塊的手風琴，但一次只顯示一個區塊內容。

> [!更正]
> ARIA 的標題角色是 `heading`（單數），沒有 `headings` 這個角色。
>
> 來源：[WAI-ARIA 1.2 — heading role](https://www.w3.org/TR/wai-aria-1.2/#heading)

---

## 實踐開始囉！

希望能做到以下兩點：

- [x] 鍵盤可操作
- [x] 支援螢幕閱讀器

![手風琴實作成果：展開「關於我」區塊](/images/ironman-a11y/day12-2.webp)

### HTML

- 大原則：能使用原生含有語義的標籤（標題、超連結、按鈕、表單元素），就不要使用無語義的標籤再來幫它加上 `ARIA` 屬性。
  - 如果想使用 HTML5 的標籤 `<summary>` 、 `<details>` ，~~因為[支援度低](https://caniuse.com/#search=summary)， IE 6~11、Edge 較多人使用的版本不支援，所以還是採取以下做法。~~ <ins>現在主流瀏覽器都已支援，可以優先考慮；以下示範的是 APG 的按鈕寫法。</ins>
  - 實作沒注意的話，會將標題內容用 `<div>` 包裹，這裡直接使用 `<button>`，保持鍵盤可操作、螢幕閱讀器可念出包裹的標題名稱與原生語義 `Role`，樣式什麼的就交給 CSS 吧。

> [!更正]
> `<details>`／`<summary>` 現在所有主流瀏覽器都支援，IE 也已在 2022 年停止支援，「支援度低」已經不成立。只需要簡單展開收合時，可以直接用原生元素，不必自己寫 ARIA 和 JavaScript；多個 `<details>` 設定相同的 `name` 屬性，還能做到「一次只展開一個」。需要標題結構（`heading > button`）時，再用下方 APG 的寫法。
>
> 來源：[MDN — `<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)、[Can I use — details](https://caniuse.com/details)

```html
<div class="accordion">
    <button class="accordion__header" aria-controls="panel-1">
        <h3 class="accordion__header__title">
            關於我
        </h3>
    </button>
    <div class="accordion__panel" id="panel-1" role="region">
       <p class="accordion__panel__content">我是 Askie Lin，目前鑽研前端領域中。我喜歡記錄我學習過的事物，也因此有可能出現錯誤的地方，如有文章不足之處，歡迎大家在我的文章底下留言告訴我唷，謝謝！</p>
    </div>
    <button class="accordion__header" aria-controls="panel-2">
        <h3 class="accordion__header__title">
            一起實踐無障礙吧
        </h3>
    </button>
    <div class="accordion__panel" id="panel-2">
       <p class="accordion__panel__content">還是無障礙的新手，等級一啊.....</p>
    </div>
</div>
```

> [!更正]
> 上面的範例把 `<h3>` 放進 `<button>`，順序剛好相反：`<button>` 只能包含 phrasing content，不能放標題元素；而且 button 的子元素在無障礙樹中只會被當成文字，`<h3>` 的標題語義會消失，螢幕閱讀器用標題導覽時找不到它。依 APG，應該由 heading 包住 button，也就是前面寫的 `heading > button`。按鈕一開始就要有 `aria-expanded`，`role="region"` 的面板則用 `aria-labelledby` 指回按鈕：
>
> ```html
> <div class="accordion">
>   <h3>
>     <button type="button" class="accordion__header" id="accordion-1" aria-expanded="false" aria-controls="panel-1">
>       關於我
>     </button>
>   </h3>
>   <div class="accordion__panel" id="panel-1" role="region" aria-labelledby="accordion-1" hidden>
>     <p class="accordion__panel__content">我是 Askie Lin，目前鑽研前端領域中。</p>
>   </div>
>   <h3>
>     <button type="button" class="accordion__header" id="accordion-2" aria-expanded="false" aria-controls="panel-2">
>       一起實踐無障礙吧
>     </button>
>   </h3>
>   <div class="accordion__panel" id="panel-2" role="region" aria-labelledby="accordion-2" hidden>
>     <p class="accordion__panel__content">還是無障礙的新手，等級一啊.....</p>
>   </div>
> </div>
> ```
>
> 來源：[WAI-ARIA APG — Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)、[HTML Standard — The button element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)

### CSS

- 主要就是設定當手風琴打開及關閉的樣式。

```scss
.accordion {
    box-sizing: border-box;
    margin: 10px;
    max-width: 320px;

    &__header {
        display: block;
        position: relative;
        background: #ecf3f2;
        border: 0;
        width: 100%;
        text-align: left;
        padding: 0.5rem 15px;
        border: 1px solid #999;
        color: #333;

        &:first-child {
            border-bottom: 0;
        }

        &:hover {
            cursor: pointer;
        }

        &:after {
            content: '';
            border: .4em solid transparent;
            border-left: .5em solid #222;
            bottom: 0;
            height: 0;
            margin: auto;
            position: absolute;
            right: 1rem;
            top: 0;
            transition: transform .2s ease-in-out;
            transform-origin: center center;
            transform: rotate(0deg);
            width: 0;
        }

        &__title {
            font-size: 1.5rem;
        }

        &.active {
            background: #00a988;
            color: #fff;
            border: 1px solid #00a988;

            &:after {
                border-left-color: #fff;
                transform: rotate(90deg);
                right: 1.25rem;
                top: 5px;
            }

            + .accordion__panel {
                display: block;
            }
        }

    }

    &__panel {
        padding: 0 15px;
        border-left: 2px solid #ecf3f2;
        border-right: 2px solid #ecf3f2;
        max-height: 0;
        transition: max-height .2s ease-in-out, padding .2s ease-in-out;
        display: none;

        &[aria-hidden="false"] {
            max-height: 100vh;
            padding: 1em 15px 1.5em;
            display: block;
        }

        &:last-child {
            border-bottom: 2px solid #ecf3f2;
        }

        &__content {
            font-size: 1.15rem;
            line-height: 1.5;
            color: #333;
        }
    }
}
```

### JavaScript

```js
const accordionButtons = document.querySelectorAll('.accordion__header');
const defaultActiveButton = document.querySelector('.accordion__header.active');

const openOneAccordion = (header) => {
    accordionButtons.forEach(button => {
        button.classList.remove('active');
        button.removeAttribute('role');
        button.setAttribute('aria-expanded', false);
        button.nextElementSibling.setAttribute('aria-hidden', true);
    });

    header.classList.add('active');
    header.setAttribute('role', 'region');
    header.setAttribute('aria-expanded', true);
    header.nextElementSibling.setAttribute('aria-hidden', false);
}

/* 初始化預設開啟的按鈕 */
if(defaultActiveButton){
    openOneAccordion(defaultActiveButton);
}

/* 監聽每個標題 */
accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        openOneAccordion(button);
    })
});
```

> [!更正]
> `header.setAttribute('role', 'region')` 把 `region` 設在按鈕上，會蓋掉按鈕原本的 `button` 角色，螢幕閱讀器就不會把它當成按鈕；`region` 應該放在面板上，而且直接寫在 HTML 就好，不用每次點擊再設定。面板同時用 `aria-hidden` 和 `display: none` 隱藏是重複的，改用 `hidden` 屬性一個就夠，它會同時從畫面和無障礙樹移除內容。改成 `heading > button` 的結構後，按鈕的 `nextElementSibling` 也不再是面板，要用 `aria-controls` 找面板：
>
> ```js
> const accordionButtons = document.querySelectorAll('.accordion__header');
>
> const openOneAccordion = (header) => {
>   accordionButtons.forEach((button) => {
>     const isOpen = button === header;
>     button.setAttribute('aria-expanded', String(isOpen));
>     document.getElementById(button.getAttribute('aria-controls')).hidden = !isOpen;
>   });
> };
>
> accordionButtons.forEach((button) => {
>   button.addEventListener('click', () => openOneAccordion(button));
> });
> ```
>
> CSS 也要跟著改：展開狀態用 `.accordion__header[aria-expanded="true"]` 判斷，面板的顯示與隱藏交給 `hidden` 屬性。
>
> 來源：[WAI-ARIA APG — Accordion Example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)、[MDN — hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)

可以打開 [Codepen](https://codepen.io/askie/pen/VwZNNwZ?editors=1011) 看動起來的樣子，用鍵盤操作看看。

---

## Reference

- [WAI-ARIA Authoring Practices Guide — Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) - W3C
- [JavaScript and Accessibility: Accordions](https://dev.to/lkopacz/javascript-and-accessibility-accordions-5ecd) - Lindsey Kopacz
- [Accessible ARIA Accordions](https://www.scottohara.me/blog/2017/10/25/accordion-release.html) - Scott O'Hara
- [Patterns](https://a11yproject.com/patterns/) - A11Y Project

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、APG 更正 `heading` 角色名稱、手風琴的 HTML 與 JavaScript 範例、`<details>` 支援度說明；更新失效的規範連結。
