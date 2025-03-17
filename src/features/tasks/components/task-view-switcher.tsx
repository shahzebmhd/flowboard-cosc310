"use client";

import { useCallback } from "react";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TaskStatus } from "../types";
import { useGetTasks } from "../api/use-get-tasks";
import { useTaskFilters } from "../hooks/use-task-filters";
import { useUpdateTask } from "../api/use-update-tasks";
import { useBulkUpdateTask } from "../api/use-bulk-update-tasks";
import { DataKanban } from "./data-kanban";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import React from "react";

export const TaskViewSwitcher = () => {
    
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    });

    const { status, assigneeId, projectId, dueDate } = useTaskFilters();
    const workspaceId = useWorkspaceId();
    const { data: tasks, } = useGetTasks({ workspaceId });

    const { mutate: bulkUpdate } = useBulkUpdateTask();
    const { mutate: updateTask } = useUpdateTask();

    const onKanbanChange = useCallback((
        tasks: { 
            $id: string;
            status: TaskStatus;
            position: number;
        }[]
    ) => {
        updateTask({
            json: tasks,
        })
        bulkUpdate({
            json: tasks,
        })
    }, [updateTask, bulkUpdate]);

    return (
        <Tabs defaultValue={view} onValueChange={setView}
         className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            Table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            Kanban
                        </TabsTrigger>
                        {/* UPDATE: NOT IMPLEMENTING AT THE MOMENT */}
                        {/* <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            Calendar
                        </TabsTrigger> */}
                    </TabsList>
                    <Button onClick={open} size="sm" className="w-full lg:w-auto">
                        <PlusIcon className="size-4 mr-2" />
                        New Task
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
{/*                 <DataFilters /> */}
                <DottedSeparator className="my-4" />

                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                           <DataTable columns = {columns} data={tasks?.documents ?? []} />
                        </TabsContent>

                    <TabsContent value="kanban" className="mt-0">
                        <DataKanban onchange={onKanbanChange} data={tasks?.documents ?? []} />
                    </TabsContent>

                        {/* NOT IMPLEMENTING */}
                        {/* <TabsContent value="calendar" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent> */}
                        
                    </>
                )}
            </div>
        </Tabs>
    );
};
