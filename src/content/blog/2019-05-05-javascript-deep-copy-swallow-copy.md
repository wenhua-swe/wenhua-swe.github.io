---
title: 透過複製陣列理解 JS 的淺拷貝與深拷貝 - JavaScript
pubDate: '2019-05-05'
description: 處理資料時，我們的 JSON 幾乎都是多維陣列，該怎麼才能做到深拷貝？（拷貝後，改變多維陣列當中的值而不修改到原本的陣列）
author: Askie Lin
tags:
  - javascript
  - deep copy
  - swallow copy
  - 深拷貝
  - 淺拷貝
---

本篇文章翻譯自 [How to clone an array in JavaScript - by Yazeed Bzadough on freeCodeCamp @medium](https://medium.freecodecamp.org/how-to-clone-an-array-in-javascript-1d3183468f6a)，搭配 [JS 的拷貝 by Kai @github]([https://liaoyingkai.github.io/2019/01-day/js%E7%9A%84%E6%8B%B7%E8%B2%9D/) 提及的概念，整理成筆記。

---

## TL; TR

- `8.` JSON.parse and JSON.stringify 是深拷貝。其他都是淺拷貝。
- 「call by reference」與「call by value」？
  - 基本型別 (Primitive Type) - number, string, boolean, null, undefined - 傳值
  - 物件 (Objects) - array, function, object - 傳址
  - array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。
- 「淺拷貝」與「深拷貝」的定義與差異？
  - 淺拷貝在複製 `object` 時，會參考到同一個物件，並沒有將此物件拷貝到並建立出新的關聯。
  - 深拷貝在複製 `object` 時，會獨立出來不共用同一個記憶體位置，改動 `newObject` 時不會動到 `oldObject`。
- 這只是試看看能否用一個步驟就能深拷貝陣列的方式而寫的文章，網路上能找到其他更有趣的實作唷！
  - 更多深拷貝與淺拷貝的比較也可以參考 [Larry Lu](https://larry850806.github.io/2016/09/20/shallow-vs-deep-copy/)、[ZHI-WEI](<[http://skyroxas.tw/javascript-%E5%AF%A6%E4%BD%9C%E6%8A%80%E5%B7%A7%EF%BC%9A-%E6%B7%BA%E6%8B%B7%E8%B2%9Dshallow-copy-%E6%B7%B1%E6%8B%B7%E8%B2%9Ddeep-copy/](http://skyroxas.tw/javascript-實作技巧：-淺拷貝shallow-copy-深拷貝deep-copy/)>)
  - jquery - `$.extend()`
  - loadash - `_.cloneDeep()`

---

在 JavaScript 當中，很多方式能複製陣列。

## 1. Spread Operator・Shallow Copy

### 展開運算子・淺拷貝

自從 ES6 普及後，展開運算子（Spread Operator）已經成為最熱門的方法，它有著簡潔的語法（Syntax），所以若你使用 React、Redux 這樣的函式庫時會發現它神好用。

```javascript
const numbers = [1, 2, 3];
const numbersCopy = [1, 5, 6, ...numbers];
// (6) [1, 5, 6, 1, 2, 3]
```

**注意事項**：對多維陣列來說，這不是安全的複製。因為 array/object 是 `copied by reference` 而不是 `by value`。

[ O ] 基於剛剛的程式碼，單維陣列可以這樣寫：

```javascript
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 5, 6, 1, 2, 3, 4]
// numbers 是一個獨立陣列，沒有副作用
```

[ X ] 假設是多維陣列的情況：

```javascript
const nestedNumbers = [[1], [2]];
const numbersCopy = [...nestedNumbers];

numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// 兩者會同時改變，因為是它們是根據同一個記憶體位址
```

## 2. Good Old for() loop・Shallow Copy

### 好用的老方法 for() loop・淺拷貝

我猜 `for() loop` 最不受歡迎，因為現在有其他很多新潮的函式可以選擇。

撇除操縱陣列要注意的原則， `for() loop` 能夠達成目的。

- Pure / impure
- declarative / imperative

```javascript
const numbers = [1, 2, 3];
const numbersCopy = [];
for (let i = 0; i < numbers.length; i++) {
  numbersCopy[i] = numbers[i];
}
```

**注意事項**：對多維陣列來說，這不是安全的複製。你使用 `=` 運算子，會指向該 array/object 的記憶體位置 （ `copied by reference` 而不是 `by value`）。

[ O ] 基於剛剛的程式碼，單維陣列可以這樣寫：

```javascript
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]
// numbers 沒副作用
```

[ X ] 假設是多維陣列的情況：

```javascript
const nestedNumbers = [[1], [2]];
const numbersCopy = [];

for (let i = 0; i < nestedNumbers.length; i++) {
  numbersCopy[i] = nestedNumbers[i];
}

numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// 兩者會同時改變，因為是它們是根據同一個記憶體位址
```

## 3. Good Old while() Loop (Shallow copy)

### 好用的老方法 while() loop・淺拷貝

和 `for()` 相同，impure、imperative，一樣達成目的。

```javascript
const numbers = [1, 2, 3];
const numbersCopy = [];
let i = -1;
// 從 -1 開始，複製的值才會指向正確的 index

while (++i < numbers.length) {
  // 變數 i 先 +1 後才比對是否符合條件
  numbersCopy[i] = numbers[i];
}
```

**注意事項**：使用 `=` 運算子，會指向該 array/object 的記憶體位置 （ `copied by reference` 而不是 `by value`）。

[ O ] 基於剛剛的程式碼，單維陣列可以這樣寫：

```javascript
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]
// numbers 沒副作用
```

[ X ] 假設是多維陣列的情況：

```javascript
const nestedNumbers = [[1], [2]];
const numbersCopy = [];
let i = -1;
while (++i < nestedNumbers.length) {
  numbersCopy[i] = nestedNumbers[i];
}
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// 兩者會同時改變，因為是它們是根據同一個記憶體位址
```

## 4. Array.map (Shallow copy)

### 內建的陣列操縱方法 `Array.map` 映射．淺拷貝

回到現代化的方式，可以使用 `map` 方法。根據[數學理論](https://en.wikipedia.org/wiki/Morphism)，其實 `Array.map` 的概念是，保有原結構下，將一個集合轉成另一個集合（`map` is the concept of transforming a set into another type of set, while preserving structure.）。

換句話說就是：`Array.map` 每次都會回傳一個和原陣列長度相同的新陣列。

假設現在要寫一個 `numbers` 陣列，數字全部乘以 `2` 的寫法：

```javascript
const numbers = [1, 2, 3];
const double = x => x * 2;
numbers.map(double);
```

#### 那複製陣列呢？

沒錯，這篇文章的確是要講如何複製陣列。在 `Array.map` 方法，要複製陣列只要「回傳」你的元素即可：

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.map(x => x);
```

若用數學理論的層面來解讀，`(x) => x` 稱為 [identity](https://en.wikipedia.org/wiki/Identity_function)。無論是否有帶參數都直接回傳元素。

`map(identity)` 本身就是複製一個清單。

```js
const numbers = [1, 2, 3];
const identity = x => x;
const numbersCopy = numbers.map(identity);
console.log(numbersCopy);
// [1, 2, 3] ，numbers 沒副作用
```

**注意事項**：array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。

## 5. Array.filter (Shallow copy)

### 內建的陣列操縱方法 `Array.filter` ．淺拷貝

`Array.filter` 會回傳一個陣列，如同 `map`，但它不保證回傳與原陣列相同的長度。

濾出偶數：（原陣列長度是 3，而輸出的新陣列長度是 1）

```js
[1, 2, 3].filter(x => x % 2 === 0);
// [2]
```

所以假設你的 `filter` 過濾的條件只要是 true 都回傳，那就等同於複製了。

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.filter(() => true);
```

陣列當中的每一個元素都達成條件，所以全部都會被回傳到一個新陣列。

**注意事項**：array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。

## 6. Array.reduce (Shallow copy)

### 內建的陣列操縱方法 `Array.reduce` ．淺拷貝

使用 `reduce` 來複製陣列不是很優，雖然一樣可以解決問題，但 `reduce` 可以做到比複製陣列更有力量的事。

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.reduce((newArray, element) => {
  newArray.push(element);
  return newArray;
}, []);
```

`Array.reduce` 在迭代陣列前可以預設一個初始值。

範例中的初始值是空陣列，我們會在迭代原陣列時把單次跑到的「元素」新增至新陣列，而新陣列會被「回傳」，成為下一次迭代的初始值。

**注意事項**：array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。

## 7. Array.slice (Shallow copy)

### 內建的陣列操縱方法 `Array.slice` ．淺拷貝

`Array.slice` 方法會根據提供的「開始、結束 的 index」回傳陣列的淺拷貝。

如果你只想複製陣列的前三個元素：

```js
[1, 2, 3, 4, 5].slice(0, 3);
// [1, 2, 3]
// 從 index 0 開始, index 3 結束
```

如果你想複製全部陣列，直接不給參數即可：

```js
const numbers = [1, 2, 3, 4, 5];
const numbersCopy = numbers.slice();
// [1, 2, 3, 4, 5]
```

**注意事項**：array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。

## 8. JSON.parse and JSON.stringify (Deep copy)

．深拷貝

- `JSON.stringify`：將物件轉字串。
- `JSON.parse`：將字串轉物件。

結合兩者可以達成深拷貝，複製多維陣列，可是會有效能上的問題。

```js
const nestedNumbers = [[1], [2]];
const numbersCopy = JSON.parse(JSON.stringify(nestedNumbers));
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1], [2]]
// [[1, 300], [2]]
// 兩個陣列是獨立的，互不影響！
```

缺點：只能套用在拷貝轉成 `JSON` 格式的物件上，像 `function` 就沒辦法。

## 9. Array.concat (Shallow copy)

內建的陣列操縱方法 `Array.concat` ．淺拷貝

`Array.concat`： 合併 a 陣列與 b 陣列的值。

```js
[1, 2, 3].concat(4); // [1, 2, 3, 4]
[1, 2, 3].concat([4, 5]); // [1, 2, 3, 4, 5]
```

如果是給一個空陣列作為引數，淺拷貝會直接中斷（return）。

```js
[1, 2, 3].concat(); // [1, 2, 3]
[1, 2, 3].concat([]); // [1, 2, 3]
```

**注意事項**：array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。

## 10. Array.from (Shallow copy)

內建的陣列操縱方法 `Array.from` ．淺拷貝

`Array.from`：可以將任何可迭代的物件轉成陣列。因為陣列本身就是物件的一種，所以只要給一個陣列作為引數，就會回傳一個淺拷貝。

```js
const numbers = [1, 2, 3];
const numbersCopy = Array.from(numbers);
// [1, 2, 3]
```

**注意事項**：array/object 當中若含有複合型別時，此複合型別是 call by reference 而不是 by value。
