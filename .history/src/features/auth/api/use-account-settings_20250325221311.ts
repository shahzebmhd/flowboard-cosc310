import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { settingsSchema } from "../schemas";
// @ts-ignore
type SettingsResponse = InferResponseType<typeof settingsSchema, 200>;

export const useAccountSettings = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<SettingsResponse, Error>({
        mutationFn: async ({ json }) => {
            // @ts-ignore
            const response = await client.api.settings["$patch"]({ json });

            if (!response.ok) {
                throw new Error("Failed to fetch settings");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Fetched Settings");
            queryClient.invalidateQueries({ queryKey: ["settings"]});
        },
        onError: () => {
            toast.error("Failed to fetch settings");
        },
    });

    return mutation;
};