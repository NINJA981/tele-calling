import { SidebarNav } from '@/components/dashboard/sidebar-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-950">
      <SidebarNav />
      <div className="ml-64 flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
