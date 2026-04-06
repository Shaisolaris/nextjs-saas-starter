import type { Metadata } from "next";
import { getInvoices } from "@/lib/data";
import { isDemoMode } from "@/lib/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Billing" };

const PLANS = [
  { name: "Free", price: 0, features: ["3 projects", "2 team members", "1 GB storage", "Community support"], current: false },
  { name: "Pro", price: 29, features: ["25 projects", "10 team members", "50 GB storage", "Priority support", "Custom domains", "API access"], current: true },
  { name: "Enterprise", price: 99, features: ["Unlimited projects", "Unlimited members", "500 GB storage", "Dedicated support", "SSO", "Audit logs", "SLA"], current: false },
];

export default async function BillingPage() {
  const invoices = await getInvoices("demo");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((plan) => (
          <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                {plan.current && <Badge>Current</Badge>}
              </CardTitle>
              <p className="text-3xl font-bold">${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-4 w-full rounded-md px-4 py-2 text-sm font-medium ${plan.current ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}>
                {plan.current ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Invoice History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv: any) => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{inv.plan}</p>
                  <p className="text-sm text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${inv.amount}</span>
                  <Badge variant="secondary">{inv.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
