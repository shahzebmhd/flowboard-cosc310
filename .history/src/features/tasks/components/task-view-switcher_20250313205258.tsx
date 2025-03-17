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
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { DataKanban } from "./data-kanban";

export const TaskViewSwitcher = () => {
    const { open } = useCreateTaskModal();
    const workspaceId = useWorkspaceId();
    const { data: tasks, isLoading } = useGetTasks({ workspaceId });

    const onKanbanChange = useCallback((
        tasks: { $id: string; status: TaskStatus; position: number;}[]
    ) => {
        console.log({tasks});
    }, []);

    return (
        <Tabs className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>

                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>

                        {/* NOT IMPLEMENTED */}
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>

                    <Button
                    onClick={ open }
                        size="sm"
                        className="w-full lg:w-auto"
                    >
                        <PlusIcon className="size-4 mr-2" />
                        New
                    </Button>
                </div>

                <DottedSeparator className="my-4" />
                Data filters
                <DottedSeparator className="my-4" />

                <>
                    <TabsContent value="table" className="mt-0">
                        Data Table
                    </TabsContent>

                    <TabsContent value="kanban" className="mt-0">
                        <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                    </TabsContent>

                    {/* NOT IMPLEMENTED */}
                    <TabsContent value="calendar" className="mt-0">
                        Data Calendar
                    </TabsContent>
                </>
            </div>
        </Tabs>
    );
};