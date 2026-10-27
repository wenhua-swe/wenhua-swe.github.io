---
title: 開發無障礙網頁：使用瀏覽器開發者工具 Chrome vs Firefox
pubDate: '2019-10-11'
updatedDate: '2026-10-27'
description: >-
  這篇文章要介紹的是如何使用瀏覽器內建的開發者工具作為無障礙檢測的好幫手，包含 Chrome 開發者工具的 Audits（Lighthouse）、Elements
  頁籤下的 Accessibility 與 Color Picker。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - DevTools
  - Lighthouse
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 26（[原文連結](https://ithelp.ithome.com.tw/articles/10227164)）。
>
> 2026-10-27 依 Accessible Name and Description Computation 1.2、Chrome DevTools 與 Lighthouse 官方文件校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

開發者工具（Devtools）在網頁開發中是日常生活的一環，很多除錯的功能在很多大大的文章都有介紹，這篇文章要介紹的是如何使用瀏覽器內建的開發者工具作為無障礙檢測的好幫手。

## Chrome 的開發者工具

### 快速開啟 Chrome Devtools

- Mac
  - `Command + Option + I`
- Windows, Linux, Chrome OS
  - `Control + Shift + I`

更多操作請查看 [Google Developers - Open Chrome DevTools](https://developer.chrome.com/docs/devtools/open)

---

### 無障礙檢測

#### 任一網頁中，打開開發者工具的 `Audits` 頁籤來做檢測

> [!更正]
> Chrome 83 起，DevTools 的 `Audits` 面板已改名為 `Lighthouse` 面板；開始檢測的按鈕現在是 `Analyze page load`，不再是 `Run audits`。下方截圖是 2019 年的介面。
>
> 來源：[What's New In DevTools (Chrome 83)](https://developer.chrome.com/blog/new-in-devtools-83#lighthouse)、[Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)

![Chrome 開發者工具 Audits 頁籤的 Lighthouse 檢測設定](/images/ironman-a11y/day26-1.webp)

- 打開 ~~`Audits`~~ <ins>`Lighthouse`</ins> 頁籤，使用 `Lighthouse` 做檢測，它本身可以做到的檢測，能根據不同的裝置與上網速度，做效能、PWA、SEO、最佳實踐、可訪問性的檢測。那因為我們今天要做的是無障礙檢測，就根據「上圖的設定」，來 ~~`Run audits`~~ <ins>`Analyze page load`</ins>，當我們開始檢測之後， `Lighthouse` 就會自動幫我們做 30~40 種檢測事項。

#### 針對[維基百科](https://en.wikipedia.org/wiki/Accessibility)做檢測

![Lighthouse 對維基百科的可訪問性檢測結果與建議事項](/images/ironman-a11y/day26-2.webp)

- 可以看到訪問性的分數以及建議的事項，而這每一個錯誤的項目都有下拉視窗可以打開來看該怎麼修正，因為 `Lighthouse` 在無障礙的檢測功能是依靠 `deque` 這間公司的 ~~API~~ <ins>開源函式庫 axe-core</ins> 作為核心，所以可以看到該建議補充的超連結（上圖的最下方）都是來自於 `deque` 公司。
- 點選 `Failing Elements` 會直接幫我們切換到 `Elements` 頁籤中，找到有訪問性問題的元素，那麼就可以針對問題來做修正。

> [!更正]
> Lighthouse 不是呼叫 Deque 的 API，而是直接把 Deque 開源的 axe-core 函式庫打包進來執行無障礙檢測，所以規則說明連結都指向 Deque University。
>
> 來源：[Lighthouse — package.json（axe-core 相依套件）](https://github.com/GoogleChrome/lighthouse/blob/main/package.json)、[Lighthouse accessibility scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)

#### 來看看 `Elements` 頁籤 下的 `Accessibility`

![Elements 頁籤下的 Accessibility 面板](/images/ironman-a11y/day26-3.webp)

---

#### Accessibility 配合看 Accessibility Tree 的內容

![檢視按鈕的 Computed Properties 與 Accessibility Tree](/images/ironman-a11y/day26-4.webp)

在這個頁籤中，我們可以從這顆「按鈕」在 `Computed Properties` 得知：

1. Name 的屬性權重：越上方的越重要， `aria-labelledby` > `aria-label` > `<label>` > `按鈕內容` > `title`。如果同時有不同屬性設置，名稱會以較上面的屬性為準。
2. Name 元素的名稱，是螢幕閱讀器將會唸出的內容。
3. 額外補充：如果在 `aria-labelledby` 指向的元素上額外設置 `aria-hidden` 或是 `display: none;` ，~~那麼就算有設名稱，也會直接被輔助裝置給忽略~~ <ins>名稱還是會照樣算出來，輔助裝置一樣念得到</ins>。
4. 角色是「button」，是可成為焦點的元素。

> [!更正]
> 我原本寫反了。依 Accessible Name and Description Computation 1.2 的「Hidden Not Referenced」規則，被 `aria-labelledby` 直接參照的節點即使是隱藏的（`aria-hidden="true"`、`display: none` 等），它的文字仍然會拿來計算名稱，所以常見的做法就是把標籤文字藏起來、只給 `aria-labelledby` 用。下面這顆按鈕的名稱是「關閉對話框」：
>
> ```html
> <span id="close-label" hidden>關閉對話框</span>
> <button type="button" aria-labelledby="close-label">×</button>
> ```
>
> 真正會讓名稱消失的是把按鈕本身隱藏，或是被參照元素「裡面」的子節點隱藏而被參照的元素本身沒隱藏，這時那些隱藏的子節點不會算進名稱。
>
> 來源：[Accessible Name and Description Computation 1.2 — Computing the text alternative](https://www.w3.org/TR/accname-1.2/#computation-steps)

而 Accessibility Tree 也在這裡可以檢視，所以我們可以去 Inspect 頁面上任何一個元素再去查看 Accessibility Tree 長怎樣，會發現每一個元素都有自己的模型（Model），這棵樹就是提供給輔助科技解析的內容。

#### 來看看 `Elements` 頁籤 下的 `Styles` 中的 `Color Picker`

![Styles 中的 Color Picker 顯示文字與背景色的對比數值](/images/ironman-a11y/day26-5.webp)

- 文字顏色的對比度對於訪問性來說非常重要，所以在開發者工具中有提供 Color Picker 讓你可以去檢視目前「文字（前景）與背景色的對比數值」如果我們把它的下拉視窗打開來看看的話，如下圖！

![Color Picker 展開後顯示 AA 與 AAA 對比度曲線](/images/ironman-a11y/day26-6.webp)

- 在顏色區塊出現了兩條曲線，我們可以根據自己需要符合的等級（AA、AAA）在曲線內取色，馬上就能符合標準唷，真的很方便。

來不及介紹火狐 Firefox 的開發者工具，但是其實火狐的開發者工具對於開發者製作無障礙非常友善呢！

可以來參考[這則影片](https://www.youtube.com/watch?v=AHkLxt4BaXU)（影片已設為私人，目前無法觀看；講者：Maliha Islam，2019 年在 Mozilla 的實習生，介紹得很清楚）及 [Mozilla Firefox 的官方說明](https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/)：

[影片：Colour Accessibility on the Web - Maliha Islam（Mozilla Intern Presentations 2019）](https://www.youtube.com/watch?v=AHkLxt4BaXU)（已設為私人影片，目前無法觀看）

---

## Reference

- [What's new in web accessibility (Google I/O '18)](https://www.youtube.com/watch?v=wkvslBGkhZY&list=PLNYkxOF6rcIBiiuN53rzwEidPcLZRtiOW) - Google Chrome Developers @Youtube
- [Accessibility Reference](https://developer.chrome.com/docs/devtools/accessibility/reference) - Google Developers
- [Colour Accessibility on the Web - Maliha Islam](https://www.youtube.com/watch?v=AHkLxt4BaXU) | Mozilla Intern Presentations 2019（已設為私人影片，目前無法觀看）

## 更正紀錄

- 2026-10-27：依 Accessible Name and Description Computation 1.2 更正「`aria-labelledby` 指向隱藏元素會被忽略」的說法；依 Chrome DevTools、Lighthouse 官方文件更新 `Audits` 面板改名為 `Lighthouse`、按鈕名稱，以及 Lighthouse 使用的是 axe-core 函式庫；Chrome DevTools 與 Firefox 文件連結改到現行網址，並標註 YouTube 影片已設為私人。
