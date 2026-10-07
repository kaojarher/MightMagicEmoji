天命之門 PWA — 部署與安裝

PWA 必須透過 https（或 localhost）提供，直接雙擊 index.html（file://）仍可玩，但無法安裝、也沒有離線快取。

方法 A：本機測試
  cd 本資料夾 && python3 -m http.server 8080
  瀏覽器開 http://localhost:8080 ，網址列會出現「安裝」圖示。

方法 B：免費託管（取得 https 網址，手機也能安裝）
  GitHub Pages / Netlify / Cloudflare Pages：把整個資料夾內容原樣上傳即可。

安裝方式
  Chrome / Edge（Windows、macOS、Linux、Android）：網址列安裝圖示，或遊戲內「系統」分頁的「📲 安裝為 App」。
  iPhone / iPad：Safari →「分享」→「加入主畫面」。
  首次載入完成後（含約 11 MB 配樂）即可完全離線遊玩。

更新遊戲：修改檔案後，把 sw.js 第一行的 CACHE 名稱 tianming-v1 改成 v2、v3…，使用者下次開啟就會更新。
存檔：「系統」分頁可匯出／匯入 .json，不受快取更新影響；音量設定記在瀏覽器 localStorage。
