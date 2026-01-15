---
title: "Mermaid図テストケース集"
date: 2025-01-16
tags: ["テスト", "Mermaid", "技術"]
description: "様々なMermaid図の表示テスト"
---

このページでは、様々な種類のMermaid図が正しく表示されるかをテストします。

---

## 1. フローチャート（flowchart）

### 基本的なフロー

```mermaid
flowchart LR
    A[開始] --> B[処理1]
    B --> C[処理2]
    C --> D[終了]
```

### 分岐あり

```mermaid
flowchart TD
    A[ユーザー入力] --> B{有効?}
    B -->|Yes| C[処理実行]
    B -->|No| D[エラー表示]
    C --> E[完了]
    D --> A
```

### サブグラフ

```mermaid
flowchart TB
    subgraph Frontend["フロントエンド"]
        A[ブラウザ] --> B[React]
    end

    subgraph Backend["バックエンド"]
        C[API] --> D[DB]
    end

    B --> C
```

---

## 2. シーケンス図（sequence）

### 基本

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant S as サーバー
    participant D as データベース

    U->>S: ログインリクエスト
    S->>D: ユーザー検索
    D-->>S: ユーザー情報
    S-->>U: ログイン成功
```

### ループと条件分岐

```mermaid
sequenceDiagram
    participant C as クライアント
    participant S as サーバー

    loop 毎秒
        C->>S: ポーリング
        S-->>C: データ
    end

    alt データあり
        S-->>C: 新着通知
    else データなし
        S-->>C: 空レスポンス
    end
```

---

## 3. クラス図（classDiagram）

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }

    class Dog {
        +String breed
        +bark()
    }

    class Cat {
        +String color
        +meow()
    }

    Animal <|-- Dog
    Animal <|-- Cat
```

---

## 4. 状態遷移図（stateDiagram）

```mermaid
stateDiagram-v2
    [*] --> 待機中
    待機中 --> 処理中: 開始
    処理中 --> 完了: 成功
    処理中 --> エラー: 失敗
    エラー --> 待機中: リトライ
    完了 --> [*]
```

---

## 5. ER図（erDiagram）

```mermaid
erDiagram
    USER ||--o{ POST : writes
    USER {
        int id PK
        string name
        string email
    }
    POST ||--o{ COMMENT : has
    POST {
        int id PK
        string title
        text content
        int user_id FK
    }
    COMMENT {
        int id PK
        text content
        int post_id FK
    }
```

---

## 6. 円グラフ（pie）

```mermaid
pie title 言語使用率
    "JavaScript" : 45
    "TypeScript" : 30
    "Python" : 15
    "その他" : 10
```

---

## 7. ガントチャート（gantt）

```mermaid
gantt
    title プロジェクトスケジュール
    dateFormat YYYY-MM-DD

    section 設計
    要件定義     :a1, 2025-01-01, 7d
    設計         :a2, after a1, 14d

    section 開発
    実装         :b1, after a2, 21d
    テスト       :b2, after b1, 7d

    section リリース
    デプロイ     :c1, after b2, 3d
```

---

## 8. Git グラフ（gitGraph）

```mermaid
gitGraph
    commit id: "初期コミット"
    commit id: "機能A追加"
    branch feature
    commit id: "機能B開発中"
    commit id: "機能B完了"
    checkout main
    commit id: "バグ修正"
    merge feature id: "マージ"
    commit id: "リリース"
```

---

## 9. マインドマップ（mindmap）

```mermaid
mindmap
    root((diary-astro))
        技術スタック
            Astro
            Tailwind CSS
            Mermaid
        機能
            記事管理
            タグ分類
            OGP生成
        デプロイ
            GitHub Actions
            GitHub Pages
```

---

## 10. タイムライン（timeline）

```mermaid
timeline
    title プロジェクト進捗
    2025-01-15 : 企画開始
               : 技術選定
    2025-01-16 : 基盤構築
               : UI実装
    2025-01-17 : 機能追加
               : テスト
    2025-01-18 : 公開
```

---

## まとめ

上記のMermaid図がすべて正しくSVGとして表示されていれば、rehype-mermaidの設定は正常に動作しています。

もし表示されない図があれば、以下を確認してください：

1. Mermaidの構文エラー
2. rehype-mermaidのバージョン
3. Playwrightのインストール状態
