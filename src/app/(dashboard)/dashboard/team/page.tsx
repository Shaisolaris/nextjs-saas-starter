import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Team" };

async function getTeamMembers(tenantId: string) {
  return prisma.user.findMany({
    where: { tenantId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  const tenantId = (session?.user as Record<string, unknown>)?.tenantId as string | undefined;

  const members = tenantId ? await getTeamMembers(tenantId) : [];

  const roleColors: Record<string, "default" | "secondary" | "outline"> = {
    OWNER: "default",
    ADMIN: "secondary",
    MEMBER: "outline",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage your workspace members</p>
        </div>
        <Button>Invite Member</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar src={member.image} name={member.name} size="md" />
                  <div>
                    <p className="text-sm font-medium">{member.name || "Unnamed"}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={roleColors[member.role] || "outline"}>
                    {member.role.toLowerCase()}
                  </Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            {members.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No team members yet. Invite someone to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
