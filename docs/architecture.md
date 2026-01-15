# アーキテクチャ

## 全体構成

```mermaid
flowchart TB
    subgraph Local["🖥️ ローカル開発環境"]
        MD["📝 Markdown<br/>(src/content/posts/)"]
        IMG["🖼️ 画像<br/>(src/assets/)"]

        subgraph Astro["⚡ Astro ビルド"]
            CC["Content Collections"]
            RM["rehype-mermaid<br/>(図→SVG)"]
            OGP["satori<br/>(OGP画像生成)"]
            TW["Tailwind CSS"]
        end
    end

    subgraph GitHub["☁️ GitHub"]
        Repo["📦 Repository"]
        Actions["🔄 Actions"]
        Pages["🌐 Pages"]
    end

    MD --> CC
    IMG --> CC
    CC --> RM --> OGP --> TW
    TW --> Repo --> Actions --> Pages
```

---

## 技術スタック

| 層 | 技術 | 役割 |
|----|------|------|
| **フレームワーク** | Astro | 静的サイト生成（SSG） |
| **スタイル** | Tailwind CSS | ユーティリティファーストCSS |
| **図解** | rehype-mermaid | MermaidをビルドTimeでSVG変換 |
| **OGP** | satori | 記事タイトルからOGP画像を自動生成 |
| **ホスティング** | GitHub Pages | 無料の静的ホスティング |
| **CI/CD** | GitHub Actions | 自動ビルド＆デプロイ |

---

## ディレクトリ構成

```
diary-astro/
├── src/
│   ├── assets/              # 画像ファイル（Astroが最適化）
│   │   └── posts/           # 記事ごとの画像
│   │
│   ├── content/
│   │   ├── config.ts        # Content Collections 定義
│   │   └── posts/           # 日記Markdownファイル
│   │
│   ├── layouts/
│   │   └── Base.astro       # 共通レイアウト
│   │
│   ├── pages/
│   │   ├── index.astro      # トップ（記事一覧）
│   │   ├── tags/
│   │   │   └── [tag].astro  # タグ別一覧
│   │   └── posts/
│   │       └── [...slug].astro  # 記事ページ
│   │
│   └── components/
│       ├── Card.astro       # 記事カード（モダンUI）
│       └── Tag.astro        # タグバッジ
│
├── public/
│   └── og/                  # 生成されたOGP画像
│
├── docs/                    # ドキュメント（このファイル含む）
├── astro.config.mjs         # Astro設定
├── tailwind.config.mjs      # Tailwind設定
└── package.json
```

---

## ビルドパイプライン

```mermaid
flowchart LR
    subgraph Input["入力"]
        MD["Markdown"]
        Assets["画像"]
    end

    subgraph Process["ビルド処理"]
        CC["Content Collections<br/>型安全にパース"]
        Mermaid["rehype-mermaid<br/>図をSVGに変換"]
        ImageOpt["Astro Image<br/>画像最適化"]
        OGP["satori<br/>OGP画像生成"]
        CSS["Tailwind<br/>CSS生成"]
    end

    subgraph Output["出力"]
        HTML["HTML"]
        OptImg["最適化画像"]
        OGPImg["OGP画像"]
        Style["CSS"]
    end

    MD --> CC --> Mermaid --> HTML
    Assets --> ImageOpt --> OptImg
    CC --> OGP --> OGPImg
    CSS --> Style
```

---

## 主要ライブラリ

```json
{
  "dependencies": {
    "astro": "静的サイト生成",
    "@astrojs/tailwind": "Tailwind統合",
    "rehype-mermaid": "Mermaid→SVG変換",
    "satori": "OGP画像生成",
    "sharp": "画像処理"
  }
}
```
