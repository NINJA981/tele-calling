'use client';

import { useState, useEffect } from 'react';
import { AnalyticsData } from '@/lib/types';
import { useCallLogs } from './useCallLogs';
import { useCampaigns } from './useCampaigns';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    totalCalls: 0,
    conversionRate: 0,
    avgDuration: '0s',
    activeCampaigns: 0,
    chartData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const { logs, isLoading: logsLoading } = useCallLogs();
  const { campaigns, isLoading: campsLoading } = useCampaigns();

  useEffect(() => {
    if (logsLoading || campsLoading) return;

    const totalCalls = logs.length;
    let totalDuration = 0;
    let conversions = 0;

    // Build simple chart data from last 7 days
    const chartMap = new Map<string, { calls: number, conversions: number }>();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      chartMap.set(d.toISOString().split('T')[0], { calls: 0, conversions: 0 });
    }

    logs.forEach(log => {
      totalDuration += log.duration || 0;
      if (log.analysis?.user_sentiment === 'positive') conversions++;
      
      if (log.created_at) {
        const dateStr = new Date(log.created_at).toISOString().split('T')[0];
        if (chartMap.has(dateStr)) {
          const entry = chartMap.get(dateStr)!;
          entry.calls++;
          if (log.analysis?.user_sentiment === 'positive') entry.conversions++;
        }
      }
    });

    const avgDurSec = totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0;
    const avgDuration = `${Math.floor(avgDurSec / 60)}m ${avgDurSec % 60}s`;
    const conversionRate = totalCalls > 0 ? Number(((conversions / totalCalls) * 100).toFixed(1)) : 0;
    
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

    const chartData = Array.from(chartMap.entries()).map(([date, stats]) => ({
      date: date.slice(5), // MM-DD
      calls: stats.calls,
      conversions: stats.conversions
    }));

    setData({
      totalCalls,
      conversionRate,
      avgDuration,
      activeCampaigns,
      chartData
    });
    setIsLoading(false);
  }, [logs, campaigns, logsLoading, campsLoading]);

  return { data, isLoading };
}
