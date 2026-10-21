---
title: 初心者透過官方文件學習 React 十大概念（上）
pubDate: '2020-04-14'
description: >-
  記錄著關於初學 REACT 時，官方文件提及的主要概念，基本上都是文件上的內容，希望用自己是初心者的方式整理關於
  JSX、生命週期、事件處理器、官方文件的觀念，可以更記得住。
author: Askie Lin
tags:
  - react
  - javascript
---

記錄著關於初學 REACT 時，官方文件提及的主要概念，基本上都是文件上的內容，希望用自己是初心者的方式整理關於 JSX、生命週期、事件處理器、官方文件的觀念，可以更記得住。

## 1. Hello World

- 應用程式基本組成：元素與組件。

```javascript
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```

往下瞭解其他概念之前，可以先閱讀「[重新介紹 JavaScipt](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/A_re-introduction_to_JavaScript)」，如果好幾年沒碰 JavaScript 的話，看一下「[三個心法](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c)」。

- 重新介紹 JavaScript：複習 JS 的主要核心概念，推薦閱讀！

#### 三個心法

1. 以 `let`與 `const`定義變數，暫時當作與 `var`一樣意思的關鍵字。
2. 使用 `class`關鍵字來定義 `JavaScript` [class](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)，有兩件事要知道：
   - `class`中的方法定義不像 `object`一樣需要使用逗號做為區隔。
   - `JavaScript`的 `this`和其他語言的 `this`不同，`this`的值將取決於它[如何被呼叫](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes#類別主體與方法定義)。
3. 使用 `⇒`定義 `arrow functions`，又稱為「箭號函式」，箭號函式[沒有自己 `this`的值](http://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions#this_不分家)，可以保存外層方法中定義的 `this`的值。

---

## 2. JSX

> JSX 是 JavaScript 語法的擴充，看起來很像樣板語言，不一樣的是，JSX 裡頭可使用 JavaScript 全部的功能。

```javascript
const element = <h1>你好，世界！</h1>;
```

### UI、狀態與邏輯

- 在前端中，狀態邏輯與使用者介面本就是密不可分的，與其將之拆開到各個檔案中存放，不如關注在：以組件方式拆分，其中封裝好 UI 與邏輯，而組間之間彼此獨立，互不相依。

### 為什麼使用 JSX

- React 中，沒有要求非得使用 JSX，但它整合 UI 與邏輯，是很好的視覺輔助。

### 介紹

- JSX 中可以使用表達式。
- 可以放入子節點（Children）。
- 跟 XML 一樣，如果一個標籤是空白的，你可以用 `/>`立刻關閉這個標籤。
- 防止 [XSS （跨網站指令碼）注入攻擊](https://en.wikipedia.org/wiki/Cross-site_scripting)： `React DOM`預設先將所有嵌入在 JSX 中的變數，[escape](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html) 並轉為字串後，才會 render。
- 透過 `Babel` 編譯成物件，呼叫 `React.createElement()`，以「tagName(String), attributes(Object), content(String)」作為參數，回傳 React Element。

1. 建立 JSX

```javascript
const element = <h1 className='greeting'>Hello, World!</h1>;
```

2. `Babel` 編譯，呼叫 `React.createElement(tagName, attrs, content)`

```javascript
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, World!'
);
```

3. 回傳 `React Element`，React 讀這些物件紀錄的描述，來 Render DOM。

```javascript
// 注意：這是簡化過的結構
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!',
  },
};
```

### 在 JSX 類型中使用點記法

- 方便模組化

```javascript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color='blue' />;
}
```

---

## 3. Rendering Element

> 建立 React 應用程式最小的單位是 element。

- React Element 是一個單純的 Object，它不是 DOM Element。
- React Element 很容易被建立。
- React DOM：負責更新 DOM，以符合 React Element。

### Element ≠ Component

更精確的說，Element 是由 Components 組成。

### Render Element 到 DOM 內

- root DOM node：所有在內的 element 都會透過 React DOM 做管理。一個應用程式通常會有一個 root DOM node，也能根據需求獨立建立多個 root DOM node。

```javascript
<!-- index.html --> <div id="root"></div>

const element = <h1>Hello, World</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### 更新被 Render 的 Element

- React Element 是 immutable 的，類比一下：電影中的一個幀，代表特定時間點的 UI。
- 在實踐中，大部分 React 應用程式只呼叫 ReactDOM.render() 一次。

### React 只更新必要的 Element

- React DOM 會將「react element 與其 children」與先前狀態做比較，只更新必要的 DOM。
- 思考 UI 在任何時候應該如何呈現，而不是隨著時間的推移去消除錯誤。

---

## 4. Component 與 Props

> 組件是將 UI 拆分成獨立，可重複使用的程式碼，並專注各別程式碼的思考。

- 定義：像是 JavaScript 的 function，接收任意參數，又稱為 props，將回傳描述畫面的 React Element。

### Function Component 與 Class Component

- 定義組件最簡單的方式：寫個 function，符合上述組件的定義：

- function component

```javascript
function Welcome(props) {
  return <h1>Hello, {[props.name](http://props.name/)}</h1>;
}
```

- class component

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- 組件需要在作用域中被使用。自定義組件名稱，首字英文大寫。

```javascript
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color='red' />;
}
```

- 不要害怕抽離組件，因為已經會抽離組件，所以筆記中不贅述。

### Props 是唯讀的

- 不管使用 function 或是 class 來宣告組件，絕對不能修改自己的 props，保持單向資料流。

- 所有的 React component 都必須像 Pure function 一般保護他的 props。

```javascript
// not a pure function
function withdraw(account, amount) {
  account.total -= amount;
}
```

## 5. State 和生命週期

> State 類似於 prop，但它是私有且由 component 完全控制的。

- component 被定義為 class 有一些額外的特性，其中一個就是 Local State。

### 將 function 轉為 class 寫法

1. 建立一個繼承 `React.Component`的 `class`
2. 加入 `render()`空方法
3. return JSX
4. `render()`內的 `props`要寫成 `this.props`

- 每次更新時，render() 都會被呼叫。
- 可以使用 local state 和生命週期方法這些額外特性。
- 需要 constructor()，並在裡頭初始化數據，使用 super(props)，之後組件中就能取得 props。

### 加入生命週期方法到 Class

> 當 component 被 destroy 時，釋放所佔用的資源是非常重要的。

- componentDidMount()：會在 component 被 render 到 DOM 之後才會執行，也就是掛載完成的意思，可以做些 DOM 長完才能做的事。
- componentWillUnMount()：會在 component 即將卸載前觸發這個生命週期方法，在這裡可以執行要釋放佔用資源的方法，避免 Memory leak。

### 正確的使用 State 要注意的三件事

1. 除非在 constructor 內，不可以直接改 State，要使用 setState() 方法：

```javascript
// 錯誤！組件不會重新渲染
this.state.username = 'askiebaby';

// 正確！
this.setState({ username: 'askiebaby' });
```

2. State 更新可能是非同步的

- React 會批次處理 `setState()`的呼叫，合併為單一的更新，提高效能，所以不可以依賴 `this.props`與 `this.state`來「直接計算」新的 state。

```javascript
// 錯誤！
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

- 透過傳入一個 `function` 可以避免 `state` 的不準確：

```javascript
// 正確！Arrow func
this.setState((state, props) => ({
  counter: this.state.counter + this.props.increment,
}));

// 正確！Normal func
this.setState(function(state, props) => (
  return {
    counter: this.state.counter + this.props.increment,
  });
);
```

### Shallow Merge

> 呼叫 setState() 時，React 會 merge 你提供的 object 到目前的 state。

- 如果 state 包含數個獨立變數：

```javascript
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  // 這樣使用
  // 只會覆蓋 comments；而 posts 保持完整，沒被更動
  this.setState({ comments })
}
```

- 也可獨立的呼叫 `setState()`：

```javascript
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

## 由上而下的「單向資料流」

- 組件彼此獨立地管理其內部 state，每個組件的 state 只能影響 component tree 以下的組件。
- 假設，父組件 `UserInfo`與兩個子組件 `Avatar`、`SocialLink`：
  - 子組件 `Avatar`可以接收從父組件 `UserInfo`來的 props，但它不知道是誰傳給它的，子組件只負責接收。

```javascript
<UserInfo>
  <Avatar fullname={this.state.fullname} />
  <SocialLink platform={this.state.platform} />
</UserInfo>
```

- 用以下範例，來理解所有 `component` 都是獨立的：

```javascript
function App() {
  return (
    <div id='app'>
      <UserInfo />
      <UserInfo />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## 6. 事件處理器

> 事件處理器之於 React Element 與 DOM Element 十分相似，有兩點語法上差異：事件名稱寫法、事件的值的型別。

[React/DOM 的事件處理，自己再加上 Vue 的比較](https://www.notion.so/51ef1bd54aab456796c4376df25d9579)
| React Element | | 事件的值的型別 | 寫法範例 | 避免瀏覽器預設行為 |
| ------------- | ----------------------- | -------------- | ------------------------- | --------------------------------------------------------------------------- |
| DOM Element | 小寫 | `string` | `onclick={createPost}` | 可以在 DOM 的 `onclick` 屬性中使用 `return false` |
| React Element | 小駝峰 | `function` | `onClick="createPost()"` | 在 `function` 中明確呼叫 `preventDefault` |
| Vue Element | 使用 vue 內建事件處理器 | `function` | `v-on:click="createPost"` | 可以在事件處理器加上 `.prevent` 後綴，或 `function` 中呼叫 `preventDefault` |

- 備註：
- 只要在 root DOM element 被 render 時加上一個 listener，應用程式已不需要在綁定 listener。

### 把 event handler 當成該 class 的方法（慣例）

> 因為 class 的方法在預設上是沒有被綁定（bound）的，沒綁定的話 this 的值將會是 undefined。

1. Normal function

- constructor 內綁定。否則每次要當成 props 傳下去時都需要 bind this。

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
```

2. Class Fields：在 CRA（Create-React-App）中是預設可行的。

```javascript
class LoggingButton extends React.Component {
  // 這個語法確保 `this` 是在 handleClick 中被綁定：
  // 警告：這是一個還在*測試中*的語法：
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

3. callback 中使用 arrow function，缺點：有效能問題，當組件 `LoggingButton` 每次渲染時都會建立一個不同的 callback，若這 callback 被 props 到下一個組件，會有多餘的 re-render。

```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 這個語法確保 `this` 是在 handleClick 中被綁定：
    return <button onClick={(e) => this.handleClick(e)}>Click me</button>;
  }
}
```

- 原則上以 `1. constructor 內綁定` 或 `2. class field 語法`，避免效能問題。

### 將參數傳給 Event Handler

- 在傳額外參數 `id` 給事件處理器時， `e` 在 `Arrow function`與 `Function.prototype.bind`的寫法比較：

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

1. `Arrow function`： `e`「需要」被明確指定的傳下去，在上述範例中作為第二個參數。
2. `Function.prototype.bind`：`e`「不需要」明確指定，即可傳下去。

---

## Reference

- [Hello World - React Docs](https://reactjs.org/docs/hello-world.html)
