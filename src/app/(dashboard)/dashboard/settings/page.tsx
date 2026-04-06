import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input defaultValue={user?.name ?? ""} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue={user?.email ?? ""} type="email" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Organization Name</label>
            <Input defaultValue="Acme Corp" />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <Input defaultValue="acme-corp" />
          </div>
          <Button>Update Organization</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-red-600">Danger Zone</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">Permanently delete your account and all data.</p>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
