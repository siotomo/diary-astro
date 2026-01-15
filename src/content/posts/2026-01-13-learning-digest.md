---
title: "Daily Learning Digest: 2026-01-13"
date: 2026-01-13
tags: ["Rails", "grouped_options_for_select", "mermaid", "Claude Code", "fish shell"]
description: "セレクトボックスのグルーピング実装、MDプレビューツール作成、Claude Code hooks活用など複数プロジェクトの学習記録"
---

# Daily Learning Digest: 2026-01-13

> JSONLから自動抽出・分析

---

## Overview

### Today's Projects
1. [Railsプロジェクト](#project-1-railsプロジェクト) - カテゴリセレクトボックス改善、エリア検索設計、ES障害分析
2. [dotfiles](#project-2-dotfiles) - MD自動プレビュー、Claude Code観測ツール、ccvのLAN公開

### Concepts Covered（統合マップ）

```mermaid
graph LR
    subgraph Railsプロジェクト
        A[grouped_options_for_select] --> B[カテゴリセレクトボックス]
        C[Google Maps API] --> D[エリア検索]
        D --> E[事前計算+キャッシュ]
        F[ES 429エラー] --> G[レート制限対策]
    end

    subgraph dotfiles
        H[mermaid.js] --> I[mdview自作ビューア]
        J[Claude Code hooks] --> K[PostToolUse]
        K --> L[MD自動オープン]
        M[ccv] --> N[セッション管理]
        N --> O[LAN公開 0.0.0.0]
    end

    I -.-> L
    N -.-> P[JSONL解析]
```

- **A → B**: Railsのgrouped_options_for_selectを使ってカテゴリをoptgroupでグループ化
- **C → D → E**: エリア検索はAPIコスト考慮で事前計算方式を採用
- **H → I**: mermaidレンダリングにはJSが必要なため自作ビューア
- **J → K → L**: Claude Code hooksでツール実行後に自動処理

### Key Decisions

| プロジェクト | 選択 | 理由 |
|--------------|------|------|
| Railsプロジェクト | grouped_options_for_select | 条件分岐が明確、既存selectとの置き換え容易 |
| Railsプロジェクト | 事前計算+キャッシュ方式 | APIコスト抑制、検索速度向上 |
| dotfiles | mdview自作 | glow/gripではmermaid描画不可、JS実行環境が必要 |
| dotfiles | ccv一本化 | 複数ツールより高機能な1つに絞る方が管理が楽 |
| dotfiles | LAN公開でパスワード設定 | 0.0.0.0バインドにはパスワード保護必須 |

---

## Project Details

### Project 1: Railsプロジェクト

#### 目的・背景
- 特定プランの企業向け編集画面でカテゴリを大分類（A/Bカテゴリ）でグループ化
- 店舗マスタ起点で一定距離内のユーザーを検索する機能の設計
- ES 429エラー発生時のビジネス影響分析

#### やったこと

```mermaid
flowchart TB
    subgraph カテゴリセレクトボックス
        A1[並列調査3本] --> A2[既存実装パターン発見]
        A2 --> A3[データ構造把握]
        A3 --> A4[grouped_options_for_select採用]
    end

    subgraph エリア検索
        B1[要件分析] --> B2[既存検索機能調査]
        B2 --> B3[データギャップ発見]
        B3 --> B4[事前計算方式提案]
    end
```

**カテゴリセレクトボックス**
- Task（Explore）を3つ同時起動して並列調査
- 発見したパターン: `grouped_collection_select`, `grouped_options_for_select`, `GroupedPulldown`
- プラン判定メソッドで条件分岐を実装

**エリア検索**
- 問題発見: 店舗マスタには緯度経度あり、ユーザーにはなし（市区町村単位のみ）
- 提案: キャッシュテーブルで店舗×市区町村の距離を事前計算

**ES 429エラー分析**
- 影響: バッチ処理遅延 → 通知遅延 → 機会損失
- 対策: バルク処理、スロットリング、インデックス最適化

#### 学び・注意点

| 項目 | 内容 |
|------|------|
| 調査戦略 | 独立した調査は並列でサブエージェント起動 |
| 既存パターン活用 | 新規実装より既存実装の流用を優先 |
| プラン分岐の複雑さ | サイトにはA/B/C/Dカテゴリの各フリープランが存在 |
| 定数の活用 | `CATEGORY_IDS`等のビジネスロジック定数を確認してから実装 |
| APIコスト | Google Maps APIは従量課金、事前計算+キャッシュが有効 |

---

### Project 2: dotfiles

#### 目的・背景
- Claude Codeで出力したMDファイルを即座にmermaid付きで確認したい
- Claude Codeの動作を観測・記録するツールを整備
- ccvをLAN内の他端末からアクセス可能にしたい
- 理解促進のためのsummaryコマンドを拡張

#### やったこと

```mermaid
flowchart TB
    subgraph MDプレビュー
        C1[glow/grip調査] --> C2[mermaid不可と判明]
        C2 --> C3[mdview自作]
        C3 --> C4[hooks連携で自動オープン]
    end

    subgraph Claude Code観測
        D1[cclogviewer導入] --> D2[ccv導入]
        D2 --> D3[ccv一本化]
        D3 --> D4[JSONL構造理解]
    end

    subgraph ccv LAN公開
        E1[0.0.0.0バインド] --> E2[パスワード設定]
        E2 --> E3[mDNSでdev.local]
    end
```

**MDプレビューツール**
- glow: ターミナル内で軽快だがmermaid不可
- grip: GitHub風表示だがmermaid不可（JS実行環境なし）
- 解決: Python http.server + mermaid.js CDNで自作ビューア

**Claude Code hooks**
```json
"hooks": {
  "PostToolUse": [{
    "matcher": "Write",
    "hooks": [{"type": "command", "command": "...md-auto-open.sh"}]
  }]
}
```

**fishバックグラウンド処理**
```fish
# NG: sleepがブロック
sleep 5; open -a Safari "$URL"

# OK: 別プロセス化
fish -c "sleep 5; open -a Safari $URL" &
```

**ccv LAN公開**
- `--hostname 0.0.0.0` でバインド（localhost制限解除）
- `--password kami` でパスワード保護
- macOS mDNSで `http://dev.local:3400` アクセス可能

#### 学び・注意点

| 項目 | 内容 |
|------|------|
| mermaidレンダリング | JS必須、CLIツールでは原理的に無理 |
| Electronの罠 | 「軽量」と謳っていてもChromium内包で重い |
| fishバックグラウンド | `fish -c "..." &`で別プロセス化が必要 |
| LAN公開セキュリティ | 0.0.0.0バインドにはパスワード保護必須 |
| シンプルさ優先 | 複数ツールより高機能な1つに絞る |
| hooks反映 | 設定変更後はcc再起動が必要 |
| JSONL構造 | thinking、サブエージェント情報、トークン数も記録されている |
| NotebookLM向け | 要約だけでは不十分、詳細情報が必要 |

---

## Reflection Prompts

- **エリア検索で「事前計算+キャッシュ」を選んだが、データ鮮度とコストのトレードオフはどう評価すべきか？バッチ間隔は何を基準に決める？**

- **mdviewを自作したが、VS Code拡張やブラウザ拡張という選択肢もあった。ツール自作 vs 既存活用の判断基準は何か？**

- **cclogviewerを導入後すぐ削除した。「試してから捨てる」アプローチは効率的か、それとも事前調査で避けられたか？**

- **Claude Code hooksの`PostToolUse`で処理を追加したが、フックが増えると処理が遅くなる懸念がある。どこまでフックを増やすべきか？**

- **fishの`fish -c "..." &`パターンは他の場面でも使えそう。非同期処理が必要な場面をリストアップするとどうなるか？**
