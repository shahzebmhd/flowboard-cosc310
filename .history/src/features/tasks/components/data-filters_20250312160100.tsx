// @ts-nocheck // TODO: To fix the lint errors

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ListChecksIcon, UserIcon, FolderIcon } from "lucide-react";
import { TaskStatus } from "../types";
import { DatePicker } from "@/components/date-picker";
import { useTaskFilters } from "../hooks/use-task-filters";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataFiltersProps {
    hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name,
    }));

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name,
    }));

    const [{ status, assigneeId, projectId, dueDate }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        setFilters({ status: value === "all" ? null : (value as TaskStatus) });
    };

    const onAssigneeChange = (value: string) => {
        setFilters({ assigneeId: value === "all" ? null : value });
    };

    const onProjectChange = (value: string) => {
        setFilters({ projectId: value === "all" ? null : value });
    };

    if (isLoading) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            {/* Status Filter */}
            <Select defaultValue={status ?? undefined} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center">
                        <ListChecksIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All statuses" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                </SelectContent>
            </Select>

            {/* Assignee Filter */}
            <Select defaultValue={assigneeId ?? undefined} onValueChange={onAssigneeChange}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All assignees" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Project Filter (if not hidden) */}
            {!hideProjectFilter && (
                <Select defaultValue={projectId ?? undefined} onValueChange={onProjectChange}>
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center">
                            <FolderIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All projects" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All projects</SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem key={project.value} value={project.value}>
                                {project.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {/* Due Date Picker */}
            <DatePicker
                placeholder="Due Date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setFilters({ dueDate: date ? date.toISOString() : null });
                }}
            />
        </div>
    );
};