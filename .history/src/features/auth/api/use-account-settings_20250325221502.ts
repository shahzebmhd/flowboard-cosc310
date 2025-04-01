import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { settingsSchema } from "../schemas";
// @ts-ignore
type SettingsResponse = InferResponseType<typeof settingsSchema, 200>;

export const useAccountSettings = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: async() => {
            // @ts-ignore
            const response = await client.api.settings.get["$get"];
            return response.json();
        },
        onError: () => {
            toast.error("Failed to fetch settings");
        },
    });

    return mutation;
};