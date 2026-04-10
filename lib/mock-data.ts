import {
  CallAnalyzedEvent,
  AgentConfig,
  Contact,
  Campaign,
  ActivityFeedEntry,
  FollowUpItem,
  AnalyticsData,
} from './types';

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  totalCalls: 1243,
  conversionRate: 34.8,
  avgDuration: '4m 32s',
  activeCampaigns: 5,
  chartData: [
    { date: 'Mon', calls: 145, conversions: 52 },
    { date: 'Tue', calls: 168, conversions: 61 },
    { date: 'Wed', calls: 142, conversions: 48 },
    { date: 'Thu', calls: 189, conversions: 68 },
    { date: 'Fri', calls: 176, conversions: 62 },
    { date: 'Sat', calls: 98, conversions: 35 },
    { date: 'Sun', calls: 112, conversions: 38 },
  ],
};

// Mock Agent Configuration
export const mockAgentConfig: AgentConfig = {
  id: 'agent-001',
  system_prompt: `You are a professional AI sales representative for TechFlow Solutions. 
Your goal is to understand customer needs and present solutions that align with their business requirements.
Be empathetic, ask clarifying questions, and always maintain a professional tone.
If the customer has objections, acknowledge them and provide thoughtful responses.`,
  response_eagerness: 0.7,
  interruption_sensitivity: 0.6,
  denoising_enabled: true,
  voice_provider: 'google',
  updated_at: new Date().toISOString(),
};

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: 'contact-001',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@acmecorp.com',
    status: 'converted',
    last_contacted: '2024-04-08',
    campaign_id: 'campaign-001',
  },
  {
    id: 'contact-002',
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    email: 'mchen@globalsystems.com',
    status: 'contacted',
    last_contacted: '2024-04-07',
    campaign_id: 'campaign-001',
  },
  {
    id: 'contact-003',
    name: 'Jessica Martinez',
    phone: '+1 (555) 345-6789',
    email: 'jmartinez@innovateco.io',
    status: 'follow-up',
    last_contacted: '2024-04-06',
    campaign_id: 'campaign-002',
  },
  {
    id: 'contact-004',
    name: 'David Williams',
    phone: '+1 (555) 456-7890',
    email: 'dwilliams@techventure.com',
    status: 'active',
    last_contacted: null,
    campaign_id: 'campaign-001',
  },
  {
    id: 'contact-005',
    name: 'Emily Brown',
    phone: '+1 (555) 567-8901',
    email: 'ebrown@futuretech.io',
    status: 'active',
    last_contacted: null,
    campaign_id: 'campaign-003',
  },
  {
    id: 'contact-006',
    name: 'Robert Taylor',
    phone: '+1 (555) 678-9012',
    email: 'rtaylor@corporateinc.com',
    status: 'contacted',
    last_contacted: '2024-04-05',
    campaign_id: 'campaign-002',
  },
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-001',
    name: 'Q2 Enterprise Push',
    contact_list_id: 'list-001',
    agent_id: 'agent-001',
    status: 'active',
    created_at: '2024-04-01',
    contact_count: 250,
  },
  {
    id: 'campaign-002',
    name: 'SMB Outreach',
    contact_list_id: 'list-002',
    agent_id: 'agent-001',
    status: 'active',
    created_at: '2024-03-28',
    contact_count: 480,
  },
  {
    id: 'campaign-003',
    name: 'Partner Program Launch',
    contact_list_id: 'list-003',
    agent_id: 'agent-001',
    status: 'active',
    created_at: '2024-03-15',
    contact_count: 150,
  },
];

// Mock Call Logs
export const mockCallLogs: CallAnalyzedEvent[] = [
  {
    call_id: 'call-001',
    recording_url: '/mock-recording-1.mp3',
    transcript: [
      {
        speaker: 'ai',
        text: 'Hello Sarah, this is Alex from TechFlow Solutions. I hope I&apos;m not calling at a bad time?',
        timestamp: 0,
      },
      {
        speaker: 'user',
        text: 'Hi Alex, no this is fine. What is this regarding?',
        timestamp: 5,
      },
      {
        speaker: 'ai',
        text: 'I wanted to reach out because we help companies like yours streamline their sales operations with AI-powered calling solutions.',
        timestamp: 10,
      },
      {
        speaker: 'user',
        text: 'That sounds interesting. We have been looking at solutions to improve our outbound calling efficiency.',
        timestamp: 18,
      },
      {
        speaker: 'ai',
        text: 'Perfect! Many of our clients in the enterprise space have seen a 40% improvement in call volume and 35% higher conversion rates. Would you be open to a brief demo?',
        timestamp: 25,
      },
      {
        speaker: 'user',
        text: 'Yes, absolutely. I&apos;d like to see how it works.',
        timestamp: 35,
      },
    ],
    analysis: {
      user_sentiment: 'positive',
      call_summary:
        'Sarah showed high interest in our enterprise solution. Call started professionally, customer was receptive to value proposition and agreed to demo.',
      key_objections: [],
      requires_follow_up: true,
    },
    created_at: '2024-04-08T14:30:00Z',
    duration: 180,
  },
  {
    call_id: 'call-002',
    recording_url: '/mock-recording-2.mp3',
    transcript: [
      {
        speaker: 'ai',
        text: 'Hi Michael, this is Alex from TechFlow Solutions. Do you have a quick minute?',
        timestamp: 0,
      },
      {
        speaker: 'user',
        text: 'Sure, what&apos;s this about?',
        timestamp: 5,
      },
      {
        speaker: 'ai',
        text: 'I wanted to introduce our AI calling platform. We help tech companies automate customer outreach.',
        timestamp: 10,
      },
      {
        speaker: 'user',
        text: 'We&apos;re actually pretty happy with our current system. It&apos;s working well for us.',
        timestamp: 18,
      },
      {
        speaker: 'ai',
        text: 'That&apos;s great to hear. Many of our clients said the same initially, but found they could reduce costs by 30% while reaching more people.',
        timestamp: 25,
      },
      {
        speaker: 'user',
        text: 'Interesting. Maybe we could explore that further. Can you send me some information?',
        timestamp: 35,
      },
    ],
    analysis: {
      user_sentiment: 'neutral',
      call_summary:
        'Michael initially showed resistance but warmed up to the value proposition. Requested additional information for review.',
      key_objections: ['Happy with current system'],
      requires_follow_up: true,
    },
    created_at: '2024-04-07T10:15:00Z',
    duration: 240,
  },
];

// Mock Activity Feed
export const generateMockActivityFeed = (): ActivityFeedEntry[] => {
  const sentiments = ['positive', 'neutral', 'negative'] as const;
  const events = [
    {
      event_type: 'call_completed' as const,
      intent: 'Scheduled Demo',
    },
    {
      event_type: 'contact_added' as const,
      intent: 'New Contact Imported',
    },
    {
      event_type: 'follow_up_triggered' as const,
      intent: 'Follow-up Required',
    },
    {
      event_type: 'campaign_started' as const,
      intent: 'Campaign Activated',
    },
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const eventConfig = events[i % events.length];
    const now = new Date();
    return {
      id: `activity-${i}`,
      timestamp: new Date(now.getTime() - i * 5 * 60000),
      event_type: eventConfig.event_type,
      contact_phone: mockContacts[i % mockContacts.length].phone,
      intent: eventConfig.intent,
      details: `${eventConfig.intent} - ${mockContacts[i % mockContacts.length].name}`,
      sentiment:
        eventConfig.event_type === 'call_completed'
          ? sentiments[Math.floor(Math.random() * sentiments.length)]
          : undefined,
    };
  });
};

// Mock Follow-up Queue
export const mockFollowUpQueue: FollowUpItem[] = [
  {
    id: 'followup-001',
    contact: mockContacts[2],
    objection: 'Price sensitivity - needs ROI justification',
    callback_time: '2024-04-09 14:00',
    priority: 'high',
    status: 'pending',
    call_id: 'call-003',
  },
  {
    id: 'followup-002',
    contact: mockContacts[1],
    objection: 'Needs integration with existing CRM',
    callback_time: '2024-04-09 16:30',
    priority: 'high',
    status: 'pending',
    call_id: 'call-002',
  },
  {
    id: 'followup-003',
    contact: mockContacts[3],
    objection: 'Waiting for budget approval from finance',
    callback_time: '2024-04-10 10:00',
    priority: 'medium',
    status: 'pending',
    call_id: 'call-004',
  },
  {
    id: 'followup-004',
    contact: mockContacts[4],
    objection: 'Wants to see case study from similar company',
    callback_time: '2024-04-10 15:00',
    priority: 'medium',
    status: 'scheduled',
    call_id: 'call-005',
  },
];
