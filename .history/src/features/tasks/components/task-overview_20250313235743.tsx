import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { OverviewProperty } from "./overview-property";
import { MemberAvatar } from "@/features/members/components/member-avatar";

interface TaskOverviewProps {
    task: Task;
};

export const TaskOverview = ({
    task,
}: TaskOverviewProps) => {
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Overview
                    </p>
                    <Button size="sm" variant="secondary">
                        <PencilIcon className="size-4 mr-2" />
                        Edit
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <OverviewProperty label="Assignee">
                        <MemberAvatar 
                            name={task.assignee.name}
                            className="size-6"
                        />
                    </OverviewProperty>
                </div>
            </div>
        </div>
    );
};