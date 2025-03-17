import { useParams } from "next/navigation";

export const useProjectId = () => {
    const params = useParams();
    return params.taskId as string;
};