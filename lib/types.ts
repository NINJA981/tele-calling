// Retell API Integration Types
export type SentimentType = 'positive' | 'neutral' | 'negative';
export type ContactStatus = 'active' | 'contacted' | 'follow-up' | 'converted';
export type CampaignStatus = 'active' | 'paused' | 'completed';
export type FollowUpStatus = 'pending' | 'in-progress' | 'scheduled';

export interface TranscriptEntry {
  speaker: 'user' | 'ai';
  text: string;
  timestamp: number; // seconds
}

export interface CallAnalysis {
  user_sentiment: SentimentType;
  call_summary: string;
  key_objections: string[];
  requires_follow_up: boolean;
}

export interface CallAnalyzedEvent {
  call_id: string;
  recording_url: string;
  transcript: TranscriptEntry[];
  analysis: CallAnalysis;
  created_at: string;
  duration: number; // seconds
}

export interface AgentConfig {
  id: string;
  system_prompt: string;
  response_eagerness: number; // 0.0 - 1.0
  interruption_sensitivity: number; // 0.0 - 1.0
  denoising_enabled: boolean;
  voice_provider: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: ContactStatus;
  last_contacted?: string;
  campaign_id?: string;
}

export interface Campaign {
  id: string;
  name: string;
  contact_list_id: string;
  agent_id: string;
  status: CampaignStatus;
  created_at: string;
  contact_count: number;
}

export interface ActivityFeedEntry {
  id: string;
  timestamp: Date;
  event_type: 'call_completed' | 'campaign_started' | 'contact_added' | 'follow_up_triggered';
  contact_phone: string;
  intent: string;
  details: string;
  sentiment?: SentimentType;
}

export interface FollowUpItem {
  id: string;
  contact: Contact;
  objection: string;
  callback_time: string;
  priority: 'high' | 'medium' | 'low';
  status: FollowUpStatus;
  call_id: string;
}

export interface AnalyticsData {
  totalCalls: number;
  conversionRate: number;
  avgDuration: string;
  activeCampaigns: number;
  chartData: Array<{
    date: string;
    calls: number;
    conversions: number;
  }>;
}
