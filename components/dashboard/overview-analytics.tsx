'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Phone, TrendingUp, Clock, Zap } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useWebSocket } from '@/hooks/useWebSocket';

export function OverviewAnalytics() {
  const { data } = useAnalytics();
  const { activityFeed } = useWebSocket();

  const kpiCards = [
    {
      title: 'Total Calls',
      value: data.totalCalls.toLocaleString(),
      icon: Phone,
      color: 'text-blue-400',
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      title: 'Avg Duration',
      value: data.avgDuration,
      icon: Clock,
      color: 'text-yellow-400',
    },
    {
      title: 'Active Campaigns',
      value: data.activeCampaigns.toString(),
      icon: Zap,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="space-y-6 p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="border-slate-700 bg-slate-800 hover:bg-slate-800/90"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    {card.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart and Activity Feed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Area Chart */}
        <Card className="col-span-1 border-slate-700 bg-slate-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Call Volume & Conversions</CardTitle>
            <CardDescription className="text-slate-400">
              Last 7 days performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorConversions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorCalls)"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorConversions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Live Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Real-time updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3 pr-4">
                {activityFeed.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-lg border border-slate-700 bg-slate-700/50 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {activity.intent}
                        </p>
                        <p className="text-xs text-slate-400">
                          {activity.contact_phone}
                        </p>
                      </div>
                      {activity.sentiment && (
                        <Badge
                          variant={
                            activity.sentiment === 'positive'
                              ? 'default'
                              : activity.sentiment === 'neutral'
                                ? 'secondary'
                                : 'destructive'
                          }
                          className="text-xs"
                        >
                          {activity.sentiment}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
