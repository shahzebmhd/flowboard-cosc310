import {toast} from "sonner";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"],200>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>;

export const useBulkUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
                const response = await client.api.tasks["bulk-update"]["$post"]({ json });

                if (!response.ok) {
                    throw new Error("Failed to update tasks");
                }
                return await response.json();
            },
        
        onSuccess: () => {
            toast.success("Tasks updated");
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
        },
        onError: () => {
            toast.error("Failed to update Tasks");
        }
    });
};