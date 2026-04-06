import type { Metadata } from "next";
import { getRecentProjects, getCurrentUser } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  const projects = await getRecentProjects(user?.tenantId ?? "demo");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">{projects.length} projects</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          New Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project: any) => (
          <Card key={project.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{project.name}</h3>
                  <Badge variant={project.status === "ACTIVE" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline">{project.priority}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{project._count?.tasks ?? 0} tasks</span>
                  <span>Owner: {project.owner?.name}</span>
                  <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
