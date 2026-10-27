---
title: 無障礙網站之 JavaScript 迷思和 SPA 探討
pubDate: '2019-09-25'
updatedDate: '2026-10-27'
description: >-
  作為 Web 工程師，我們對於無障礙之於 JavaScript 很容易有一個誤解。本文整理沒有 JS 時的備援機制（表單、noscript）、SPA 的焦點策略，以及前端框架的無障礙相關資源。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - JavaScript
  - SPA
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 10（[原文連結](https://ithelp.ithome.com.tw/articles/10220714)）。
>
> 2026-10-27 依 WHATWG HTML Living Standard、HTML 4.01、WebAIM 螢幕閱讀器使用者調查與 MDN 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

## 迷思：無障礙和 JS 只能擇一？

> JavaScript isn’t the enemy of accessibility. - [A11Y with lindsey](https://www.a11ywithlindsey.com/blog/a11y-js-seemingly-unconventional-romance)

作為 Web 工程師，我們對於無障礙之於 JavaScript 很容易有一個誤解——「無障礙很麻煩，而且跟 JavaScript 是衝突的，因為螢幕閱讀器針對網頁直接忽略 JavaScript，這兩者貌似只能擇一？」

由於這種誤解，我們常會認為根本沒有必要讓 JavaScript 網頁變得更可訪問（現在這個時代哪個網頁沒有使用 JavaScript 啦，太少了QQ）。

![WebAIM 螢幕閱讀器使用者調查 #5 的 JavaScript 啟用比例圖表](/images/ironman-a11y/day10-1.webp)

（圖片來源：[WebAIM](https://webaim.org/projects/screenreadersurvey5/#javascript)）

根據 WebAIM 在 2014 年 1 月進行的一項調查，竟有高達 97.6% 的螢幕閱讀器使用者支持 JavaScript，絕大多數無法使用 JavaScript 的使用者，用的瀏覽器是 Firefox（可能啟用了 NoScript 附加組件）或者在 Linux 上使用 Lynx。

> [!更正]
> 這是 2014 年第 5 次調查的數據。WebAIM 之後持續做這份調查，2026 年 7～8 月的第 11 次調查中，有 99.7% 的受訪者啟用 JavaScript，結論一樣：螢幕閱讀器使用者幾乎都會執行 JavaScript。
>
> 來源：[WebAIM — Screen Reader User Survey #11 Results](https://webaim.org/projects/screenreadersurvey11/#javascript)

---

## 沒有 JS 哪些東西還可以繼續進行？

### 一個備援機制・Fallback

為那 2%～3% 螢幕閱讀器無法支援 JS 的使用者想想，我們現有能做的有哪些？

#### 讓表單可以送出 [[MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form)]

根據 [WCAG: H32 技術建議](https://www.w3.org/TR/WCAG-TECHS/H32)，`<form>` 元素的屬性雖都是可選的，但還是建議一定要設置 `action` 與 `method` ，表單元素也記得加上 `name` 屬性（對應後端需求的欄位名稱），表單就仍可繼續它的任務。

- `action` 屬性定義了表單數據傳輸到哪（伺服器、填寫一個網址）。
- `method` 屬性定義了發送的 HTTP 方法（它可以是 GET 或 POST）。

註：記得為每個欄位加上 `<label>` 並 `for="id"` 指向你的欄位，或採用上面的做法，把欄位直接包起來。

#### `<noscript>` [[WHATWG](https://html.spec.whatwg.org/multipage/scripting.html#the-noscript-element)]

我們可以來看看各大網站都[怎麼使用](https://webdesign.tutsplus.com/tutorials/quick-tip-dont-forget-the-noscript-element--cms-25498)它呢？

![Facebook 以 noscript 提示使用者啟用 JavaScript 的畫面](/images/ironman-a11y/day10-2.webp)

（圖片來源：[envatotuts+](https://webdesign.tutsplus.com/tutorials/quick-tip-dont-forget-the-noscript-element--cms-25498)，Facebook 2015 年 12 月 11 日）

這個標籤的用意是，當客戶端不支援或是禁用 JavaScript， `<noscript>` 標籤中的內容會顯示在畫面上。~~它是 HTML5 新增的元素。~~ <ins>它在 HTML 4 就已經存在，HTML5 重新定義了它在 `<head>` 內外的內容規則。</ins>

> [!更正]
> `<noscript>` 不是 HTML5 新增的元素，HTML 4.01 的規範就已經定義了 NOSCRIPT。現行的 HTML Living Standard 則規定它在 `<head>` 裡只能包含 `<link>`、`<style>`、`<meta>`，在 `<head>` 外是透明的內容模型，也就是下面列的規則。
>
> 來源：[HTML 4.01 — The NOSCRIPT element](https://www.w3.org/TR/html401/interact/scripts.html#h-18.3.1)、[HTML Living Standard — The noscript element](https://html.spec.whatwg.org/multipage/scripting.html#the-noscript-element)

要注意的是：

- 寫在 `<head>` 中，元素裡面只能包含 `<link>`、`<style>`、`<meta>`。
- 寫在 `<head>` 外，
  - 需要是透明的內容模型，有點抽象，請參考 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#transparent_content_model)；
  - 無法巢狀，也就是說元素中不能再有 `<noscript>` 子代。

我們在標籤中，可以使用文字告知使用者，請他打開 JavaScript 的選項，或是提供相關超連結作適當的指引。

```html
<noscript>
  <!-- 相關超連結作適當的指引 -->
  <a href="https://askiebaby.github.io">相關連結</a>
</noscript>
<p>Askie' Coding Life</p>
```

---

## 探討 SPA 以前

### SPA 是什麼？

> 只有一個 index.html 檔案，但是用起來卻像一個 App。- Huli

跟後端溝通後得到資料，不用導向到新頁面，而是透過 JavaScript 直接更新畫面上的內容。

想看故事理解 SPA 那就來看胡立的[這篇文章](https://blog.huli.tw/2017/09/06/spa-single-page-application/)。

### SPA 的內容變更讓人出乎意料

來看使用螢幕閱讀器的使用者覺得最困擾的問題：

![WebAIM 螢幕閱讀器使用者調查 #7 最困擾項目的長條圖](/images/ironman-a11y/day10-3.webp)

（圖片來源：[WebAIM](https://webaim.org/projects/screenreadersurvey7/)）

可以在問卷調查上看到的結果是，~~除了圖像辨識不清與語義不清很困擾之外~~ <ins>除了排第一的 CAPTCHA（圖像驗證碼）之外</ins>，第二困擾的項目 **Unexpected screen changes** 非預期的內容變更，指的就是當 SPA 更新網站畫面時，失去焦點的關係。

> [!更正]
> 這張圖是 2017 年第 7 次調查的結果，最困擾的第一名是 CAPTCHA，第二名才是「畫面或部分畫面非預期地改變」，第三名是「看不懂的連結或按鈕」，所以「語義不清」其實排在非預期變更之後。
>
> 來源：[WebAIM — Screen Reader User Survey #7 Results](https://webaim.org/projects/screenreadersurvey7/)

## 焦點策略 Focus Strategy

![Udacity 焦點管理課程 Quiz 範例頁面截圖](/images/ironman-a11y/day10-4.webp)

在 Google Developers 複習什麼是[焦點 focus](https://web.dev/learn/accessibility/focus)，[這邊](https://classroom.udacity.com/courses/ud891/lessons/7962031279/concepts/79667314390923)是 Google 在 Udacity 針對焦點管理的教學影片。這裡有很多觀念可以學習，主要是課程的 Quiz 有提供 [Repo](https://github.com/udacity/ud891) （lesson2-focus/03-managing-focus）去做練習，裡面也有成功的 Sample Code。

主要就是兩個重點：

- 每個頁面需要一個 `<h1>` 標籤，而每個區塊也需要一個標題。
- 讓頁面更新時，透過 JavaScript 將焦點移至 `<h1>` ，讓使用者知道已經更新畫面。

其他文章有看到的重點

- 表單驗證：填寫格式錯誤時，需要有提示訊息，並且將焦點放在訊息上。
- Lazy loading：延遲加載常應用於圖片，一種可以顯著改善初始頁面加載的做法，可以看看 [Medium](https://medium.com/) 就是這樣的做法。~~我們可以使用 `aria-live` 標示。~~ <ins>圖片可以直接用原生的 `loading="lazy"`；`aria-live` 則是用來通知「動態載入的新內容」，不是用在圖片載入上。</ins>

> [!更正]
> 圖片延遲載入不需要 `aria-live`：`<img>` 的 `loading="lazy"` 會讓瀏覽器等圖片快進入可視範圍時才載入。`aria-live` 的用途是在內容於初次載入後變動時通知輔助科技使用者，例如捲動後載入更多文章時，用一段文字告訴使用者「已載入 10 筆新內容」：
>
> ```html
> <img src="photo.jpg" alt="照片說明" width="640" height="480" loading="lazy">
>
> <p class="visually-hidden" aria-live="polite" id="load-status"></p>
> <script>
>   // 新內容載入完成後
>   document.getElementById('load-status').textContent = '已載入 10 筆新內容';
> </script>
> ```
>
> 來源：[MDN — `<img>`：loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)、[MDN — aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live)

---

## 前端框架的無障礙相關資源

### Vue

- [社群] [Vue A11Y](https://github.com/vue-a11y)：一個 Vue 的社群，他們大部分的專案都是為了讓 Vue 開發者更容易開發出無障礙的網站。

### React

- [官方文件] [Accessibility](https://legacy.reactjs.org/docs/accessibility.html)
- [影片教學] [Set up ESLint to audit Accessibility issues in React](https://egghead.io/lessons/react-set-up-eslint-to-audit-accessibility-issues-in-react) @egghead
- [文章] [Accessibility is not a “React Problem”](https://www.netlify.com/blog/2019/02/25/accessibility-is-not-a-react-problem/) - By Leslie Cohn-Wein in Opinions & Insights
  - 更多實際作法

### Angular

- [教學文章] [Angular, Accessibility, and You](https://blog.dinolytics.com/2018/10/25/angular-accessibility-and-you/)
- [教學文章] [Accessibility in Angular](https://angular-2-training-book.rangle.io/a11y)
- [教學文章] [Angular Accessibility Tips and Tricks](https://coryrylan.com/blog/angular-accessibility-tips-and-tricks)

### Flutter

- [官方文件] [Accessibility](https://docs.flutter.dev/ui/accessibility)

---

## Reference

- [Myth: People who use screen readers don't use JavaScript](https://a11yproject.com/posts/people-who-use-screen-readers-dont-use-javascript/) - A11Y Project
- [Screen Reader User Survey #5 Results](https://webaim.org/projects/screenreadersurvey5/#javascript) - WebAIM
- [Screen Reader User Survey #7 Results](https://webaim.org/projects/screenreadersurvey7/#progress) - WebAIM
- [Client Side A11y](http://shortdiv.com/posts/client-side-a11y/) - `<shortdiv />`
- [noscript](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noscript) - MDN
- [Accessibility is not a “React Problem”](https://www.netlify.com/blog/2019/02/25/accessibility-is-not-a-react-problem/) - By Leslie Cohn-Wein in Opinions & Insights
- [Make it Boring - Jeremy Wagner](https://youtu.be/OikwaVcdHG4?t=1544) - JSConf US 2019

## 更正紀錄

- 2026-10-27：依 HTML 4.01、WHATWG HTML Living Standard 更正 `<noscript>` 的出現版本；依 WebAIM 調查更正困擾項目排名並補上最新 JavaScript 數據；依 MDN 更正延遲載入與 `aria-live` 的用法；更新失效的 W3C、Google Web Fundamentals、MDN、React、Flutter 連結。
