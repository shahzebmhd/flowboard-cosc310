"use client";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export const ProjectIdSettingsClient = () => {
    const projectId = useProjectId();
    const { data: initialValues } = useGetProject({ projectId });
    
    return (
        <div className="w-full lg:max-ww-xl">
            <EditProjectForm />
        </div>
    );
}