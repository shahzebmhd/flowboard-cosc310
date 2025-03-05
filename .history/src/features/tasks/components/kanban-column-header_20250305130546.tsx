import {
    CircleCheckIcon,
    CircleDashedIcon,
    CircleDotDashedIcon,
    CircleDotIcon,
    CircleIcon,
    PlusIcon,
} from "lucide-react";

import { snakeCaseToTitleCase } from "@/lib/utils";

import { TaskStatus } from "../types";

interface KanbanColumnHeaderProps {
    board: TaskStatus;
    taskCount: number;
};

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: (
        <CircleDashedIcon className="size-[18px} text-pink-400" />
    ),
    [TaskStatus.TODO]: (
        <CircleIcon className="size-[18px} text-red-400" />
    ),
    [TaskStatus.IN_PROGRESS]: (
        <CircleDotDashedIcon className="size-[18px} text-yellow-400" />
    ),
    [TaskStatus.IN_REVIEW]: (
        <CircleDotIcon className="size-[18px} text-blue-400" />
    ),
    [TaskStatus.DONE]: (
        <CircleCheckIcon className="size-[18px} text-emerald-400" />
    ),
}

export const KanbanColumnHeader = ({
    board,
    taskCount,
}: KanbanColumnHeaderProps) => {
    const icon = statusIconMap[board];
    
    return (
        <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                {icon}
                <h2>
                    {snakeCaseToTitleCase(board)}
                </h2>
                <div>
                    {taskCount}
                </div>
            </div>
        </div>
    )
}