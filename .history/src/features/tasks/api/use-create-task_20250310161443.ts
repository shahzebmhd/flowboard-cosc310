import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>;

// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            // @ts-expect-error
            const response = await client.api.tasks["$post"]({ json });
            
            if (!response.ok) {
                throw new Error("Failed to create task");
            }
            
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Task created");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: () => {
            toast.error("Failed to create task");
        },
    });
    
    return mutation;
};