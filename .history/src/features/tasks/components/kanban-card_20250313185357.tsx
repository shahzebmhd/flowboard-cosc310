import { Task } from "../types";

interface KanbanCardProps {
    task: Task;
};

export const KanbanCard = ({ task }: KanbanCardProps) => {
    return (
        <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
            <div className="flex item-start justify-between gap-x-2">
                <p>{task.name}</p>
            </div>
        </div>
    )
}