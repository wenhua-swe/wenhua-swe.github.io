---
title: 使用手機測試本機網頁狀況的方法
pubDate: '2019-01-04'
description: 同個網域下，使用電腦開啟 python 對外的 server。測試 RWD 及功能好方便。
author: Askie Lin
tags:
  - mobile
  - test
  - terminal
  - command line
---

## 前置

- [ ] 確保電腦與手機裝置是在同一個網域底下
- [ ] 要確認電腦是否有裝 python



### 方法（2019-07-16 更新）

1. 在 `iTerm` 進入專案的資料夾根目錄。

2. 找到對外 `IP`，要找 IPV4 的 。
```bash=
ifconfig // MacOS
ipconfig // Windows
```

3. 輸入以下指令，預設 `port` 是 `8000`。
- [ ] port 儘量使用 4 位數以上（因爲有一些是預設的 port 號，可能會有重疊到的可能）
```bash=
python -m SimpleHTTPServer [port]
```

4. 在瀏覽器輸入 `IP:port`，直接對外測試。
