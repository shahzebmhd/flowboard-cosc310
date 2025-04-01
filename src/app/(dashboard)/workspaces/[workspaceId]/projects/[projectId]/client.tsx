"use client"

import Link from "next/link";
import { PencilIcon } from "lucide-react";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { Analytics  } from "@/components/analytics";

import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Button } from "@/components/ui/button";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

export const ProjectIdClient = () => {
    const projectId = useProjectId();
    const { data: project, isLoading: isLoadingProject } = useGetProject({projectId});
    const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics(projectId);
    
    const isLoading = isLoadingProject || isLoadingAnalytics;
    
    if (isLoading) {
        return <PageLoader />
    }
    if (!project) {
        return <PageError message="Project not found" />
    }

    return (
        <div className="flex flex-col gap-y-4 p-4">
            {/* Project Header with Edit Button */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar name={project.name} image={project.imageUrl} className="size-8" />
                    <p className="text-lg font-semibold">{project.name}</p>
                </div>
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
                        <PencilIcon className="size-4 mr-2" />
                        Edit Project
                    </Link>
                </Button>
            </div>

            {/* Project Analytics */}
            {analytics && <Analytics data={analytics} />}

            {/* Task View Switcher */}
            <TaskViewSwitcher hideProjectFilter />
        </div>
    );
};