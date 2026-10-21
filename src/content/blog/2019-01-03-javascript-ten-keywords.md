---
title: JavaScript 十個單字
pubDate: '2019-01-03'
description: JavaScript 中，對於最常使用的詞彙介紹。
author: Wen-Hua Lin
tags:
  - javascript
  - array
  - object
  - json
  - callback
  - function
  - asyncronous
  - closure
  - map
  - loop
  - switch
---


## 1. array
複數

- 像火車車廂的概念。
- 有順序性，可以放各種資料，但建議資料類型相似的一組資料結構/格式。
- 適合資料處理。
- 表達複數的概念，多個相同的複類別。
- 可以放不一樣型別的值，而強型別語言中都會相同型別的值。（2019-7-16 更新）


## 2. object
單數

- 單體
- 描述 Key，紀錄 value。
- 儲存某個東西各種屬性及方法，可以相關也可以不相關。
- 以車子舉例，有幾個輪子及什麼功能。
- 與類別的差異？類別可以抽換參數跟變數，可以複製相同的輪子。
    - 狗(class)跟一隻狗(object)的差別！
- pair，為值命名
- 用有意義的詞找到結果的一個容器
- 抽出我要的特性來描述，叫做抽象，很具象的。取決於問題。
- class 抽象的結果，template


## 3. json

- 資料型別？
    - String

- 用來做什麼的？
    - 資料交換的格式。
    - 輕便、傳 API、紀錄資料。
    - xml的另一個選擇，xml 不常被選擇使用，是因為適合拿來描述更複雜的東西，而傳輸資料通常較簡單。xml 體積大需要用套件解析才能給js使用。
    - parse，丟 json 吐出 object
    - stringify，丟 object 吐出 json (String)


## 4. callback

- **把 function 當參數傳入另一個 function，就叫做 callback**
- 需要某個 function 執行完，執行後才會執行的 function
- 異步常用 callback
- 就算沒有回傳值也是 callback
- 一定要用 CPS 攥寫風格

Ｑ：I/O? HOF??


## 5. function

- 意思？
    - 一段可重複使用的程式碼，可當參數也可以接受參數

- 在js中提供什麼重要特性？（非他不可的特性）
    - 建物件、一般用法
    - 提供一個私有的命名環境（Scope）
    - Lexical Environment
    - 表現一個動詞、動作就會使用 function
    - 可以選擇 return 或不 return


## 6. asyncronous

- 阻塞（blocking）：會造成等待的事情。**要不要等待上一行結束，才執行我這一行。**
    - 常見同步阻塞、異步不阻塞
- JS單執行緒的特性，會放到事件佇列的 function，避免阻塞到其他程式的執行
- 點餐範例、小鳥協助打果汁的範例
- 唯一讓 JS 非單線程的方法
- 配合執行環境而發生


## 7. closure 閉包

- 主要為了什麼而存在？
    - 在 function被產生當下記住其與會環境，在執行環境消失後仍可使用，因為記憶體位置保留著。
    - 避免污染全域環境。
- 用程式形容？
```javascript
function a (x) {
    return() => console.log(x++);
};

var b = a(1);
b();  // 1
b();  // 2
```


- JS用closure做什麼事？
閉了誰，閉包的殺手級應用，就是要知道怎麼加上，怎麼拿掉。才知道閉包必要所在 => 避免全域污染。


## 8. Array.prototype`.map()`

- 遍歷 array 當中的每一個值，執行一個方法，回傳一個與原陣列同長的新 Array，不影響原本的陣列。
- 由 map 中的 callback 可自訂對 array item 做的事情
- 會 return 一個與相同長度的array
- immutable method
- 所有輸出都和輸入有關（一對一映射，映射函數）


## 9. loop

- 在特定條件下執行重複的程式碼，重複做一件事直到不符合條件
```javascript
for  // 知次數
while // 不知次數
do ... while // 不知次數，至少一次
```


## 10. switch

- 是什麼？
    - 由上而下，進行條件（強制===）判斷，符合後執行直到 break
    - 類似於菜單，廚師照點餐內容出餐
    - 重點是滿足條件後，要從哪裡開始執行，下 break; 才停止

- 幾種寫法？（2019-7-16 更新）
```javascript
// example 1

var fruit = 'Cherry';

switch(fruit) {
    case 'Apple':
        doSomething();
        break;
    case 'Banana':
        doSomething();
        break;
    Default:
        doSomething();
        break;
}


// example 2

switch(somethingTrue) {
    case a>b:
        doSomething();
        break;
    case a==b:
        doSomething();
        break;
    Default:
        doSomething();
        break;
}

```
