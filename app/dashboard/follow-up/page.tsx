import { Header } from '@/components/dashboard/header';
import { FollowUpQueue } from '@/components/dashboard/follow-up-queue';

export default function FollowUpPage() {
  return (
    <>
      <Header
        title="Follow-up Automation Queue"
        subtitle="Manage and schedule automated follow-up calls"
      />
      <FollowUpQueue />
    </>
  );
}
