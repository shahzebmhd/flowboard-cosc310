"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspaces";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdSettingsClient = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspace({ workspaceId });
    
    if(isLoading) {
        return <PageLoader />
    }
    
    if (!data) {
        return <PageError message="Project not found" />
    }
    
    return (
        <div className="w-full lg:max-w-xl"> 
            <EditWorkspaceForm initialValues={initialValues} /> 
        </div>
    );
};