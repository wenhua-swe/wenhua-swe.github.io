---
title: 關於 Webpack，它是什麼？能夠做什麼？為什麼？怎麼做？— freeCodeCamp 的筆記
pubDate: '2019-06-25'
description: >-
  前端日新月異，我們寫的內容已不只是寫 HTML、CSS、JavaScript 單純的檔案。前端出現了許多預處理工具及框架，預處理工具如
  PUG、SASS、Babel；框架如
  Vue、React。不過瀏覽器並看不懂我們寫的預處理內容，每每都需要透過編譯才能使用，也因此出現了自動化工具，Webpack、Gulp、Grunt、Parcel、Browserify....等。
author: Wen-Hua Lin
tags:
  - webpack
  - javascript
  - bundle
  - modules
  - 模組化
  - 打包工具
  - webpack loader
  - webpack plugin
  - webpack css-loader
  - webpack style-loader
---

## 關於 Webpack

### Webpack 是什麼？

> 它是一個「**打包工具**」。將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西，讓我們可以上傳到伺服器。

前端日新月異，我們寫的內容已不只是寫 HTML、CSS、JavaScript 單純的檔案。前端出現了許多預處理工具及框架，預處理工具如 PUG、SASS、Babel；框架如 Vue、React。不過瀏覽器並看不懂我們寫的預處理內容，每每都需要透過編譯才能使用，也因此出現了自動化工具，Webpack、Gulp、Grunt、Parcel、Browserify....等。

### Webpack 能夠做什麼？為什麼？

> 適合用在大型的應用程式。因為大型的應用程式需要管理眾多不同類型的檔案，使用起來相對有感。

- 打包（Bundle）多個 `.js` 檔案成單一檔案。
  - 你可以寫模組化的 JavaScript，你不再需要在 HTML 中引入每個 JavaScript 檔案（`<script src="..."></script>`），如果有眾多的 `.js` 檔案，可以透過 Webpack 來設定。
- 使用 NPM Packages
- 撰寫 JavaScript ES6 或以上
  - 需要 babel 協助轉譯
- 最小化、優化程式碼
- 編譯 LESS 或 SCSS 成 CSS
- 使用 HMR（Hot Module Replacement）
- 包含任何類型的檔案到 JavaScript
  - CommomJS、AMD、ES6 Modules、CSS、Images、JSON、Coffeescript、LESS
- 更多．．．．

## 安裝

### 先確定有沒有安裝 node：

```bash
node -v
```

### 初始化 npm，將會在專案中產生 `package.json`。`-y` 會將需要回答的問題一次性略過， `package.json` 中，日後可以修改。

```bash
npm init -y
```

- .gitigonore 加上 node_modules，避免肥大的模組們被 GIT 追蹤。

```
node_modules
```

- `package.json` 新增 private 屬性，因為是自己練習用，不希望 NPM 被意外發布，詳情請參考 [NPM 官方文件](https://docs.npmjs.com/files/package.json#private)。

```json
"private": true
```

### 安裝 Webpack，`--save-dev` 表示相依於開發模式而已，而發布為產品時不需要也沒關係：

```bash
npm install --save-dev webpack webpack-cli
```

- 完成後，檢視你的 package.json 的 `devDependencies` 屬性應該會長這樣：

```json
// package.json
{
  "name": "webpack-demo-app",
  "version": "1.0.0",
  "private": true,
  "description": "透過練習了解 Webpack 解決的事情，並在沒使用 Webpack 的專案試著導入 Webpack。",
  "main": "index.js",
  "scripts": {},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Colt/webpack-demo-app.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Colt/webpack-demo-app/issues"
  },
  "homepage": "https://github.com/Colt/webpack-demo-app#readme",
  "devDependencies": {
    // --save-dev 指令裝的套件將會幫我們放到 package.json 的 devDependencies 中
    "webpack": "^4.35.0", // Webpack 裝好了！
    "webpack-cli": "^3.3.4" // Webpack 裝好了！
  }
}
```

- `"scripts"` 新增自訂指令

```json
"scripts": {
  "start": "webpack"
}
```

- 執行 Webpack

```bash
npm start
```

直接在 Terminal 執行 `npm start` 會拋出一個錯誤 `ERROR in Entry module not found: Error: Can't resolve './src' in 'your-directory/webpack-demo-app'`。發現在 `./src` 這個資料夾找不到 `index.js`，所以在 `./src` 這個資料夾下建立 `index.js` 後再試一次 `npm start` 看看編譯的狀況。

- 顯示一個警告，設定檔中的模式參數 `mode` 未設定，預設值是 `production`，所以幫你在專案中，產生靜態資料夾 `dist`：

```bash
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

（因為這時還沒有建立設定檔，主要是先試試 Webpack 的預設會如何編譯。）

## Imports, Exports, & Webpack Modules

### 可以根據程式的相依函式來設定 ES6 的 import、export：

```javascript
// 將變數 inputsAreValid export
export const inputsAreValid = (...input) => {
  return input.every(num => typeof num === "number" && !isNaN(num));
};
```

```javascript
// 其他使用的檔案則可以 import
import { inputsAreValid } from "./utils/inputs-are-valid";
```

**`index.js` 是 Webpack 的進入點，放在專案根目錄（root）。**

原本的程式碼在寫完後，如果以功能區分會拆成眾多檔案，那麼在 HTML 引入時會因為順序不同而影響執行，所以要導入 Webpack 讓我們可以把心力放在寫程式上面。

將程式碼模組化之後，只要在程式碼中，確定你需要的變數或 function 有 export，並且在需要的地方 import，自此就可以不需擔心 `.js` 檔案在 HTML 中引入的順序囉！

- 解決了以下問題：
- [x] 若使用外部 Library，不容易辨識哪些程式碼相依於外部 Library
- [x] 相依的程式如果順序錯誤就會造成程式執行異常
- [x] 相依的程式若是引入卻未使用，瀏覽器還是得無意義地強制加載

## 設定

- 在專案根目錄建立 `webpack.comfig.js`。

```javascript
// webpack.comfig.js
const path = require("path"); // 引入 path 來解決巢狀引入路徑問題

module.exports = {
  mode: "development", // 設定開發模式就不會 minify
  devtool: "none", // 編譯後的程式碼不會有 eval 這樣的用法
  entry: "./src/index.js",
  output: {
    filename: "hello.js", // 編譯後的檔名
    path: path.resolve(__dirname, "your-directory-name") // 編譯後要放在哪個資料夾
  }
};
```

- 把指令更改為：以後 `npm start` 要根據我的 Webpack 設定檔辦事囉！

```json
// package.json
{
  "scripts": {
    "start": "webpack --config webpack.comfig.js"
  }
}
```

## Loaders: CSS SASS

### 什麼是 Loader？

在使用 Webpack 時，我們可以引入 `.js`以外的其他類型檔案，而 Loader 是 Webpack 中強大的工具，用來幫我們預處理你引入的各種類型檔案。詳情請參考[官方文件 - Loaders](https://webpack.js.org/loaders/#root)。

### 建立一個 `.css` 檔案

```css
/* main.css */
body {
  background: #009688;
}
```

### 安裝 `style-loader` 與 `css-loader`

```bash
npm install --save-dev style-loader css-loader
```

### 新增 css-loader 規則

```javascript
// add it to webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/, // 正則式，$ 用以表示以 .css 結尾的檔案，反斜線是跳脫字元
      use: ["style-loader", "css-loader"]
    }
  ];
}
```

css-loader：先取得你的 CSS 樣式，把它變成 JavaScript。

style-loader：將轉譯的 JavaScript 變成真正的 CSS 樣式，透過 `<style>` tag 插入你的 DOM tree。

而 webpack 編譯時，從陣列的最後一個開始往前執行，了解流程之後，之後 Loader 的使用順序是有差異的喔！

先寫 style-loader，再來才是 css-loader。

### 可以直接引入 CSS 囉！

```javascript
// index.js
import { mainCSS } from "./main.css";
```

---

以下筆記待續。

## Cache Busting and Plugins

## 切割開發版本與產品版本

## Html-loader, File-loader 以及乾淨的 webpack

## 多個 Entrypoints 及 Vendor.js

## 提取 CSS，將 HTML/CSS/JS 最小化

---

## 主要 Reference

### 影片教學

[FreeCodeCamp 教學 @youtube](https://www.youtube.com/watch?v=MpGLUVbqoYQ)

### 時間軸大綱

⌨️ ([0:00:00](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=0s)) What Even Is Webpack??
⌨️ ([0:08:12](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=492s)) Installing and Running Webpack and Webpack-CLI
⌨️ ([0:22:18](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=1338s)) Imports, Exports, & Webpack Modules
⌨️ ([0:29:58](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=1798s)) Configuring Webpack
⌨️ ([0:38:57](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=2337s)) Loaders, CSS, & SASS
⌨️ ([0:53:55](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=3235s)) Cache Busting and Plugins
⌨️ ([1:07:13](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=4033s)) Splitting Dev & Production
⌨️ ([1:17:13](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=4633s)) Html-loader, File-loader, & Clean-webpack
⌨️ ([1:28:17](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=5297s)) Multiple Entrypoints & Vendor.js
⌨️ ([1:34:45](https://www.youtube.com/watch?v=MpGLUVbqoYQ&t=5685s)) Extract CSS & Minify HTML/CSS/JS

## 其他 Reference

[Ｗ ebpack 官網](https://webpack.js.org/)

[Webpack Tutorial 繁體中文 Gitbook](https://neighborhood999.github.io/webpack-tutorial-gitbook/)

[Webpack 教學 (一) ：什麼是 Webpack? 能吃嗎？](https://medium.com/@Mike_Cheng1208/2d8f9658241d)

[Better local require() paths for Node.js](https://gist.github.com/branneman/8048520)
