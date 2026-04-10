# GOAT CRM

An Enterprise AI Voice Agent CRM built with **Next.js**, **Prisma (SQLite)**, and **Bland AI**. Run automated, intelligent outbound call campaigns at scale.

## Features
- **Real-Time Dashboards:** Analyze call status, post-call sentiments, and follow-up flags.
- **AI Agent Builder:** Fully customize the AI's prompt, interruption sensitivity, and voice directly from the dashboard.
- **Campaign Management:** Manually add leads or deploy bulk campaigns automatically utilizing the Bland AI telephony capabilities.
- **Secure Webhooks:** Includes high-security cryptographic timing-safe signature checks to verify incoming reports straight from Bland AI infrastructure directly to your local database.
- **Fast Endpoints:** Built around fully dynamic Next.js App Router API nodes coupled with Prisma ORM.

## Setup Instructions
1. Install dependencies:
```bash
npm install
```

2. Initialize your local database:
```bash
npx prisma db push
```

3. Ensure `.env.local` contains your active Bland API Key and Webhook Signing Secret:
```env
BLAND_API_KEY="your-api-key"
BLAND_WEBHOOK_SECRET="your-webhook-secret"
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to interact with GOAT CRM!
