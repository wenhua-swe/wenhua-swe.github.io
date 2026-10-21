---
title: 以 Vue 為例，如何在 VSCODE 自訂程式碼片段 Code Snippets？
pubDate: '2019-08-03'
description: >-
  真正開發時，創建結構時常常都要建立新檔案去切分
  component，打幾乎同樣的程式碼有點煩，所以～找了一下該怎麼來設定自己要的程式碼片段。希望有幫助到你：）
author: Askie Lin
tags:
  - vscode
  - custom user code snippets
  - code snippets
  - user snippets
  - step by step
  - snippet generator
---

![Snippet Generator](https://i.imgur.com/eblXcFs.png)

好，我習慣用的編輯器是 VSCODE，雖然有安裝一些 Snippets 擴充套件，讓我敲程式碼時比較不會因為打錯浪費時間 debug。但，真正開發時，創建結構時常常都要建立新檔案去切分 component，打幾乎同樣的程式碼有點煩，所以～找了一下該怎麼來設定自己要的程式碼片段。希望有幫助到你：）

## 一、設定 Setting.json

1-1. `command` + `,`
1-2. 右上角 `{}`，打開自定檔
1-3. 新增以下語法：

```json
// 啟用自訂程式碼樣版
"editor.tabCompletion": "on",

// 如果你跟我一樣，有裝其他的 Snippet，可以將編輯器的權重提高
"editor.snippetSuggestions": "top",
```

## 二、在 VSCODE 新增自己的片段

2-1. `shift` + `command` + `p`

2-2. 輸入 `"User Snippets"`，選擇 `Preferences:Configure User Snippets`

2-3. 選擇語言，可以是 Global，因以 Vue 為例，我選擇 Vue。

有些參數說明，接下來，可以自己去瞭解參數或是使用 Snippets 設定產生工具！

[VSCODE 官方說明](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

## 三、利用 snippet generator 創造自己的設定檔，感謝大大，快去追蹤他 XD

### [snippet generator](https://snippet-generator.app/)

產生器支援 VSCODE、SUBLIME、ATOM 唷，選擇自己的編輯器來設定吧。

**`prefix` 就是你到時要生成自訂程式碼要輸入的。**

```json
{
  // 第一次建立的朋友
  // 記得產生器產生的設定檔需要放在一個『物件』裡
  // 之後可以往下繼續新增你其他的 Snippets
  // 將自訂的程式碼設定檔貼在這裡
}
```

像這樣：

```json
{
  "Askie 自訂的 Vue 樣板": {
    "prefix": "vuetem",
    "body": [
      "<template>",
      "  <section>Hello</section>",
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: 'Hello',",
      "  data() {",
      "    return {};",
      "  },",
      "  computed: {},",
      "  created() {},",
      "  mounted() {},",
      "  methods: {},",
      "  components: {},",
      "};",
      "</script>",
      "",
      "<style lang=\"scss\" scoped>",
      "</style>",
      ""
    ],
    "description": "Askie 自訂的 Vue 樣板"
  }
}
```

Easy？
不過我有踩一下雷，就是第一步驟的設定檔，以及最後要將設定內容全放在一個物件中，怕忘了，也感覺新手第一次建立時會遇到問題，所以簡單做個紀錄。
