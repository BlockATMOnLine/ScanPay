# ScanPay
<p>
<a href="https://www.gnu.org/licenses/gpl-3.0.html"><img src="https://img.shields.io/badge/license-GPLV3-blue" alt="license GPLV3"></a>
<a href="https://github.com/assimon/dujiaoka/releases/tag/1.0.0"><img src="https://img.shields.io/badge/version-1.0.0-red" alt="version 1.0.0"></a>
</p>
<h2 align="center">繁體中文 | <a href="README.md">English</a></h2>  

## ScanPay - `區塊鏈`支付解決方案

>一款開源免費的，為商戶提供加密貨幣`代收代付`功能的支付解決方案，支持自定義收款錢包地址以及收款通知，支持代付API對接。可以收取`USDT-TRC20`、`USDT-ERC20`等各類幣種。
  

## AD -- PassTo-多種資產抵押信用卡
>無上限信用額 單筆消費可達$5,000,000  
信用額度按照抵押品價格而設定，支持：證券、物業、貴金屬、數字資產等  
可绑微信、支付宝、美区AppStore消费  
[點擊領取你的國際信用卡](https://passtocredit.io/)

## AD -- BlockATM-智能合約收付款解決方案
>完全去中心化的商戶收付款方式  
使用智能合約進行資金的安全管理  
使用費率比fireBlocks和metaMask都低  
[點擊創建你的智能合約櫃檯](https://www.blockatm.net/)

## 項目簡介
- `ScanPay`是一个支持私有化部署的`區塊鏈`支付解决方案  
- 本項目不依賴任何外部資源，無需另外部署`數據庫`，采用輕量化的配置存儲
- 任意項目都可以對接，輕鬆實現收取`USDT-TRC20`、`USDT-ERC20`等各類幣種
- `ScanPay` 遵守 [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html) 開源協議

## 項目結構
```
src
  ├── api ---> (接口配置)
  ├── asset ---> (公共項目, 公共圖像等)
  ├── config ---> (可選的貨幣和鏈配置)
  ├── utils ---> (通用代碼)
  └── views ---> (頁面文件)
```

### 開發調試

- 安裝依賴包：`yarn`
- 本地調試：`yarn serve`
- 打包編譯：`yarn build`

### 使用說明

- 模擬生成訂單頁： `http://localhost:8000/generateOrder`

    輸入參數來生成訂單，得到一個url地址，比如 `http://localhost:8000?oid=XXXXXXXXXXXXXXX`


- 收銀台頁： `http://localhost:8000?oid=XXXXXXXXXXXXXXX`

    - 展示訂單信息及二維碼收款地址
    - 頁面會根據支付結果展示不同的訂單狀態

  ![][link_cashier] ![][link_success]


## 部署教程：
- 最近項目比較忙,後續會出`ScanPay`的部署教程，不懂的朋友可以先聯係我：https://t.me/PayCool_Erik


## 加入交流/意見反饋
- Telegram：https://t.me/PayCool_Erik
- Email：erik.wang@chixi88.com

## 設計實現
`ScanPay`實現方式是透過TronGrid、Infrua等提供的API，監聽錢包地址的交易事件，將鏈上交易數據與資料庫中的訂單數據進行對比，若匹配成功，則創建支付訂單。
```
简单的原理：
1.從業務場景跳轉至ScanPay收銀台頁面。
2.收銀台展示給客戶分配的收款地址。
3.伺服器訂閱監聽地址入帳交易數據，並與資料庫中的地址進行匹配生成訂單。
4.等待鏈上交易完成確認，將訂單標記為完成。
5.訂單完成後，異步通知任務將訂單完成事件回調給業務場景。
```


[link_cashier]: public/screenshot/cashier.png
[link_success]: public/screenshot/success.png



