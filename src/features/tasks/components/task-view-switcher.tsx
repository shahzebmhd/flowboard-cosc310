// @ts-nocheck // TODO: To fix the lint errors

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { PlusIcon, Loader } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useTaskFilters } from "../hooks/use-task-filters";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table";

import React from "react";


export const TaskViewSwitcher = () => {
    
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    });

    const { status, assigneeId, projectId, dueDate } = useTaskFilters();
    const workspaceId = useWorkspaceId();
    const { open } = useCreateTaskModal();


    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
        projectId,
        assigneeId,
        status,
        dueDate,
    });

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
                <DataFilters />
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
                            {JSON.stringify(tasks)}
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
