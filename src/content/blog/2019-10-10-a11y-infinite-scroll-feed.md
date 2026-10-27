---
title: 實作無障礙網頁功能：無限捲軸之於訪問性的討論 Infinite Scroll（Feed）
pubDate: '2019-10-10'
updatedDate: '2026-10-27'
description: >-
  feed 主要為了要讓輔助裝置能瞭解我們現今很多的網頁當中常應用的功能——「無限捲軸」。本文討論無限捲軸在可訪問性上的爭議，並介紹 feed
  角色的鍵盤可訪問性與 Roles、States、Properties。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - WAI-ARIA
  - feed
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 25（[原文連結](https://ithelp.ithome.com.tw/articles/10226878)）。
>
> 2026-10-27 校訂：失效連結已更新為 WAI-ARIA 1.2 與 ARIA Authoring Practices Guide（APG）的對應頁面。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

> 這系列無障礙的鐵人賽文章，實踐的內容主要是根據 W3C：[WAI-ARIA 的實踐](https://www.w3.org/WAI/ARIA/apg/)，從設計模式及組件（Design Patterns and Widgets）裡面挑選最想嘗試的，如果有朋友想瞭解全部 Widget 該怎麼實作及其規範，歡迎自行爬規範內容，也許我們可以[討論](https://twitter.com/askiebaby)一下；若以下文章內容理解有任何錯誤，請多指教～

![無限捲軸不斷載入新內容的動畫](/images/ironman-a11y/day25-1.webp)

（圖片來源：[deque](https://www.deque.com/blog/introduction-to-feed-role-attribute/)）

## Feed（打開[文件](https://www.w3.org/TR/wai-aria-1.2/#feed)）

> 3.11 feed _ WAI-ARIA 1.1  
> A feed enables users of assistive technologies that have a document browse mode, such as screen readers, to use the browse mode reading cursor to both read and scroll through a stream of rich content that may continue scrolling infinitely by loading more content as the user reads.

`feed` 是 WAI-ARIA 1.1 中的新角色，也列為 WAI-ARIA Practice 1.1 的設計模式之一， `feed` 主要為了要讓輔助裝置能瞭解我們現今很多的網頁當中常應用的功能——「無限捲軸」。

### 無限捲軸 Infinite Scroll

網頁中有非常多的文章或訊息時，通常我們會做成一個「列表」來呈現，這時就會有換頁的需求，我們就會實踐一個功能叫做「Pagination」，讓使用者可以點選位於列表下方的「頁數」或「上一頁、下一頁」來進行換頁。而為了讓使用者更方便，可以不用透過點擊的方式來載入下一頁的內容，就有聰明的團隊想到要使用「捲動（Scroll）」的方式，讓使用者瀏覽文章時，只要「捲動」捲軸的接近底部時，直接在頁面最下方載入原本要按下一頁才能更新的文章項目。

這個看似方便大眾的功能，在可訪問性上，是具有爭議的，原因在於無限捲軸的作法確實提供了大多數使用者便利（啊～只要捲捲捲或是滑滑滑就能看到新內容多好啊），能夠不斷餵食使用者新內容，這在某種程度上能大幅增加使用者滯留於應用程式的時間。

不過大多數的團隊忽略了兩件事情：

- **通用於不同裝置的可訪問性**
  - 視覺能力低下的使用者需要使用螢幕閱讀器來獲知網頁內容，他們將無法使用 `tab` 鍵切換焦點時，從中聽出來什麼時候會到盡頭...因為當使用者 focus 到第五篇文章時，又會載入新文章，真的是獲取資訊的無限地獄，這也對應到下個議題「訪問目的」。這也容易忽略頁腳，像我也曾經看到網站將聯絡資訊設計在頁腳 `<footer>`，我需要的聯絡資訊以便聯絡該公司，所以使用 Chrome 瀏覽器捲到下方，可是永遠都看不到盡頭（＝＿＝）。
- **使用者訪問的目的**
  - 目的當然很多種，我在這邊只舉一個最重要的關鍵點來思考是否適合實踐無限捲軸——「**使用者的行為模式**」。
  - 行為模式：我只是想不費力的快點知道我關心的內容！（眼光掃射）
    - 假設今天要瀏覽的是社群媒體平台（如 Facebook、Instagram、Twitter 等），使用者最關心能否用最快的速度瀏覽追蹤中的朋友近況，或是持續關注議題的最新消息，讓自己保持在一個「喔～我跟這個世界是連結的狀態」，因應這個目的，無限捲軸很適合留下使用者的關注。
  - 行為模式：我需要找到我該找的資料！
    - 假設今天瀏覽的是公司內部的 ERP 系統（Enterprise resource planning），那麼使用者就會是老闆、主管、員工，不論是公司何種角色在使用系統時，相對關心的內容就會是詳細資訊的獲取，想像一下，若我們在查本月業績資料時，共有兩千筆的資料紀錄，這時使用無限捲軸就會非常的不適用，反而透過頁數的輔助，可以使我們能更快速到達我們的頁面，比如直接切換到第 53 頁。

這裡並不是指創新的做法不好，而是我們若能透過思考無限捲軸的使用目的與情境，更能去當一個以使用者為出發點的工程師，而不是功能 Spec 開什麼就做什麼，那麼接下來就進入正題囉。

---

## Feed 介紹

`feed` 這個 WAI-ARIA 1.1 新增的角色讓輔助裝置啟用文件瀏覽模式（document browse mode），在載入新內容時，會通知輔助裝置，進而實現無限捲軸的元件，而`feed`角色是繼承自 `list`角色，它的本質是頁面的結構，也就是說 `feed` 本來就是一系列的文章或訊息構成，只是載入內容模式是創新的捲動方式而非點擊的做法。

### 程式碼與輔助科技需要互相配合

我們產出的程式碼與輔助科技之間需要互相配合，各司其職，遵守以下的互動原則來實現可靠的瀏覽模式：

- 網頁程式碼負責
  - 文章列表中的每篇文章提供可被 focus 的焦點，並且要能隨著視覺 UI 捲動時切換焦點。
  - 載入或刪除文章（目前還沒想到刪除的情境...）。
- 輔助科技
  - 啟用文件瀏覽模式時，透過 the reading cursor 可以知道 `<article>` 或是子元素是可以被聚焦的。
  - 提供閱讀的快速鍵（reading mode keys）讓使用者能在文章中任意切換 DOM 焦點。
  - 提供閱讀的快速鍵（reading mode keys）讓使用者能離開 `feed`，可能想瀏覽 `feed` 之前或之後的內容。

## 鍵盤的可訪問性

因為 feed 角色和鍵盤的互動性並無協議約定，所以其實並無限制，而以下是建議做法：

- 當焦點在 `feed` 時
  - `Page Down`：將焦點移到下一篇文章。
  - `Page Up`：將焦點移到上一篇文章。
  - `Control + End`：將焦點移到 `feed` 後的第一個可聚焦元素。
  - `Control + Home`：將焦點移到 `feed` 前的第一個可聚焦元素。

  > 重要註記：
  >
  > 1. 雖然無協議約定鍵盤訪問性該怎麼做，但提供一個容易操作的做法還是很重要的。
  > 2. 有時會需要有巢狀的 `feed`，比如說在社群媒體的每一則 `article feed` 之下，都還有包含著 `comment feed`，如果你需要使用者能切換焦點到 `comment feed` 之中，讓使用者能用 `tab` 鍵將焦點移動到巢狀feed 中，不過若 `<article>` 子元素包含大量的連結、按鈕或其他小部件，這可能會很慢。在巢狀的 `feed` 中，焦點策略是極具挑戰的。

---

## Roles、States、Properties

- 無限捲軸的容器，要設定角色 `role`，值為 `feed` 。
- `feed` 無限捲軸的容器
  - 需要指定 `aria-label` 為它補充名稱，如果名稱已經呈現在頁面上，使用 `aria-labelledby` 關聯該元素的 `id`。
  - `feed` 的子代元素需要指定角色為 `article`（`role="article"`），除非使用的是具有語義的 `<article>` 標籤。
  - 當 `feed` 在載入新內容或移除內容時，在 `feed` 上設定 `aria-busy="true"`，若是載入或移除動作完成，就將 `aria-busy` 的值設為 `false` 或整個移除掉。
- `article` 每篇文章或是訊息項目
  - （選擇性，但強烈建議實踐的）每一則 `article` ，透過 `aria-describedby` 去關聯 `article` 中最具有描述意義的內容的元素 `id`。
  - 使用 `aria-posinset`，值是數字，標註該則文章是在整個文章串或討論串的第幾則。
  - 使用 `aria-setsize`，值是數字，標註 `feed` 的總數，讓使用者在 focus 任一文章時，永遠知道實際數量，如果情境是無法得知 `feed` 總數的時候，將 `aria-setsize` 的值設為 `-1`。

---

## 實踐開始囉！

今天引用 [WAI-ARIA APG — Feed Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) 的範例 [Feed Example](https://www.w3.org/WAI/ARIA/apg/patterns/feed/examples/feed/)！

抱歉今天沒有 codepen，請看範例：[Feed Example](https://www.w3.org/WAI/ARIA/apg/patterns/feed/examples/feed/) ，並且打開開發者工具來看一下是否都符合唷。

如果以後自己要實作的話，這篇文章是你可以參考的內容，但謹記一定要找實體的輔助科技裝置來測試。

---

## Reference

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) - W3C
- [WAI-ARIA Authoring Practices Guide — Feed Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) - W3C
- [Introduction to feed role attribute](https://www.deque.com/blog/introduction-to-feed-role-attribute/) - deque
- [Infinite Scrolling & Role=Feed Accessibility Issues](https://www.deque.com/blog/infinite-scrolling-rolefeed-accessibility-issues/) - deque

## 更正紀錄

- 2026-10-27：內容未更動；將 WAI-ARIA 1.1、WAI-ARIA Practices 1.1 的連結更新為 WAI-ARIA 1.2 與 APG 的 Feed Pattern、Feed Example 頁面（原本的範例連結指到 radio 錨點，且已轉址到 APG 首頁）。
