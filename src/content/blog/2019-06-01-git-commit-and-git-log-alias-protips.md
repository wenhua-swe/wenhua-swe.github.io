---
title: 開發者一定要知道的 GIT tricks
pubDate: '2019-06-01'
description: 修改了某些檔案，一次只 commit 其中某幾個檔案，該怎麼做？
author: Wen-Hua Lin
tags:
  - git
  - git log
  - git commit
  - git alias
---

## 修改了某些檔案，一次只 commit 其中某幾個檔案

假設我們在開發的過程當中，做了某些檔案的修改。

```bash
git status

# 看到以下的狀態
On branch develop
Changes not staged for commit:
  (use "git add <file>..." to update what will be commited)
  (use "git checkout -- <file>..." to discard changes in working directory)

modified: document.json
modified: package-lock.json
modified: package.json
modified: src/app/app.component.html
modified: src/app/app.component.ts
modified: src/app/app.module.ts
modified: src/index.html
modified: src/styles.css

no changes added to commit (use "git add" and/or "git commit -a")
```

可是我只希望部分檔案加入 `staging area`，比如寫 component 時很好用，現在只希望加入 **src/app/app.component** 開頭的兩個檔案： `src/app/app.component.html`、`src/app/app.component.ts`。

```bash
# 原本要這樣加入
git add src/app/app.component.html src/app/app.component.ts

# 現在只要這樣寫
git add src/app/app.component-*
```

想加入相同檔案類型的語法就是反過來，比如加入 `.html` 檔案：

```bash
git add *.html
```

---

## 下 git log 時，提高可讀性，顯示時間、下 commit 的人

在使用 GIT 的時候，常常需要檢視我們的 commit 紀錄，而查看紀錄的語法是 `git log`。

一般來說，我們在 `terminal`下 `git log` 會看到以下訊息：

```bash
commit 9a7f06bd416decd8ec8463248d159cde67c48c82
Author: Wen-Hua <youremail@gmail.com>
Date:   Fri Oct 12 13:05:45
```

內建呈現的格式提供的資訊並不符合每天查閱的需求，所以接下來會教你會加入一個 `alias` ，指向新的設定。

```bash
# 在專案底下查看 git 設定檔
vim ~/.gitconfig
```

```bash
# .gitconfig 檔案
[alias]
		lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --branches
```

```bash
git lg
```

![.gitconfig file](https://i.imgur.com/M3B7eo9.png)

可以看到有顯示以下資訊（請忽略新手還亂亂的 commit 的訊息，以及把顏色改掉了看不出來這件事>//<）：

- SHA1
- HEAD 指向哪個 commit
- 分支名稱
- Commit message
- 合併分支的流程以圖形介面呈現
- 多久以前 commit
- 誰做了這個 commit

### 更多設定 `alias` 的內容可以參考[為你自己學 Git-其它方便的設定](https://gitbook.tw/chapters/config/convenient-settings.html)。

本文章內容是參考 `egghead.io` 的 Juri Strumpflohner 所開的 [Productive Git for Developers](https://egghead.io/courses/productive-git-for-developers)
課程內容包含下面的情境，想學習的可以去**訂閱**唷！

1. 修改了某些檔案，一次只 commit 其中某幾個檔案
2. 下 git log 時，提高可讀性，顯示時間、commit 的人
3. 不小心把 commit 下在 Master，如何移動某些 commits 到另一個新分支？
4. 取 master 最新的 commit 內容，搬到現在正在開發中的 feature branch
5. 將本地端有 rebase 過的分支 push 到遠端（使用 --force-with-lease）
6. 在提交要給夥伴 review、merge 前，怎樣整理好我們的 git branch
7. 利用 Git Autosquash 自動清理我們的 feature branch（有時候開發途中會發現其他小問題，會產生一些 fix 這種可讀性低的 commits）
8. 整合數個 commits 成一個 commit，並且 merge 到 master
9. message 打錯了！只修改最後一次 commit 的 message
10. 少 commit 一個要的檔案！補到最後一次 commit 當中
11. 取消最後一次 commit 並且將它切成兩個
12. 從 branch 當中永遠移除某個 commit（使用 git reset）
13. 將不小心 push 到遠端 Repository 的 commit 取消
14. 暫存一些正在做的事情，因為我現在需要跳到其他分支
