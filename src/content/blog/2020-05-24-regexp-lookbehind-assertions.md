---
title: RegExp 踩雷：Lookbehind Assertions
pubDate: '2020-05-24'
description: >-
  之前對正規表達式一直不太熟悉，也沒仔細去研究正則規則寫法是什麼種類，所以踩到支援性的雷。大多數正規式會支援正規表達式的原因是，它是一個對於文字操作非常強大的工具，本來要寫數十行複雜邏輯的判斷式，只要一行就能達成。
author: Wen-Hua Lin
tags:
  - javascript
  - regexp
  - lookbehind assertions
  - 正規表達式
---

![Can I Use 涵蓋率 68.88%](https://i.imgur.com/0RnPRvN.png)

## RegExp in JavaScript

之前對正規表達式一直不太熟悉，也沒仔細去研究正則規則寫法是什麼種類，所以踩到支援性的雷。大多數正規式會支援正規表達式的原因是，它是一個對於文字操作非常強大的工具，本來要寫數十行複雜邏輯的判斷式，只要一行就能達成。

## ES2018 新增的功能

正則表達式在 1999 年在 ECMAScript 標準第三版成為 JavaScript 的一部份，而在 ES2018 標準第九版時，新增了以下的功能，大幅改善對文字處理的能力。這邊文章要說明的是關於 assertions，大部分程式碼範例參考自[此篇文章](https://www.smashingmagazine.com/2019/02/regexp-features-regular-expressions/#lookbehind-assertions)。

- Lookbehind assertions
- Named capture groups
- a(dot) Flag
- Unidocde property escapes

這些新功能的支援度目前還不高，尤其是 lookbehind 支援

## Assertions

想要 match 文字是否符合規則，需要仰賴文字前後的順序，從而丟棄不合規則的 pattern。尤其是當我們處理到很長的字串，比對的過程中，幾乎都是不正確的格式。好險正則表達式基本上都有提供 `lookbehind assertions` 和 `lookahead assertions`，讓我們的格式判斷能有效率。

## Lookhead

在 ES2018 之前，JavaScript 有提供`lookahead assertion`，分為 positive 和 negative。

### Positive lookahead 用 `(?=...)`

```jsx
const re = /Project(?= 10)/;

console.log(re.exec('Project'));     // null
console.log(re.exec('Project5'));    // null
console.log(re.exec('Project 5'));   // null
console.log(re.exec('Project 10'));
// ["Project", index: 0, input: "Project 10", groups: undefined]
```

### Negative lookahead 用 `(?!...)`

```jsx
const re2 = /Lucky(?!Star)/;

console.log(re2.exec('LuckyStar'));
// null

console.log(re2.exec('LuckyGuy'));
// ["Lucky", index: 0, input: "LuckyGuy", groups: undefined]

console.log(re2.exec('LuckyOne'));
// ["Lucky", index: 0, input: "LuckyOne", groups: undefined]

console.log(re2.exec('Lucky'));
// ["Lucky", index: 0, input: "Lucky", groups: undefined]
```

## Lookbehind

ES2018 ，JavaScript 新增了`lookbehind assertions`作為 `lookahead assertions`，一樣分為 positive 和 negative。

### Positive lookbehind 用 `(?<=...)`

```jsx
const re = /(?<=€)\d+(\.\d*)?/;

console.log(re.exec('199'));
// null

console.log(re.exec('$199'));
// null

console.log(re.exec('€199'));
// ["199", undefined, index: 1, input: "€199", groups: undefined]
```

### Negative lookbehind 用 `(?<!...)`

```jsx
const re = /(?<!\d{3}) meters/;

console.log(re.exec('10 meters'));
// [" meters", index: 2, input: "10 meters", groups: undefined]

console.log(re.exec('100 meters'));
// null
```

### 搭配一同使用

> positive lookbehind `(?<=...)` 和 negative lookbehind `(?<!...)`

```jsx
const re = /(?<=\d{2})(?<!35) meters/;

console.log(re.exec('35 meters'));
// → null

console.log(re.exec('meters'));
// → null

console.log(re.exec('4 meters'));
// → null

console.log(re.exec('14 meters'));
// → ["meters", index: 2, input: "14 meters", groups: undefined]
```

- 數字要兩位數。
- 並且，數字不是 35。
- 符合以上兩個規則， `exec()` 就會回傳找到的結果陣列。

---

## Reference

- [New JavaScript Features That Will Change How You Write Regex](https://www.smashingmagazine.com/2019/02/regexp-features-regular-expressions/#lookbehind-assertions) - by Faraz Kelhini
- [Lookbehind in JS regular expressions](https://caniuse.com/#feat=js-regexp-lookbehind) - Can I Use
- [https://zhuanlan.zhihu.com/p/56981997](https://zhuanlan.zhihu.com/p/56981997)
