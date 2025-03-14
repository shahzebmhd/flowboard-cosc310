import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";

interface TaskOverviewProps {
    task: Task;
};

export const TaskOverview = ({
    task,
}: TaskOverviewProps) => {
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <p className="text-lg font-semibold">
                    Overview
                </p>
                <Button size="sm" variant="secondary">
                    <PencilIcon className="size-4 mr-2" />
                    Edit
                </Button>
            </div>
        </div>
    );
};