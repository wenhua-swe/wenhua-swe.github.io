---
title: 客製化你的部落格網址：Hexo blog x GitHub Pages
pubDate: '2020-08-31'
description: 你有使用 Hexo 架設部落格嗎？可以透過我的經驗分享，一步一步教你如何設定你的個人網址，簡單擁有自己的網路識別唷！
author: Wen-Hua Lin
tags:
  - 部落格網址
  - hexo blog
  - gitHub pages
---

![一起設定部落格的網域名稱](https://i.imgur.com/AkF90fa.jpg)

> 你有使用 Hexo 架設部落格嗎？可以透過我的經驗分享，一步一步教你如何設定你的個人網址，簡單擁有自己的網路識別唷！

## 必要 Prerequisites

- 先註冊好你的網址，比如說 `example.com`。
- 準備好透過 GitHub Pages 架的 Hexo 部落格與 Repository。

## 設定步驟 Configuration

### 設定 DNS 資訊：A Record 與 CNAME

![Godaddy 的 DNS 設定，要設定 A Record 與 CNAME](https://i.imgur.com/4SFSZRm.png)

前往你註冊網域的平台，來設定 DNS 的紀錄，我是在 Godaddy 上購買我的網域。

- 首先設定 `CNAME`，`www` 要指向 `<your-github-account>.github.io`
- 再來設定 `A Record`，`@`任意指向一台 GitHub 的主機 IP，基本上我是設定兩台，DNS Lookup 時會隨機導到其中一台。
  - `185.199.108.153`、`185.199.109.153`、`185.199.110.153` 、`185.199.111.153`
- 備註：一些紀錄是由 Godaddy 自動產生，比如 `NS` 或 `SOA` 或 `_domainconnect`，可以忽略。

### Dig 看看

可以在 `Terminal` 使用 `dig` 或是 `nslookup` 語法，來確定我們是否設定正確，DNS 在同步全球的 Record 時需要點時間。

![使用 dig 查詢自訂網域的結果](https://i.imgur.com/GkaZ4HA.png)

### 建立 CNAME 檔案

接下來要建立 `CNAME` 檔案，GitHub 才能識別我們的網站內容要轉導到哪裡。在使用 Hexo 架設的部落格中，我們要將這個 `CNAME` 檔案建立在 `source` 資料夾中，之後透過 `hexo build` 建置靜態網頁時，就能每次都在網站的根目錄下產生這個檔案。

而在 CNAME 檔案中，填上你購買的網域名稱。

比如說，我的內容是：

```html
example.com
```

### 更新 GitHub Pages 的設定

前往部落格 Repo 中的 `Settings` ，在 `Custom domain` 填上你購買的網域名稱。

![填寫自己購買得網域名稱](https://i.imgur.com/p9Aqyo7.png)

接著要設定 HTTPS，不過剛設定完自訂網域名稱後，有可能需要等一下 GitHub。

![準備啟用 HTTPS，發現還不能點選](https://i.imgur.com/dYt0cVP.png)

其實我過 15 分鐘左右的時間，就可以勾選 `Enforce HTTPS` 來強制啟用 HTTPS，增強安全性。

![勾選 Enforce HTTPS 這個選項](https://i.imgur.com/Gjk29A6.png)

OK，以上就是單純分享我自訂網域的過程。如果這篇文章有幫助你順利設定你部落格的網域名稱，請大方地在這篇文章留言，讓我知道吧！：）

內容如有錯誤或誤導，再請各位大大指正。
