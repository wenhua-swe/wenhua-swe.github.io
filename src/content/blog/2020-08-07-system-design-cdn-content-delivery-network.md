---
title: 系統設計入門：內容傳遞網路 CDN
pubDate: '2020-08-07'
description: 網站在流量不高時，使用者對伺服器的回應速度較沒有感覺，但流量漸漸增加時，latency 就會拉長，我們通常會採購新的 sever 來負擔網站流量。
author: Wen-Hua Lin
tags:
  - system design
---

![Content delivery network](https://i.imgur.com/wdkZYZb.png)

> 本系列文並非自己心得記錄，而是讀 [System Design Primer](https://github.com/donnemartin/system-design-primer/) 的筆記，有蠻大部分節錄自該文章以及其補充連結。

## CDN 的出現

網站在流量不高時，使用者對伺服器的回應速度較沒有感覺，但流量漸漸增加時，latency 就會拉長，我們通常會採購新的 sever 來負擔網站流量。

### NGINX

建立網站之初，客群會比較侷限或小眾，所以流量增加時，採購新的 server 還算堪用，架個由 Igor Sysoev 開發的 Nginx 輕量級網頁伺服器可以在傳輸時用 Gzip 壓縮，降低 Latency。不過如果使用者越來越喜歡我們的服務，當使用者遍佈全球時，我們總不能在世界各地都買些伺服器來回應使用者（當伺服器離使用者越近，獲得 response 速度增加），而且有些瀏覽器不支援 Gzip。

### 因應全球佈局策略

在各個 Region 放置我們的伺服器顯然無法真正解決 latency 的問題，因為台灣流量進來了，也可能透過美國的伺服器傳送給使用者。而光速是固定的，所以地理的距離確實影響使用者經驗很大。

## CDN 的簡述

> 在多個地點，擁有多個伺服器群，提供相同的內容給使用者。

翻譯蒟蒻：先幫你把快取的靜態內容抓到 CDN 服務的伺服器群，當瀏覽器發出請求時，藉由獨特的運算法找出離使用者最近的伺服器 IP，請瀏覽器向那個 IP 拿取內容遞送給使用者。

## CDN 的優點

- 降低管理成本
  - 不用全世界到處設伺服器
- 提升使用者經驗
  - 就近取得內容
    - 伺服器因分佈、頻寬帶來的 Latency
    - 加快 TCP 三次交握的時間
  - 可以用壓縮的方式來傳輸內容
    - 因為壓縮，所以流量變小，加快傳輸時間
    - 克服瀏覽器對於 Gzip 壓縮的支援度
      - 目前各瀏覽器與伺服器基本上都支援，傳輸時的資源壓縮，主流使用 `gzip` 與 `br` 壓縮。可以打開任一網頁，查看開發者工具的 `Network`頁籤 > 任一個請求 > `Response headers`，裡面有個屬性 `content-encoding` 會紀錄伺服器使用的壓縮工具。
- 提供高可用性
  - 減少 DDoS 阻斷服務攻擊（用流量塞爆 bandwidth，造成服務直接無法被使用）
  - 不同地點做以相互備援

## CDN 的種類

### HTTP

- Push CDN（主動分發）
  - 我們自己將靜態內容上傳的 CDN 伺服器，適合較小流量或是不常更新的內容。
- Pull CDN（被動分發）
  - 我們可以設定靜態內容想被 CDN 快取的 TTL 存活時間，當請求進來時，CDN 服務發現距離最近的伺服器中已無「快取有效的內容」時，就會 Pull 最新的檔案內容。
  - Apple 發表大會時，在 CEO 發表最新產品後，Apple 的網站當下就要馬上能被全世界的果迷查詢到新產品得網頁內容，這樣的同步是怎麼做到的呢？
    - 最新網頁內容早已準備好！
    - 在大會現場，CEO 一講完，工程師在台下透過操作 TTL 存活時間，讓網站內容失效，果迷去訪問蘋果網站時，CDN 找不到快取內容，會發動 Pull 去拉最新資料回來給使用者。

### Live Streaming

- 直播串流

### VoD Streaming

- 影片也能 CDN，Youtube 就是利用 CDN 服務讓使用者可以在最近的伺服器取得內容，去重複播放或回放。常見的 OTT 服務包括：Netflix、LineTV、LiTV 等。
- 之前有機上盒播放侵權的盜版影片的新聞，其犯罪就是利用 VoD Streaming CDN。

## CDN 的缺點

缺點不外乎成本稍高，或是使用者分佈在 CDN 沒有服務的國家。我個人覺得最需要考量的因素是，以資安考量，我們是否願意將公司的網站文件控制權交由另一家公司負責？

如果預算有空間，且服務流量也頗不錯，CDN 就是寶。

---

## Reference

- [Image CDN](https://web.dev/image-cdns/)
- [CDN](https://docs.microsoft.com/en-us/azure/architecture/best-practices/cdn) - Microsoft
