"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const TaskViewSwitcher = () => {
    const { open } = useCreateTaskModal();

    return (
        <Tabs className="flex-1 w-full border rounded-lg">
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
                    Data filters
                    <DottedSeparator className="my-4" />
                    <>
                    <TabsContent value="table" className="mt-0">
                        Data Table
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        Data Kanban
                    </TabsContent>
                    {/* NOT IMPLEMENTING */}
                    {/* <TabsContent value="calendar" className="mt-0">
                        Data Calendar
                    </TabsContent> */}
                </>
            </div>
        </Tabs>
    );
};
