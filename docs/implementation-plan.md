# diary-astro 実装計画書

## 概要

5つのフェーズに分けて段階的に実装する。
各フェーズ完了時に動作確認を行い、問題なければ次へ進む。

---

## Phase 1: 基盤構築

Astroプロジェクトの土台を作る。

- [ ] **1.1** Astroプロジェクト初期化（`yarn create astro`）
- [ ] **1.2** Tailwind CSS導入（`@astrojs/tailwind`）
- [ ] **1.3** Content Collections設定（`src/content/config.ts`）
- [ ] **1.4** 動作確認：`yarn dev` でエラーなく起動するか

---

## Phase 2: UI構築

ページとコンポーネントを作成する。

- [ ] **2.1** 基本レイアウト作成（`src/layouts/Base.astro`）
- [ ] **2.2** コンポーネント作成
  - [ ] Card.astro（記事カード）
  - [ ] Tag.astro（タグバッジ）
- [ ] **2.3** 記事一覧ページ（`src/pages/index.astro`）
- [ ] **2.4** 記事詳細ページ（`src/pages/posts/[...slug].astro`）
- [ ] **2.5** タグ一覧ページ（`src/pages/tags/[tag].astro`）
- [ ] **2.6** サンプル記事作成（Mermaid図含む）
- [ ] **2.7** 動作確認：ページ遷移、タグフィルタが動くか

---

## Phase 3: 機能追加

Mermaid対応とOGP画像生成を追加する。

- [ ] **3.1** Mermaid対応（`rehype-mermaid`）
- [ ] **3.2** 動作確認：Mermaid図がSVGで表示されるか
- [ ] **3.3** OGP画像自動生成（`satori` + `sharp`）
- [ ] **3.4** 動作確認：OGP画像が生成されるか

---

## Phase 4: デプロイ準備

GitHub Pages で公開する準備をする。

- [ ] **4.1** GitHub Actions ワークフロー作成（`.github/workflows/deploy.yml`）
- [ ] **4.2** `astro.config.mjs` に `site` と `base` を設定

### ⚠️ ユーザー操作が必要

| 手順 | 操作内容 | 場所 |
|------|----------|------|
| **4.3** | GitHubで新規リポジトリ `diary-astro` を作成 | github.com |
| **4.4** | リポジトリをPublicに設定（GitHub Pages無料利用のため） | github.com |

- [ ] **4.5** リモートリポジトリ接続 & プッシュ

### ⚠️ ユーザー操作が必要

| 手順 | 操作内容 | 場所 |
|------|----------|------|
| **4.6** | GitHub Pages を有効化 | Settings > Pages > Source: GitHub Actions |

---

## Phase 5: 公開 & 確認

本番環境で最終確認する。

- [ ] **5.1** GitHub Actions のビルド成功を確認
- [ ] **5.2** 公開URL（`<username>.github.io/diary-astro`）でアクセス確認
- [ ] **5.3** OGP確認（SNSシェアプレビューツールで確認）
- [ ] **5.4** Mermaid図が正しく表示されるか確認

---

## ユーザー操作まとめ

| フェーズ | 手順 | 操作内容 |
|----------|------|----------|
| Phase 4 | 4.3 | GitHubでリポジトリ作成 |
| Phase 4 | 4.4 | リポジトリをPublicに設定 |
| Phase 4 | 4.6 | GitHub Pages有効化（Settings > Pages） |

それ以外はすべてClaudeが実行可能。
