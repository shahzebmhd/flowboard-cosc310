import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";
// @ts-expect-error
export type ResponseType = InferResponseType<typeof client.api.auth.settings["$post"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api.auth.settings["$post"]>;

export const useAccountSettings = () => {
    const queryClient = useQueryClient();
    return useQuery<ResponseType, Error>({
        queryKey: ["settings"],
        queryFn: async () => {
            // @ts-ignore
            const response = await client.api.auth.settings["$get"]();
            if (!response.ok) {
                throw new Error("Failed to load account settings");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Settings loaded");
        },
        onError: () => {
            toast.error("Failed to load account settings");
        },
    });
};