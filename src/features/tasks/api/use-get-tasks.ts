import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetTasksProps {
    workspaceId: string;
}

export const useGetTasks = ({ workspaceId }: UseGetTasksProps) => {
    return useQuery({
        queryKey: ["tasks", workspaceId],
        queryFn: async () => {
            // @ts-ignore
            const response = await client.api.tasks.$get({ //TODO : Find a fix for client error
                query: { workspaceId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const { data } = await response.json();
            return data;
        },
    });
};
