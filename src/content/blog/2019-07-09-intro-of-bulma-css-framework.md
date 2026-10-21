---
title: Bulma 介紹及用法，透過 cheatsheet 快速閱讀文件
pubDate: '2019-07-09'
description: >-
  講到 CSS Framework，應該無人不知 Bootstrap。最近在 State of CSS 2019 的問卷結果中看到全球 CSS
  使用數據，包含知名度、感興趣程度及使用滿意度，Bootstrap 的滿意度極低，而 Bulma 在使用滿意度算表現得很好，高達 74%，居於第二名...
author: Wen-Hua Lin
tags:
  - css
  - bulma
  - css framework
  - rwd
---

## Bulma

講到 CSS Framework，應該無人不知 Bootstrap。最近在 [State of CSS 2019](https://2019.stateofcss.com/technologies/css-frameworks/) 的問卷結果中看到全球 CSS 使用數據，包含知名度、感興趣程度及使用滿意度，Bootstrap 的滿意度極低，而 Bulma 在使用滿意度算表現得很好，高達 74%，居於第二名，滿意度的第一名是 Taiwlind。CP 值好高，所以想來試試看 Bulma！

> 知名度：**50%**｜ (全部受測數 - 從沒聽過的人) / 全部受測數
> 感興趣：**41%**｜有興趣 / (有興趣 + 沒興趣)
> 滿意度：**74%**｜想再使用 / (想再使用 + 不想再使用)

本篇文章純粹紀錄如何使用，方便自己日後忘記可以快速上手，不會與其他 CSS Framework 進行比較唷。

Bulma 的 Responsive Web Design 跟 Bootstrap 4 一樣，也是利用 flexbox 來實現的，這篇記錄的 Bulma 版本是 `0.7.5`。

## tl;dr

### 感想、使用心得
一開始光看文件不太好找到需要的元件，不過原始碼和成果的對照還算清楚，超輕量！使用下來，安排網頁架構時，元素不影響權重很棒，也能自定義自己的色系，一律採用一個 component 組合搭配 modifiers，整體使用上也還算直覺，所以上手得快。


## 安裝方法

依你的情境選擇你想怎麼引入，詳見 [官方文件](https://bulma.io/documentation/overview/start/) 或 [GitHub](https://github.com/jgthms/bulma-start)。

### CDN

到 [cdnjs](https://cdnjs.com/libraries/bulma) 這個 CDN 平台選擇版本，並引入至 HTML 中。

```html
<link
  rel="stylesheets"
  src="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
/>
```

### 本地引入

至 [GitHub Repo](https://github.com/jgthms/bulma/tree/master/css) 下載 CSS 檔案至本地的專案資料夾中，並引入至 HTML 中。`src` 中的`./` 表相對路徑。

```html
<link rel="stylesheets" src="./your-directory/bulma.min.css" />
```

### NPM / Yarn

```bash
npm install bulma-start
```

或是

```bash
yarn add bulma-start
```

NPM package 有包含哪些項目及相依套件請參考：[What's included](https://github.com/jgthms/bulma-start#whats-included)。

### 注意：

1. 要使用 bulma 中有含 icon 的輪子，要記得引入 [Font Awesome 5](https://fontawesome.com/)。
2. 要宣告 HTML5 的檔案類型，`<!DOCTYPE html>`，以利正常顯示。
3. 要宣告自適應的 viewport 宣告，以利正常顯示。

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## 概覽

### 類別：只有 class，純粹架構 HTML 時不會影響樣式。

- `genertic.sass`：定義頁面基本樣式。
- 使用 `.content` 類別作為文字內容的容器，就可以輕鬆的使用 modifiers，套用 tag 樣式。
  - `<p>` paragraphs
  - `<ul>` `<ol>` `<dl>` lists
  - `<h1>` to `<h6>` headings
  - `<blockquote>` quotes
  - `<em>` and `<strong>`
  - `<table>` `<tr>` `<th>` `<td>` tables

### 模組化：有 39 個獨立的 sass 檔案，可單獨引入。

如果你想使用網格系統，只要引入：

```javascript
@import "bulma/sass/utilities/_all.sass"
@import "bulma/sass/grid/columns.sass"
```

```html
<div class="columns">
  <div class="column">1</div>
  <div class="column">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
  <div class="column">5</div>
</div>
```

如果你想使用 buttons，只要引入，就可以使用這些 `.button` 及 `modifers`：

- `.is-active`
- `.is-primary`, `.is-info`, `.is-success`...
- `.is-small`, `.is-medium`, `.is-large`
- `.is-outlined`, `.is-inverted`, `.is-link`
- `.is-loading`, `[disabled]`

```javascript
@import "bulma/sass/utilities/_all.sass"
@import "bulma/sass/elements/button.sass"
```

```html
<button class="button">Button</button>
<button class="button is-primary">Primary button</button>
<button class="button is-large">Large button</button>
<button class="button is-loading">Loading button</button>
```

### 自適應：預設是「垂直」佈局。

行動裝置為優先、垂直式閱讀設計。可以在 `.columns`及 `.level` 加上 `.is-mobile`強制改成水平佈局。

### 顏色：10 種顏色及 8 個層級的陰影。

可以透過變數去自定義你的。設定：`.is-$color`，比如說 `.is-primary` 或 `.is-dark`。

### functions：提供 3 個 functions 去動態定義「值」、「顏色」。

- `powerNumber($number, $exp)`：計算相對暴露值，回傳數字。（目前尚不理解！）
- `colorLuminance($color)`：計算亮度該是 dark 還是 light，回傳介於 0 與 1 之間的值（light: > 0.5, dark: <= 0.5，十進位）。
- `findColorInvert($color)`：根據顏色的明亮度去計算該是黑色`rgba(#000, 0.7)`還是白色`#fff`。確保按鈕上文字搭配背景顏色後的可讀性。

### mixins：提供 arrow(\$color)、clearfix、loader、overflow-touch…等可使用，詳見[文件](https://bulma.io/documentation/overview/mixins/)。

---

# 我的 Cheatsheet

不是完整官方文件的 cheatSheet，由於一開始看 Bulma 不熟悉，所以串得不是很起來，透過整理 [bulma 教學影片](https://www.youtube.com/watch?v=IiPQYQT2-wg)去熟悉 bulma 的架構與設計，這時搭配文件非常好上手了～

## 文字內容 Context

### 標題 Heading：使用 `.title`。

使用 `.title` 搭配 `modifiers`。

```html
<h1 class="title is-1">Hello Wen-Hua</h1>
<h2 class="title is-2">Hello Wen-Hua</h2>
<h3 class="title is-3">Hello Wen-Hua</h3>
<h4 class="title is-4">Hello Wen-Hua</h4>
<h5 class="title is-5">Hello Wen-Hua</h5>
<h6 class="title is-6">Hello Wen-Hua</h6>
```

### 內容 Content：使用 `.content`。

- 使用 `.content` 搭配 `modifiers`。

  - `<p>` paragraphs
  - `<ul>` `<ol>` `<dl>` lists
  - `<h1>` to `<h6>` headings
  - `<blockquote>` quotes
  - `<em>` and `<strong>`
  - `<table>` `<tr>` `<th>` `<td>` tables

- modifiers

### sizes：3 級。

```html
<p class="content is-small">Hello Wen-Hua and Hello World!</p>
<p class="content is-medium">Hello Wen-Hua and Hello World!</p>
<p class="content is-large">Hello Wen-Hua and Hello World!</p>
```

## 按鈕 Buttons

### colors：11 種顏色，可搭配 sizes 使用。

```html
<!-- buttons and colors -->
<button class="button">Button</button>
<button class="button is-white">Button</button>
<button class="button is-light">Button</button>
<button class="button is-dark">Button</button>
<button class="button is-black">Button</button>
<button class="button is-link">Button</button>
<!-- links: like a button style -->
<a href="" class="button is-primary">Primary</a>
<a href="" class="button is-info">Info</a>
<a href="" class="button is-success">Success</a>
<a href="" class="button is-warning">Warning</a>
<a href="" class="button is-danger">Danger</a>
```

- `.is-outlined`外框按鈕

```html
<!-- outline -->
<a href="" class="button is-danger is-outlined">Danger</a>
```

- `.is-inverted`反相按鈕

```html
<!-- inverted -->
<a href="" class="button is-danger is-inverted">Danger</a>
```

- 按鈕狀態

```html
<a href="" class="button is-hovered">Hovered</a>
<a href="" class="button is-focused">Focused</a>
<a href="" class="button is-active">Active</a>
<a href="" class="button is-loading">Loading</a>
<a href="" class="button" disabled>Disabled</a>
```

## 區塊 Boxes!

```html
<div class="box">
  <h1 class="title">Hello world</h1>
  <p>lorem ipsum</p>
</div>
```

## 通知 Notifications

```html
<div class="notification is-success">
  <button class="delete"></button>
  lorem ipsum
</div>
```

## 標籤 Tags

```html
<span class="tag">Hello</span>
<span class="tag is-black">black</span>
<span class="tag is-danger is-medium"
  >Danger <button class="delete"></button
></span>
```

## 訊息 Messages

```html
<article class="message is-primary">
  <header class="message-header"><p>About Us</p></header>
  <div class="message-body">Holly yes!!</div>
</article>
```

## 導覽列 Navigations

```html
<nav class="nav">
  <!-- 導覽列容器 -->
  <div class="nav-left">
    <!-- 對齊方式：置左 -->
    <a href="" clas="nav-item"
      ><!-- 元素 -->
      <h1 class="title is-4">Wen-Hua Lin</h1>
      <!-- 標題 -->
    </a>
  </div>
  <div class="nav-right nav-menu">
    <!-- 對齊方式：置右，是一個選單 -->
    <a href="" clas="nav-item">A</a
    ><!-- 元素 -->
    <a href="" clas="nav-item">B</a
    ><!-- 元素 -->
    <a href="" clas="nav-item">C</a
    ><!-- 元素 -->
  </div>
</nav>
```

## Hero

```html
<section class="hero is-warning">
  <!-- hero 容器 -->
  <div class="hero-body">
    <!-- hero 主體 -->
    <div class="container">
      <!-- 不一定需要，範例的情境適合用一個 container 包起來 -->
      <h1 class="title">Hello World</h1>
      <h2 class="subtitle">I am Wen-Hua Lin.</h2>
    </div>
  </div>
</section>
```

## 卡片 Cards

```html
<section class="card is-warning">
  <!-- card 容器 -->
  <div class="card-content">
    <!-- card 主體 -->
    <p class="title">Hello world, Wen-Hua.</p>
  </div>
  <footer class="card-footer">
    <!-- card 頁尾 -->
    <p class="card-footer-item">
      <!-- 頁尾元素 -->
      <span>View on<a href="">Twitter</a></span>
    </p>
    <p class="card-footer-item">
      <!-- 頁尾元素 -->
      <span>Share on<a href="">Facebook</a></span>
    </p>
  </footer>
</section>
```

## 頁數 Pagination

- 容器使用 `.pagination`。
- 功能使用 `.pagination-previous` 上一頁 / `.pagination-next` 下一頁。
- 頁數主體使用 unordered list。
- 頁數元素使用 `.pagination-link`，modifiers 有無法點擊 `disabled` 及目前所在頁數 `.is-current`。

```html
<nav class="pagination">
  <!-- pagination 容器 -->
  <a href="" class="pagination-previous" disabled>Previous</a
  ><!-- 上一頁 -->
  <a href="" class="pagination-next" disabled>Next Page</a
  ><!-- 下一頁 -->
  <ul>
    <!-- pagination 主體 -->
    <li><a href="" class="pagination-link is-current">1</a></li>
    <!-- 目前在這一頁 -->
    <li><a href="" class="pagination-link">2</a></li>
    <li><a href="" class="pagination-link">3</a></li>
  </ul>
</nav>
```

## Level：協助水平對齊，適合刻一些小巧的元件放在裡面

- 容器使用 `.level`。
- 方向使用 `.level-left`/ `.level-right`。
- 元素使用 `.level-item`。

```html
<section class="level"><!-- level 容器 -->
  <div class="level-left"><!-- 水平置左 -->
    <p class="level-item"><a><strong>All</strong></a></p><!-- level 元素 -->
    <p class="level-item"><a>Published</a></p>
    <p class="level-item"><a>Draft</a></p>
    <p class="level-item"><a>Deleted</a></p>
    <p class="level-item"><a class="button is-primary">All</a></p><!-- 按鈕形狀的元素 -->
  </div>
  <div class="level-right"><!-- 水平置右 -->
    <p class="level-item"><!-- level 元素 -->
    	<div class="field"><!-- 表單區域 -->
        <div class="control">
          <input type="text" class="input" placeholder="Search..."/>
        </div>
      </div>
    </p>
  </div>
</section>
```

## 表單 Forms

使用`.field` 作為每個元素的區隔。

- Input

```html
<form>
  <div class="field">
    <!-- 表單元件的容器 -->
    <label class="label">Name</label
    ><!-- 表單標題 -->
    <input
      type="text"
      class="input"
      placeholder="Eneter Name"
    /><!-- 表單 text 元素 -->
  </div>
  <div class="field">
    <!-- 表單元件的容器 -->
    <label class="label">Name</label
    ><!-- 表單標題 -->
    <input
      type="text"
      class="input is-success"
      placeholder="Eneter Name"
    /><!-- 配合 modifier -->
  </div>
</form>
```

- select

```html
<form>
  <div class="field">
    <!-- 表單元件的容器 -->
    <label class="label">Select</label
    ><!-- 表單標題 -->
    <p class="control">
      <span class="select">
        <select>
          <option>開始選吧！</option>
          <option>簡單</option>
          <option>中等</option>
          <option>困難</option>
        </select>
      </span>
    </p>
  </div>
</form>
```

- textarea

```html
<form>
  <div class="field">
    <!-- 表單元件的容器 -->
    <label class="label">Textarea</label
    ><!-- 表單標題 -->
    <p class="control">
      <!-- 利用 control 區分元素區塊 -->
      <textarea class="textarea" placeholder="Type somthing..."></textarea>
    </p>
  </div>
</form>
```

- 使用 icons：

```html
<form>
  <!-- example 1 -->
  <div class="field has-addons">
    <!-- 表單元件的容器 -->
    <p class="control">
      <!-- 利用 control 區分元素區塊 -->
      <input
        type="text"
        class="input"
        placeholder="Eneter Keywords..."
      /><!-- 表單 text 元素 -->
    </p>
    <p class="control">
      <!-- 利用 control 區分元素區塊 -->
      <a href="" class="button is-info">搜尋</a>
    </p>
  </div>

  <!-- example 2 -->
  <div class="field has-addons">
    <!-- 表單元件的容器 -->
    <p class="control">
      <!-- 利用 control 區分元素區塊 -->
      <span class="select">
        <select>
          <option>新台幣</option>
          <option>美金</option>
          <option>日圓</option>
        </select>
      </span>
    </p>
    <p class="control">
      <!-- 利用 control 區分元素區塊 -->
      <input
        type="text"
        class="input"
        placeholder="填寫金額"
      /><!-- 表單 text 元素 -->
    </p>
    <p class="control">
      <!-- 利用 control 區分元素區塊 -->
      <a href="" class="button is-info">送出</a>
    </p>
  </div>
</form>
```

## 表格 Tables

- modifiers，可以交互使用
  - `.table` 容器
    - `.is-striped`：灰白相間的表格。
    - `.is-bodered`：邊框的表格。
    - `.is-narrow`：窄一點的表格。
  - tr
    - `.is-selected`：選擇中的列。

```html
<table class="table ">
  <thead>
    <tr>
      <th>姓氏</th>
      <th>名字</th>
      <th>星座</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>林</td>
      <td>ＯＯ</td>
      <td>牡羊座</td>
    </tr>
    <tr>
      <td>王</td>
      <td>ＸＸ</td>
      <td>射手座</td>
    </tr>
  </tbody>
</table>
```

## 網格系統 Grid System

- 純粹的網格，不論裡面有「**幾格**」都會自動排好：

```html
<div class="columns">
  <div class="column"><p class="notification">First Column</p></div>
  <div class="column"><p class="notification">Second Column</p></div>
  <div class="column"><p class="notification">Third Column</p></div>
</div>
```

- 十二網格系統，搭配 modifiers `.is-$number`：

```html
<div class="columns">
  <div class="column is-2"><p class="notification">2 Column</p></div>
  <div class="column is-8"><p class="notification">8 Column</p></div>
  <div class="column is-2"><p class="notification">2 Column</p></div>
</div>
```

- 某一格佔據「**四分之三**」，剩下的自動排好：

```html
<div class="columns">
  <div class="column is-three-quarters">
    <p class="notification">四分之三</p>
  </div>
  <div class="column"><p class="notification">Auto</p></div>
  <div class="column"><p class="notification">Auto</p></div>
</div>
```

- 某一格佔據「**三分之二**」，剩下的自動排好：

```html
<div class="columns">
  <div class="column is-two-thirds"><p class="notification">三分之二</p></div>
  <div class="column"><p class="notification">Auto</p></div>
  <div class="column"><p class="notification">Auto</p></div>
</div>
```

- 某一格佔據「**一半**」，剩下的自動排好：

```html
<div class="columns">
  <div class="column is-half"><p class="notification">50%</p></div>
  <div class="column"><p class="notification">Auto</p></div>
  <div class="column"><p class="notification">Auto</p></div>
</div>
```
