# GOAT CRM Project Structure

## `app/`
Contains the Next.js App Router structure.
- `layout.tsx` & `globals.css`: Global styles, providers, and layout wrapper.
- `page.tsx`: The main dashboard page combining tele-calling functionalities.
- `api/`
  - `agent/route.ts`: Manage AI agent configurations.
  - `campaigns/route.ts`: Proxies trigger requests to Bland AI and logs campaigns.
  - `contacts/route.ts`: Store and fetch CRM contacts.
  - `webhook/route.ts`: Listens and securely verifies Bland AI call completions.

## `components/dashboard/`
Complex layout building blocks.
- `agent-config.tsx`: Form for tweaking the AI system prompt and behavioral properties.
- `call-intelligence.tsx`: Recent calls map, post-call statistics, and transcript logs mapped from DB.
- `contact-campaign-manager.tsx`: Contact listing and manual/file-based campaign launcher.
- `dashboard-shell.tsx` & `sidebar-nav.tsx`: Application container and navigation UI.

## `lib/`
- `prisma.ts`: Centralized Prisma Client singleton to prevent dev-mode leaks.
- `types.ts`: Universal interfaces matching database bounds.

## `hooks/`
- `useCampaigns.ts`: Abstracted fetch wrappers syncing backend JSON state into React.
- `useAgentConfig.ts`: Sync agent configs.

## `prisma/`
- `schema.prisma`: SQLite data model definitions (Contact, Campaign, FollowUpItem, AgentConfig).
