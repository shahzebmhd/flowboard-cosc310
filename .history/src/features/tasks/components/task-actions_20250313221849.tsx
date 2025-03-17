import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

import React from "react";

import {
    useDeleteTask
} from "../api/use-delete-tasks"
import { toast } from "sonner";

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}
//   TODO: implementation of functions for the taskActions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?")
    if (!confirmDelete) return;

    const { mutate, isPending } = useDeleteTask();

    const onDelete = async () => {
        const ok = await confirmDelete;
        if (!ok) return;

        mutate({ taskId: id });
    }

    return (
        <div className="flex justify-end">
            <DropdownMenu modal={true}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    {/* Task Details */}
                    <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        Task Details
                    </DropdownMenuItem>
                    
                    {/* Open Project */}
                    <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        Open Project
                    </DropdownMenuItem>
                    
                    {/* Edit Task */}
                    <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        Edit Task
                    </DropdownMenuItem>
                    
                    {/* Delete Task */}
                    <DropdownMenuItem
                        onClick={onDelete} disabled={isPending}
                        className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
                    >
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
