---
title: 實作無障礙網頁功能：今天沒有拖棚之表單 radio，要選就只選我吧！
pubDate: '2019-10-05'
updatedDate: '2026-10-27'
description: >-
  回想到剛開始學習網頁的時候，常常把「checkbox」和「radio」搞不清楚。介紹完 `radio` 的定義及原生的作法，再說明 `Radio Group`
  作為 WAI 中的設計模式之一，在無障礙中有什麼要注意的地方。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - radio
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 20（[原文連結](https://ithelp.ithome.com.tw/articles/10225034)）。
>
> 2026-10-27 依 WAI-ARIA 1.2、ARIA Authoring Practices Guide（APG）與 HTML Standard 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

## 單選的 Radio（打開[文件](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)）

> 3.17 Radio Group  
> A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time. Some implementations may initialize the set with all buttons in the unchecked state in order to force the user to check one of the buttons before moving past a certain point in the workflow.

回想到剛開始學習網頁的時候，常常把「checkbox」和「radio」搞不清楚，這兩個在原生表單元素中都是很常使用到的。到底為什麼 radio 要叫做 radio 呢？

### Radio 名稱的由來

![早期收音機上一排可按下的波段按鈕](/images/ironman-a11y/day20-1.webp)

（圖片來源：[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)）

> 因為 radio 的設計來說，不論外觀或是功能，都和早期的收音機上的按鈕非常相似，一次只能選擇一個功能，比如說上圖的 `LW`，那麼點按其他功能 `BC-A`時， `LW` 就會跳起來，只運作你最後選擇的 `BC-A`，也就是「**單選**」的意思。

### 複習原生的 radio 該怎麼寫

我們來看一下[原生的表單元素 radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) 的寫法：

```html
<input type="radio" id="ramen" name="japanese-food" value="ramen" checked>
```

- 這個元素是 `<input>` 標籤，類型是 `radio` 。
- 它有一個獨特的識別 `id` ，值是 `ramen`（拉麵）。
- `name` 和 `checked` 非常重要，之後會舉例說明。
- `value` 是當前那個 `radio` 的值，是我們會傳給後端的內容，而它並不會出現在 UI 畫面上，如下圖左邊的呈現，使用者點的時候並不會知道他點了什麼東西（黑人問號？？？），下圖右邊的畫面才是真正使用者比較適合看到的內容，知其所以。

![左邊是沒有文字標籤的 radio，右邊是加上文字標籤的 radio](/images/ironman-a11y/day20-2.webp)

Ｑ：那麼我們怎麼做，才可以呈現右邊的文字補充呢？

### 透過 `<label>` 來[加上標籤](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)，必須（握拳！）

原生寫法會透過 `<label>` 來為每個表單元素加上標註，螢幕閱讀器也能念出到每個 `input` 的「標題」，加上標題後，當我們在表單中點擊了「那個標題」，就等於在點擊已建立關聯性的 `input`。如果你已經知道的話，那麼你知道建立關聯性有兩種做法嗎？

1. `<label>` 和 `<input>` 拆開來寫，用 `for` 屬性指向 `input` 的 `id`。
2. `<label>` 當作容器把 `<input>` 包起來，不用使用 `for` 與 `id` 囉！因為連結性已隱含在其中。

如果想了解更多 label 的無障礙做法，可以來看 [WAI 的教學](https://www.w3.org/WAI/tutorials/forms/labels/)，這裡不再贅述。

---

那麼來說明一下 name 與 checked 係蝦咪？

### 你今天到一間日式料理餐廳吃飯

![日式料理餐廳的拉麵](/images/ironman-a11y/day20-3.webp)

（圖片來源：[Unsplash](https://unsplash.com/photos/2t28IxSTqF4)）

今天想點套餐來吃個！

主餐的部分要從 Menu 中選出一項主食，假設你喜歡吃拉麵好了，拉麵區有「醬油拉麵、蔥燒拉麵、海鮮拉麵....等」，到底要吃哪個比較好呢？

那麼這樣的情境在 radio 的呈現就會是一組的選項，我們會將它叫做「Radio Group」。

原始碼長這樣：

```html
<!-- 三個 radio 組成的 radio group -->
<label>
    <input type="radio" name="main-dish" value="1" checked>
    <p>醬油拉麵</p>
</label>

<label>
    <input type="radio" name="main-dish" value="2" checked>
    <p>蔥燒拉麵</p>
</label>

<label>
    <input type="radio" name="main-dish" value="3" checked>
    <p>海鮮拉麵</p>
</label>
```

> [!更正]
> 這段範例有兩個問題。第一，三個 `radio` 都加了 `checked`，但同一組只能有一個被選取，瀏覽器會以最後一個為準，所以實際選中的是「海鮮拉麵」，跟下面說的「選了『醬油拉麵』」對不起來；預設選項只要在其中一個加 `checked`。第二，`<label>` 的內容只能是 phrasing content，`<p>` 是段落（flow content）不能放進去，文字改用 `<span>` 包就好：
>
> ```html
> <!-- 三個 radio 組成的 radio group -->
> <label>
>   <input type="radio" name="main-dish" value="1" checked>
>   <span>醬油拉麵</span>
> </label>
>
> <label>
>   <input type="radio" name="main-dish" value="2">
>   <span>蔥燒拉麵</span>
> </label>
>
> <label>
>   <input type="radio" name="main-dish" value="3">
>   <span>海鮮拉麵</span>
> </label>
> ```
>
> 來源：[MDN — `<input type="radio">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)、[HTML Standard — The label element](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)

- 這是由三個 `radio` 組成的 `group`，原因是它們的 `name` 寫的值都是同一個欄位 `main-dish`。
  - **白話文**：菜單上主食的拉麵區，寫著「醬油拉麵」、「蔥燒拉麵」、「海鮮拉麵」。
  - ⇒ 拉麵區（`Radio Group`）、主食（`name="main-dish"`）。
- `checked` 是可加、可不加的狀態，在一個 `radio group` 中的 `radio` 加上 `checked` 表示這組三個選項當中，我們現在單選的是它。
  - **白話文**：選了「醬油拉麵」，就不能同時選擇另一個「蔥燒拉麵」了！
- `value` 是我們跟後端溝通好要儲存的值，和我們顯示的 UI 名稱不一定要一樣。
  - **白話文**：選了「醬油拉麵」，`main-dish` 這個欄位會傳值 `1` 給後端，而「醬油拉麵」只是個給使用者標題。

## 下一個 Radio 的結論

### 在實際表單運用中，通常是一整組的，我們稱為 Radio Group。而 Radio Group 是由多個 `radio` 組成，一組只會有一個 `radio` 是 `checked` 的狀態。

---

上面介紹完 `radio` 的定義及原生的作法，以下內容要說明 `Radio Group` 作為 WAI 中的[設計模式](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)之一，在無障礙中有什麼要注意的地方？如果今天要自己刻一個同性質的做法，也就是使用非原生 input ，那麼一定要特別特別注意無障礙的實現。

## 鍵盤的可訪問性

- Radio Group 成為焦點時，組內有任何 `radio` 是處於 `checked` 的狀態嗎？
  - 有： `focus` 在該 `radio` 上。
  - 沒有： `focus` 在組內第一個 `radio` 上。
- Space 鍵
  - ~~可以切換 `radio` 的選取狀態（ `checked` ）。~~ <ins>焦點所在的 `radio` 還沒被選取時，選取它（ `checked` ）；已選取的不會被取消。</ins>
- Right、Down 方向鍵
  - 可以移動焦點到「下一個 `radio` 」 ，如果是最後一個，就移動到組中「第一個 `radio`」，並選中新焦點的 `radio`。
- Left、Up 方向鍵
  - 可以移動焦點到「上一個 `radio` 」 ，如果是第一個，就移動到組中「最後一個 `radio`」，並選中新焦點的 `radio`。

---

## Roles、States、Properties

- Radio Group 的容器，要設定角色 `role`，值為 `radiogroup` 。
- 如果 `radio` 不是原生的 `input`，那麼我們 `radio` 需要加上角色 `role="radio"`。
- 每個 `radio` 都需要加上 `aria-checked`，值是 `true` 或 `false`。
- 當你給 `radio` 加上角色 `role="radio"` 之後，每個 `radio` 會以本身中的文字內容作為「名稱」標示（label），不過也可以使用 `aria-labelledby="某元素id"` 或是 `aria-label="醬油拉麵"`來補充語義。
- Radio Group 的容器，同樣可以使用`aria-labelledby="某元素id"` 或是 `aria-label="主餐"`來補充語義。

---

## 實踐開始囉！

今天一樣引用 [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) 的範例 [Radio Group Example Using aria-activedescendant](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-activedescendant/)，改成我們自己想要的情境吧！

好，你剛剛去日式料理餐廳用餐完畢之後，服務人員想請你填寫「服務滿意度調查」，像這樣的介面的無障礙該怎麼實現呢？

![服務滿意度調查設計圖：每個問題有「極好、還行、普通、不喜歡、討厭」五個 radio 選項](/images/ironman-a11y/day20-4.webp)

希望能做到：

- [x] 支援螢幕閱讀器
- [x] 可使用鍵盤操作

```html
<!-- Radio Group 的標題 -->
<h3 id="group_label_1">
    環境舒適嗎？
</h3>
<!-- Radio Group 的主體 -->
<ul id="rg1"
    class="radiogroup"
    role="radiogroup"
    aria-labelledby="group_label_1"
    aria-activedescendant="rb11"
    tabindex="0">
      <li id="rb11"
          role="radio"
          aria-label="極好"
          aria-checked="false">
      </li>
      <li id="rb12"
          role="radio"
          aria-label="還行"
          aria-checked="false">
      </li>
      <li id="rb13"
          role="radio"
          aria-label="普通"
          aria-checked="false">
      </li>
      <li id="rb14"
          role="radio"
          aria-label="不喜歡"
          aria-checked="false">
      </li>
      <li id="rb15"
          role="radio"
          aria-label="討厭"
          aria-checked="false">
      </li>
</ul>
```

- 使用 `<ul>` 作為 Radio Group 的主體， `<li>`是 `radio`。
- `<ul>`：Radio Group 的主體！
  - 使用 `role="radiogroup"`，定義角色是 radio group。
  - `aria-labelledby` 填入標題的元素 `id`，上面例子當中就是那個 `<h3>` 標籤。
  - 透過 JavaScript，動態更換 `aria-activedescendant` 中的值，代表這整個 Radio Group ~~選中誰~~ <ins>目前焦點在哪個 `radio` 上</ins>。
  - 設定 `tabindex="0"`，讓鍵盤可以對一個非操控元素 `<ul>` 產生焦點（focusable）。
- `<li>`：每一個 li 都當作 radio。
  - 設定 `role="radio"` ，定義角色是 `radio` 。
  - `id` 的值，是我們要傳給 `<ul>` 中的 `aria-activedescendant` 屬性的值。
  - `aria-label` 是我們賦予的標題，螢幕閱讀器會唸出這個內容給使用者聽，他們將會知道目前的 `radio` 是什麼選項內容。
  - 透過 `aria-checked` 可以設定現在是否被選擇，記得，同一組 Radio Group 中，只會有一個選項被選取，是單選的唷！

> [!更正]
> `aria-activedescendant` 表示的是「目前作用中（有焦點）的子元素」，不是被選取的那個。DOM 焦點一直留在 `<ul>` 上，`aria-activedescendant` 告訴輔助科技視覺焦點在哪個 `radio`；選取狀態則由各 `radio` 的 `aria-checked` 表示。這個範例用方向鍵移動時會同時移動焦點和選取，所以兩者剛好一致，但語義不同。
>
> 來源：[WAI-ARIA 1.2 — aria-activedescendant](https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant)、[WAI-ARIA APG — Radio Group Example Using aria-activedescendant](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-activedescendant/)

花了我九牛二虎之力，跟設計圖一樣的完整程式碼 => [codepen](https://codepen.io/askie/pen/eYYYBgr) 在這裏，快來使用鍵盤操作看看吧！

---

## Reference

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) - W3C
- [WAI-ARIA Authoring Practices Guide — Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) - W3C
- [input radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) - MDN

## 更正紀錄

- 2026-10-27：依 WAI-ARIA 1.2、APG 與 HTML Standard 更正拉麵範例（只留一個 `checked`、`<label>` 內改用 `<span>`）、Space 鍵的行為、`aria-activedescendant` 的意義；修正連錯的文件錨點並更新失效的規範連結。
