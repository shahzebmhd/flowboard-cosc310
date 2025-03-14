import { Project } from "@/features/projects/types";
import { Task } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Span } from "next/dist/trace";

interface TaskBreadcrumbsProps {
    project: Project;
    task: Task;
};

export const TaskBreadcrumbs = ({
    project,
    task,
}: TaskBreadcrumbsProps) => {
    const workspaceId = useWorkspaceId();

    <div className="flex items-center gap-x-2">
        <ProjectAvatar 
            name={project.name}
            image={project.imageUrl}
            className="size-6 lg:size-8"
        />
        <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
            {project.name}
        </p>
        </Link>
        <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground"/>
        <p className="text-sm lg:text-lg font-semibold">
            {task.name}
        </p>
        <Button
            className="ml-auto"
            variant="destructive"
            size="sm"
        >
            <TrashIcon />
            <Span>Delete Task</Span>
        </Button>
    </div>
}