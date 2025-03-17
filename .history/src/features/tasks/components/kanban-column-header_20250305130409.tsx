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
        <CircleIcon className="size-[18px} text-yellow-400" />
    ),
    [TaskStatus.IN_REVIEW]: (
        <CircleIcon className="size-[18px} text-blue-400" />
    ),
    [TaskStatus.DONE]: (
        <CircleIcon className="size-[18px} text-emerald-400" />
    ),
}

export const KanbanColumnHeader = ({
    board,
    taskCount,
}: KanbanColumnHeaderProps) => {
    return (
        <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
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