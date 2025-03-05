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

export const KanbanColumnHeader = ({
    board,
    taskCount,
}: KanbanColumnHeaderProps) => {
    return (
        <div className="px-2 py-1.5 felx items-center justify-between">
            <div className="felx items-center gap-x-2">
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