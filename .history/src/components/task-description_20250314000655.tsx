import { Task } from "@/features/tasks/types";
import { useState } from "react";
import { PencilIcon, XIcon } from "lucide-react";
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
        <div className="p-4 border roudned-lg">
            
        </div>
    );
};