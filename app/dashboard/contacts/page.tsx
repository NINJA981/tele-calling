import { Header } from '@/components/dashboard/header';
import { ContactCampaignManager } from '@/components/dashboard/contact-campaign-manager';

export default function ContactsPage() {
  return (
    <>
      <Header
        title="Contact & Campaign Manager"
        subtitle="Manage your leads and outreach campaigns"
      />
      <ContactCampaignManager />
    </>
  );
}
