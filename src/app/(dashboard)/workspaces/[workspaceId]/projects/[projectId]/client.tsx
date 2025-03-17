import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { Analytics } from "@/components/analytics";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { PageLoader } from "@/components/ui/page-loader";
import { PageError } from "@/components/ui/page-error";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const ProjectIdClient = () => {
  const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId });
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({ projectId });

  const isLoading = isLoadingProject || isLoadingAnalytics;

  if (isLoading) {
    return <PageLoader />;
  }

  // Handle failed project fetch condition
  if (!project) {
    return <PageError message="Project not found" />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {/* Project Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={project.name} image={project.imageUrl} className="size-8" />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
      </div>

      {/* Edit Project Button */}
      <Button variant="secondary" size="sm" asChild>
        <Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
          <PencilIcon className="size-4 mr-2" />
          Edit Project
        </Link>
      </Button>

      {/* Project Analytics */}
      {analytics && <Analytics data={analytics} />}

      {/* Task View Switcher */}
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
};
