---
title: 符合無障礙規範一定要了解！把「通用設計」的思考融入骨子裡
pubDate: '2019-07-25'
description: >-
  大家都知道，一個好的網站需要包含很多要素。其中有一個很大的 topic，「Accessible Web /
  Accessibility」，卻經常淪為建構網站時，有時間才去優化的事情，是一個 option 而不是 main feature。
author: Askie Lin
tags:
  - 無障礙規範
  - 通用設計
  - 無障礙設計
  - aria-label
  - Accessibility
  - Web
  - Accessibile Web
---

![An Accessible Web](https://i.imgur.com/8A5BNOt.png)

> 現在因為要製作政府的專案，需要符合國家通訊傳播委員會的無障礙規範，google 通用設計的概念，意圖去了解無障礙設計與通用設計的差異。後來看到大愛電視台，唐峰正老師的分享「通用設計」，發現：其實我們做的每一件事情都能增添溫度 - 同理心。

大家都知道，一個好的網站需要包含很多要素。其中有一個很大的 topic，「Accessible Web / Accessibility」，卻經常淪為建構網站時，有時間才去優化的事情，是一個 option 而不是 main feature。

---

## Accessibility

`\-​ˌse-​sə-​ˈbi-​lə-​tē \`

> 中文常翻譯為「網頁親和力」。[線上字典聽發音](https://www.merriam-webster.com/dictionary/accessibility)。

## 學習到的重點

### 無障礙設計

專爲身障者考量的設計，讓他們使用設備或空間時不會受到阻礙。

### 通用設計是「利他精神」。

目的是：不凸顯使用者差異、不增加其心理負擔。通用設計所考量的對象則不侷限於身障者，還有其他的使用族群，也許是身體機能退化的高齡者，也可能是使用習慣和多數人不同的左撇子，或是身材嬌小的矮個子、大腹便便的孕婦、推著娃娃車的人等等。

### 無障礙設計與通用設計最大的區別（2019-07-28 補充）

> Universal design is different from accessible design in that there are not two different solutions - [來源](https://uxdesign.cc/unlock-your-universibility-4b25bbe2dab)

「無障礙設計 Accessible Design」需要考量不同對象而有需要額外製作第二套解決方案，而「通用設計 Universal Design」沒有兩種不同的方案，而是一種方式就能滿足所有人的需求。

---

### 如果一開始就針對全民設計，將會：

- 成本降低
- 使用者增加

### 七大原則

- 公平
- 簡單易用
- 彈性
- 空間
- 容錯
- 省力
- 直覺

### 人生大風車：人生有大多數充斥的需要被設計的事物。

| 人生不同階段 | 幼兒   | 學生   | 社會人士 | 老年 |
| ------------ | ------ | ------ | -------- | ---- |
| 不同的椅子   | 娃娃車 | 學生椅 | 電腦椅   | 輪椅 |

### 「同理心」並非「同情心」，而是有溫度的思考。也就是以下：

1. 只要有表達出來，我都願意幫你
2. 在被幫助的時候，也不要因為被幫助，而喪失自己原本的能力
3. 把彼此的問題，都加進來一起思考

### 全人關懷環境，去思考：

- 誰在用？
- 誰要用？
- 誰想用？

---

> 專心做一件事，過程中也許會被質疑、不認同你，但當它出現意義、出現價值時，你才可以告訴你自己，你是活著的。＿唐峰正顧問

上面這句話，不小心融入我的血裡、我的骨子裡了。

稍稍了解之後，我的想法是，如果網站在建構初期時，設計者與開發者有著全面族群的思考方向，自然就容易把事情做好、把格局做大。

---

## 補充無障礙相關資訊！（方便別人、方便自己）

### 線上資源

如果你也跟我一樣：**目前正在了解無障礙的規範該如何去實踐**，不外乎要知道載體、開發者工具的使用、語意標籤及相關的 aria-label 內容設定。

可以參考的線上資源有：[Google Web Fundamental](https://developers.google.com/web/fundamentals/accessibility/) 及 [Google 提供的免費課程](https://www.udacity.com/course/web-accessibility--ud891)、[w3org: WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/)、[w3org: Accessibility Fundamentals](https://www.w3.org/WAI/fundamentals/accessibility-intro/)、[web.dev: Accessible to all](https://web.dev/accessible) 有規範 / 建議 / 學習資源。
之後完成專案後再來說一下心得與工具。

我這個專案將會使用 Vue 開發，其實不論你用什麼框架，真正的關鍵字，叫做「**A11Y**」，是 eslint 的套件，當你的結構未符合 Accessibility 時就會有錯誤提示，感謝 [Huli 胡立大大](https://medium.com/hulis-blog) 的補充！^^

- Vue 可以使用：[**eslint-plugin-vue-a11y**](https://github.com/maranran/eslint-plugin-vue-a11y)，[more](https://awesome-vue.js.org/projects-using-vue-js/a11y.html)...
- React 可以使用：[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)

### Checklist for 網站無障礙規範 2.0 版 A 級

如果你也跟我一樣：**需要符合政府的規範，也就是國家通訊傳播委員會的無障礙檢測**，總共有三個等級（A, AA, AAA），我目前只需要通過 A 級，但因為[官方的規範](https://www.handicap-free.nat.gov.tw/Accessible/Detail/144)，結構、配色實在太難閱讀....

為了不想瞎掉，所以我手動整理了一個共筆清單，方便大家複製一份自己用。符合規範就自己打勾，也方便做 spec 驗收時確認，總之有一個 TOC 及資訊層級整理，總是比官方的版本閱讀性提高太多，較容易查找（OS: 明明就是官方的無障礙規範，排版排得連一般人都難以閱讀是怎樣 = =）。

[我整理的共筆連結在此，歡迎拿去使用，官方範例也正在整理中](https://hackmd.io/OJCHT1IWTAevvj3esvdOGA?view)

- Issues
  - [ ] 國家通訊委員會有提供檢測工具 Freego，我的電腦是 MacBook Pro，下載 Linux 版本卻不能使用，命令列似乎說有缺少的 java 套件......。

---

### Reference

- [通用設計與無障礙設計的差異](https://vide.tw/1319)
- [Universal Design for Public Services 公共服務如何導入通用設計（余虹儀）](https://www.slideshare.net/codefortomorrow/universal-design-for-public-services)
- [通用設計大學問 - 唐峰正顧問](https://www.youtube.com/watch?v=o9Bt9mzfPVc)（萬分感謝！您真偉大）
