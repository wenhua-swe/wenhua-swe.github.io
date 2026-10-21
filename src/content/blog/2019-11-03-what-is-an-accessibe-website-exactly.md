---
title: 無障礙網站又稱為可訪問的網站，難道還有不可訪問的網站嗎？ What is an accessibe website exactly？
pubDate: '2019-11-03'
description: >-
  ## 只要花 60
  秒瞭解「無障礙網站」概念[![Yes](https://img.youtube.com/vi/hufMi9LZX2I/0.jpg)](https://www.youtube...
author: Askie Lin
tags:
  - a11y
  - 好想工作室
  - 無障礙網站
  - 無障礙
  - null
---


## 只要花 60 秒瞭解「無障礙網站」概念

[![Yes](https://img.youtube.com/vi/hufMi9LZX2I/0.jpg)](https://www.youtube.com/watch?v=hufMi9LZX2I)

> Your Website + Accessibility = BFF —— Jenn Lukas

## 前言

「網站」是一種資訊傳播的方式，我們製作網站最普遍的目的是為了將「資訊」傳播出去。比如說現今大多數公司會建置自己的官方網站，去傳達公司理念、服務項目、聯絡方式...等等，這些都在資訊的涵蓋範圍。

那你有聽過無障礙網站嗎？

無障礙網站又稱為可訪問的網站，難道還有不可訪問的網站嗎？

---

## 無障礙網站

![A11Y 是 Accessibility 的縮寫](https://i.imgur.com/lzugMwP.jpg)


### 無障礙網站又稱為 Web Accessibility

常以關鍵字 `a11y` 來代表無障礙技術，它是 [Accessibility](https://en.wikipedia.org/wiki/Accessibility) 的縮寫，代表網頁可訪問性，許多其他繁中翻譯會譯為可親性、可及性。這系列文章將以「可訪問性」代表 Accessibility、「無障礙」作為 Web Accessibility 的代稱。

### 縮寫方式

> = A(ccessibilit)y

= 以 A 為開頭，以 Y 結尾， A 與 Y 之間總共有 11 個字元！

### 發音

可以唸作 A-one-one-Y 或是 A-eleven-Y，在業界也有人會唸作 ally 或是 alley 的發音。

其餘還有很多同樣形式的縮寫：如 [g11n](https://en.wiktionary.org/wiki/g11n#English)（globalization）、[i18n](https://en.wiktionary.org/wiki/i18n#English)（Internationalization）[L10n](https://en.wiktionary.org/wiki/L10n#English)（Localization）、[p13n](https://en.wiktionary.org/wiki/p13n#English)（personalization）、[k8s](https://en.wiktionary.org/wiki/k8s#English)（Kubernetes）等。

### 用愛開發，實踐「無障礙」

**無論使用者是否有任何機能的低下、無論使用者使用何種方式與何種裝置瀏覽，無障礙的實踐將確保網站的內容以較多元、彈性的方式呈現，能夠提供給「所有人」瀏覽，有助於資訊能更廣泛地傳遞到更多人手中，拓展對不同能力的人的適應性。**

### 重要性，你怎麼看？

不可訪問的網站其實真的很多。

訪問性通常不是我們在設計、建置網站時的第一件事情，在某些問題出現以前，我們通常不會考量到隱形的需求。舉例一個情境：當我們處於產品開發週期的測試階段，某位使用者無法閱讀螢幕的文字，去瞭解才發現世界上男性中有 8% 的色盲。（[從 WHO 了解視力障礙數據](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment)）

有些國家法律規定政府、教育機構、企業網站要符合無障礙的規範，以保障人權，訪問性的問題會在產品生命週期中蔓延，也會引發訴訟的問題。而且無障礙問題通常會出現在產品進入後期或是完成後，這時要從零導入「無障礙」實踐恐怕需要負擔更高額的成本。

再繼續往下之前，讓我們先來想想「障礙」的定義到底是什麼。

---

## 來思考「障礙」的定義

一個人有多種不同機能障礙的可能，「障礙（Disabled）」是一種相對的且會變動的狀態，也是一個事實的描述，是[你的能力在所處「環境」下是否有辦法互動發揮作用而定](https://www.facebook.com/color.cheng/posts/10215351794401924)。

在中文翻譯上，「無障礙」這個詞彙挺容易讓人直接聯想成：「喔！我們要做無障礙網站，那就是為了身心障礙人士瀏覽專用而設計嗎？」

無障礙網頁設計所設定的受惠者是「所有人」，與通用設計的理念相符，剛好其中有些特別的使用族群需要使用科技輔助工具（AT，全名為 Assistive Technology 如 NVDA、JAWS）、輔助功能（如 iOS 的 VoiceOver、Android 的 TalkBack）來瀏覽網頁，能力一般的人有時也有想要縮放網頁內容的需求，因此網頁在設計及開發時，設計上再細心一點，實作上注意細節就能增加網站的無障礙。讓我們用同理心、包容心和愛，盡可能達到「讓所有人瀏覽網站時都能享有獲得相同的資訊的權利」這個目標。

---

## 以人類的機能來區分障礙類型

- **物理，肢體上的障礙**

    > 開發基本原則：大多數的肢體障礙者都可以透過鍵盤瀏覽網站，所以開發時專注鍵盤的可訪問性。

    - 創傷：
        - 肢體損壞
        - 脊髓損傷
    - 疾病與先天性疾病：
        - 腦癱
        - 關節炎
        - 帕金森氏症
- **認知，學習和神經系統的障礙**
    - 記憶力不佳
    - 解決問題的能力
    - 注意力不集中：自閉症、過動症（ADHD）
    - 閱讀與言語理解困難
    - 癲癇
    - 動暈症（如暈車、暈船）

- **聽覺**

    > 開發基本原則：影片提供字幕或是手語翻譯、專注於螢幕閱讀器的可訪問性。

    - 輕度：無法聽到 30 分貝以下的聲音。
    - 中度：無法聽到 50 分貝以下的聲音。
    - 重度：無法聽到 80 分貝以下的聲音。主要透過手語溝通。
    - 嚴重：無法聽到 95 分貝以下的聲音。主要透過手語溝通。
- **視覺**

    > 開發基本原則：提升顏色對比度、填寫替代文字、減少顏文字的使用、確保超連結文字的提示性、超連結的路徑不要寫無意義的 JavaScript（ `href="javascript: void;"` ）、勿僅靠顏色作為傳達重要訊息的唯一方式、資訊結構順序設計、文字不要壓在圖上...等。

    - 色盲
    - 色弱
    - 失明
    - 近視
    - 青光眼
    - 白化症
    - 年邁的老人

還有一些是屬於暫時性或環境的障礙，比如網路速度不佳的問題、我們因為車禍導致手臂受傷而暫時無法使用滑鼠。

---

## 現實生活有哪些透過輔助技術消彌障礙的情境？

- 近視配戴眼鏡或隱形眼鏡
- 長者配戴老花眼鏡
- 地面止滑設計防止行人跌倒
- 編輯器使用程式碼自動完成工具

... 多到不勝枚舉，因為習慣有輔助科技及輔助技術的協助，讓我們忽略自己的生活情境，也常需要透過外力協助去解決我們的問題。

---

## 體驗一下！讓開發者也有「色盲」

這邊舉一個小例子，讓各位感受一下色盲在觀看網頁時的感覺：

    import React from 'react';
    import MenuItem from '../shared/menu';
    import ItemMenu from '../shared/menu';
    
    const App = () => (
      <>
        <MenuItem title="Home" />
        <MenuItem title="About" />
        <ItemMenu title="FAQ" />
        <MenuItem title="Gallery" />
        <ItemMenu title="Signup" />
        <MenuItem title="Contact Us" />
      </>
    );
    
    export default App;

色盲的人永遠也不知道正常的人眼中看到的世界，就像正常人也永遠無法看到色盲人眼中的世界。若把「色盲瀏覽網頁」以「開發者觀看程式碼」來比喻的話就長上面這個樣子，原來是這麼難以閱讀。

---

## 開發無障礙網頁的好處

很多企業都開始重視起無障礙網站，因為實踐無障礙網站的過程，還可以達成以下優點

- 提高 SEO 搜尋引擎排名（看看[這篇的內容](https://www.dbswebsite.com/blog/accessibility-seo-a-perfect-fit/)）
- 吸引更廣泛的受眾、拓展市場機會
- 展示社會責任
- 提高易用性（Usability）
- 編寫更清晰的程式碼
- 降低產品成本：避免日後產品迭代時才需要從零導入無障礙的窘境
- 協助網路速度慢的使用者訪問

看完文章後，對於無障礙網站的觀念是不是有更多的認識跟釐清了呢？

就跟著接下來的篇幅一起實踐可訪問的網站吧！

---

## Reference

- [Cognitve](https://webaim.org/articles/cognitive/) - WebAIM
- [Visual](https://webaim.org/articles/visual/) - WebAIM
- [Auditory](https://webaim.org/articles/auditory/) - WebAIM
- [Assistive](https://webaim.org/articles/motor/assistive) - WebAIM
- [Seizure](https://webaim.org/articles/seizure/) - WebAIM
- [React Rally 2019](https://www.youtube.com/watch?v=dvtfNpt75aA&feature=youtu.be&t=25550) @YouTube
- [What is Web Accessibility in 60 seconds!](https://www.youtube.com/watch?v=hufMi9LZX2I) - Google Women Techmaker
- [Blindness and vision impairment](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment) - WTO
- [設計師 YR Cheng 聊聊 Accessibility](https://www.facebook.com/color.cheng/posts/10215351794401924)
- [Wikipedia - Accessibility](https://en.wikipedia.org/wiki/Accessibility)
- [Myth: Accessibility is 'blind people'](https://a11yproject.com/posts/myth-accessibility-is-blind-people/) - The A11Y Project
