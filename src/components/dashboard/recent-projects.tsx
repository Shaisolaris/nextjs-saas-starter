import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  status: string;
  updatedAt: Date | string;
}

const statusVariants: Record<string, "default" | "secondary" | "success" | "outline"> = {
  ACTIVE: "success",
  PAUSED: "secondary",
  COMPLETED: "default",
  ARCHIVED: "outline",
};

export function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-muted-foreground">{formatDate(project.updatedAt)}</p>
              </div>
              <Badge variant={statusVariants[project.status] || "outline"}>
                {project.status.toLowerCase()}
              </Badge>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No projects yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
