---
title: 系統設計入門：延遲與吞吐量
pubDate: '2020-06-30'
description: >-
  說這兩個詞彙（Latency 和
  Throughput）常常會被搞混，有時候可以交換使用，不過自己本來不是讀資訊相關背景，加上本身寫前端，看到這兩個字真的是生字，一點實務上的聯想都想不到，如果你也不懂的話，沒關係，下文會寫筆記來解釋...。
author: Wen-Hua Lin
tags:
  - system design
---

![Latency 和 Throughput](https://i.imgur.com/zVwHz65.jpg)

> 本系列文並非自己心得記錄，而是讀 [System Design Primer](https://github.com/donnemartin/system-design-primer/) 的筆記，有蠻大部分節錄自該文章以及其補充連結。

話說這兩個詞彙（Latency 和 Throughput）常常會被搞混，有時候可以交換使用，不過自己本來不是讀資訊相關背景，加上本身寫前端，看到這兩個字真的是生字，一點實務上的聯想都想不到，如果你也不懂的話，沒關係，下文會寫筆記來解釋...。

## 定義

### Latency 延遲

- 執行一個操作要花費的「時間長度」。

### Throughput 吞吐量

- 以一個時間區間作為單位，單位時間內可以執行「幾次」操作，或運算的「次數」。

讀的文章提及，系統設計要以：

> 可接受的延遲數量下的最大化吞吐量為設計目標。

## 簡單例子

拍謝，有點文鄒鄒看不懂，以簡單例子來舉例：

> 有個專門製造汽車的工廠，它製造 1 輛汽車所需要的時間是 8 個小時，而它的生產線在 1 天當中可以製造 120 輛汽車。

- Latency 延遲：8 小時。
- Throughput 吞吐量：1 天 120 輛汽車，或者是 1 個小時 5 輛汽車。

這樣有比較理解了吧！

Latency 指的是單項事件所需花費的「**時間、時間、時間**」，！

而 Throughput 則是在一定的時間內能夠完成的「**次數、次數、次數**」。

系統設計師可以用來根據效能規範建立所需硬體的參數。

## How about web

### Latency in web

Latency 是效能的一環，它讓我們得以量化，有所依規的來訂定優化的標準。那以 Web 來說的話，Latency 指的就是使用者自發出請求後，等待伺服器回應並回傳給使用者的總花費時間，也等同代表網站「被訪問的速度」。對於第一個請求，對於前面的 14Kb 位元，延遲時間會比較長，因為它包括 DNS 查詢、 TCP 三次握手和安全 TLS 協定。

![第一個請求包括 DNS 查詢等操作](https://i.imgur.com/edUrOMT.png)

![載入資源可依照 Latency 排序](https://i.imgur.com/eKlSPlo.png)

在 Chrome 的開發者工具 Network 中，可以將資源按照以下內容排序。

> 本區段整理自 Aima [這篇文章](https://segmentfault.com/a/1190000019306567)。

- Start Time：請求開始的時間
- Response Time：資源開始下載的時間
- End Time：請求結束的時間
- Total Duration：請求整個完整過程的時間
- Latency  請求等待響應的時間

我們這時來看一下，開發者工具 Network 中有什麼常用的功能。

### Network on Chrome DevTools

![Network on Chrome DevTools](https://i.imgur.com/kykhe9g.png)

- 點擊單項請求的內容可以看到
  - Headers
  - Preview
  - Response
  - Initiator
  - Timing - 連線時間、請求時間、回應時間、檔案下載時間
  - Cookies - 請求有帶哪些 cookies

### 關於延遲的 Web 相關技術

- 圖片的 Lazy Loading
  - 這個部分我有實作過，原理是將圖片的路徑放在 data-set 中，再設定設計好的「載入中 placeholder」，透過 Intersection Observer API 來監聽元素是否進入畫面，當圖片元素進入畫面時，透過 JS 將 src 替換掉。需考量瀏覽器支援度。
- 延遲載入 3rd party， `<script>` 的屬性 `defer` 和 `async`。
  - 以下兩者載入過程相同：渲染 DOM 與載入 JS 以非同步方式進行。
  - defer：執行時間要等到 DOM 解析完成後，才會執行。
  - async：執行時間是在於 JS 本身載入完成後馬上執行，會中斷 HTML 解析。
- Preload 和 Prefetch
  - Preload：預先載入，但不執行，只在需要時才執行，以 `as` 屬性分辨檔案類型。
    - `<link rel="preload" src="style.css" as="style">`
  - Prefetch：告訴瀏覽器未來可能用到這個資源，有空再去載就好。
    - `<link rel="prefetch" src="style.css" type="style">`
- Webpack
  - Code spliting
- Lodash
  - Throttle、Debounce

關於 Latency 的介紹，可以看 [MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Understanding_latency) 介紹。

---

## Resource

- [System Design Primer](https://github.com/donnemartin/system-design-primer/)
- [Understanding Latency versus Throughput](https://community.cadence.com/cadence_blogs_8/b/sd/posts/understanding-latency-vs-throughput)
- [Understanding latency](https://developer.mozilla.org/en-US/docs/Web/Performance/Understanding_latency) - MDN
- [Preload vs Prefetch](https://cythilya.github.io/2018/07/31/preload-vs-prefetch/) - Summer
