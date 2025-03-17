// import { useGetMembers } from "@/features/members/api/use-get-members"; // TODO: uncomment after FB-3025 is merged
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
    onCancel: () => void;
}

export const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId }); // TODO: uncomment after FB-3025 is merged

    // @ts-expect-error project type is actually known
    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
    }))
    // @ts-expect-error member type is actually known
    const memberOptions = members?.documents.map((member) => ({ // TODO: uncomment after FB-3025 is merged
        id: member.$id,
        name: member.name,
    }));

    const isLoading = isLoadingProjects || isLoadingMembers; // TODO: will uncomment after FB-3025 merge

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return (
        <CreateTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []} // TODO: uncomment after FB-3025 is merged
        />
    );
};