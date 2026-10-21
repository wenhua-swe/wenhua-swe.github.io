---
title: 在 JavaScript 中，Var、Let、Const 的差異？
pubDate: '2019-05-09'
description: 在 JavaScript 中，命名變數時，Var、Let、Const 有什麼差異？
author: Wen-Hua Lin
tags:
  - javascript
  - javascript variable
  - var
  - let
  - const
  - scope
---

## Var

### 露出去的變數 `i`

```javascript
for(var i = 0; i<10; i++) {
  console.log(i)
}
console.log(i) // 10
```

- 感謝 [Reynold Cheng](https://a7474267.github.io/) 於 2020/10/01 熱心指正第一個範例，結果為 `10`。

### function scope：function 外就存取不到變數 `i`

```javascript
function printing(){
  for(var i = 0; i<10; i++) {
    console.log(i)
  }
}
printing()
console.log(i) // Uncaught ReferenceError: i is not defined
```

### IIFE (immediately invoked function expression) 立即執行函式：將變數 `i` 鎖在 function scope 中

```javascript
(function (){
  for(var i = 0; i<10; i++) {
    console.log(i)
  }
})()
```

------

## Let

### block scope：block `{}` 外就存取不到變數 `i`

```javascript
for(let i = 0; i<10; i++) {
  console.log(i)
}
console.log(i) // Uncaught ReferenceError: i is not defined
```

------

## Const

如果在一段程式碼中，確定不會更動變數的值，就使用 const 來宣告變數。

```javascript
const dog={
  age: 3
}
dog.age = 5
dog = { name: 'biko'} // Uncaught TypeError: Assignment to constant variable.
```

可以改變物件下的屬性（property），而不能重新把變數  `dog` 指向一個新的物件。

------

### Reference

[Javascript variables; should you use let, var or const?](<https://medium.com/podiihq/javascript-variables-should-you-use-let-var-or-const-394f7645c88f>)
