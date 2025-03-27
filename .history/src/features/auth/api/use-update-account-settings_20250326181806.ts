import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";

export type SettingsRequest = {
    theme: "light" | "dark";
    autoSave: boolean;
    customColors: {
        background: string;
        text: string;
    };
};

// @ts-expect-error
export type ResponseType = InferResponseType<typeof client.api.accountSettings["$patch"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api.accountSettings["$patch"]>;

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
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
            toast.error("Failed to update settings");
            console.error("Failed to update settings:", error);
        },
    });
};