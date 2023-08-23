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

## 設計實現(TODO)
`TokenPay`的实现方式与其他项目原理类似，都是通过`TronGrid`、`EtherScan`等提供的api，      
轮询订单未过期的钱包地址的`TRX`、`ETH`、`USDT`、`USDC`等入账事件，将入账金额，与数据库的订单金额进行对比，若一致，则视为订单完成
```
简单的原理：
0.服务器定时同步交易所最新汇率
1.客户支付，交易上链
2.服务器定时通过API轮询，获取监听地址下的最新入账交易数据，并与数据库订单对比
3.若金额一致，将订单标记为完成
4.订单完成后，异步通知任务将订单完成事件回调给平台
```


[link_cashier]: public/screenshot/cashier.png
[link_success]: public/screenshot/success.png



