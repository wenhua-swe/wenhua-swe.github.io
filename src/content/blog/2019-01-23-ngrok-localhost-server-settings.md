---
title: ngrok 的設定，來架一個臨時伺服器！
pubDate: '2019-01-23'
description: >-
  ![](https://i.imgur.com/tVPbUsC.png)## 緣起為了解決 `facebook API` 需要 `https`，所以利用
  `ngrok` 架了一個網頁伺服器...
author: Askie Lin
tags:
  - ngrok
  - https
  - web server
  - api
  - testing
  - chatbot
---


![](https://i.imgur.com/tVPbUsC.png)


## 緣起
為了解決 `facebook API` 需要 `https`，所以利用 `ngrok` 架了一個網頁伺服器（`Web Server`）。

跟著步驟做，輕鬆就能架起來，並且可以達成以下這些事：
* Public URLs for sending previews to clients.
    * 讓客戶可以輕鬆預覽你的專案。
* Public URLs for testing your chatbot.
    * 測試你的機器人。
* Public URLs for SSH access to your Raspberry Pi.
    * 輕鬆設定 SSH 連結樹莓派。
* Public URLs for demoing from your own machine.
    * 從自己的裝置 demo。
* Public URLs for exposing your local web server.
    * 架一個臨時伺服器。
* Public URLs for testing on mobile devices.
    * 測試行動裝置。
* Public URLs for building webhook integrations.

## 步驟

### 1. 從官網下載 `ngrok`。
[網址](https://ngrok.com/download)

### 2. 解壓縮
將檔案放在你的專案下，並且點兩下執行。

### 3. 取得 `token`
從官網註冊你的信箱，取得 [token](https://dashboard.ngrok.com/auth)

### 4. 開啟你的 `terminal`（我使用 `iTerm`），進入專案底下執行：
```
./ngrok authtoken <YOUR_AUTH_TOKEN>
```
### 5. 架起渠道：
```
./ngrok http 80
```
### 6. 讓 `localhost` 對外
用 `Python` 的 `SimpleHTTPServer` 模組建立一個臨時網頁伺服器（Web Server），`port` 要與 `ngrok` 要開的 `port` 相同。
```
python -m SimpleHTTPServer [port]
```
### 7. 大功告成
可以透過網址直接讓`localhost` 對外進行測試囉！不過要注意的是，如果關閉server，網址也會失效，下次重啟則是新的網址。

