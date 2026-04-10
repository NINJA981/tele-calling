'use client';

import { useState, useEffect } from 'react';
import { ActivityFeedEntry } from '@/lib/types';
import { generateMockActivityFeed, mockContacts } from '@/lib/mock-data';

const eventTypes = ['call_completed', 'campaign_started', 'contact_added', 'follow_up_triggered'] as const;
const intents = [
  'Call Completed Successfully',
  'Campaign Started',
  'New Contact Added',
  'Follow-up Required',
  'Conversion Logged',
  'Demo Scheduled',
];

function generateRandomActivity(): ActivityFeedEntry {
  const now = new Date();
  const randomContact = mockContacts[Math.floor(Math.random() * mockContacts.length)];
  const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const randomIntent = intents[Math.floor(Math.random() * intents.length)];

  return {
    id: `activity-${Date.now()}-${Math.random()}`,
    timestamp: new Date(now.getTime() - Math.random() * 60000),
    event_type: randomEventType,
    contact_phone: randomContact.phone,
    intent: randomIntent,
    details: `${randomIntent} - ${randomContact.name}`,
    sentiment: randomEventType === 'call_completed' ? ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative' : undefined,
  };
}

export function useWebSocket() {
  const [activityFeed, setActivityFeed] = useState<ActivityFeedEntry[]>(generateMockActivityFeed());

  useEffect(() => {
    // Simulate WebSocket updates with random intervals
    const interval = setInterval(() => {
      setActivityFeed((prev) => {
        const newActivity = generateRandomActivity();
        return [newActivity, ...prev].slice(0, 10);
      });
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return { activityFeed };
}
