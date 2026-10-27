---
title: Web Accessibility：這 30 天的遺珠之憾與補充
pubDate: '2019-10-15'
updatedDate: '2026-10-27'
description: >-
  系列最終篇：最終複習、30 天以來世界上的無障礙又更新了哪些重要訊息、遺珠之憾（SVG、CSS Grid、JavaScript 的焦點管理、WebGL、NVDA
  與 ChromeVox），以及關於網站可訪問性的面試題目與補充感謝。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 30（[原文連結](https://ithelp.ithome.com.tw/articles/10228333)）。
>
> 2026-10-27 依美國最高法院案卷與第九巡迴上訴法院判決、WebAIM、Google 官方說明與 WAI-ARIA 1.2 校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

![一家三口相擁微笑的照片](/images/ironman-a11y/day30-1.webp)

（圖片來源：[Unsplash](https://unsplash.com/photos/GM5Yn5XRVqA)）

> My idea of society is that while we are born equal, meaning that we have a right to equal opportunities, all have not the same capacity. - 甘地  
> （分享[自回歸初心，一探Web Accessibility](https://medium.com/frochu/baaa4d22f4a7) - Wendell Liu）

網站的訪問性是一個很有使命感的題目，隨著寫到後段，越寫越懂得前段的缺失。

這次主題是為了喚起大家對數位產品訪問性的重視，一個不熟的主題，當天吸收資訊，整理思考脈絡而產出文章，肯定細節有失，之後也會將這一系列文章整理到我的部落格「[Askie's Coding Life](https://wenhua-swe.github.io/)」，歡迎大家之後在我的部落格提任何的 Issues 指正與建議還能更好的地方（任何文章都可以喔）。

以前我不懂，懵懵懂懂地，做得出來不就好了嗎？現在，隨著對訪問性的思考，更理解網頁工程師的本質，讓大眾都能公平使用我們創造的產品，跟追求效能、Clean Code 一樣重要。

---

今天的內文將包含以下內容：

## TL;DR

- 最終複習
- 30 天以來，世界上的無障礙又更新了哪些重要訊息呢？
  - 法律相關
  - 數據
- 遺珠之憾
  - 主題：SVG
  - 主題：CSS Grid
  - 主題：JavaScript 的焦點管理
  - 主題：WebGL 之於網頁訪問性的挑戰
  - 輔助工具：NVDA 與 ChromeVox
  - 關心訪問性的數位產品
- 關於網站可訪問性的面試題目，拿來問問自己吧！
- 補充與感謝

---

## 最終複習

![太空人在月球插上無障礙標誌旗幟，旁邊是 Angular 火箭](/images/ironman-a11y/day30-2.webp)

（圖片來源：[deque](https://www.deque.com/blog/angular-and-accessibility-issues-and-strategies/)）

開發時，請記住以下幾點：

- 如果頁面／視圖更新，請正確管理頁面標題
- 盡可能使用正確的語義 HTML
- 沒有語義 HTML，就要使用 ARIA 正確地標記內容
- 嘗試限制自定義 HTML 標籤的使用
- 當內容是非同步時，確保正確管理焦點
- 在編寫組件程式碼時，使用可訪問性測試工具（例如 axe）來測試您的內容是否存在可訪問性問題

---

## 30 天以來，世界上的無障礙又更新了哪些重要訊息呢？

### 法律相關

- 美國最高法院駁回了達美樂的~~訪問性訴訟案~~ <ins>上訴（拒絕受理），第九巡迴上訴法院對盲人原告有利的判決因此維持，案件發回地方法院繼續審理</ins>，看這裡：[U.S. Supreme Court Favors Digital Accessibility in Domino’s Case](http://www.webaxe.org/supreme-court-favors-digital-accessibility-dominos-case/)。

> [!更正]
> 原本的寫法會讓人以為訴訟被駁回，意思剛好相反。這個案子（Robles v. Domino's Pizza）是盲人原告 Guillermo Robles 告達美樂的網站與 App 無法用螢幕閱讀器操作；2019 年 1 月第九巡迴上訴法院認定 ADA 適用於達美樂的網站與 App，推翻地方法院的駁回並發回重審。達美樂向最高法院聲請調卷審理（petition for a writ of certiorari），最高法院在 2019 年 10 月 7 日駁回的是這份聲請，所以對原告有利的判決繼續有效。
>
> 來源：[Supreme Court of the United States — Docket No. 18-1539](https://www.supremecourt.gov/search.aspx?filename=/docket/docketfiles/html/public/18-1539.html)、[Ninth Circuit — Robles v. Domino's Pizza, No. 17-55504 opinion](https://cdn.ca9.uscourts.gov/datastore/opinions/2019/01/15/17-55504.pdf)

### 數據

- WebAIM 在 2019 年 8 月 ~ 2019 年 9 月對於螢幕閱讀器進行了調查，包含了瀏覽器的使用數據與遇到的最大困擾等等，~~最新~~ <ins>當時的</ins>數據看這裡：[Screen Reader User Survey #8 Results](https://webaim.org/projects/screenreadersurvey8/)；<ins>目前最新的是 2026 年 7–8 月的 [Screen Reader User Survey #11](https://webaim.org/projects/screenreadersurvey11/)</ins>。

---

## 遺珠之憾

### 主題：SVG

> 文章資源：[Creating Accessible SVGs](https://www.deque.com/blog/creating-accessible-svgs/)

圖片的可訪問性，一直漏掉了 SVG 的部分，該文中整理了：為 SVG 補充語義的多元方式，並將其透過不同輔助裝置瀏覽會讀出的內容！到底哪些組合是訪問性最佳解呢？

### 主題：CSS Grid

> 文章資源：[The Dark Side of the Grid (Part 1)](https://www.matuzo.at/blog/the-dark-side-of-the-grid/)

`CSS Grid` 網格佈局由於其靈活性而成為最近最令人興奮的 CSS 規範之一，它使我們的生活變得更加輕鬆，但同時也給使用者體驗和可訪問性帶來了新的危險，想了解的人來讀一下吧。

### 主題：JavaScript 的焦點管理

> 文章資源：[Notes On Client-Rendered Accessibility](https://www.smashingmagazine.com/2015/05/client-rendered-accessibility/)

透過 aria-live 去管理即時更新的介面，透過 dataset，巧妙運用 `data-focus-id` 去管理焦點。

### 主題：WebGL 之於網頁訪問性的挑戰

> 文章資源：[Handling common accessibility problems](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility)（MDN 改版後原文已不存在，網址會轉到內容不同的新頁面）

文章只有提到了一句 WebGL，在講我們使用 WebGL 去建立盲人可訪問的遊戲未免太強人所難，但若可以實現支援鍵盤操作的話，就已大幅度的提升無障礙了。關於遊戲的訪問性可以看這篇文章：[Accessibility at the W3C Workshop on Web Games](https://developer.paciellogroup.com/blog/2019/07/accessibility-at-the-w3c-workshop-on-web-games/)（原部落格已關閉，連結已失效）。

### 輔助工具：NVDA 與 ChromeVox

- [NVDA](https://www.nvaccess.org/)（全名為 NonVisual Desktop Access）

一款是用於 Microsoft Windows 作業系統的[免費開源軟體](https://en.wikipedia.org/wiki/NonVisual_Desktop_Access)，念出來的內容會和 VoiceOver 有點不同，如果有需要的朋友可以安裝看看。

- [ChromeVox](https://support.google.com/chromebook/answer/7031755)

一款免費的螢幕閱讀器，ChromeVox 已預裝在 Chromebook 上，是購買 Chromebook 的朋友可以使用的輔助功能。

### 關心訪問性的數位產品

> 文章資源：~~Accessibility Insights~~ <ins>[Accessibility Wins](https://a11ywins.tumblr.com/)</ins>

這些都是有思考訪問性的數位產品，連電視都有？

---

## 關於無障礙的面試題目，拿來問問自己吧！

> 面試題目 repo：[accessibility_interview_questions](https://github.com/scottaohara/accessibility_interview_questions)

題目一共分為三類別：通用（General）、技術（Technical）、設計（Design），透過這些題目，剛好可以拿來反思，自己對於網站訪問性的理解，遇到這些問題，自己的解答、處理方式會是？

---

## 補充與感謝

### [WAI-ARIA 角色關係圖](https://www.w3.org/TR/wai-aria-1.2/img/rdf_model)

![WAI-ARIA 1.1 角色分類關係圖](/images/ironman-a11y/day30-3.webp)

### [TeachAccess](http://teachaccess.org/)：

> 2015 年由 Adobe、Facebook、Google、HP、Intuit、LinkedIn、Microsoft、Paciello Group、Verizon Media（最初為 Yahoo）以及其他大學共同創立。

這是一個教開發者開發可訪問技術的網站，很簡短卻很有力，適合快速了解 Web Accessibility 技術的人，[資源](https://teachaccess.github.io/tutorial/)也提及 VoiceOver 該如何操作。

### 感謝[好想工作室](https://www.facebook.com/GoodideasStudio/)

> 耶～超級感謝好想工作室的全部夥伴，一起完成了挑戰！

- Howard 總是鼓勵我們使用部落格紀錄心得與生活，整理脈絡與經營自己是很重要的；
- [Chris](https://github.com/dwatow) 手把手教我們[使用 Hexo 建立部落格](https://dwatow.github.io/2017/06-11-hexo/init-hexo-blog/)，還分享「通用設計」的概念，是因爲這個緣起，發現了自己視野的狹隘，想瞭解通用設計與網頁無障礙設計的差異；
- [Ray](https://github.com/tn710617) 用最堅定的態度[寫文章](https://medium.com/@raycodingjourney)，也常常和我一起討論要怎麼能更好；
- [Sarah](https://github.com/Yu-hanCheng) 義不容辭地陪我拜訪台南無障礙的單位，她一直用她的方式愛這個世界；
- [翠霏](https://github.com/tsuifei)一直用最溫暖的話語關心這段期間的挫折；
- [企鵝](https://github.com/PenguinRun)分享了胡立的 [mentorship-program](https://github.com/aszx87410/mentorship-program) 引路人計畫，他也是我的引路人之一；
- [Kai](https://github.com/LiaoYingKai) 建議我時間的分配方式，寫文的策略。

### 感謝 [Huli](https://github.com/aszx87410)

胡立！陪我調整了最一開始的文章大綱，最一開始對無障礙的整體概念很零散，支離破碎的關鍵字，加上亂七八糟的文章結構，後來他給了我實際的建議，還親自調整給我看（好有愛），看到什麼相關資源就會貼給我，幫助超級大啦，謝謝。

想知道獲取無障礙最新資訊可以訂閱哪些東西嗎？因為太有幫助了，之後再分享到[我的部落格](https://wenhua-swe.github.io/)，歡迎踏踏！！！

## 更正紀錄

- 2026-10-27：依美國最高法院案卷（No. 18-1539）與第九巡迴上訴法院判決更正達美樂案的結果；「關心訪問性的數位產品」的資源名稱改為正確的 Accessibility Wins；補充 WebAIM 最新的螢幕閱讀器調查；ChromeVox、WAI-ARIA 角色關係圖（改為 1.2）與舊部落格連結已更新，標註 MDN 舊文與 Paciello Group 部落格連結已失效。
