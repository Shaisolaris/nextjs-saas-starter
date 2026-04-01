"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold lg:hidden">SaaSKit</h2>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </Button>

        {/* User menu */}
        <div className="flex items-center gap-3 border-l pl-3">
          <Avatar
            src={session?.user?.image}
            name={session?.user?.name}
            size="sm"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
