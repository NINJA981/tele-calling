'use client';

import { useState, useEffect } from 'react';
import { CallAnalyzedEvent } from '@/lib/types';

export function useCallLogs() {
  const [logs, setLogs] = useState<CallAnalyzedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/bland/calls');
        const data = await res.json();
        
        // Map Bland API calls to the expected format
        if (data.calls && Array.isArray(data.calls)) {
          const mappedLogs: CallAnalyzedEvent[] = data.calls.map((c: any) => {
            return {
              call_id: c.c_id || c.call_id,
              recording_url: c.recording_url || '',
              transcript: c.transcripts?.map((t: any, index: number) => ({
                speaker: t.user === 'assistant' || t.user === 'agent' ? 'ai' : 'user',
                text: t.text,
                timestamp: index * 5 // Mock timestamp interval if not provided
              })) || [],
              analysis: {
                user_sentiment: 'neutral', // Could derive from variables or bland analysis
                call_summary: c.summary || 'No summary available',
                key_objections: c.variables?.objections || [],
                requires_follow_up: !!c.variables?.requires_follow_up
              },
              created_at: c.created_at,
              duration: c.call_length || 0,
            };
          });
          setLogs(mappedLogs);
        }
      } catch (e) {
        console.error("Failed to fetch call logs", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getCallById = async (callId: string) => {
    const existing = logs.find((log) => log.call_id === callId);
    if (existing && existing.transcript?.length > 0) return existing;

    // Fetch individual detail if missing transcript
    try {
      const res = await fetch(`/api/bland/calls/${callId}`);
      const c = await res.json();
      return {
        call_id: c.c_id || c.call_id,
        recording_url: c.recording_url || '',
        transcript: c.transcripts?.map((t: any, index: number) => ({
          speaker: t.user === 'assistant' || t.user === 'agent' ? 'ai' : 'user',
          text: t.text,
          timestamp: index * 5
        })) || [],
        analysis: {
          user_sentiment: 'neutral',
          call_summary: c.summary || 'No summary',
          key_objections: [],
          requires_follow_up: false
        },
        created_at: c.created_at,
        duration: c.call_length || 0,
      } as CallAnalyzedEvent;
    } catch (e) {
      return null;
    }
  };

  return { logs, isLoading, getCallById };
}
