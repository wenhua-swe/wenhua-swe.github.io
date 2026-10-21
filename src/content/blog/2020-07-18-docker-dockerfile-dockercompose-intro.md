---
title: Docker 初探：基本指令與簡單介紹 Dockerfile 和 docker-compose
pubDate: '2020-07-18'
description: >-
  讀 Docker 背景之前覺得會不會因為文鄒鄒讀不下去，讀完之後才發現只有這樣才能更了解歷史脈絡，以及這個技術背後的基礎是基於什麼，也是挺有趣的。關於
  Docker 的前世今生是透過讀書才理解的，這一篇文章算釐清了之前搞不太清楚的概念跟幾個名詞 Dockerfile 和 docker-compose。
author: Wen-Hua Lin
tags:
  - docker
  - dockerfile
  - docker-compose
---

![Docker 初探：基本指令與簡單介紹 Dockerfile 和 docker-compose](https://i.imgur.com/RmENBKv.jpg)

## TL;DR

本文不會有太多語法說明，打算介紹：

- Docker 的前世今生
- Container 名稱由來
- 如何運行基本的 Docker 指令
- 簡單介紹 Dockerfile 和 docker-compose 的用途（新手常搞不清楚）

一切內容僅是讀書紀錄，讀的書請參考本文最下方的 Reference，如果有錯誤請大家指正觀念。

讀 Docker 背景之前覺得會不會因為文鄒鄒讀不下去，讀完之後才發現只有這樣才能更了解歷史脈絡，以及這個技術背後的基礎是基於什麼，也是挺有趣的。

## Docker 的前世今生

> Containers are based on virtualization technology.

### 虛擬化技術

電腦出現之後，開發者思考的是如何將程式無縫移植到其他機器還能正常執行，由於不同廠商生產的 CPU 其指令集往往差異很大、機器會連接不同硬體、運行不同作業系統等原因，所以環境一致性是最困擾的問題。在這方面，IBM 是做最早提出虛擬化的公司（60 年代），讓程式執行於虛擬環境時，看不見被隱藏的真實環境，取而代之的是被事先設定好的硬體環境，從而彌平環境問題。

- 硬體虛擬化
  - 當時的解決方案僅限解決 IBM 大型硬體機器，成本過高，於當時也不易推廣。從前的大型網站通常採用大型實體機器，網路發展快速，漸而轉向小型機器發展，隨著雲端計算時代來臨，計算的量變得巨大，升級機器的成本指數成長，好可怕！

### 分散式系統

現在大型服務可以透過將應用程式分散到各地不同的小型機器上，再組成叢集一起計算、協作，完成該服務需提供的工作，就可稱作分散式系統。當很多大公司開始採用叢集方式建構服務，比如臉書，程式部署在不同機器上的環境問題又浮上檯面。（叢集定義可查看 [wiki](https://en.wikipedia.org/wiki/Computer_cluster)、[鳥哥](http://linux.vbird.org/linux_server/0600cluster.php#theory_whatiscluster)更多介紹）

而「虛擬化技術」是電腦資源的管理技術，CPU、Storage、Network，將資源抽象化為統一介面給程式。

- 軟體虛擬化
  - 虛擬機器（Virtual Machine）就是軟體實作，通常會在應用程式和硬體資源將建立一個 Hypervisor 層，它是統一的呼叫介面，將呼叫轉換為實體主機對應的資源呼叫方式。

### 容器化技術

虛擬機器，簡稱 VM，在跨平台部署有很好的表現，只是低落效率阻礙它的發展，而後衍伸了容器化技術的概念：**將應用程式打包到單獨的容器中、封裝，容器可以隔離每個程式並打斷程式的依賴關係。**

好處：

- 就像堆積木（Component）一樣，結構鬆散，降低程式之間藕合性
- 擁有統一的介面，很容易重新組裝和抽換服務的功能

提一下 Linux Containers（LXC）它是作業系統層級的虛擬化技術/容器，它運用實體機器資源再模擬虛擬環境，所以移除 Hypervisor 層，不用再轉換指令，大幅提高效率囉！

- 主要有兩項核心功能組成：
  - Namespace 命名空間
    - 隔離的用途
    - 很容易將不同程式隔離在不同環境，也就是說不同命名空間的程式是互不可見
  - CGroups （Control Group）控制群組
    - 資源管控
    - 如同大腦般的控制該容器可用的電腦資源：CPU、Memory、IO

## Docker

2013 年，dotCloud 公司將內部開發的 Docker 開源，基於上面提到的 LXC 技術基礎，將系統設計容器轉為微服務（Micro-service）的容器！因為很火熱，dotCloud 後來索性改名叫做 Docker Inc 現在成熟的 Docker 已經不是以 LXC 為架構，而是自己開發的 Libcontainer 作為底層的技術。

我們不用再管虛擬化怎麼實現的，只要管容器該怎麼操作！

（翻譯蒟蒻：**只要管積木該怎麼拼 ⇒ 只要管程式元件該怎麼組成**）。

### Docker 啟動與執行

![啟動與執行的概念](https://i.imgur.com/Pqi0KUz.png)

- 啟動：啟動 Docker 時，其實啟動的是背後的 Server - Docker Daemon
- 執行：控制 Docker CLI，透過 Docker REST API 發送指令給 Docker Daemon

### Docker 四大核心模組

- Image 映像 ⇒ 容器要打包的程式
- Container 容器 ⇒ 隔離好的環境
- Data Volumes
- Network

### Container 容器一詞的由來

早期的運輸皆是靠海運，因為貨物規格、形狀、材質都不一樣，工人為了最大化運用船的空間，需要花費大量時間裝卸。碼頭數量有限，如果每一艘船都很慢，效率很不佳，直到貨櫃的發明，貨櫃被設計成規格大小皆一致，大大提升運輸效率，促進全球化。

Container 的中文翻譯就是貨櫃的意思。

- 貨櫃：把「貨物」隔離到不同「箱子」中，消除「不同貨物規格」的影響。
- 容器：把「程式」隔離到不同「容器」中，消除「不同執行環境」的影響。

## Docker Image

> 顯示：wenhua/helloworld:lastest
> 格式：`Namespace`/`Repository`:`Tag`
> 由此格式會用 Sha256 方式加密成為 Image ID （64 位元 16 進位字串）

- Namespace：用來辨別組織或個人，可以寫自己名字
- Repository：檔案名稱，寫應用程式名稱
- Tag：參考 Git 的 Tag，也是用來記錄程式的版本

## Docker 基本使用流程

![Docker 基本使用流程類似於 GIT](https://i.imgur.com/ClW047d.png)

> 超級類似 GIT 的概念吧！

- DockerHub（Public）

類似 GitHub，是可以上傳跟下載的 Docker 公開庫。

- Docker Registry（Private）

有些企業會考量隱私性及安全性，在內部網路架設一台 Docker Registry Server（Private）。

Local 端安裝好 Docker 之後... 安裝流程請參考官網，這裡不贅述。

### 1. 拉一個 Image 回來

- 檢視現有 Image 有哪些：

```bash
docker image ls
```

- 假設拉一個普羅米修斯回來：

```bash
docker pull prom/promtheus
```

- 還記得 image 格式 `Namespace`/`Repository`:`Tag`？不加 tag 時，預設會拉最新版本回來！

### 2. Container 跑起來

- Run 起一個 Container：用 prom/promtheus 這個 image 背景執行一個容器環境，取名叫做 prom-server。

```bash
docker run -d -p 9090:9090 --name prom-server prom/promtheus
```

參數說明：

- `-d` 背景執行
- `-p` port 號設定，本機 9090 port 來對應虛擬環境的 9090 port
- `—-name` 容器名稱

### 3. 進入 Container 執行環境

```bash
docker exec -it prom-server /bin/sh
...
...
做你要做的事情
```

- 進入執行環境中的 `/bin/sh` 資料夾下，類似於 SSH 進入機器的概念

### 4. 版控更新過的 Container 環境

```bash
docker commit -m "test" <your_image_id> wenhua/prometheus:v2
```

- `-m` 輸入版本控制的訊息狀態
- `your_image_id` 透過 `docker image ls` 取得要紀錄的 ID

### 5. 將新 Image 推到 Docker Registry

```bash
docker login
docker push wenhua/prometheus:v2
```

- 要 login 需註冊並且有權限

---

## Dockerfile

Dockerfile 是一個設定檔，專門管理單一 Container，讓我們可以透過指令的設定，快速地更新 Container 的環境。

- `Dockerfile` 檔案內容，注意，首字大寫

![Dockerfile 檔案的內容](https://i.imgur.com/FomCA9N.png)

- 透過 Docker CLI 來快速更新容器環境

```bash
docker build -t vrops_prometheus
```

## docker-compose

現在很多服務背後都是採用分散式系統的架構，所以一個微服務用一個容器裝起來，眾多的微服務，就需要使用可以管理多個 Container 的工具 docker-compose。（題外話：有了 K8S，基本上工作上都是採用 K8S 來管理多個容器，功能強大！）

它的基本指令很簡單，其原理是撰寫 `docker-compose.yml` 來設定你的 services 該指向哪些 image、Port 對應、該走哪些任務。

```bash
docker-compose start
docker-compose stop

docker-compose pause
docker-compose unpause

docker-compose ps
docker-compose up
docker-compose down
```

## CheatSheet

> 有了以上這些基礎觀念之後，接下來只要熟悉語法即可。

- [Docker CLI CheatSheet](https://devhints.io/docker)
- [Dockerfile CheatSheet](https://devhints.io/dockerfile)
- [docker-compose CheatSheet](https://devhints.io/docker-compose)

好了，初探就介紹到這裡了，歡迎指正，也希望對新手有點幫助，觀念通了工具用起來才有感覺。

---

## Reference

- [Docker 專業養成 活用基礎與實踐技能 — 熊昌隆](https://www.tenlong.com.tw/products/9789864344437?list_name=b-m-zh_tw-2020-6)
- 我同事
