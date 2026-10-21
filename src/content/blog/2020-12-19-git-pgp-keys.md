---
title: 新增 Git GPG Key 增加安全性
pubDate: '2020-12-19'
description: GPG Key 可以讓我們的 commit 都確定是我們本人所新增的。我覺得很不錯！！推薦大家使用。
author: Wen-Hua Lin
tags:
  - git
  - gpg key
---

GPG Key 可以讓我們的 commit 都確定是我們本人所新增的。我覺得很不錯！！推薦大家使用。

可以照著這篇文章做：[參考文章](https://blog.keenthinker.com/github-signed-commits) from Peter。

![a verified badge](https://i.imgur.com/2M1kRmu.png)

## Preparation

- 下載並安裝 GPG 的 CLI 工具：[Mac OS X 下載處](https://sourceforge.net/p/gpgosx/docu/Download/)，有兩個檔案，分別是 DMG 和 sigature。

## Step 1: 產生 GPG key

### 檢查版本

```bash
gpg --version
```

### 透過 gpg 產生 keys

- ≥ 2.1.17

```bash
gpg --full-generate-key
```

- < 2.1.17

```bash
gpg --default-new-key-algo rsa4096 --gen-key
```

建議：
![終端機執行 gpg --full-generate-key 的完整互動過程：選擇 RSA、長度 4096、永不過期](https://i.imgur.com/bgoh7ws.png)

- GitHub 要求 RSA 加密
- 長度：4096，不建議超過這長度
- expiration：絕不
- 輸入名稱及 Email，比如說公司信箱
- 設定 GPG 密碼，並確認

## Step 2: 確認

- 顯示新產生的 Key ID，複製起來（ rsa4096 後面那串值）

```bash
gpg --list-secret-keys --keyid-format LONG
```

![gpg --list-secret-keys 的輸出，列出新產生的 RSA 4096 金鑰](https://i.imgur.com/ky71WEB.png)

## Step 3: 擷取 GPG 需要的資料

- 複製上一步驟取得的 ID，然後執行：

```bash
gpg --armor --export [ the Key ]
gpg --armor --export DEA763A6C33D812A
```

- 會顯示：

```bash
-----BEGIN PGP PUBLIC KEY BLOCK-----
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
-----END PGP PUBLIC KEY BLOCK-----
```

## Step 4: 將 GPG Key 加到 GitHub 中

> Avatar > Settings > SSH and GPG keys Page

- 點擊 New GPG Key
- 複製第三步驟時產生的 GPG Key

## Step 5: 在 local 端的 config 加上我們的 GPG key ID

```bash
git config --global user.signingkey [insert id from step 2]
```

## Step 6: commit 時預設啟用 GPG

```bash
git config --global commit.gpgsign true
```

## Step 7: Commit 試看看

```bash
git commit -S -m "added 2020"
```

- 這時會需要輸入 GPG 密碼，就會顯示 verifed。
