---
title: 五個小技巧讓你寫出更好的 JavaScript 條件語句（翻譯）
pubDate: '2019-06-07'
description: >-
  五個小技巧讓你寫出更好的 JavaScript 條件語句。範例中，乍看之下，寫法沒什麼錯誤。可是當我們有更多紅色水果的選項時，如 cherry（櫻桃）和
  cranberries（蔓越莓），難道我們要增加更多的 || 邏輯運算子來判斷？
author: Wen-Hua Lin
tags:
  - javascript
  - 條件判斷
  - if else
  - null
  - javascript conditions
  - js conditions
  - javascript statement
  - js statement
---

## 1. 使用 Array.includes 來處理多重條件

```javascript
// 原始寫法
function test(fruit) {
  // 條件語句
  if (fruit === "apple" || fruit === "strawberry") {
    console.log("red fruit");
  }
}
```

乍看之下，寫法沒什麼錯誤。可是當我們有更多紅色水果的選項時，如 `cherry`（櫻桃）和 `cranberries`（蔓越莓），難道我們要增加更多的 `||` 邏輯運算子來判斷？

我們用 [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 來改寫一次上面的判斷式：

```javascript
// 改寫後
function test(fruit) {
  // 將選項提取出來，放入陣列當中
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];
  if (redFruits.includes("apple")) {
    console.log("red fruit");
  }
}
```

將選項、可能的答案提取出來，放入陣列 `red fruits` 當中。這樣寫的話，程式碼看起來更加簡潔。

---

## 2. 減少巢狀，儘早回傳（ return）

這裏使用上面的程式碼內容來接續下面的範例，新增兩個條件。

- 如果參數 `fruit` 沒有值，回傳錯誤（ `error`）。
- 如果數量超過 10 的話，印出一個訊息。

```javascript
// 原始寫法，寫法一
function test(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  // 判定一：fruit 必須有值
  if (fruit) {
    // 判定二：fruit 必須是紅色的
    if (redFruits.includes(fruit)) {
      console.log("red fruit");

      if (quantity > 10) {
        // 判定三：fruit 數量必須大於 10
        console.log("big quantity");
      }
    }
  } else {
    throw new Error("No fruit!");
  }
}

// 測試結果
test(null); // 錯誤：沒有水果的值！
test("apple"); // 印出 red fruit
test("apple", 20); // 印出 red fruit、big quantity
```

以上程式碼，已經加入了：

- 1 個 `if/else` 的條件判斷，篩選掉無效的內容。
- 3 個巢狀條件判斷（判定一、判定二、判定三）。

對我個人而言，有一個基本通則，那就是「**減少巢狀，儘早回傳**」：

```javascript
// 改寫後，寫法二
function test(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  // 判定一：無效的值就直接跳出程式，拋出 error
  if (!fruit) throw new Error("No fruit!");

  // 判定二：fruit 必須是紅色的
  if (redFruits.includes(fruit)) {
    console.log("red fruit");

    // 判定三：fruit 數量必須大於 10
    if (quantity > 10) {
      console.log("big quantity");
    }
  }
}
```

改寫程式碼後，現在只有一層的巢狀判斷式。尤其當你有很長的判斷條件時，這樣的 `Coding Style` 很棒（想像一下，你捲軸需要捲到很後面才知道 else 區塊做了什麼處理。難以閱讀，不帥！）

透過**轉換判斷式寫法、儘早回傳**，可以更進一步的精簡巢狀 `if`，來看下面 `判斷式二` 是如何實現的：

```javascript
// 改寫後，寫法三
function test(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  // 判定一：無效的值就直接跳出程式，拋出 error
  if (!fruit) throw new Error("No fruit!");

  // 判定二：fruit 不是紅色的，就直接跳出程式
  if (!redFruits.includes(fruit)) return;

  console.log("red");

  // 判定三：fruit 數量必須大於 10
  if (quantity > 10) {
    console.log("big quantity");
  }
}
```

將判斷式二改成上面的寫法，我們的程式碼就不再這麼「巢」了！假設我們有很長的程式邏輯，並且想要在不滿足條件時中斷程式的進行，這樣的寫法很有效率、易讀。

然而，其實也沒什麼硬性規定該如何寫，**一切依使用情境而定**，問問自己：「這個寫法套用在目前的狀況有增加可讀性嗎？」

對我來說，我應該會選擇<u>寫法二</u>（只有一層的巢狀結構），原因在於：

- 程式碼簡潔、直覺，有一層的 `if` 判定使得邏輯更清晰
- 反轉程式碼在讀的時候會產生思考流程、增加認知負擔

因此，「**減少巢狀，儘早回傳**」是原則，但也不要過度使用。

以下有針對這個主題討論的文章及 StackOverflow 討論，有興趣的話可以看一下：

- [Avoid Else, Return Early](http://blog.timoxley.com/post/47041269194/avoid-else-return-early) by Tim Oxley
- [StackOverflow discussion](https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement) on if/else coding style

---

## 3. 函式使用預設值、解構

我猜你應該很熟悉下面這段程式碼，因為我們總是在確認 `null` / `undefined` 的值，是的話就給一個預設值。

```javascript
// 我們可能熟悉的寫法
function test(fruit, quantity) {
  if (!fruit) return;

  // 若數量是 falsy value，將預設值設定為 1
  const q = quantity || 1;
  console.log(`We have ${q} ${fruit}!`);
}

// 測試結果
test("banana");
test("apple", 2);
```

事實上，在 function 針對參數（parameter） `q` 先設定預設值，就可以不用在程式碼區塊定義 變數 `q`。

```javascript
// 給預設值的寫法
function test(fruit, quantity = 1) {
  if (!fruit) return;
  console.log(`We have ${q} ${fruit}!`);
}

// 測試結果
test("banana");
test("apple", 2);
```

更簡單、直覺了不是嗎？記得函式都可以設定每個[參數的預設值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)，所以我們也可以幫參數 `fruit` 設定預設值，如 `function test(fruit = 'unknown', quantity = 1)`。

### 那假設 `fruit` 是物件怎麼辦？

```javascript
// fruit 是物件的可能寫法
function test(fruit) {
  if (fruit && fruit.name) {
    // 若有值就印出水果名稱
    console.log(fruit.name);
  } else {
    console.log("unknown");
  }
}

// 測試結果
test(undefined); // unknown
test({}); // unknown
test({ name: "apple", color: "red" }); // apple
```

上面的範例中，我們希望水果名稱有值時就把它印出來，沒值就印出 `unknown`。其實，我們可以透過設定函式預設值與解構來減少 `fruit && fruit.name` 這種條件判定。

```javascript
// 透過解構賦予參數預設值
function test({ name } = {}) {
  console.log(name || "unknown");
}

// 測試結果
test(undefined); // unknown
test({}); // unknown
test({ name: "apple", color: "red" }); // apple
```

因為函式只需要用到物件 `fruit` 的屬性 `name`，所以我們可透過 `{name}` 將其解構出來使用，函式當中就可以拿 `name` 當作變數來參照，取代 `fruit.name` 寫法。

我們解構賦值時，至少要設定空物件 `{}` 為預設值。否則會出現這個錯誤：`Uncaught TypeError: Cannot destructure property`name`of 'undefined' or 'null'.`。

如果你不介意使用第三方函式庫的話，那麼我這裡有兩個方法可減少 `null` 的檢查：

- 使用 [Lodash - get function](https://lodash.com/docs/4.17.11#get)
- 使用 Facebook 開源的 [idx](https://github.com/facebookincubator/idx) 函式庫 （需要 Bebeljs 轉譯）

### Lodash get function：

```javascript
_.get(object, path, [defaultValue]);
```

### Lodash 使用方法：

```javascript
function test(fruit) {
  // 若有值就印出水果名稱，否則採用預設值 'unknown'
  console.log(_.get(fruit, "name", "unknown"));
}

// 測試結果
test(undefined); // unknown
test({}); // unknown
test({ name: "apple", color: "red" }); // apple
```

你可以在 [Codepen 玩玩這段程式碼](https://codepen.io/askie/pen/JqVrbK?editors=0011)。如果你是 Functional Programming 愛好者，你可以把 Library 選項改成 [Lodash fp](https://github.com/lodash/lodash/wiki/FP-Guide)（方法會改成 `._getOr`），引數順序會從 `a, b, c` 改成 `c, b, a`。這裡有我的 [FP v4.0 - demo](https://codepen.io/askie/pen/ZNZXKz)。

### Lodash FP 使用方法：

```javascript
function test(fruit) {
  // 若有值就印出水果名稱，否則採用預設值 'unknown'
  console.log(_.getOr("unknown", "name", fruit));
}

// 測試結果
test(undefined); // unknown
test({}); // unknown
test({ name: "apple", color: "red" }); // apple
```

---

## 4. 相較於 Switch，Map / Object 是個好選擇

下面範例想要根據水果顏色，印出水果：

```javascript
function test(color) {
  // 使用 switch case，根據水果顏色印出水果
  switch (color) {
    case "red":
      return ["apple", "strawberry"];
    case "yellow":
      return ["banana", "pineapple"];
    case "purple":
      return ["grape", "plum"];
    default:
      return [];
  }
}

// 測試結果
test(null); // []
test("yellow"); // ['banana', 'pineapple']
```

程式碼邏輯雖沒錯，卻非常冗贅。相同的結果，可以利用物件實體語法（object literal），以清楚的語句來達成。

```javascript
const fruitColor = {
  red: ["apple", "strawberry"],
  yellow: ["banana", "pineapple"],
  purple: ["grape", "plum"]
};

function test(color) {
  return fruitColor[color] || [];
}

// 測試結果
test(null); // []
test("yellow"); // ['banana', 'pineapple']
```

另一個選擇是 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 達成相同結果：

```javascript
const fruitColor = new Map()
  .set("red", ["apple", "strawberry"])
  .set("yellow", ["banana", "pineapple"])
  .set("purple", ["grape", "plum"]);

function test(color) {
  return fruitColor.get(color) || [];
}

// 測試結果
test(null); // []
test("yellow"); // ['banana', 'pineapple']
```

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 是 ES2015 起來有的物件型別，讓你可以去儲存成對的 key 及 value。

那麼，難道我們該捨棄使用 Switch 嗎？別讓自己受限，就我個人而言，我會盡可能地使用物件實體語法（object literal），但我不會把規則定死，老話一句，一切只要適用於情境即可。

Todd Motto 寫過[一篇文章](https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals)在討論 switch 和 物件實體語法（object literal），有興趣可以看一下。

## TL; DR; 重構語法

重構資料結構後，可以透過 `Array.filter` 達成相同結果：

```javascript
const fruits = [
  { name: "apple", color: "red" },
  { name: "strawberry", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "pineapple", color: "yellow" },
  { name: "grape", color: "purple" },
  { name: "plum", color: "purple" }
];

function test(color) {
  return fruits.filter(f => f.color === color);
}
```

總是有超過一種方式可以達成相同結果，以上已經提到 4 種程式範例，寫程式真的很有趣吧，呵呵。

---

## 5. 用 Array.every 和 Array.some 應用於全部與局部條件

最後一個技巧是利用 JavaScript 提供 Array 的新方法（但也不是那麼新啦）來減少程式碼的行數。來看看以下的程式碼，我們來檢查全部的水果是不是紅色的？

### 檢查全部水果是否都是紅色的？

```javascript
// 原本可能這樣寫
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" }
];

function test() {
  let isAllRed = true;

  // 條件：全部的水果必須是紅色的
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = f.color === "red";
  }

  console.log(isAllRed); // false
}
```

這樣的程式碼太長了，可以使用 `Array.every` 來減少程式碼：

```javascript
// 檢查全部水果是否符合條件
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" }
];

function test() {
  // 條件：全部的水果必須是紅色的
  const isAllRed = fruits.every(f => f.color === "red");

  console.log(isAllRed); // false
}
```

更清楚了吧？另一個相似的做法，如果我們想要檢查任一種水果是不是紅色的，可以用 `Array.some` 一行解決！

### 檢查任一種水果是紅色的？

```javascript
// 檢查任一種水果是否符合條件
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" }
];

function test() {
  // 條件：只要其中有一種水果是紅色的
  const isAnyRed = fruits.some(f => f.color === "red");

  console.log(isAnyRed); // true
}
```

## 結論

我們一起寫出更多易讀的程式吧，希望你看完這篇文章能有所獲。

那就這樣囉，Happy Coding!

覺得文章還不賴的話，訂閱我的 [Twitter](https://twitter.com/jecelynyeen)

---

### Reference

原文：[5 Tips to Write Better Conditionals in JavaScript](https://scotch.io/tutorials/5-tips-to-write-better-conditionals-in-javascript)

參考：[五个小技巧让你写出更好的 JavaScript 条件语句](
