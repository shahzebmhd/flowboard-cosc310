import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useEffect } from "react";

// Define the response type for the GET request
// @ts-expect-error

export type ResponseType = InferResponseType<typeof client.api.auth.settings["$get"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api.auth.settings["$get"]>;

export const useAccountSettings = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({form}) => {
            // @ts-expect-error
            const response = await client.api.auth.settings["$get"]({form});

    const { data, isSuccess, isError, error } = useQuery<ResponseType, Error>({
        queryKey: ["settings"],
        queryFn: async () => {
            // @ts-expect-error
            const response = await client.api["account-settings"]["$get"]();
            if (!response.ok) {
                throw new Error("Failed to load account settings");
            }
            return await response.json();
        },
    });

    // Handle success and error side effects with useEffect
    useEffect(() => {
        if (isSuccess) {
            toast.success("Settings loaded");
            // Optionally invalidate queries if needed
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        }
    }, [isSuccess, queryClient]);

    useEffect(() => {
        if (isError) {
            toast.error(`Failed to load account settings: ${error?.message || "Unknown error"}`);
        }
    }, [isError, error]);

    return { data, isSuccess, isError, error, isPending: !isSuccess && !isError };
};