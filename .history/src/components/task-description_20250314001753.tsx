import { Task } from "@/features/tasks/types";
import { useState } from "react";
import { Pencil, PencilIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { DottedSeparator } from "./ui/dotted-separator";
import { useUpdateTask } from "@/features/tasks/api/use-update-tasks";

interface TaskDescriptionProps {
    task: Task;
}

export const TaskDescription = ({
    task,
}: TaskDescriptionProps) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ value, setValue ] = useState(task.description);
    const [ mutate, isPending ] = useUpdateTask();

    const handleSave = () => {
        mutate({
            json: { description: value },
            param: { taskId: task.$id },
        })
    }

    return(
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Overview
                </p>
                <Button
                    onClick={() => setIsEditing((prev) => !prev)}
                    size="sm"
                    variant="secondary"
                >
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2"/>
                    )}
                    {isEditing ? "Cancel" : "Edit"}
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