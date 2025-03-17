import { Task } from "../types";

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
            </div>
        </div>
    );
};