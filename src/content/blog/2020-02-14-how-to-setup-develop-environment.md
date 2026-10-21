---
title: 從零開始設定自己的開發環境、軟體推薦（MacOS）
pubDate: '2020-02-14'
description: >-
  最近到了新的工作環境，公司配了一台新電腦，要從零來設置自己習慣的開發環境，所以除了安裝開發上很順手的工具以外，也額外想推薦大家來安裝能夠增加效率或是提升開發速度的軟體。這篇文章不會各別介紹每個工具詳細設定的流程，我選擇紀錄每個推薦的工具能夠為我解決什麼問題，等於是為了以後買新電腦又要重設開發環境做準備（？）
author: Wen-Hua Lin
tags:
  - w3HexSchool
  - development
  - tools
  - 開發環境
  - MacOS
---

最近到了新的工作環境，公司配了一台新電腦，要從零來設置自己習慣的開發環境，所以除了安裝開發上很順手的工具以外，也額外想推薦大家來安裝能夠增加效率或是提升開發速度的軟體。這篇文章不會各別介紹每個工具詳細設定的流程，我選擇紀錄每個推薦的工具能夠為我解決什麼問題，等於是為了以後買新電腦又要重設開發環境做準備（？）

## 1. HomeBrew
[HomeBrew 官網](https://brew.sh/index_zh-tw)
> 安裝各式套件的管道。

### 安裝指令
```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
### 安裝後，確認版本
```bash
$ brew --version
```

---

## 2. GIT
[GIT 官網](https://git-scm.com/)
> 版本控制管理系統，應該沒有開發者不知道，教學可以看高見龍老師的[為你自己學 GIT](https://gitbook.tw/)。

### 剛開始使用 GIT 的初始化
> 檢視目前電腦中 GIT 全域設定的使用者是誰。可以看這一篇[文章](https://gitbook.tw/chapters/config/user-config.html)。
```bash
$ git config --list

user.name=Eddie Kao
user.email=eddie@5xruby.tw
```

都還沒設定過的話，來設定一下：
```bash
$ git config --global user.name "Wen-Hua Lin"
$ git config --global user.email "wenhua_lin@xxxxxx.com"
```

### 每個專案使用不同作者
在自己的專案中，透過 `--local` 參數來達成：
```bash
$ git config --local user.name Kai
$ git config --local user.email "Kai@xxxxxx.com"
```

做好修改的檔案會在這底下：`~/.gitconfig`

加上 log 高亮語法及 alias 增進你的速度，我的 `~/.gitconfig`：
```
[user]
	name = Wen-Hua Lin
	email = wenhua_lin@xxxxxx.com

[alias]
	co = checkout
	br = branch
	cm = commit
	ca = commit --amend
	cane = commit --amend --no-edit
	st = status
	rb = rebase
	lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --branches
```

但其實如果說 alias 增進速度這一塊，我沒有使用很多 alias 的設定，只單純設定使用頻率頻繁的。

---

## 3. NVM
[NVM 官方文件](https://github.com/nvm-sh/nvm)
> 使用安裝 node，可以根據環境切換版本，也可以參考 node 官網對於 NVM 的使用說明：[Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/#nvm) 及這篇 [Mac OSX 新手入門](https://www.kancloud.cn/kancloud/mac-osx-for-newbie/50133)。

---

## 4. 安裝 iTerm 2 + Zsh
[iTerm 2 官網](https://www.iterm2.com/)
> 讓 Terminal 可以自訂顯示的資訊及 UI，如顯示所在路徑、GIT 分支及狀態其實不只是好看，能夠增加工作效率。

### 關於 Zsh 一定要使用的設定

#### 安裝 [Auto suggestions](https://github.com/zsh-users/zsh-autosuggestions) (for Oh My Zsh)

能夠讓我們在 Terminal 輸入指令時，自動提示輸入過的指令，激推！
簡述一下流程，流程取自於 PJCHENDer 的文章：[為 MAC 的 Terminal 上色 - 透過 iTerm 2 和 Oh My Zsh 高亮你的終端機](https://pjchender.github.io/2017/11/18/%E7%82%BA-mac-%E7%9A%84-terminal-%E4%B8%8A%E8%89%B2-%E9%80%8F%E9%81%8E-iterm-2-%E5%92%8C-oh-my-zsh-%E9%AB%98%E4%BA%AE%E4%BD%A0%E7%9A%84%E7%B5%82%E7%AB%AF%E6%A9%9F/)

在終端機輸入：
```
$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

打開 ZSH 設定檔：
```
$ open ~/.zshrc
```

找到 plugins = “” 的地方，在 plugins 的欄位中加入”zsh-autosuggestion”後存檔：
#### 原本
```
$ plugins=(git)
```

#### 改成
```
$ plugins=(git zsh-autosuggestions)
```

## 5. 安裝 Visual Studio Code
[VS Code 官網](https://code.visualstudio.com/)
> 很棒的免費的編輯器，有中文化，擴充套件也很齊全。

### 推薦安裝

1. VS Code： [SettingSync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
   > 有效備份每次的設定，在需要重新設定環境時，無痛接軌！
2. Terminal 使用 `code` 指令打開專案

想在 Terminal 想直接使用 VS Code 開啟專案嗎？
```bash
$ code . # 當前目錄路徑
$ code /anyDirectory/you/want # 資料夾路徑
```

如果遇見以下錯誤訊息該怎辦？
```
zsh: command not found: code
```
查看 StackOverflow - [“code .” Not working in Command Line for Visual Studio Code on OSX/Mac](https://stackoverflow.com/questions/29955500/code-not-working-in-command-line-for-visual-studio-code-on-osx-mac) 這篇說明唷！

## 6. 建立 SSH Key
[教學激推](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)
> 讓你從 GitHub 或 GitLab 拉原始碼回來時可以透過 SSH Key 的方式，安全、方便、快速的 clone。使用 HTTPS 的方式則是每次都會詢問帳號、密碼，非常繁瑣。

---

## 7. Postman
[POSTMAN 官網](https://www.postman.com/)
> 打 API 的好幫手。

---

## 8. Magnet（付費）
[Magnet 官網](https://magnet.crowdcafe.com/)
[App Store 下載](https://apps.apple.com/us/app/magnet/id441258766)
> Window Manager，讓 MAC 使用者用快速鍵就能輕鬆分配應用程式該放在螢幕的哪個位置。Perfect！

記錄完了，收工！
