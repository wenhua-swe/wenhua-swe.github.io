---
title: 自訂一個指令同時更新及備份 hexo 部落格（macOS）
pubDate: '2019-02-25'
description: 看完本文章，你可以自訂一個自己的指令，用來同時更新及備份 hexo 部落格，超級方便！
author: Wen-Hua Lin
tags:
  - blog
  - hexo
  - command
  - github
---


![](https://i.imgur.com/5QlDFL8.jpg)

## Preparation
#### 建立備份的repository
`hexo` 在 `_comfig.yml` 檔案可以設定部落格 `hexo d` 部署時，要部署到哪個`repository`，但是因為部署只會部署 `hexo g` (generate生成靜態網頁) 的 `public` 資料夾，我們也希望能備份樣式，所以要開好一個新的repository（我設為private），進入`.git/config` 修改備份的路徑。

#### 修改 `.git/config` 檔案

```bash
[remote "origin"]
url = 準備用來備份樣式跟設定的repository.git
fetch = +refs/heads/*:refs/remotes/origin/*
```


## 流程

#### 1. 進入 `/bin` 資料夾：
```bash
cd /usr/local/bin
```

#### 2. 檢視目前電腦有哪些指令：
```bash
ls
```

#### 3. 自訂你的個人指令，進入 insert 模式編輯內容：
```bash
vim your-command
```
PS. 若不存在這個檔案（你定義的名稱），vim 會在你儲存內容後自動建立這個檔案

#### 4. 建立批次執行的指令們：

```bash
#!/bin/bash
cd 你的部落格絕對路徑
git add .
git commit --amend --no-edit
git push -f

cd 你的部落格絕對路徑
hexo cl # 刪除已經生成的 public 資料夾
hexo g -d # 根據新內容生成 public 資料夾，並部署上線
```

`:wq` 或是 `:x` 存檔離開，這時候再來 `ls` 看看指令們當中有出現你自訂的指令了。

---

## 可能會遇到的問題


#### 權限不足

![](https://i.imgur.com/XbOdA9o.png)

檢視指令的權限：
```bash
ll -a your-command
```

如果發現權限只可讀，使用以下語法，加上執行的權限：
```bash
chmod u+x your-command
```

---
### 執行你的指令 `your-command` 試試吧！


ps. 要確認你的每一行指令，你都知道在做什麼事情，否則會無預期的發生嚴重錯誤喔！
