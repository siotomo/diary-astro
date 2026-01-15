# diary-astro プロジェクト

## 概要

個人ブログサイト。Astro + GitHub Pages + Markdown構成。

## 技術スタック

| 層 | 技術 |
|----|------|
| フレームワーク | Astro |
| ホスティング | GitHub Pages |
| コンテンツ | Markdownファイル（`src/content/posts/`） |
| Mermaid | rehype-mermaid（ビルド時SVG変換） |
| スタイル | Tailwind CSS |

## ディレクトリ構成（予定）

```
diary-astro/
├── src/
│   ├── content/
│   │   ├── config.ts         # コンテンツスキーマ定義
│   │   └── posts/            # Markdown記事
│   ├── layouts/
│   │   └── BlogPost.astro    # 記事レイアウト
│   └── pages/
│       ├── index.astro       # トップページ
│       └── posts/[...slug].astro  # 記事ページ
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── decisions.md              # 意思決定ログ
```

## コマンド

```bash
# 開発サーバ起動
yarn dev

# ビルド
yarn build

# プレビュー
yarn preview
```

## 運用フロー

1. `src/content/posts/` にMarkdownファイルを作成
2. `yarn dev` で確認
3. `git push` → GitHub Actionsで自動デプロイ

## 意思決定

詳細は `@decisions.md` を参照。

### 選定理由サマリー

- **Astro**: コンテンツファースト、Markdownネイティブ対応
- **GitHub Pages**: 無料、Git連携が自然
- **rehype-mermaid**: ビルド時変換で軽量・安定

## 次のタスク

未実装の場合、以下の順で進める：

1. Astroプロジェクト初期化（`yarn create astro`）
2. Tailwind CSS追加
3. 基本レイアウト作成
4. Mermaid対応（rehype-mermaid設定）
5. GitHub Pages設定（GitHub Actions）
6. 最初の記事を公開

## 注意点

- Mermaidはビルド時変換（クライアントJSなし）
- 記事のフロントマターは `title`, `date`, `tags` を含める
- 画像は `public/` 配下に配置
