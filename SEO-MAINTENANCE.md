# 搜尋與內容維護

## 修改與建置

- `src/app.jsx`：共用頁面、原有產品、案例資料、照片順序與表單互動。
- `src/service-content.jsx`：服務地區、服務評估流程、常見問題、MC2 及三個獨立案例頁。
- `seo.config.cjs`：八頁的搜尋標題、摘要、正式網址與服務名稱。
- `src/page-template.html`：HTML 外框與載入資源。
- 首次執行 `npm ci`，修改後執行 `npm run build`。將來源、八個 HTML、sitemap.xml、assets/app.js、assets/styles.css 一起提交。建置會預先輸出各頁內容，供搜尋引擎與未執行 JavaScript 的讀者閱讀。

## 正式網址

- https://trtenv.com/
- https://trtenv.com/wastewater.html
- https://trtenv.com/sludge.html
- https://trtenv.com/automation.html
- https://trtenv.com/mc2-metal-capture.html
- https://trtenv.com/chemical-nickel-treatment.html
- https://trtenv.com/zinc-nickel-treatment.html
- https://trtenv.com/cyanide-wastewater-treatment.html
- 網站地圖：https://trtenv.com/sitemap.xml
- 檢索規則：https://trtenv.com/robots.txt

## Search Console 與後續工作

網域已由公司驗證。部署後在 Search Console 檢查新加入的四個網址，視需要申請建立索引；網站地圖使用上述正式網址。不要以反覆提交取代內容改善；收錄與排名由 Google 決定。

以「成效」報告觀察搜尋字詞、曝光、點擊及頁面表現，再補充客戶需要的資訊。新北、台中是已確認的服務範圍，不代表兩地均設有據點或已有當地案例。

Google 商家檔案需由公司帳戶管理，填寫真實營業資料、電話、服務地區與新網址。舊網域 trt-co.tw 的永久轉址需在舊主機設定，依實際頁面內容對應新網址；原本沒有對應內容的頁面不宜一律轉首頁。變更前先備份並確認舊主機信箱與郵件 DNS 不受影響。本次程式更新未操作這兩項帳戶設定。

## 內容原則

自然使用「工業廢水處理」「污泥處理」「MC2 金屬捕集劑」及服務地區，不堆疊關鍵字。新增案例應核對原水、反應順序、藥劑與照片。沉澱外觀不能代替水質檢測；去除率、排放達標、客戶地點與節省費用需有資料才能刊登。保留既有試驗照片順序，含氰案例不補寫未提供的藥劑名稱、用量或 pH 目標。
