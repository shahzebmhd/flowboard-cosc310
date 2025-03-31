import { Task, TaskStatus } from "@/features/tasks/types";
import React, { useState, useCallback } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { useUpdateTask } from "../api/use-update-task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { TaskActions } from "./task-actions";

interface DataKanbanProps {
    data: Task[];
}

const getColumnTitle = (status: TaskStatus): { title: string; color: string } => {
    switch (status) {
        case TaskStatus.BACKLOG:
            return { title: "Backlog", color: "bg-pink-100" };
        case TaskStatus.TODO:
            return { title: "To Do", color: "bg-red-100" };
        case TaskStatus.IN_PROGRESS:
            return { title: "In Progress", color: "bg-yellow-100" };
        case TaskStatus.IN_REVIEW:
            return { title: "In Review", color: "bg-blue-100" };
        case TaskStatus.DONE:
            return { title: "Done", color: "bg-emerald-100" };
    }
};

export const DataKanban = ({ data }: DataKanbanProps) => {
    const { mutate: updateTask } = useUpdateTask();
    const boards: TaskStatus[] = [
        TaskStatus.BACKLOG,
        TaskStatus.TODO,
        TaskStatus.IN_PROGRESS,
        TaskStatus.IN_REVIEW,
        TaskStatus.DONE,
    ];

    type TasksState = {
        [key in TaskStatus]: Task[];
    };

    const [tasks, setTasks] = useState<TasksState>(() => {
        const initialTasks: TasksState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        };
        data.forEach((task) => {
            initialTasks[task.status].push(task);
        });
        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
        });
        return initialTasks;
    });

    const handleDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        const sourceStatus = source.droppableId as TaskStatus;
        const destinationStatus = destination.droppableId as TaskStatus;

        // Don't do anything if dropped in the same position
        if (
            sourceStatus === destinationStatus &&
            source.index === destination.index
        ) {
            return;
        }

        const newTasksState = { ...tasks };
        const [movedTask] = newTasksState[sourceStatus].splice(source.index, 1);
        
        // Calculate new position
        const destinationTasks = newTasksState[destinationStatus];
        const newPosition = calculateNewPosition(
            destination.index,
            destinationTasks
        );

        const updatedTask = {
            ...movedTask,
            status: destinationStatus,
            position: newPosition,
        };

        // Update local state
        newTasksState[destinationStatus].splice(destination.index, 0, updatedTask);
        setTasks(newTasksState);

        // Update in backend
        updateTask({
            param: { taskId: draggableId },
            json: {
                status: destinationStatus,
                position: newPosition,
            },
        });
    }, [tasks, updateTask]);

    const calculateNewPosition = (index: number, destinationTasks: Task[]): number => {
        if (destinationTasks.length === 0) return 1000;
        if (index === 0) return destinationTasks[0].position / 2;
        if (index === destinationTasks.length) return destinationTasks[destinationTasks.length - 1].position + 1000;
        
        const prevPosition = destinationTasks[index - 1].position;
        const nextPosition = destinationTasks[index].position;
        return (prevPosition + nextPosition) / 2;
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 overflow-x-auto px-2 pb-4">
                {boards.map((boardId) => {
                    const { title, color } = getColumnTitle(boardId);
                    const columnTasks = tasks[boardId];
                    return (
                        <div key={boardId} className="bg-white rounded-lg shadow-sm w-[320px] flex-shrink-0">
                            <div className={`p-4 rounded-t-lg ${color}`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-neutral-700">
                                        {title}
                                    </h3>
                                    <Badge variant="secondary" className="bg-white/50">
                                        {columnTasks.length}
                                    </Badge>
                                </div>
                            </div>
                            <Droppable droppableId={boardId} type="task">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col gap-2 p-2 min-h-[200px]"
                                    >
                                        {columnTasks.map((task, index) => (
                                            <Draggable
                                                key={task.$id}
                                                draggableId={task.$id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`bg-white rounded-md p-3 border border-gray-200 shadow-sm hover:shadow-md transition-all ${
                                                            snapshot.isDragging ? 'shadow-lg scale-105' : ''
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-x-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm">{task.name}</p>
                                                                {task.description && (
                                                                    <p className="text-xs text-neutral-500 mt-1">
                                                                        {task.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <TaskActions id={task.$id} projectId={task.projectId}>
                                                                <Button variant="ghost" className="size-8 p-0 h-auto">
                                                                    <MoreVertical className="size-4" />
                                                                </Button>
                                                            </TaskActions>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
}; 