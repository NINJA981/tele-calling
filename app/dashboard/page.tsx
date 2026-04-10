import { Header } from '@/components/dashboard/header';
import { OverviewAnalytics } from '@/components/dashboard/overview-analytics';

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Analytics Overview"
        subtitle="Real-time insights into your AI calling campaigns"
      />
      <OverviewAnalytics />
    </>
  );
}
