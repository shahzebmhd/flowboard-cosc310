"use client";

import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import PageLoader from "next/dist/client/page-loader";

export const TaskIdClient = () => {
    const taskId = useTaskId();
    //@ts-ignore
    const { data, isLoading } = useGetTasks({ taskId });

    if (isLoading) {
        return (
            <PageLoader />
        );
    };

    return  (
        <p>TaskIdClient</p>
    );
};