import { Project } from "@/features/projects/types";
import { Task } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "../api/use-delete-tasks";
import { useRouter } from "next/router";

interface TaskBreadcrumbsProps {
    project: Project;
    task: Task;
};

export const TaskBreadcrumbs = ({
    project,
    task,
}: TaskBreadcrumbsProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const { mutate } = useDeleteTask();

    const handleDeleteTask = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this task?")
        if (!confirmDelete) return;

        mutate({ param: { taskId: task.$id} }, {
            onSuccess: () => {

            }
        });
    }
    
    return (
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
                <TrashIcon className="size-4 lg:mr-2"/>
                <span className="hidden lg:block">Delete Task</span>
            </Button>
        </div>
    )
}