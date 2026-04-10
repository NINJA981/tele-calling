# AI Voice Agent CRM & Analytics Dashboard

A production-ready enterprise dashboard for managing AI voice agent campaigns, analyzing call intelligence, and automating follow-up workflows.

## Features

### 📊 Analytics Overview
- **Real-time KPIs**: Total calls, conversion rate, average duration, active campaigns
- **Call Volume Chart**: 7-day trend visualization with Recharts
- **Live Activity Feed**: WebSocket-simulated real-time updates with call sentiments

### 📱 Contact & Campaign Management
- **CSV Import**: Drag-and-drop interface for bulk contact uploads
- **Contact Table**: View and manage leads with status tracking (Active, Contacted, Follow-up, Converted)
- **Campaign Builder**: Create and manage outreach campaigns with agent assignment

### 🤖 Agent Configuration
- **System Prompt Editor**: Customize AI agent behavior and communication style
- **Response Eagerness**: Slider control (0.0 - 1.0) for response speed
- **Interruption Sensitivity**: Adjust how easily the agent can be interrupted
- **Voice Provider Selection**: Choose from Google, Eleven Labs, Azure, or AWS Polly
- **Audio Denoising**: Toggle noise cancellation for cleaner calls

### 🎯 Call Intelligence & Analysis
- **Full Transcripts**: Bubble-style conversation display with speaker labels and timestamps
- **AI Analysis**: 
  - User sentiment detection (positive, neutral, negative)
  - Call summaries with key insights
  - Objection extraction and classification
  - Follow-up requirement flags
- **Audio Playback**: Embedded player with recording duration
- **Call Metadata**: Recording URL and call duration tracking

### ✅ Follow-up Automation Queue
- **Priority-based Workflow**: High, medium, and low priority items with visual indicators
- **Call Objection Tracking**: Stores specific objections for context during callbacks
- **Scheduled Callbacks**: Set callback times for automated follow-ups
- **Quick Actions**: Trigger calls immediately or approve automated retries
- **Status Management**: Track pending, in-progress, and scheduled follow-ups

## Architecture

```
/app
  /dashboard
    /layout.tsx              # Main dashboard layout with sidebar
    /page.tsx                # Analytics overview page
    /contacts/page.tsx       # Contact management
    /agent/page.tsx          # Agent configuration
    /call-intelligence/[id]/ # Call analysis details
    /follow-up/page.tsx      # Follow-up queue

/components/dashboard
  /overview-analytics.tsx    # KPI cards, charts, activity feed
  /contact-campaign-manager.tsx
  /agent-configurator.tsx
  /call-intelligence.tsx
  /follow-up-queue.tsx
  /sidebar-nav.tsx
  /header.tsx

/hooks
  /useAnalytics.ts          # Mock analytics data
  /useCallLogs.ts           # Call records and transcripts
  /useCampaigns.ts          # Campaign and contact management
  /useWebSocket.ts          # Real-time activity simulation

/lib
  /types.ts                 # TypeScript interfaces
  /mock-data.ts             # Mock data for all features
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS 4.2
- **Forms**: React Hook Form + Zod
- **State**: React Context + custom hooks

## Data Types

### Core Models
- **CallAnalyzedEvent**: Call recording with transcript and AI-generated analysis
- **Agent Config**: AI agent behavior settings and voice provider selection
- **Contact**: Lead information with campaign and status tracking
- **Campaign**: Outreach campaign with contact lists and agent assignment
- **ActivityFeedEntry**: Real-time activity with sentiment and event type
- **FollowUpItem**: Follow-up task with objection and callback scheduling

## Mock Data

All data is currently mocked with realistic examples:
- 1,243 total calls (34.8% conversion rate)
- 6 sample contacts with varied statuses
- 3 active campaigns
- 2 complete call transcripts with sentiment analysis
- 4 follow-up items with priority levels

## Getting Started

1. **Navigate to Dashboard**: The app redirects to `/dashboard` by default
2. **Explore Views**: Use the sidebar to navigate between sections
3. **View Analytics**: Overview page shows KPIs and activity feed
4. **Manage Contacts**: Add/view contacts and create campaigns
5. **Configure Agent**: Adjust AI agent behavior and voice settings
6. **Analyze Calls**: Review call transcripts and AI-generated insights
7. **Handle Follow-ups**: Manage and trigger automated follow-up calls

## Future Enhancements

- Real Retell API integration
- WebSocket for actual real-time updates
- Database backend (Supabase, PostgreSQL, etc.)
- User authentication and authorization
- Advanced filtering and search
- Custom reporting and export
- Multi-agent management
- A/B testing for agent configurations
