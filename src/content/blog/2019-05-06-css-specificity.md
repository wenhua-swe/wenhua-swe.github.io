---
title: 談一下 CSS Specificity
pubDate: '2019-05-06'
description: 要了解 CSS 就一定要知道 Specificity 是什麼！Specificity 是決定優先套用哪個樣式的關鍵因素之一。
author: Askie Lin
tags:
  - css
  - css specificity
  - 權重
  - 特定度
  - 優先權
---
![](https://i.imgur.com/q0yhJxA.png)



## CSS

剛開始學習容易上手
往後卻難以維護

CSS 較鬆散， 非常仰賴攥寫的順序
但這些都比不上不懂 Specificity 的恐怖！XDDD



## Specificity 看不懂？

### Specificity 譯為優先級、特定度、權重

註：Ｏ'reily 翻譯為特定度；MDN 翻譯為優先級；有些翻譯為權重。本文一律以「權重」表示 Specificity。



------



## Specificity 幹嘛的？

### 決定你的元素優先吃哪一個樣式的其中一個因素！

Chris 這篇[文章](https://ithelp.ithome.com.tw/articles/10191613)解釋得很清楚：**Cascade 動作是由 Specificity 和 Ruleset order 作用，決定要套用的 CSS。**

### 換句話說

先比權重，再比順序！

- 當兩個 CSS 宣告同時作用在一個元素時：
  - 權重高
    - 優先生效！
  - 相同權重時 
    - **後**寫的 CSS 會覆蓋**先**寫的 CSS



------



## 透過範例了解一下剛剛在說什麼

我們有一個區塊元素 `div` 包覆著一個 `button` 。

這個 `button` 的 `class` 有 button（基本按鈕的樣式）、button__disabled（無法點擊的狀態樣式）。

HTML

```html
<div>
    <button class="button__disabled button">Click me</button>
</div>
```

CSS

```css
.button {
    padding: 10px 20px;
    font-size: 32px;
    border-radius: 3px;
    border: none;

    /* notice below 被 button__disabled 的樣式覆蓋了 */
    background: #eee;
    color: #333;
    cursor: pointer;
}

.button__disabled {
    background: #ccc;
    color: #999;
    cursor: not-allowed;
}
```

[example - try it](https://codepen.io/askie/pen/KYjBNo?editors=1100)

### 透過範例可以了解兩件事：

1. 決定要套用樣式的基礎並不在於我們在 HTML Element 上引用 Class 的順序，而是，**該 class 在我們攥寫 CSS 樣式表當中的順序**。
2. 若在同樣都只有一個 class 選擇器的狀況下（.button、.button__disabled）
   - 後面寫的樣式宣告（`.button__disabled`）
   - 在 CSS 樣式表中，較前面的內容有指定同一個 HTML Element 的選取器（`.button`）
   - 並且攥寫了重複的內容時（`background`、`color`、`cursor`）
   - 後面寫的樣式宣告（`.button__disabled`）會優先被套用，覆蓋掉原本的樣式（`.button`）



------



## 權重計算的基本規則

![](https://i.imgur.com/7Bp5y7r.png)

如上圖，檢查對應的出現的次數、**由左向右**比較，看 [W3C 的定義](https://www.w3.org/TR/2018/REC-selectors-3-20181106/#specificity)，其實是從 `id`=> `class` => `element`，檢查完再去看是否有設定 `important` `行內樣式`。但我把它們集合起來畫成一張對應的表，比較方便理解、查閱跟記憶。



------



## 我的 CSS Specificity 的 CheatSheet：

| specificity | 條件                                                         |
| :---------: | ------------------------------------------------------------ |
|  1-0-0-0-0  | `!important`                                                 |
|  0-1-0-0-0  | HTML Element 中的行內樣式， `style=""`                       |
|  0-0-1-0-0  | `#id`                                                        |
|  0-0-0-1-0  | `.class`, `:pseudo class`, `attribute`                       |
|  0-0-0-0-1  | `element (h1)`, `::pseudo element`                           |
|  0-0-0-0-0  | `*`, `+`, `>`, `~`, `空格`, `:not()`                         |
| 例外 `:not` | [:not 雖是偽類，可是其無任何權重，但 :not(.class) 依據參數還是會增加權重](https://www.w3.org/TR/2018/REC-selectors-3-20181106/#negation) |

有趣的小工具：[CSS權重計算機](https://specificity.keegan.st/)



------

# 實例

一個新手容易踩的雷：使用 `id` 選取器，等專案越做越大時，開始有製作新的 table 需求時....

```css
#content table { }

/**
 * 不，我寫的東西無法生效 :(
 */
.my-new-table { }
```

- 命名沒表現任何語意，看不來是何種 table
- 使用 `id` 選取器則侷限了這個 table，只能套用在這個名為 content 的 `id` 中





### 通常會有兩種做法

1. **重構**，移除 `id`
2. 為了生效，算了不管它了！我要以較高的權重覆蓋它！
   - 因為若專案較大時，有時無法確定移除 `id` 對整個專案的影響



### 使出我的覆蓋技能

```css
#content table { }
#content .my-new-table { /* 耶，可以看到我的樣式了！ */ }
```

結束這回合....了嗎？

開始進入惡性循環，權重只要一開始疊的高，以後只能越設越高！

# !important 該死？

------

> "Rules are the children of principles." - [Jamie Mason](https://twitter.com/fold_left)

------



### When to use `!important` properly?

有些開發者都覺得 `!important` 是萬惡的，若 `!important` 真的如此該死，當初又何必設計它的存在呢？

其實只要：

```
了解使用目的！
確保你的樣式在 global 都要能 work
而不是為了覆蓋（fix）你改不掉的樣式
```





## Keep It Low at All Times

### 永遠保持最低的權重，這就是原則！

#### How to keep it low?

- 絕對不要使用 `ID`
  - `ID` 辦得到的事，`Class` 全部都可以
  - `ID` 不能重複使用就算了，還會增加權重
    - **若真無他法一定要使用的話：**
    - hack: `[id="your-id"]` (attribute 0-0-1-0) （等同於 class 的權重及選取，但可讀性就較低了，不建議不建議不建議！）

- 選取器不要巢過了頭
  - 建議不要超過三層

- 不要限定你的選擇器
  - `.nav {}` 可以做到的事，不要用 `ul.nav {}`

- 盡可能地使用 `class`
  - 並且保持低權重，讓大家都有相同的權重，公平！



#### YA！CSS 又 ~~變瘦~~ 變輕了！（是權重不是檔案大小，囧）



------



### 理解完，考自己一下，你應該會笑：）

[有趣的圖](http://cssspecificity.com/)

# Reference

------

- Spec
  - [Calculating a selector's specificity - W3C](https://www.w3.org/TR/2018/REC-selectors-3-20181106/#specificity)
- Book
  - [CSS 重構 - Steve Lindstrom 著、陳健文 譯](https://www.tenlong.com.tw/products/9789864763658)（好想工作室有這本書）
- Internet
  - [Day20：小事之 CSS 權重 (css specificity) - iT邦幫忙](https://ithelp.ithome.com.tw/articles/10196454)
  - [cssspecificity.com](http://cssspecificity.com/)
  - [CSS guildlines](https://cssguidelin.es/#specificity)
  - [Hacks for dealing with specificity - CSS Wizardry](
