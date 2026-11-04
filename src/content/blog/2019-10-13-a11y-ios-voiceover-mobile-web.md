---
title: 真實世界：使用 iOS 輔助功能 VoiceOver 來瀏覽行動版網頁
pubDate: '2019-10-13'
updatedDate: '2026-11-04'
description: >-
  VoiceOver 是 Apple 推出的輔助功能，在 iOS 中是倚靠「手勢」來進行操作。今天想介紹手機中經常使用的手勢，並附上一段使用 iOS
  VoiceOver 瀏覽網頁的紀錄影片。
author: Wen-Hua Lin
series: 實踐無障礙網頁設計
tags:
  - iThome 鐵人賽
  - 實踐無障礙網頁設計
  - 無障礙網站
  - accessibility
  - VoiceOver
  - 螢幕閱讀器
---

> 本文原刊於 2019 第 11 屆 iThome 鐵人賽「實踐無障礙網頁設計」Day 28（[原文連結](https://ithelp.ithome.com.tw/articles/10227761)）。
>
> 2026-10-27 校訂：內文手勢已對照 Apple 官方〈在 iPhone 上使用「旁白」手勢〉確認無誤，失效連結已標註。規範會持續修訂，實作前請以各「更正」框附的官方連結為準。

![Apple「iOS 上的輔助功能」介紹圖](/images/ironman-a11y/day28-1.webp)

（圖片來源：[Apple](https://developer.apple.com/accessibility/ios/)）

> 維基百科：  
> VoiceOver is a screen reader built into Apple Inc.'s macOS, iOS, tvOS, watchOS, and iPod operating systems. By using VoiceOver, the user can access their Macintosh or iOS device based on spoken descriptions and, in the case of the Mac, the keyboard. The feature is designed to increase accessibility for blind and low-vision users, as well as for users with dyslexia.

VoiceOver 是 Apple 推出的輔助功能，內建在 macOS, iOS, tvOS, watchOS, and iPod 作業系統，現在還加上了 iPadOS。無論你是不是盲人或視力低下的人，這是一個非常有用的工具，因為 VoiceOver 準確用語音描述了 iPhone 上發生的事情，可以不用看螢幕就能完成操作，當然，如果今天我們是開發者，勢必得了解基本操作方式，更能開發出貼近使用者的產品。

在 iOS 中是倚靠「手勢」來進行操作，就好像我們平常使用觸控板一樣，而 macOS 中則是倚靠鍵盤來操作。

今天想介紹手機中經常使用的手勢，大部分是從黃帝瑋老師的整理的簡報中學習來的，還要謝謝臺南市視覺障礙生活重建服務中心的專員及老師熱心協助，最後有提供一個約一分鐘的影片，沒有加任何字幕，純粹紀錄使用 iOS VoiceOver 瀏覽網頁的過程，是我最近在案子中剛做好的選單，我想測試看看今天實踐的漢堡選單是否能正確念出，大家如果有興趣就看看吧。

## iOS VoiceOver - 開啟設定（iOS 13.1.2）

![iOS 13 開啟 VoiceOver 與調整朗讀速度的設定畫面](/images/ironman-a11y/day28-2.webp)

- 透過朗讀速度，可以調整語音的速度，以習慣的速度來使用，初學者大概會覺得預設值念得太快。

## 基礎手勢整理

### 調整數值

- 手勢：上下滑動
- 常用指數：ＯＯＯＯＯ
- 備註：當使用者需要調整 slider 時，就能透過上下滑動的手勢操作數值的高低，什麼是 slider？舉例來說就是跟上圖的圖三「朗讀速度」一樣，提供滑軸作為調整與控制的元件。

### 選擇焦點

- 手勢：左右滑動
- 常用指數：ＯＯＯＯＯ

### 點選

- 手勢：點一下
- 常用指數：ＯＯＯＯＯ
- 備註：比如說點選某個連結，則會將焦點放在該連結上，適合尚有視覺但看不清楚的人。

### 點擊

- 手勢：點兩下
- 常用指數：ＯＯＯＯＯ

### 朗讀（從目前位置朗讀到結束）

- 手勢：雙指向下滑一下
- 常用指數：ＯＯＯＯＯ

### 翻頁

- 手勢：三指向`上`或向`下`滑
- 常用指數：ＯＯＯＯＯ

### 我的簡單紀錄影片，原來用 iOS 輔助功能瀏覽網頁會唸出這些內容！

[![使用 iOS VoiceOver 瀏覽網頁的紀錄影片（YouTube）](/images/ironman-a11y/day28-3.webp)](https://www.youtube.com/watch?v=o_WUQpV77BM)

和我預期的內容完全相同，有按照文件實踐果然沒錯，這個影片沒加字幕，如果有點開看的人～感謝收看！遺憾的是沒寫到 macOS 的 VoiceOver 詳細介紹，想了解的話，趕快來上我推薦的資源吧，一定大有幫助的！

- 影片資源：原本推薦的 Udacity 課程 ud891〈使用屏幕阅读器浏览网页〉已下架，可改參考 web.dev 的 [Headings and landmarks](https://web.dev/articles/headings-and-landmarks)，說明螢幕閱讀器如何靠標題和地標瀏覽網頁
- 閱讀文件：[在 Mac 上使用「旁白」來瀏覽網頁](https://help.apple.com/voiceover/mac/10.15/#/vo27974) - Apple

---

## Reference

- [VoiceOver](https://en.wikipedia.org/wiki/VoiceOver#Accessibility_Inspector) - 維基百科
- [Headings and landmarks](https://web.dev/articles/headings-and-landmarks) - web.dev（取代已下架的 Udacity 課程 ud891〈使用屏幕阅读器浏览网页〉）
- [談談行動裝置的Accessibility - 黃帝瑋老師](https://accessibility.moda.gov.tw/News/Detail/4337?Category=43) - 108年度「我國網站無障礙規範順應國際趨勢與發展」研討會(推廣說明會)
- [Accessibility](https://www.apple.com/accessibility/mac/vision/) - Apple
- [在 Mac 上使用「旁白」來瀏覽網頁](https://help.apple.com/voiceover/mac/10.15/#/vo27974) - Apple
- [臺南市視覺障礙生活重建服務中心](http://social.tainan.gov.tw/npohome/page.asp?nsub=F1A100)

## 更正紀錄

- 2026-10-27：內容未更動，手勢已對照 Apple 官方〈在 iPhone 上使用「旁白」手勢〉確認；標註 Udacity 課程連結已失效；研討會簡報改連數位發展部無障礙網路空間服務網的新網址。
- 2026-11-04：已下架的 Udacity 課程 ud891 連結改為參考 web.dev〈Headings and landmarks〉。
