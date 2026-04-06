import type { Metadata } from "next";
import { getTeamMembers, getCurrentUser } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Team" };

export default async function TeamPage() {
  const user = await getCurrentUser();
  const members = await getTeamMembers(user?.tenantId ?? "demo");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">{members.length} members</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Invite Member
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member: any) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-medium">
                  {member.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <Badge variant={member.role === "ADMIN" ? "default" : "secondary"}>
                  {member.role}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
