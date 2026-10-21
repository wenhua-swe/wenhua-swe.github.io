---
title: 系統設計入門：效能與可擴展性的差異
pubDate: '2020-06-20'
description: >-
  當資源投入時，服務的效能還能增加，也就是「效能增長程度」與「資源投入」成正比時，那麼這個服務即擁有可擴展性。因為效能增加代表服務可以處理更多資料，也就能服務更多的工作單位，...
author: Wen-Hua Lin
tags:
  - system design
---

![系統設計入門：效能與可擴展性的差異](https://i.imgur.com/FkSEBlJ.jpg)

> 本系列文並非自己實務心得記錄，而是讀 [System Design Primer](https://github.com/donnemartin/system-design-primer/) 的筆記，有蠻大部分節錄自該文章以及其補充連結。

工程師常拿 Scalability 來討論，最後也常以「但是它不能擴」作為雙方的結論。這表示系統確實經常被限縮。

## 怎樣的服務算是擁有「可擴展性 Scalability」

比如說，為了提高所提供服務的可靠性，需要[納入冗餘（Redundancy）的設計理念，降低系統執行對單一伺服器的依賴程度](https://www.ithome.com.tw/news/115244)，卻不會因而犧牲效能。

當資源投入時，服務的效能還能增加，也就是「效能增長程度」與「資源投入」成正比時，那麼這個服務即擁有可擴展性。因為效能增加代表服務可以處理更多資料，也就能服務更多的工作單位，我們就擁有擴展資源的可能性，而不會為了會損失效能而選擇折衷，導致服務失去更多可能性。

## 對於單一個使用者來說

- 系統存在「效能」問題時，他會覺得「慢」。
- 系統存在「可擴展性」問題時，他會覺得較快，但系統「高負載」時，就會覺得「變慢」。
  - 比如某些演算法，使用者平常感覺都很良好，只有在系統進入高負載時會影響甚巨。

## 最難的地方

### 無法事後設計

- 因為可擴展性這件事情，必須要在事前先思考、設計、再開始開發，開發後才開始想到這一層面，往往無法因應。

### 異質性 Heterogeneity

- 需要考量不同版本的硬體設備都有其異質性，且更強大的工具通常需要付出更昂貴的成本。

## Check List

- 確保系統沿著期望的方向成長
- 哪裡需要冗餘
- 應該如何處理系統中的異質性
- Solution Architect 需知道在哪些條件下他們可以使用哪些工具以及其常見缺點

---

# Weekly Notes

- Multi-tier architecture：3-tier Architecture 是最常使用的架構，尤其是[電商網站](https://en.wikipedia.org/wiki/Multitier_architecture#Web_development_usage)。
  - Presentation Layer a.k.a. UI layer（Presentation tier）
    - PC, Tablet, Mobile, etc.
  - Application Layer（Logic tier）
    - Web Server
  - Database Server（Data tier）
- Performance → Scale-up
  - 新增機器，若依舊無法改善就是 Scalability Problem
- Scalability → Scale-out

  - Web Server
    - Load Balancer / L4 switch
    - 一定要有 health check
    - 一定要有 Policy 流量分配方式：
      - Round-robin 依序循環、
      - Least connection、
      - 先經過演算法 hash 過，指向 FQDN，印象中是 ELB 預設方式。
  - DB Server

    - Data Replication，加一層 HA proxy、ProxySQL、Route server
      - (Asynced) - Multi-source 有 Delay 的考量
        - Binlog 去備份，會自動比較差異
        - Read：很棒
        - Write：容易因為 delay 衝突
        - Scale-out：要寫 script 自動化去 sync
      - (Synced) - PXC - Data Read 量大可以選用的 solution，不然 node 多容易有效能慢的問題
        - Read：很棒
        - Write：等所有 DB server 都完成才算真正完成 ⇒ 寫入
        - Scale-out：自動化同步，但如果 size 大要找一個東西花很久時間
    - Data Partitioning and Sharding，加一層 Route Server
      - 水平分割：table 只存某種 type，比如身分證字號 A 開頭的存一個表
      - 垂直分割：table 只存某欄位，比如性別欄位存一個表
      - MongoDB Sharding：透過 Route server 去問 ConfigDB 取得 sharding key，得知要存在哪個表
        - Write：透過 ConfigDB 知道要寫到哪
        - Read：透過 ConfigDB 知道要存到哪
        - Scale-out：加新 node 很輕鬆，只要設定好 ConfigDB，自動化 re-balance data，做更合適的分散。

    ***

    - Jack 分享電商 XXhome 的經驗：
      - 現在的系統做大後要拆分的最根本原因是因為 User 需求量大增。
        - 所以背後有 Cluster 群在服務這些請求。
        - 再把來源拆一拆就能分流：
          - 圖片有專屬的機器
          - API 也拆一拆
      - 所以雲端服務：
        - 只要背後做得穩、快。
        - 剩下的就是做好使用者經驗，也就是 Front-end + UI/UX ⇒ 我自己的結論。

## Reference

- [System Design Primer](https://github.com/donnemartin/system-design-primer/)
- [A Word on Scalability - Werner Vogels](https://www.allthingsdistributed.com/2006/03/a_word_on_scalability.html)
- [Scalability, Availability & Stability Patterns](https://www.slideshare.net/jboner/scalability-availability-stability-patterns/)
