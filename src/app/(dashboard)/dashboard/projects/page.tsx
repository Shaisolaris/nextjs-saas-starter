import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Projects" };

async function getProjects(tenantId: string) {
  return prisma.project.findMany({
    where: { tenantId },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  const tenantId = (session?.user as Record<string, unknown>)?.tenantId as string | undefined;

  const projects = tenantId ? await getProjects(tenantId) : [];

  const statusColors: Record<string, "success" | "secondary" | "default" | "outline"> = {
    ACTIVE: "success",
    PAUSED: "secondary",
    COMPLETED: "default",
    ARCHIVED: "outline",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <Button>New Project</Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <svg className="h-12 w-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Create your first project to get started</p>
            <Button className="mt-4">Create Project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <CardTitle className="text-base">{project.name}</CardTitle>
                <Badge variant={statusColors[project.status] || "outline"}>
                  {project.status.toLowerCase()}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {project.description || "No description"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>By {project.user.name || "Unknown"}</span>
                  <span>{formatDate(project.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
