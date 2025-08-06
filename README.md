# ⭐️ Stark Tech 前端评测项目

页面地址：https://revenue-nine.vercel.app/

免责声明：本项目用于 Stark Tech 前端评测，不做其他用途使用。

## 🧱 技术栈

- Next.js
- TypeScript
- MUI
- Echarts

## 🌲 目录结构

```
├── README.md
├── app
│   ├── api
│   │   ├── get-tw-stock-info.ts
│   │   ├── get-tw-stock-month-revenue.ts
│   │   └── request.ts
│   ├── components
│   │   ├── chart-panel.tsx
│   │   ├── company-info.tsx
│   │   ├── echarts.ts
│   │   ├── navbar.tsx
│   │   ├── revenue-charts.tsx
│   │   ├── revenue-detail.tsx
│   │   ├── revenue-table.tsx
│   │   ├── search.tsx
│   │   └── tab-switcher.tsx
│   ├── const.ts
│   ├── context
│   │   ├── common-context.ts
│   │   └── common-provider.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── hooks
│   │   └── use-month-revenue.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── utils.ts
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## 🚀 快速开始

### 📥 安装依赖
```
pnpm install
```

### 🛠 本地运行

```
pnpm dev
```

### 📦 打包
```
pnpm build
```

## 📝 资料

- 题目地址：https://starktech.notion.site/Stark-Tech-1-2593796171d44c0b89af35dad29612fd
- Figma: https://www.figma.com/design/nBCCS3g1xFDJnFShBBuVZB/Stark-Tech%E5%89%8D%E7%AB%AF%E8%A9%95%E6%B8%AC--%E7%B0%A1%E7%89%88-?node-id=4-47
- API 接口：https://finmindtrade.com/analysis/#/data/api