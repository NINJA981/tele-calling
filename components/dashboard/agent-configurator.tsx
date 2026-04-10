'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export function AgentConfigurator() {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    system_prompt: '',
    response_eagerness: 0.5,
    interruption_sensitivity: 0.5,
    voice_provider: 'google',
    denoising_enabled: true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agent')
      .then(r => r.json())
      .then(data => {
        setConfig(data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    try {
      await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      toast({
        title: 'Configuration saved',
        description: 'Your agent settings have been updated successfully.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save configuration.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* System Prompt */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-white">System Prompt</CardTitle>
          <CardDescription className="text-slate-400">
            Define how your AI agent behaves during calls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={config.system_prompt}
            onChange={(e) =>
              setConfig({ ...config, system_prompt: e.target.value })
            }
            placeholder="Enter system prompt..."
            className="min-h-32 border-slate-700 bg-slate-700 text-white placeholder:text-slate-500"
          />
        </CardContent>
      </Card>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Response Eagerness */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Response Eagerness</CardTitle>
            <CardDescription className="text-slate-400">
              How quickly the agent responds (0.0 - 1.0)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={[config.response_eagerness]}
              onValueChange={(value) =>
                setConfig({
                  ...config,
                  response_eagerness: value[0],
                })
              }
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
            <p className="text-center text-lg font-semibold text-blue-400">
              {config.response_eagerness.toFixed(1)}
            </p>
            <p className="text-xs text-slate-500">
              Lower values = more deliberate responses | Higher values = quick responses
            </p>
          </CardContent>
        </Card>

        {/* Interruption Sensitivity */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">
              Interruption Sensitivity
            </CardTitle>
            <CardDescription className="text-slate-400">
              How prone to being interrupted (0.0 - 1.0)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={[config.interruption_sensitivity]}
              onValueChange={(value) =>
                setConfig({
                  ...config,
                  interruption_sensitivity: value[0],
                })
              }
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
            <p className="text-center text-lg font-semibold text-purple-400">
              {config.interruption_sensitivity.toFixed(1)}
            </p>
            <p className="text-xs text-slate-500">
              Lower = less interruptible | Higher = more interruptible
            </p>
          </CardContent>
        </Card>

        {/* Voice Provider */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Voice Provider</CardTitle>
            <CardDescription className="text-slate-400">
              Select voice provider for agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={config.voice_provider}
              onValueChange={(value) =>
                setConfig({ ...config, voice_provider: value })
              }
            >
              <SelectTrigger className="border-slate-700 bg-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-900">
                <SelectItem value="google">Google Cloud Text-to-Speech</SelectItem>
                <SelectItem value="eleven-labs">Eleven Labs</SelectItem>
                <SelectItem value="azure">Azure Speech Services</SelectItem>
                <SelectItem value="aws">AWS Polly</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Denoising */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Audio Denoising</CardTitle>
            <CardDescription className="text-slate-400">
              Enable noise cancellation on calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-700/30 p-4">
              <Label className="text-white">Denoising Enabled</Label>
              <Switch
                checked={config.denoising_enabled}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    denoising_enabled: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="border-slate-700 text-white">
          Reset to Defaults
        </Button>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
