"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Projects", href: "/dashboard/projects", icon: "FolderKanban" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { name: "Team", href: "/dashboard/team", icon: "Users" },
  { name: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
  { name: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

const iconPaths: Record<string, string> = {
  LayoutDashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  FolderKanban: "M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM8 10v4M12 10v4M16 10v4",
  BarChart3: "M12 20V10M18 20V4M6 20v-4",
  Users: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2M9 7a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  CreditCard: "M1 4h22v16H1zM1 10h22",
  Settings: "M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z",
};

function NavIcon({ name }: { name: string }) {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[name] || ""} />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-lg font-semibold">SaaSKit</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <NavIcon name={item.icon} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t p-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium">Free Plan</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Upgrade to Pro for unlimited projects
          </p>
          <Link
            href="/dashboard/billing"
            className="mt-3 inline-flex items-center text-xs font-medium text-primary hover:underline"
          >
            Upgrade now →
          </Link>
        </div>
      </div>
    </aside>
  );
}
