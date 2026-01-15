# diary-astro プロジェクト

## 概要

個人日記ブログサイト。Astro + GitHub Pages + Markdown構成。

## 技術スタック

| 層 | 技術 |
|----|------|
| フレームワーク | Astro |
| ホスティング | GitHub Pages |
| コンテンツ | Markdown（`src/content/posts/`） |
| Mermaid | rehype-mermaid |
| スタイル | Tailwind CSS |
| OGP | satori（自動生成） |

## ドキュメント

| ファイル | 内容 |
|----------|------|
| `仕様書.md` | 要件・技術スタック |
| `docs/architecture.md` | 技術構成図 |
| `docs/workflow.md` | 運用フロー |
| `docs/implementation-plan.md` | 実装計画書 |

## コミットルール

```
<prefix>: <フェーズ> <内容>

例:
feat: Phase1 Astroプロジェクト初期化
feat: Phase2 記事一覧ページ作成
fix: Phase2 カードUIの余白修正
```

### prefix一覧

| prefix | 用途 |
|--------|------|
| `feat:` | 新機能・新ファイル追加 |
| `fix:` | バグ修正 |
| `docs:` | ドキュメント変更 |
| `style:` | デザイン・フォーマット変更 |
| `chore:` | 設定・依存関係の変更 |
| `post:` | 記事追加 |

## コマンド

```bash
yarn dev       # 開発サーバー起動
yarn build     # 本番ビルド
yarn preview   # ビルド結果確認
```

## 注意点

- Mermaidはビルド時変換（クライアントJSなし）
- 画像は `src/assets/posts/YYYY-MM-DD/` に配置
- コミットは小さく、フェーズを明記する
