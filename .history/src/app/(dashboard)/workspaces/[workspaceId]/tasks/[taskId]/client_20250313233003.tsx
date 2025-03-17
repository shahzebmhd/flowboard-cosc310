"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";

export const TaskIdClient = () => {
    const taskId = useTaskId();
    //@ts-ignore
    const { data, isLoading } = useGetTasks({ taskId });

    if (isLoading) {
        return (
            <PageLoader />
        );
    };

    if (!data) {
        return (
            <PageError message="Task not found" />
        )
    }

    return  (
        <div className="flex flex-col">
            <TaskBreadcrumbs project={data.project} task={data.task} />
        </div>
    );
};