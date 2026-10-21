---
title: CSS Modules 在 Vue 的用法？和 CSS scoped 分別的優勢？
pubDate: '2019-07-21'
description: >-
  撰寫 CSS 的過程中，都會搭配 SASS 預處理器，之前一直有聽過 CSS IN
  JS，不知該如何寫起？剛好今年六角學院的前端精神時光屋切了第一週的版（蕃茄鐘），想說用 Vue 來練習 CSS Modules，其實是看到 Vue
  Loader 官方文件的介紹，動手做做看，再 google 大大們的文章吸收一下日月精華，整理在此。
author: Askie Lin
tags:
  - css
  - css-in-js
  - css modules
  - css scoped
  - vue
  - 前端精神時光屋
---

![前端精神時光屋：蕃茄鐘](https://i.imgur.com/ZqAOmnF.png)

> [Demo(本頁開啟)](https://askiebaby.github.io/spirit_2019/pomodoro/) | [我的設計稿](https://challenge.thef2e.com/user/1875?schedule=2512#works-2512)

撰寫 CSS 的過程中，都會搭配 SASS 預處理器，之前一直有聽過 CSS IN JS，不知該如何寫起？剛好今年六角學院的前端精神時光屋切了第一週的版（蕃茄鐘），想說用 Vue 來練習 CSS Modules，其實是看到 Vue Loader 官方文件的介紹，動手做做看，再 google 大大們的文章吸收一下日月精華，整理在此。

---

## CSS IN JS（JavaScript）

大家都知道，其實 CSS 一直以來都不算是個程式語言，只能用來拿來描述網頁的長相，為了讓 CSS 也可以透過簡單的程式方法來解決一些維護、跨瀏覽器前綴及作用域的問題，出現了 LESS、SASS、Stylus、PostCSS 再到最近的 CSS IN JS。CSS IN JS 是 CSS 近年來最大的發展之一，倚靠 JavaScript 強大的力量，讓開發者終於可以透過 JavaScript 來管理 CSS。

以下是今年 CSS IN JS 的排名：

![Ranking of CSS IN JS](https://i.imgur.com/IOTA8qC.png)

[參考來源：State of CSS 2019](https://2019.stateofcss.com/technologies/css-in-js/)

---

## CSS Modules 優勢？解決什麼事？

CSS Modules 顧名思義就是希望能真正將 CSS 模組化，其非常單純，透過 webpack 幫我們自動化，動態產生 class 名稱，解決以下問題，又可以和其他預處理器一同使用，如 SASS！

- 解決 BEM 要解決的問題：
  - 降低 CSS 權重（優先級）也就是說，降低了區塊與區塊之間的相依性
- 新增了後綴，解決了「Global 作用域」的問題
- 但是繼續保持模組化、可重複使用的優點！
  - 如 Vue 中，`CSS scoped` 已經可以隔開作用域，此時就會有複用

我使用 BEM 已經很習慣了，可是人性就是懶惰，如果不是自己懶，就是隊友懶，以手動的做法來說，怎麼樣都還是有隱性問題會藏在專案中，不如交給自動化。

---

## 如何使用 CSS Modules？（Vue and React）

## Vue

我目前 Vue Cli 使用的版本是 `3.9.2`，已經有整合 CSS Modules 到開發環境中，不需再另外設定。他會在 CSS modules 啟用後，在 computed 產生一個屬性。

- 查看版本：`vue --version`

與 CSS scoped 最大不同，是 CSS scoped 雖然也會在 class 名稱加上一個後綴屬性，將元件內 CSS 指定其作用域，可是他並不能完全避免衝突。

### vue 單檔內的使用方法：

1. 將 `<style>` 加上 `module` 屬性：

> 是單數喔！注意不是 modules，因為我就加錯過，新手會犯的錯，找半天。

```html
<style module>
  .title {
    font-size: 2rem;
  }
</style>
```

2. 在樣板 `<template>`裡引用，需要 v-bind 上 `class`：

```html
<!-- 單純的 class 名稱 -->
<template>
  <div id="app">
    <h1 :class="$style.title">Hello world, askie.</h1>
  </div>
</template>
```

```html
<!-- 有連字號的 class 名稱 -->
<template>
  <div id="app">
    <h1 :class="$style['my-title']">Hello world, askie.</h1>
  </div>
</template>
```

### 搭配 Vue Class Binding：官方範例

```html
<p :class=" { [$style.red]: isRed }">
  是紅色的嗎？你決定！
</p>
<p :class=" [$style.red, $style.bold]">
  我是紅色的字，並且是粗體。
</p>
```

### keyframes

動畫名稱必須先寫：

```scss
animation: pop 0.5s; // => animation: p_nfriono0d3eG_08_1 1s;
```

如果，你把動畫名稱寫在「後面」就會解析失敗：

```scss
animation: 0.5s pop; // => animation: 1s :local(pop);
```

### 獨立檔案作法：將獨立的 CSS 檔案作為 CSS Modules 載入

```javascript
import styles from './styles.module.scss';
```

### 其他設定

可以參考[Vue Loader 官方文件](https://vue-loader.vuejs.org/guide/css-modules.html#usage)、[Vue-js-與-CSS-Modules - Kuro 大大](https://kuro.tw/posts/2018/09/07/Vue-js-與-CSS-Modules/)，幫助了我快速理解 CSS Modules 起源、目的、解決了什麼事，以及如何使用。謝謝～

---

### React: 本身沒有寫 React，謹將範例列在此，以供查閱（[範例來源](https://css-modules.github.io/webpack-demo/)）

1. 區域選擇器：一個一個單獨選你的 class

```javascript
import styles from './ScopedSelectors.css';

import React, { Component } from 'react';

export default class ScopedSelectors extends Component {
  render() {
    return (
      <div className={styles.root}>
        <p className={styles.text}>Scoped Selectors</p>
      </div>
    );
  }
}
```

```scss
// ScopedSelectors.css
.root {
  border-width: 2px;
  border-style: solid;
  border-color: #777;
  padding: 0 20px;
  margin: 0 6px;
  max-width: 400px;
}

.text {
  color: #777;
  font-size: 24px;
  font-family: helvetica, arial, sans-serif;
  font-weight: 600;
}
```

2. 全域選擇器

```javascript
import styles from './GlobalSelectors.css';

import React, { Component } from 'react';

export default class GlobalSelectors extends Component {
  render() {
    return (
      <div className={styles.root}>
        <p className='text'>Global Selectors</p>
      </div>
    );
  }
}
```

```scss
.root {
  border-width: 2px;
  border-style: solid;
  border-color: brown;
  padding: 0 20px;
  margin: 0 6px;
  max-width: 400px;
}

.root :global .text {
  color: brown;
  font-size: 24px;
  font-family: helvetica, arial, sans-serif;
  font-weight: 600;
}
```

3. 組成 Compose，概念近於 SASS extend

> 使用 `composes` 這個屬性，去引入你的共用的 CSS 模組。

```javascript
// 動畫範例
import styles from './ScopedAnimations.css';

import React, { Component } from 'react';

export default class ScopedAnimations extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.ball} />
      </div>
    );
  }
}
```

```scss
// ScopedAnimations.css
.root {
  padding: 20px 10px;
}

.ball {
  composes: bounce from 'shared/styles/animations.css';
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: rebeccapurple;
}
```

```scss
// shared/styles/animations.css
@keyframes bounce {
  33% {
    transform: translateY(-20px);
  }
  66% {
    transform: translateY(0px);
  }
}

.bounce {
  animation: bounce 1s infinite ease-in-out;
}
```
