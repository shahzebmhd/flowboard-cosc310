import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { ProjectIdClient } from "./client";

interface ProjectIdPageProps {
    params: { projectId: string };
}

const ProjectIdPage = async ({
    params,
}: ProjectIdPageProps) => {
    const user = await getCurrent();

    if ( !user ) redirect("/sign-in");

    const initialValues = await getProject({
        projectId: params.projectId,
    });

    if (!initialValues) {
        throw new Error("Project not found");
    }

    return (
        <ProjectIdClient />
    );
};

export default ProjectIdPage;