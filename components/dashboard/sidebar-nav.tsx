'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  Settings,
  MessageSquare,
  CheckSquare,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: BarChart3,
    },
    {
      href: '/dashboard/contacts',
      label: 'Contacts',
      icon: Users,
    },
    {
      href: '/dashboard/agent',
      label: 'Agent Config',
      icon: Settings,
    },
    {
      href: '/dashboard/call-intelligence/call-001',
      label: 'Call Intelligence',
      icon: MessageSquare,
    },
    {
      href: '/dashboard/follow-up',
      label: 'Follow-ups',
      icon: CheckSquare,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-700 bg-slate-900 p-6">
      {/* Logo / Branding */}
      <div className="mb-8 flex items-center gap-2">
        <Phone className="h-6 w-6 text-blue-400" />
        <h1 className="text-xl font-bold text-white">GOAT CRM</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs font-semibold text-slate-300">API Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-400">Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
