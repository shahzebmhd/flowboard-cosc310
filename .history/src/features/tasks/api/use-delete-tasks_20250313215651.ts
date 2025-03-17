import {toast} from "sonner";
import { useRouter } from "next/navigation";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$delete"],200>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$delete"]>;

export const useDeleteTask = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
                const response = await client.api.tasks[":taskId"]["$delete"]({ param });

                if (!response.ok) {
                    throw new Error("Failed to delete task");
                }
                return await response.json();
            },
        
        onSuccess: ({ data }) => {
            toast.success("Task deleted");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
            queryClient.invalidateQueries({ queryKey: ["tasks", data.$id]});
        },
        onError: () => {
            toast.error("Failed to delete Task");
        }
    });
}