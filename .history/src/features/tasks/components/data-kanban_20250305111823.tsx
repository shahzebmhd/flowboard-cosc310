import { Task } from "../types";

interface DataKanbanProps {
    data: Task[];
};

export const DataKanban = ({
    data,
}: DataKanbanProps) => {
    return (
        <div>
            Data Kanban
        </div>
    );
};