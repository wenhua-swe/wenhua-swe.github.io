---
title: Arrow function 解決了什麼問題？
pubDate: '2019-04-02'
description: 原來 arrow function 的出現是為了解決 this 的問題。箭頭函數當中的 this 是定義時的對象，而不是使用時的對象。
author: Askie Lin
tags:
  - javascript
  - arrow function
  - this
---


![](https://i.imgur.com/PKxcikD.png)

## **目的**
將 `this` 鎖在 `function` 當中。
為了取代舊有的`.bind()`（`.bind()` 會綁定 this 到指定的 `obj`）。


## 適合情境
只要 `function` 內的 `this` 還要再往下傳的時候，就適合使用 `arrow function`。


## Rules

- Rule 1
    - 在 ES5 `function` 寫法時，`this` 指誰，要看被呼叫時是誰呼叫他。

- Rule 2
    - **箭頭函數當中的 this 是定義時的對象，而不是使用時的對象。**`arrow function` 中沒有 `this`，`this` 指誰要看他身處在的環境 (function scope) 當中 `this` 指向誰 (回到 **Rule 1**)，也就是一定要有人在外層接起來，沒有接起來就會指向 `global object`，瀏覽器的執行環境中稱為 `window`。

- Example

```javascript
let BMI = {
  test: function () {
    console.log('BMI.test', this)
    // BMI，由被呼叫時看是誰叫的。

    function testtest () {
      console.log('BMI.test > testtest(ES5)', this) 
      // 由被呼叫時看是誰叫的。testtest() 找不到是誰叫的
      // 指向 window。
      // 若要傳遞 this，解決方式是
      // 在 BMI.test()設一個變數把 this 接起來
      // eg. let that = this
    }

    let testtest2 = () => {
      console.log('BMI.test > testtest2(ES6)',this)
      // 指向 BMI => 被鎖住哩！
    }

  testtest()
  testtest2()

  },
  test2: () => {
    console.log('BMI.test2', this)
    // 指向 window，arrow function 沒有 this，
    // 往上一層又找不到，往上持續找到最上層是 window。
    // 這樣的寫法，原本就是指向 window。
  }
}

BMI.test()
BMI.test2()
```



參考：
- [MDN - 箭頭函式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [PJ - [筆記] 談談 JavaScript 中的 "this" 和它的問題](https://pjchender.blogspot.com/2016/03/javascriptthisbug.html)
- [Kuro - What's THIS in JavaScript ? [中]](https://kuro.tw/posts/2017/10/17/What-s-THIS-in-JavaScript-%E4%B8%AD/)
