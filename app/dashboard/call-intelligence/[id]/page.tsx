import { Header } from '@/components/dashboard/header';
import { CallIntelligence } from '@/components/dashboard/call-intelligence';

export default function CallIntelligencePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Header
        title="Call Intelligence"
        subtitle="Analyze call transcripts and AI-generated insights"
      />
      <CallIntelligence callId={params.id} />
    </>
  );
}
