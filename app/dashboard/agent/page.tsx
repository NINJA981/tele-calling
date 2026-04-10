import { Header } from '@/components/dashboard/header';
import { AgentConfigurator } from '@/components/dashboard/agent-configurator';

export default function AgentPage() {
  return (
    <>
      <Header
        title="Agent Configuration"
        subtitle="Customize your AI agent's behavior and voice settings"
      />
      <AgentConfigurator />
    </>
  );
}
