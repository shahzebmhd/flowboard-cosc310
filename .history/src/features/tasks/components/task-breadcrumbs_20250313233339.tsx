import { Project } from "@/features/projects/types";
import { Task } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { LinkProps } from "next/link";

interface TaskBreadcrumbsProps {
    project: Project;
    task: Task;
};

export const TaskBreadcrumbs = ({
    project,
    task,
}: TaskBreadcrumbsProps) => {
    <div className="flex items-center gap-x-2">
        <ProjectAvatar 
            name={project.name}
            image={project.imageUrl}
            className="size-6 lg:size-8"
        />
        <Link href={`/workspaces/`}>

        </Link>
    </div>
}