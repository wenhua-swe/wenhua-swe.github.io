---
title: 用 JavaScript 一步步打造程式基礎(Huli JS101課程筆記)
pubDate: '2019-03-09'
description: Askie 的 JavaScript 程式基礎筆記！
author: Askie Lin
tags:
  - javascript
  - huli
  - nodejs
---

## Node.js 環境建置

- **node.js**

    - 不是程式語言，而是一個執行環境，能讓 `JavaScript` 運行於瀏覽器外。
    - 安裝：官網。`LTS` 是較穩定的版本，`Current` 是有其他新的功能。


### 透過 `iTerm` 建立 `js` 檔案，並用 `node` 執行寫好的程式。

#### 1. 建立 `JavaScript`：`vim index.js`

```javascript
// index.js 
console.log(123)
```

#### 2. 用 `node` 執行寫好的程式碼
```bash
$ node index.js
=> 123
```

### 直接用 `node` 執行 `JavaScript`

#### 1. 執行

```bash
$ node
=> 等同於進入瀏覽器的 console tab
```

#### 2. 離開
快速鍵 `control + c` (輸入兩次) 或是輸入指令：

```bash
$ .exit
```

---

## 邏輯運算

### 邏輯運算子 `||`（或）、`&&`（和）、`!`（not）

#### `||` 短路性質：
```javascript
3 || 10
// => 3
// 程式遇到 3 時，因為是 truthy value，所以直接回傳 3，後面就直接不執行了。

true || 10
// => true
// 程式遇到 true 時，true 符合條件造成短路，後面就直接不執行了。

false || 10
// => 10
// 程式遇到 false 不符合條件，往後繼續執行，遇到 10 達成條件！回傳 10。
```

##### `&&` 短路性質：
```javascript
3 && 10
// => 10
// 第一個值符合條件，檢查第二個值是否符合條件，回傳第二個值 10。

false && 10
// => false
// 因為第一個值已經是 false，後面短路不執行，回傳 false。

0 && 10
// => 0
// 因為第一個值是 falsy value，後面短路不執行，回傳第一個值 0。
```

---

## 位元運算

### 位移運算子 `<<`、`>>`

#### 了解電腦都是使用二進位做運算

 - `100`  => 2 的三次方 => `8`
 - `1000` => 2 的四次方 => `16`
     - 往**左移** 1 位，是**乘以** 2 倍
     - 往**左移** 2 位，是**乘以** 2的2次方（4）
     - 往**右移** 1 位，是**除以** 2 倍
     - 往**右移** 2 位，是**除以** 2的2次方（4）
     

```javascript
10 << 1
// 20 => 往左移一位，乘以2的1次方，= 10 * 2

10 << 3 
// 80 => 往左移三位，乘以2的3次方，= 10 * 8

1024 >> 1 
// 512 => 往右移一位，除以2的1次方，= 1024 / 2

9 >> 1
// 4 => 往右移一位，除以2的1次方，= 9 / 2，無條件捨去。
```

:::success
`10 >> 1` 會比 `10*2` 執行效能還要好。
:::


### 位元運算子 `&`、`|`、`xor`、`not`

#### 都會換算成二進位來運算
`&` and 位元運算子：
```javascript
10 & 15
// 10 => 1010 and 1111 = 1010(2) = 10(10)
```

`|` or 位元運算子：
```javascript
10 & 15
// 15 => 1010 or 1111 = 1111(2) = 15(10)
```

`xor` 位元運算子：當一個 falsy value 和 truthy value 共存時回傳 true，其他都是回傳 false。
```javascript
10 ^ 15
// 5 => 1010 xor 1111 = 101(2) = 5(10)
```

`not`：1變0，0變1
```javascript
~15
// -16 => 1111 = 0000 （因電腦位元關係，原本的1111前有眾多的0，經過not運算會全轉為眾多的1）
```


### tips: 判斷數值是奇數或偶數
```javascript
10 & 1
// 0 => 判斷最後一個字是零的話，代表是偶數。

11 & 1
// 1 => 判斷最後一個字是一的話，代表是奇數。
```

## 變數

### 類型

- Primitive type and Object type
    - Primitive:
        - string, boolean, number, null, undefined, symbol(ES6)
    - Object:
        - object (array, function, object)
- undefined: 已宣告，尚未值
- not defined: 連宣告都沒啊！

### 變數的運算注意的事情

- 變數是什麼類型！
- 浮點數的誤差


### 複習一下等號的意義

- 一個等號 `=`，賦值。
- 兩個等號 `==`，判斷值。
- 三個等號 `===`，判斷類型與值。

```javascript
let a = 10 == 10
console.log(a)
// true，通常先執行右邊的程式 10 == 10，再把判斷結果賦值給 a。
```


#### 物件與陣列的判斷
```javascript
console.log([] === []) // false
console.log([1] === [1]) // false
console.log({} === {}) // false
console.log({a: 1} === {a: 2}) //false
// 物件的判斷是根據記憶體位置。
// 可以想像我有一台蘋果電腦，你也有一台蘋果電腦，但你的電腦不是我的電腦的概念。
```

## 我們只能往不同地方走去：判斷式

### if... else...
### if... else if... else...
### switch

```javascript
let number = 11

if (!(number % 5)) {
  // 了解：如果餘數是 0，代表可以被 5 整除
  // 但 0 == false，利用 not 特性將結果變成 true 以進入判定 block
  // （可讀性差）
  console.log('5的倍數')
} else {
  console.log('不是5的倍數')
}
```

### ternary 三元運算子
```javascript
(a > b) ? 'big' : 'small'
```

## 迴圈/函式

### 實現輸入的數值會回傳一個區間陣列
```javascript

function generateArray (min, max) {
  var result = []
  for(var i = min; i <= max; i++) {
      result.push(i)
  }
  return result
}

console.log(generateArray(5, 10)) // [5, 6, 7, 8, 9, 10]
```

- tip: 實作的時候，如果細節尚不清楚，可以試著先把function列出來，整理出邏輯（流程）

#### 把 function 當成引數傳入
```javascript
function transform(arr, transformFunction) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(transformFunction(arr[i])) // 執行傳入的 function
  }
  return result
}

function double (num) {
  return num * 2
}

transform([2, 4, 6], double) // 把 function 當成引數傳入
```

### 參數（Parameter）與引數（Argument）

- 參數：定義在 `function` 中 `()` 的變數。
- 引數：呼叫某函式時的 `()` 的變數。
```javascript
funtcion myFunc(a, b) { // a, b => 參數
  console.log(arguments.length) // 引數的數量
  console.log(arguments[0]) // 第一個引數
  return arguments // {a: 1, b: 2} => 回傳引數類陣列物件
}
myFunc(1, 2) // 1, 2 => 引數
```

### arguments 跟你想的不一樣

- `arguments` 物件是一個對應傳入函式之引數的類陣列（`Array-like`）物件。（參考：[MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/arguments)）

### function 使用注意事項

- pass by value
- pass by sharing

https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/

### return 不 return，有差嗎？

- 差別只在於需不需要結果的。需要結果就回傳。


### Number 類型的內建函式

##### 常用的函式

- 字串轉數字 - 整數
```javascript
// 沒填進位制的話預設是 10 進位，可接受 2~36

function roughScale(x, base) {
  var parsed = Number.parseInt(x, base);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed * 100;
}

console.log(roughScale(' 0xF', 16));
// expected output: 1500

console.log(roughScale('321', 2));
// expected output: 0


parseInt('50個') // 50
parseInt('50個', 10) // 50
parseInt('50.2個', 10) // 50
```

- 字串轉數字 - 浮點數
```javascript
parseFloat('20.5') // 20.5
```

- 數字轉字串
```javascript
let num = 1
num.toString()
```

- 四捨五入
```javascript
function calculator (x) {
    return Math.round(x)
}

calculator(20.5456789) // 21小數點第一位四捨五入後回傳整數
```

- 無條件進位
```javascript
function calculator (x) {
    return Math.ceil(x)
}

calculator(20.3456789) // 20，小數點第一位無條件進位後回傳整數
```

- 無條件捨去
```javascript
function calculator (x) {
    return Math.floor(x)
}

calculator(20.3456789) // 20，小數點第一位無條件捨去後回傳整數
```

- 小數點後取幾位數（並四捨五入）
```javascript
function calculator (x) {
    return x.toFixed(2) // 如果都不傳，則直接回傳整數（四捨五入）
    // 接受 0~20
}

calculator(20.5456789) // 20.55
calculator(20.5416789) // 20.54
```

- 開根號
```javascript
function calculator (x) {
    return Math.sqrt(x)
}

calculator(9) // 3
```

- 平方
```javascript
function calculator (x, y) {
    return Math.pow(x, y)
}

calculator(2, 10) // 1024
```

- 最大值
```javascript
let biggestNum = Number.MAX_VALUE
console.log(biggestNum) // 1.7976931348623157e+308
```

- 最小值
```javascript
let smallestNum = Number.MIN_VALUE
console.log(smallestNum) // 5e-324
```

- 隨機亂數
```javascript
// 產生 0~0.99999 隨機小數
Math.random()

// 產生 1~10 隨機數字
Math.floor(Math.random()*10 +1)
```

- 檢查是否是數字
```javascript
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0);      // true

// e.g. these would have been true with global isNaN()
Number.isNaN('NaN');      // false
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN('blabla');   // false

// These all return false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN('37');
Number.isNaN('37.37');
Number.isNaN('');
Number.isNaN(' ');
```

 
### String 類型的內建函式

- `str.length`：回傳字串的長度。
- `toString()`：將物件轉字串。
- `str.replace()`：。
- `' hello '.trim()`：回傳去除 `' hello '` **前後**的空格，輸出`'hello'`這個字串。
- `str.indexOf('b')`：在 `str` 找不找得到 `b` ，沒有則回傳 `-1`，有則回傳第一個 `b` 的起始位置，沒有則回傳 `-1`。
- `str.lastIndexOf('b')`：在 `str` 找不找得到 `b` ，沒有則回傳 `-1`，有則回傳最後一個 `b` 的起始位置。
- `str.charCodeAt(5)`：回傳 `str` 找第六個字的 `keycode`。
- `str.charAt(5)`：回傳 `str` 找第六個字是哪一個字。
- `str.split(' ')`：將 `str` 這個字串以 ` ` 空格切開後回傳一個陣列。
- `str.slice(index1, b)`：切字串，但是以範圍來切後回傳，索引也可以從字串最後算起。
```javascript
var str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(1));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"
```
 
### Array 類型的內建函式


## 練習 [codepen collection](https://codepen.io/collection/nrwprj/)


### 我們只能往不同地方走去：判斷式

- [x] 練習一：判斷是否及格（[連結](https://codepen.io/askie/pen/XGmKZV?editors=0012)）
- [x] 練習二：BMI 計算 （[連結](https://codepen.io/askie/pen/eXpdxo?editors=0012)）

### 綜合題目練習 Lv1

- [x] 練習一：印出一到九（[連結](https://codepen.io/askie/pen/NJrzPd)）
- [x] 練習二：寫一個能夠印出 1~n 的函式（[連結](https://codepen.io/askie/pen/ZPORrq?editors=0012)）
- [x] 練習三：寫一個能夠印出 n 個 * 的函式（[連結](https://codepen.io/askie/pen/OqXErj?editors=0012)）
- [x] 練習四：寫一個能回傳 n 個 * 的函式（[同上連結](https://codepen.io/askie/pen/OqXErj?editors=0012)）
- [x] 練習五：判斷大小寫（[連結](https://codepen.io/askie/pen/JzKBdG?editors=0012)）
- [x] 練習六：回傳第一個大寫字母以及它的 index （[連結](https://codepen.io/askie/pen/bZWrxK)）
- [x] 練習七：回傳陣列裡面所有小於 n 的數的數量（[連結](https://codepen.io/askie/pen/QoBOxG?editors=0012)）
- [x] 練習八：回傳陣列裡面所有小於 n 的數的總和（[連結](https://codepen.io/askie/pen/GeByKp?editors=0012)）
- [x] 練習九：回傳陣列裡面所有小於 n 的數（[連結](https://codepen.io/askie/pen/jJpYaz?editors=0012)）
- [x] 練習十：回傳陣列總和（[連結](https://codepen.io/askie/pen/ywqpxR?editors=0012)）

### 綜合題目練習 Lv2

- [ ] 練習一：好多星星（[連結](https://codepen.io/askie/pen/pYmpeO?editors=0012)）
- [ ] 練習二：好多星星 回傳版（[連結](https://codepen.io/askie/pen/RdmMyw?editors=0012)）
- [ ] 練習三：好多星星 加強版（[連結](https://codepen.io/askie/pen/zbQaKB?editors=0012)）
- [ ] 練習四：乘法表（[連結](https://codepen.io/askie/pen/axmVmy?editors=0012)）
- [ ] 練習五：九九乘法表（[同上連結](https://codepen.io/askie/pen/axmVmy?editors=0012)）
- [ ] 練習六：費式數列（[連結](https://codepen.io/askie/pen/zXKPzz?editors=0012)）
- [ ] 練習七：字串反轉（[連結](https://codepen.io/askie/pen/dLJEzO?editors=0012)）
- [ ] 練習八：大小寫互換
- [ ] 練習九：找出最小值
- [ ] 練習十：找出第 n 小的值

### 綜合題目練習 Lv3

- [ ] 練習一：排序
- [ ] 練習二：壓平陣列
- [ ] 練習三：印出聖誕樹（[連結](https://codepen.io/askie/pen/xeNeYL?editors=0012)）
- [ ] 練習四：判斷圈圈叉叉勝負（[連結](https://codepen.io/askie/pen/pBmBLj?editors=0012)）
- [ ] 練習五：判斷質數（[連結](https://codepen.io/askie/pen/qwGwoV?editors=0012)）
