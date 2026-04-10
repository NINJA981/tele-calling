# GOAT CRM

An Enterprise-grade AI Voice Agent CRM engineered to orchestrate and manage autonomous inbound and outbound tele-calling operations. Built with **Next.js (App Router)**, powered by the **Prisma ORM (SQLite)**, and completely integrated with the cutting-edge voice telephony models of **Bland AI**.

![GOAT CRM License](https://img.shields.io/badge/license-MIT-blue.svg) ![Next.js Version](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js) ![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D?logo=prisma)

## 📌 Overview

GOAT CRM revolutionizes traditional customer relationship management by replacing static email drip campaigns with real-time, interactive, AI-driven voice calls. It allows sales teams, customer service desks, and operational coordinators to dispatch high-quality conversational AI agents to massive contact lists simultaneously. 

The dashboard provides a unified telemetry interface to view active campaigns, scrutinize detailed call transcripts, define custom agent traits (like interruption sensitivity and tone), and queue follow-up logistics extracted securely from webhook endpoints.

## 🚀 Key Features

*   **Intelligent Campaign Orchestration:** Automatically dispatch call campaigns to thousands of contacts via the tele-calling module. Map specific variables dynamically into call prompts.
*   **Dynamic Agent Configuration:** Fine-tune the underlying AI configuration directly from the UI. Control system prompts, initial AI greetings, interruption behaviors, and voice typologies in real time.
*   **Live Call Intelligence:** Telemetry maps actively tracking outbound nodes, offering real-time transcription analysis, sentiment indicators, and actionable flag extraction post-call via webhook ingestion.
*   **Granular Contact Management:** Create, scrub, and manage leads securely handled through Prisma ORM using standard transactional flows.
*   **Webhook & Verification System:** Zero-trust architecture incorporating `crypto` symmetric verification to securely validate asynchronous payload handshakes directly from Bland AI into your local state context.

## 🛠 Tech Stack

**Front-End:**
*   Framework: [Next.js (App Router)](https://nextjs.org/)
*   Language: [TypeScript](https://www.typescriptlang.org/)
*   Core UI: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
*   Visualization: Recharts for data analytics.
*   Icons: Lucide React.

**Back-End Infrastructure:**
*   API Architecture: Next.js Serverless Route Handlers
*   Database Engine: SQLite (Production scalable to Postgres/CockroachDB)
*   ORM Engine: [Prisma ORM](https://www.prisma.io/)
*   Telephony Backend: [Bland AI Platform](https://www.bland.ai/)

## 📦 Local Installation & Setup

Follow these steps to deploy a local instance of GOAT CRM:

### 1. Prerequisites 
Ensure you have the following installed on your machine:
- Node.js `(v18.0.0 or higher recommended)`
- `npm` or `pnpm`

### 2. Repository Initialization
Clone down the centralized tele-calling environment:
```bash
git clone https://github.com/NINJA981/tele-calling.git
cd tele-calling
```

### 3. Install Dependencies
```bash
npm install 
# or 
pnpm install
```

### 4. Application Secrets Configuration
Create a `.env.local` config on the absolute root defining the core network variables. You will need an active API key from the Bland AI Developer Portal.

```env
# Create a .env.local file in the root
BLAND_API_KEY="org_**************************************"
BLAND_WEBHOOK_SECRET="****************************************"
```
*(Note: A `.env` file declaring `DATABASE_URL="file:./dev.db"` is already pre-configured to sync with Prisma.)*

### 5. Database Provisioning 
Push the schema context down to initialize the local SQLite `dev.db`:
```bash
npx prisma db push
## Generate standard typescript schema typing for your ORM references.
npx prisma generate
```

### 6. Submitting the Execution State
Spawn the Turbopack dev server to access your active ecosystem.
```bash
npm run dev
```

The portal will be active precisely on [http://localhost:3000](http://localhost:3000).

## 🔒 Webhook Integration Architecture
The system asynchronously captures post-call analyses bridging them via `app/api/webhook/route.ts`. Provide a publicly available tunnel (e.g. `ngrok`) mapping to local port 3000 configuring the Bland portal hook to point directly to `https://<YOUR_TUNNEL>.ngrok.io/api/webhook` to effectively witness live payload drops.

## 📖 Architecture & File Structure
Discover the application directory mapping and specific functional roles defined carefully in [structure.md](./structure.md).

## 📄 License
This application is provided under standard MIT operational terms. Check with respective core dependencies representing integration bounds for specific third-party service bounds.
