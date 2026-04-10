# GOAT CRM Project Structure

```text
bland/
├── .env
├── .env.local
├── .gitignore
├── next.config.mjs
├── next-env.d.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json
├── package.json
├── pnpm-lock.yaml
│
├── app/                                  ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── agent/
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   ├── follow-up/
│   │   │   └── page.tsx
│   │   └── call-intelligence/
│   │       └── [id]/
│   │           └── page.tsx
│   └── api/
│       ├── agent/route.ts
│       ├── campaigns/route.ts
│       ├── contacts/route.ts
│       ├── webhook/route.ts
│       └── bland/
│           ├── calls/route.ts
│           └── calls/[id]/route.ts
│
├── components/
│   ├── theme-provider.tsx
│   ├── dashboard/
│   │   ├── agent-configurator.tsx
│   │   ├── call-intelligence.tsx
│   │   ├── contact-campaign-manager.tsx
│   │   ├── follow-up-queue.tsx
│   │   ├── header.tsx
│   │   ├── overview-analytics.tsx
│   │   └── sidebar-nav.tsx
│   └── ui/                               ← shadcn/ui components (30+ files)
│       ├── button.tsx, card.tsx, dialog.tsx ...
│       └── (accordion, badge, chart, form, table, tabs, etc.)
│
├── hooks/
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   ├── useAnalytics.ts
│   ├── useCallLogs.ts
│   ├── useCampaigns.ts
│   └── useWebSocket.ts
│
├── lib/
│   ├── prisma.ts
│   ├── types.ts
│   ├── utils.ts
│   └── mock-data.ts
│
├── prisma/
│   └── schema.prisma                     ← SQLite models (Contact, Campaign, FollowUpItem, AgentConfig)
├── prisma.config.ts
├── dev.db                                ← SQLite database file
│
├── public/
│   ├── icon.svg
│   ├── apple-icon.png
│   ├── placeholder.jpg / .svg / -logo.png / -user.jpg
│   ├── icon-dark-32x32.png
│   └── icon-light-32x32.png
│
└── styles/
    └── globals.css
```
