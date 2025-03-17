import { Task } from "@/features/tasks/types";
import { useState } from "react";
import { Pencil, PencilIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { DottedSeparator } from "./ui/dotted-separator";

interface TaskDescriptionProps {
    task: Task;
}

export const TaskDescription = ({
    task,
}: TaskDescriptionProps) => {
    return(
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Overview
                </p>
                <Button
                    size="sm"
                    variant="secondary"
                >
                    <PencilIcon className="size-4 mr-2"/>
                    Edit
                </Button>
            </div>
            <DottedSeparator className="my-4" />
            <div className="flex flex-col gap-y-4">
                <div>
                    {task.description || (
                        <span className="text-muted-foreground">
                            No description set
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};