---
title: 真實世界：使用 Android 輔助功能 TalkBack 來瀏覽行動版網頁
pubDate: '2019-10-14'
updatedDate: '2026-10-27'
description: >-
  TalkBack 是 Android 裝置內建的 Google 螢幕閱讀器，跟 VoiceOver 一樣都是透過手勢來操作手機。今天想介紹手機中經常使用的手勢，以及拜訪臺南市視覺障礙生活重建服務中心後，對使用輔助工具瀏覽網頁的觀察。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - TalkBack
  - 螢幕閱讀器
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 29（[原文連結](https://ithelp.ithome.com.tw/articles/10228060)）。
>
> 2026-10-27 依 Google 官方〈使用 TalkBack 手勢〉、Samsung 官方說明與 WebAIM 螢幕閱讀器調查校訂，改動處以刪除線或「更正」框標示，失效連結已直接更新。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

![Google A11ycasts「Assistive Tech: TalkBack」影片畫面](/images/ironman-a11y/day29-1.webp)

（圖片來源：[Google](https://www.youtube.com/watch?v=0Zpzl4EKCco)）

> 維基百科：  
> Google Talkback was an accessibility service for Android that helped blind and visually impaired users to interact with their devices. It made use of spoken words, vibration and other audible feedback to allow the user to know what is happening on the screen allowing the user to better interact with their device.

TalkBack 是 Android 裝置內建的 Google 螢幕閱讀器，跟 VoiceOver 一樣都是透過手勢來操作手機，互動朗讀功能讓你可以不用看手機螢幕就能完成操作，開發者也許會頭疼，啊我要支援這麼多種裝置、工具有可能嗎？其實，如果先從工具下手，瞭解它們的原理，再找出行為重疊的部分，我們就能針對重疊的部分，做最有效的努力。

今天想介紹手機中經常使用的手勢，大部分是從黃帝瑋老師的整理的簡報中學習來的，還要謝謝臺南市視覺障礙生活重建服務中心的專員及老師熱心協助。

## Android TalkBack - 開啟設定

![Android 開啟 TalkBack 的設定步驟](/images/ironman-a11y/day29-2.webp)

（圖片來源：[談談行動裝置的Accessibility - 黃帝瑋老師](https://accessibility.moda.gov.tw/News/Detail/4337?Category=43)）

- `設定` > `協助工具` > `TalkBack` > `開啟`
- 根據 Android 版本不同有流程上的差異，可以查看 [Android 官方文件](https://support.google.com/accessibility/android/answer/6007100)。
- 建議開啟快捷鍵的設定，比較方便。
- 我自己的 Samsung Tab 中的輔助工具，語音輔助工具的名稱是 Voice Assistant，啟用之後，它提供非常詳細的中文語音引導，只要跟著語音講解的手勢就能快速學會操作了，喜歡！

> [!更正]
> Samsung 後來已把自家的 Voice Assistant 和 Google TalkBack 合併成同一套螢幕閱讀器，現在的 Galaxy 裝置上看到的是 TalkBack，不再有獨立的 Voice Assistant。
>
> 來源：[Samsung — Voice Assistant + TalkBack](https://www.samsung.com/au/business/sustainability/accessibility/mobile/voice-assistant/)

## 基礎手勢整理

### 調整數值（與 VoiceOver 相同）

- 手勢：~~上下滑動~~ <ins>按音量鍵上／下，或單指「右再左」（調高）、「左再右」（調低）</ins>
- 常用指數：ＯＯＯＯＯ
- 備註：當使用者需要調整 slider 時，就能透過~~上下滑動的手勢~~ <ins>上面的手勢</ins>操作數值的高低，什麼是 slider？舉例來說就是跟~~上圖的圖三~~ <ins>[前一篇 VoiceOver 文章](/blog/2019-10-13-a11y-ios-voiceover-mobile-web/)截圖的圖三</ins>「朗讀速度」一樣，提供滑軸作為調整與控制的元件。

> [!更正]
> 這裡跟 VoiceOver 不一樣，標題的「與 VoiceOver 相同」是錯的。依 Google 官方的 TalkBack 手勢表，調整滑桿（Move up / down the slider）是按音量鍵，或單指「右再左」、「左再右」；單指上下滑在 TalkBack 是切換或使用「閱讀控制項」（reading controls），例如依字元、字詞、標題跳轉，不會直接改滑桿的值。8.2 以下與 9.1 以上的版本都是這樣。
>
> 來源：[Android 無障礙說明 — 使用 TalkBack 手勢](https://support.google.com/accessibility/android/answer/6151827)

### 選擇焦點（與 VoiceOver 相同）

- 手勢：左右滑動
- 常用指數：ＯＯＯＯＯ

### 點選（與 VoiceOver 相同）

- 手勢：點一下
- 常用指數：ＯＯＯＯＯ
- 備註：比如說點選某個連結，則會將焦點放在該連結上，適合尚有視覺但看不清楚的人。

### 點擊（與 VoiceOver 相同）

- 手勢：點兩下
- 常用指數：ＯＯＯＯＯ

### 捲動

- 手勢：雙指向`上`或是向`下`滑，會有聽到像電話按鍵般的指示聲，上滑與下滑的聲音不同。
- 常用指數：ＯＯＯＯＯ

### 翻頁

- 手勢：~~三指向`上`或向`下`滑~~ <ins>雙指向`上`或向`下`滑（同上一節的「捲動」）</ins>

> [!更正]
> 三指上下滑是 VoiceOver 的翻頁手勢，TalkBack 不是。依 Google 官方的 TalkBack 手勢表，TalkBack 9.1 以上的三指下滑／上滑是切換到下一個／上一個閱讀控制項，捲動畫面則是雙指上下滑；手勢表中沒有另外的翻頁手勢，8.2 以下的版本也沒有多指手勢。
>
> 來源：[Android 無障礙說明 — 使用 TalkBack 手勢](https://support.google.com/accessibility/android/answer/6151827)、[Apple — 在 iPhone 上使用「旁白」手勢](https://support.apple.com/zh-tw/guide/iphone/iph3e2e2281/ios)

語音輔助工具的手勢真的跟平常使用習慣差異太大，學習之後還是不太熟悉，如果想真的知道更多的常用手勢，都需要自己操作看看才會比較清楚，希望大家要親自操作看看，完整的手勢整理可以參考 Reference 的簡報。這系列文章中，其中以兩篇內容簡單介紹手機的輔助工具，不只是因為我認為開發者需要知道，更是因為我在寫文的過程中，找時間去拜訪[臺南市視覺障礙生活重建服務中心](http://social.tainan.gov.tw/npohome/page.asp?nsub=F1A100)，和一位教學盲用電腦的老師聊聊，才知道使用輔助工具來瀏覽網頁來說，在載體：「手機」與「電腦」的使用情境完全不同，而使用需求與對網頁的想像也超出了我的理解。

- 手機：大部分的操作情境都是以使用 App 取得生活資訊居多，比如說天氣、line 訊息回覆，瀏覽網頁需求真的較少，主要也是因為要能使用手勢操作的手機版網頁少之又少，比如說今晚我只是想簡單測試一下 TalkBack 瀏覽 Yahoo! 奇摩行動版，我是有看畫面的（不是單靠聽覺），還是非常快就放棄瀏覽了。
- 電腦：會以大學生居多，透過網頁查詢資料，盲用電腦是裝載了 NVDA，它是一套免費的語音報讀軟體，專門給 Windows 作業系統使用，國內盲用電腦最常見的組合就是 NVDA + Firefox 瀏覽器（[這篇文章是 WebAIM 針對螢幕閱讀器的~~最新~~ <ins>2019 年</ins>數據調查](https://webaim.org/projects/screenreadersurvey8/)，可以發現 Chrome 現在超越 Firefox；<ins>目前最新的是 2026 年 7–8 月的 [Screen Reader User Survey #11](https://webaim.org/projects/screenreadersurvey11/)</ins>）。
- 使用輔助科技的使用者們，最關心的是如何馬上獲取關鍵資訊，不管畫面上有多漂亮，很多時候他們是無法想像的，比如說：
  - 「導覽列是在左邊？中間還是右邊？」
  - 「導覽列中的超連結是垂直排列還是水平排列？」
  - 先天盲胞更是無法想像「顏色的呈現」。
  - 也因此，貼心的資訊設計與流程設計是有其必要性（比如跳過連結功能、網站地圖、正確標題級別、填寫貼近功能的替代文字、焦點管理），工程師也許不能決定最終產品要包含哪些功能，可是若對 Web Accessibility 有全面的認識，就能在開發之初與開發之時給出專業且吻合需求的建議，畢竟，我們是關鍵人物啊。

最後，很推薦去上 Google A11ycasts: [Assistive Tech: TalkBack](https://www.youtube.com/watch?v=0Zpzl4EKCco)，從上完這一系列的課程後，Rob Dodson 自此就是我的神 ^___^。

---

## Reference

- [Assistive Tech: TalkBack](https://www.youtube.com/watch?v=0Zpzl4EKCco) - Google Chrome Developers @YouTube
- [談談行動裝置的Accessibility - 黃帝瑋老師](https://accessibility.moda.gov.tw/News/Detail/4337?Category=43) - 108年度「我國網站無障礙規範順應國際趨勢與發展」研討會(推廣說明會)
- [TalkBack](https://support.google.com/accessibility/android/topic/3529932?hl=zh-Hant&ref_topic=9078845) - Android 無障礙工具說明（繁中）
- [Google TalkBack](https://en.wikipedia.org/wiki/Google_TalkBack) - 維基百科
- [臺南市視覺障礙生活重建服務中心](http://social.tainan.gov.tw/npohome/page.asp?nsub=F1A100)

## 更正紀錄

- 2026-10-27：依 Google 官方〈使用 TalkBack 手勢〉更正 TalkBack 調整滑桿與翻頁的手勢（與 VoiceOver 不同）、滑桿備註指向的截圖；依 Samsung 官方說明補充 Voice Assistant 已併入 TalkBack；依 WebAIM 更新最新的螢幕閱讀器調查；研討會簡報改連數位發展部無障礙網路空間服務網的新網址。
