"use client"

import Link from "next/link";
import { PencilIcon } from "lucide-react";

import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Button } from "@/components/ui/button";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

export const ProjectIdClient = () => {
    const projectId = useProjectId();
    const { data, isLoading } = useGetProject({ projectId });

    if(isLoading) {
        return <PageLoader />
    }

    if (!data) {
        return <PageError message="Project not found" />
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar 
                        name={data.name}
                        image={data.ImageUrl}
                        className="size-8"    
                    />
                    <p className="text-lg font-semibold"> {data.name}</p>
                </div>
                <div>
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            <TaskViewSwitcher />
        </div>
    );
};