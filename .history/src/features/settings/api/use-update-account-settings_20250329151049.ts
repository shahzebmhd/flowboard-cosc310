import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";
import { settingsSchema } from "@/features/auth/schemas";
// @ts-expect-error
export type ResponseType = InferResponseType<typeof client.api["account-settings"]["$post"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api["account-settings"]["$post"]>;

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
                const response = await client.api["account-settings"]["$post"]({ 
                    json: settingsSchema.parse(form) // Validate before sending
                });
                
                if(!response.ok){
                    const errorText = await response.text();
                    throw new Error(`API Error: ${response.status} - ${errorText}`);
                }
                
                return await response.json();

            } catch (error) {
                console.error("Error updating settings:", {
                    message: error instanceof Error ? error.message : 'Unknown error',
                    stack: error instanceof Error ? error.stack : undefined,
                });
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({ queryKey: ["account-settings"] });
        },
        onError: (error) => {
            toast.error("Failed to update settings");
            console.error('Failed to update settings:', {
                message: error.message,
                stack: error.stack,
            });
        },
    });
};