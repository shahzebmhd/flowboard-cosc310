import {toast} from "sonner";
import { useRouter } from "next/navigation";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"],200>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

export const useUpdateTask = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json, param }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
                const response = await client.api.tasks[":taskId"]["$patch"]({ json, param });

                if (!response.ok) {
                    throw new Error("Failed to update task");
                }
                return await response.json();
            },
        
        onSuccess: ({ data }) => {
            toast.success("Task updated");
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
        },
        onError: () => {
            toast.error("Failed to update task");
        }
    });
}