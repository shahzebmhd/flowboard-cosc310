import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
    const params = useParams() as { workspaceId?: string };
    return params.workspaceId || "";
}