'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCallLogs } from '@/hooks/useCallLogs';
import { CallAnalyzedEvent, SentimentType } from '@/lib/types';

interface CallIntelligenceProps {
  callId: string;
}

const sentimentColors: Record<SentimentType, string> = {
  positive: 'bg-green-500/20 text-green-300',
  neutral: 'bg-slate-500/20 text-slate-300',
  negative: 'bg-red-500/20 text-red-300',
};

export function CallIntelligence({ callId }: CallIntelligenceProps) {
  const { getCallById } = useCallLogs();
  const [call, setCall] = useState<CallAnalyzedEvent | null>(null);

  useEffect(() => {
    let isMounted = true;
    getCallById(callId).then(c => {
      if (isMounted) setCall(c);
    });
    return () => { isMounted = false; };
  }, [callId, getCallById]);

  if (!call) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-slate-400">Loading call data...</p>
        <p className="text-slate-400">Call not found</p>
      </div>
    );
  }

  const minutes = Math.floor(call.duration / 60);
  const seconds = call.duration % 60;
  const durationStr = `${minutes}m ${seconds}s`;

  return (
    <div className="space-y-6 p-8">
      {/* Call Header */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Call #{call.call_id}</CardTitle>
              <CardDescription className="text-slate-400">
                {new Date(call.created_at).toLocaleString()}
              </CardDescription>
            </div>
            <Badge className={sentimentColors[call.analysis.user_sentiment as SentimentType] || sentimentColors.neutral}>
              {call.analysis.user_sentiment}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Transcript and Intelligence */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Transcript */}
        <Card className="col-span-1 border-slate-700 bg-slate-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Transcript</CardTitle>
            <CardDescription className="text-slate-400">
              Full call conversation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] rounded-lg border border-slate-700 bg-slate-700/30 p-4">
              <div className="space-y-4 pr-4">
                {call.transcript.map((entry: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${
                      entry.speaker === 'ai' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 ${
                        entry.speaker === 'ai'
                          ? 'bg-blue-900 text-slate-100'
                          : 'bg-slate-700 text-slate-100'
                      }`}
                    >
                      <p className="text-xs font-semibold text-slate-400">
                        {entry.speaker === 'ai' ? 'AI Agent' : 'Caller'}
                      </p>
                      <p className="mt-1 text-sm">{entry.text}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {Math.floor(entry.timestamp / 60)}:{String(entry.timestamp % 60).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Call Intelligence */}
        <div className="space-y-4">
          {/* Audio Player */}
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Recording</CardTitle>
            </CardHeader>
            <CardContent>
              <audio
                controls
                crossOrigin="anonymous"
                className="w-full rounded-lg bg-slate-700"
              >
                <source src={call.recording_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className="mt-3 text-sm text-slate-400">
                Duration: {durationStr}
              </p>
            </CardContent>
          </Card>

          {/* Call Summary */}
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300">{call.analysis.call_summary}</p>
            </CardContent>
          </Card>

          {/* Key Objections */}
          {call.analysis.key_objections.length > 0 && (
            <Card className="border-slate-700 bg-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Key Objections</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {call.analysis.key_objections.map((objection: any, idx: number) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-sm text-slate-300"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      {objection}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Follow-up Required */}
          {call.analysis.requires_follow_up && (
            <Card className="border-orange-700 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="text-orange-300">
                  Follow-up Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-200">
                  This call requires a follow-up action
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
