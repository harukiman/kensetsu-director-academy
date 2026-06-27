# 建設ディレクター・工事管理 学習アプリ

土木・建設業に新卒／未経験で入る方（**建設ディレクター・工事管理者**）が、
**建設業法**・**工事管理（施工管理 QCDSE）**・**建退共／CCUS**・**2024年問題／改正建設業法**などの
最近の動向・将来対応までを、**図とクイズ**でやさしく学べる Web 学習アプリです。

> ⚠️ 本アプリの内容は**学習目的の解説**です。金額基準・条文・制度は改正されることがあります。
> 実務では必ず**最新の法令・公式情報（国土交通省・厚生労働省・e-Gov法令検索 等）**をご確認ください。

## 主な機能
- **学習コンテンツ（A〜G の25章）**：業界構造／建設業法／工事管理の実務／書類・施工体制／福祉・制度／最新動向／学習支援
- **オリジナル図（SVG）**：重層下請構造・許可制度・工程表／クリティカルパス・安全衛生体制・CCUSレベル など（すべて自作。公的資料を参考に独自に再構成）
- **確認クイズ**：章ごと＋全体ランダムテスト、解説つき
- **フラッシュカード**：用語・要点を反復暗記（習熟度を記録）
- **用語集・略語辞典**：ふりがな付き・50音／全文検索
- **学習ダッシュボード**：読了・連続学習日数・クイズ平均・暗記カード数
- **新卒ロードマップ／現場チェックリスト**
- ダークモード・**完全レスポンシブ（スマホ対応）**。学習記録は端末内（localStorage）に保存。

## 技術スタック
React 18 + TypeScript + Vite / Tailwind CSS / React Router（HashRouter）/ Fuse.js（検索）/ marked + DOMPurify（Markdown）

## 開発
```bash
npm install
npm run dev      # http://localhost:5173/kensetsu-director-academy/
npm run build    # dist/ に本番ビルド
npm run preview  # ビルド結果をローカル確認
```

## 公開（GitHub Pages）
`main` ブランチへ push すると GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルドし、
GitHub Pages へ配信します。リポジトリの **Settings → Pages → Build and deployment → Source** を
**GitHub Actions** に設定してください。

公開URL（例）: `https://<ユーザー名>.github.io/kensetsu-director-academy/`

## ライセンス
[MIT](./LICENSE) ／ 図はすべてオリジナル（自作 SVG）です。
