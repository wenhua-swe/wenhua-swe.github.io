---
title: Git diff 指令快速查詢！
pubDate: '2019-01-15'
description: 用來比較差異的 diff 指令這麼多，常用的 cheatSheet 整理。
author: Askie Lin
tags:
  - git
  - diff
---

![](https://i.imgur.com/BDYNv9o.jpg)

## 名詞解釋

- **Staging Area (Index)**
  - 暫存區域是一個單純的檔案，一般來說放在 Git 目錄，儲存關於下一個提交的資訊。有時稱為索引（Index），但現在將它稱為暫存區域已開始成為標準。

---

## 用來比較差異的 diff 指令

### 比較 Working Directory 和 Staging Area

```bash=
git diff
```

---

### 比較 Working Directory 和 HEAD

```bash=
git diff head
```

---

### 比較 Working Directory 和該 commit 的 tree 物件

```bash=
git diff commit
```

---

### 比較 Staging Area 和 HEAD

```bash=
git diff --cached
git diff --cached head
git diff --staged
```

---

### 比較 Staging Area 和該 commit 的 tree 物件

```bash=
git diff --cached commit
```

---

### 比較兩個 branch 之間的 HEAD

```bash=
git diff branchName..branchName
git diff branchName branchName
```

---

### 比較 branch2 和兩個 branch 的共同祖先

```bash=
git diff branch1...branch2
```

---

### 比較兩個 commit 物件下的 tree 物件

```bash=
git diff commit commit
```
