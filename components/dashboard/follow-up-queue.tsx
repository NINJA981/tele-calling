'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockFollowUpQueue } from '@/lib/mock-data';
import { FollowUpItem, FollowUpStatus } from '@/lib/types';
import { Phone, CheckCircle2, Clock } from 'lucide-react';

const priorityColors = {
  high: 'bg-red-500/20 text-red-300',
  medium: 'bg-yellow-500/20 text-yellow-300',
  low: 'bg-blue-500/20 text-blue-300',
};

const statusIcons: Record<FollowUpStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  'in-progress': <Phone className="h-4 w-4" />,
  scheduled: <CheckCircle2 className="h-4 w-4" />,
};

export function FollowUpQueue() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<FollowUpItem[]>(mockFollowUpQueue);

  const handleTriggerCall = (item: FollowUpItem) => {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === item.id ? { ...q, status: 'in-progress' as const } : q
      )
    );
    toast({
      title: 'Call initiated',
      description: `Calling ${item.contact.name} now...`,
    });
  };

  const handleApproveRetry = (item: FollowUpItem) => {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === item.id ? { ...q, status: 'scheduled' as const } : q
      )
    );
    toast({
      title: 'Retry scheduled',
      description: `Follow-up call scheduled for ${item.contact.name}`,
    });
  };

  const highPriorityItems = queue.filter((item) => item.priority === 'high');
  const otherItems = queue.filter((item) => item.priority !== 'high');

  return (
    <div className="space-y-6 p-8">
      {/* Priority Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-400">
              {highPriorityItems.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-400">{queue.length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-400">
              {queue.filter((q) => q.status === 'scheduled').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* High Priority Section */}
      {highPriorityItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            High Priority Follow-ups
          </h3>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {highPriorityItems.map((item) => (
              <Card
                key={item.id}
                className="border-red-700 bg-red-900/20"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {item.contact.name}
                      </CardTitle>
                      <CardDescription className="text-red-200">
                        {item.contact.phone}
                      </CardDescription>
                    </div>
                    <Badge className={priorityColors[item.priority]}>
                      {item.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Objection
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      {item.objection}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      Callback: {item.callback_time}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      {statusIcons[item.status]}
                      {item.status}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleTriggerCall(item)}
                      disabled={item.status === 'in-progress'}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <Phone className="mr-1 h-3 w-3" />
                      Call Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApproveRetry(item)}
                      className="flex-1 border-slate-700 text-slate-300"
                    >
                      Approve Retry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Items Section */}
      {otherItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Other Follow-ups
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {otherItems.map((item) => (
              <Card
                key={item.id}
                className="border-slate-700 bg-slate-800"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {item.contact.name}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {item.contact.phone}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={priorityColors[item.priority]}>
                        {item.priority}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        {statusIcons[item.status]}
                        {item.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Objection
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      {item.objection}
                    </p>
                  </div>
                  <p className="text-sm text-slate-400">
                    Callback: {item.callback_time}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleTriggerCall(item)}
                      disabled={item.status === 'in-progress'}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="mr-1 h-3 w-3" />
                      Call Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApproveRetry(item)}
                      className="flex-1 border-slate-700 text-slate-300"
                    >
                      Approve Retry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
