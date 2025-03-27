import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

export type SettingsRequest = {
    theme: "light" | "dark";
    autoSave: boolean;
    customColors: {
        background: string;
        text: string;
    };
};

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<void, Error, SettingsRequest>({
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
        onError: () => {
            toast.error("Failed to update settings");
        },
    });
    
    return mutation;
};