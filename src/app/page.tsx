import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-lg font-semibold">SaaSKit</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Ship your SaaS
            <span className="text-primary"> faster</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Production-ready Next.js starter with authentication, billing, analytics,
            multi-tenant architecture, and everything you need to launch.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Start Building</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">View Demo</Button>
            </Link>
          </div>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Authentication", desc: "NextAuth.js with credentials, GitHub, and Google OAuth" },
            { title: "Stripe Billing", desc: "Subscription management, checkout, customer portal" },
            { title: "Multi-Tenant", desc: "Workspace isolation with Prisma and PostgreSQL" },
            { title: "Dark Mode", desc: "System-aware theme switching with next-themes" },
            { title: "Analytics", desc: "Dashboard with charts, stats, and activity tracking" },
            { title: "TypeScript", desc: "End-to-end type safety with Zod validation" },
          ].map((feature) => (
            <div key={feature.title} className="rounded-lg border p-6 text-left">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, Tailwind CSS, Prisma, and Stripe</p>
      </footer>
    </div>
  );
}
