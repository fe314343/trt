# 搜尋與內容維護

## 修改網站

- `src/app.jsx`：實際頁面文字、案例、圖片與互動功能。修改圖片時同步更新有意義的 `alt` 說明。
- `seo.config.cjs`：四個頁面的搜尋標題、摘要、服務名稱及網站網址。
- `src/page-template.html`：共用 HTML 外框與載入資源。
- 執行 `npm ci`（首次或依賴變更時），再執行 `npm run build`。
- 將來源及產生的 `index.html`、三個服務 HTML、`sitemap.xml`、`assets/app.js`、`assets/styles.css` 一起提交。不要只修改產生的 HTML，否則下次建置會覆蓋。

建置會把四頁的內容直接輸出到 HTML，讓未執行 JavaScript 的讀者也能閱讀與循連結。JavaScript 載入後提供原本的照片切換、表單及導覽互動。

## 目前網址

- 首頁：https://fe314343.github.io/trt/
- 廢水處理：https://fe314343.github.io/trt/wastewater.html
- 污泥處理：https://fe314343.github.io/trt/sludge.html
- 人機自動化：https://fe314343.github.io/trt/automation.html
- 網站地圖：https://fe314343.github.io/trt/sitemap.xml

原本 `#wastewater`、`#sludge`、`#automation` 分享連結仍可使用，瀏覽器會切換成新網址。

## Google Search Console（尚需帳戶驗證）

1. 用公司可長期管理的 Google 帳戶登入 https://search.google.com/search-console/ 。
2. 新增「網址前置字元」資源 `https://fe314343.github.io/trt/`。
3. 使用 HTML 驗證檔（加入儲存庫根目錄）或將 Google 給的完整 meta 驗證標籤加入 `src/page-template.html` 後建置部署。驗證完成後保留檔案或標籤。
4. 在「網站地圖」提交 `sitemap.xml`，並用「網址審查」檢查四個網址及申請建立索引。
5. 在「成效」觀察實際搜尋字詞、曝光與點擊，再補充客戶需要的內容。提交不保證收錄或排名。

此 GitHub Pages 專案位於 `/trt/` 子路徑；搜尋引擎的 robots.txt 必須位於來源網站根目錄 `/robots.txt` 才有效，因此沒有在專案內放置無效的 robots.txt。

## 日後改用 .com

1. 先在主機平台完成自訂網域、DNS 與 HTTPS 設定。
2. 把 `seo.config.cjs` 的 `siteUrl` 改為實際正式網址（例如 `https://taiwan-trt.com/`，以最終選定網址為準）。
3. 執行建置，更新所有頁面的 canonical、分享網址、結構化資料和網站地圖，再部署。
4. 能控制舊主機時，設定舊網址至對應新網址的永久轉址。
5. 在 Search Console 驗證新網域並提交新網站地圖；符合條件時使用網址變更工具。

## 內容原則

以客戶的需求寫標題與說明，例如「鋅鎳合金鍍液廢水處理」「MC2 金屬捕集劑」「廢水處理 PLC 人機介面」。不用堆疊關鍵字或新增 meta keywords。案例寫清楚來源、反應順序、使用藥劑與可觀察到的變化；去除率、排放達標、服務地區等內容需先有實際資料確認。
