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
export type ResponseType = InferResponseType<typeof client.api.auth.settings["$post"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api.auth.settings["$post"]>;

export const useUpdateAccountSettings = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (newSettings) => {
            try {
                // @ts-ignore
                const response = await client.settings.update[$post](newSettings);
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