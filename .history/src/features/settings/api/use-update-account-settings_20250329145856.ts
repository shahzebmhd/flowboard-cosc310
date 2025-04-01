import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";
// @ts-expect-error
export type ResponseType = InferResponseType<typeof client.api["account-settings"]["$patch"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api["account-settings"]["$patch"]>;

export const useUpdateAccountSettings = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ form }) => {
            try {
                // @ts-ignore
                const response = await client.api["account-settings"]["$patch"]({ form });
                return response.json();
            } catch (error) {
                console.error("Error updating settings:", error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({ queryKey: ["account-settings"] });
        },
        onError: (error) => {
            toast.error("Failed to update settings");
            console.error('"Failed to update settings:", error');
        },
    });
};