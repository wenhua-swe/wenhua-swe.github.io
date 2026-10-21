---
title: 使用 JQuery 透過 FormData 上傳檔案 (headers 帶 boundary)
pubDate: '2019-02-09'
description: >-
  FormData 介面可為表單資料中的欄位/值建立相對應的的鍵/值對（key/value）集合，之後便可使用 XMLHttpRequest.send()
  方法來送出資料。
author: Askie Lin
tags:
  - javascript
  - jquery
  - ajax
  - multipart/formdata
  - boundary
---

### 基礎知識

#### JQuery AJAX: contentType

- 不填寫時，預設為 `application/x-www-form-urlencoded` 。

#### FormData

- FormData 介面可為表單資料中的欄位/值建立相對應的的鍵/值對（key/value）集合，之後便可使用 `XMLHttpRequest.send()` 方法來送出資料。

- 它在編碼類型設定為 `multipart/form-data` 時會採用與表單相同的格式送出。

#### [RFC1867](https://datatracker.ietf.org/doc/rfc1867/?include_text=1)

剛開始，`http` 協議中没有檔案上傳的功能，直到 `RFC1867` 為 http 協議添加了此功能。

##### 在 `RFC1867` 中限定：
- `<form>` 的 `method` 必須是 `POST`。

- `enctype` 屬性新增了 `multipart/form-data` 的選項。

- `<input>` 的 `type` 屬性增加了 `file` 選項。


---

### 程式碼

#### html
```html
<form action="server/api/items" name="productForm" enctype="multipart/form-data" method="POST">
  <h3>新增商品</h3>
  <input type="file" name="files" class="productFile">
  <input type="text" class="productName">
  <input type="number" min="1" class="productPrice">
  <input type="submit" value="送出">
</form>
```
#### JavaScript
```javascript
// 取得表單
let productForm = document.forms.namedItem('productForm')
productForm.addEventListener('submit', function(event){
    post_items(event, productForm)
})


function api_post_items (event, form){

  // 取消表單預設提交
  event.preventDefault()
  
  let name = document.querySelector('.productName').value
  let stock = document.querySelector('.productAmount').value
  let unit_price = document.querySelector('.productPrice').value
  let file = $('.productFile')[0].files[0] // 單個檔案

  // 建立一個新的 FormData 物件
  let formData = new FormData(form)

  // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵
  formData.append('name', name)
  formData.append('cost', cost)
  formData.append('unit_price', unit_price)
  formData.append('images', file)

  let item = {
    'url': `${ server }/api/items`,
    'type': 'POST',
    'headers': {
      // 'Content-Type': 'multipart/form-data',
      // 使用 multipart/form-data 在此不需要設定 Content-Type。
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${ userToken }`,
    },
    'contentType': false, //required
    'processData': false, // required
    'mimeType': 'multipart/form-data',
    'data': formData
  }

    $.ajax(item)

      .done(function (response) {
        console.log(response)
        closeLightBox()
        api_get_items()
      })

      .fail(function (response) {
        console.log('api_post_user: Fail ' + response.responseText)
      })
  }
```

### 注意！

- 在 `<form>` 表單設定 `enctype="multipart/form-data"`。
- `<form>` 中，需要有 `<input type="file">`。

- `JavaScript` 中 設定 `contentType = false`。
    - 在傳送 `multipart/formdata` 時，希望不影響原表單設定，而直接將預設值改為 `multipart/form-data`。

- `JavaScript` 中 設定 `processData = false`。
    - 不去處理資料。

- `JavaScript` 中 設定 `cache = false`，檔案不需緩存。

#### 表單送出後，去檢查 `Request Headers` 看到我們有帶 `boundary` 成功傳輸。

---

### Reference

> [FormData - MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/FormData)
> [Content-Type - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
> [通过jQuery Ajax使用FormData对象上传文件](https://www.jianshu.com/p/46e6e03a0d53)
> [浅谈contentType = false](https://segmentfault.com/a/1190000007207128)
> [从FormData到图片上传](https://juejin.im/post/5b84dfc56fb9a01a015809dc)
> [Submitting multipart/form-data using jQuery and Ajax](http://digipiph.com/blog/submitting-multipartform-data-using-jquery-and-ajax)
> [missing boundary in Content-Type for multipart posts ](https://github.com/visionmedia/superagent/issues/746)
