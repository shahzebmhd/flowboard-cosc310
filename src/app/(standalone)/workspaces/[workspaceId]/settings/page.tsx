import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
    params: {
        workspaceId: string;
    };
};
// TODO: npm run dev, to check workspaces redirection to show a standalone layout WorkspaceIdSettingsPage: 6700.... 
const WorkspaceIdSettingsPage = async ({
    params,
}) => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");
    return (
        <div>
            WorkspaceIdSettingsPage
        </div>
    )  
}

export default WorkspaceIdSettingsPage