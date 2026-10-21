---
title: 簡單 ssh 進 instance，用 ssh_config 來幫你設定 alias
pubDate: '2020-05-14'
description: >-
  如果服務越來越多，我們需要 ssh 進去的機器也變多了，當然我們不可能每次都去找到 IP 再來複製貼上，這樣不僅工作速度慢， content switch
  太頻繁會讓人心情不太好。所以來設定 ssh_config 拯救被浪費的時間！
author: Wen-Hua Lin
tags:
  - ssh
---

![Setting your ssh_config](https://i.imgur.com/tkH0Q0H.jpg)

## ssh 進機器

常需要 ssh 進機器裡，會使用下列格式的語法：

```bash
ssh -i ~/.ssh/[your-keyfile] [username]@[private_ip]
```

如果服務越來越多，我們需要 ssh 進去的機器也變多了，當然我們不可能每次都去找到 IP 再來複製貼上，這樣不僅工作速度慢， content switch 太頻繁會讓人心情不太好。因為超新手的關係，神同事可憐可憐我，貼了凍仁大大的[文章](http://note.drx.tw/2013/10/working-on-gnu-linux-20-sshconfig.html)讓我學習設定，很容易就能使用 😆，趕緊做筆記下來，一起加速！

## ssh_config

### 如何設定

**欄位介紹**

- `Host`：ssh 要連的代號名稱。
- `Hostname`：IP 或 Domain Name。
- `Port`：要連進去的 Port 號，ssh 沒改的話，預設 Port 號是 `22`。
- `User`：使用者名稱。
- `identityfile`：ssh key（絕對位置）。

```bash
# ----------------------------------------- #
# [STG] Service A
Host             service-a
Hostname         10.10.0.1
Port             22
User             wenhua_lin
identityfile     ~/.ssh/opsworks
# ----------------------------------------- #
```

### 如何透過 `~/.ssh/config` 連上主機

```bash
ssh service-a
```

哇，真的超簡單，之後又超方便使用的 alias 設定，分享給大家，拯救被浪費的時間。

---

## Reference

- [[完全用 GNU/Linux 工作] 20. 增進 SSH 使用效率 - ssh_config](http://note.drx.tw/2013/10/working-on-gnu-linux-20-sshconfig.html)
