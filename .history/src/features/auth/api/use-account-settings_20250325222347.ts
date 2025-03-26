import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { settingsSchema } from "../schemas";
// @ts-ignore
export type SettingsResponse = InferResponseType<typeof settingsSchema>;

export const useAccountSettings = () => {
    return useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: async (): Promise<SettingsResponse> => {
            // @ts-ignore
            const response = await client.api.settings.get["$get"]();
            // @ts-ignore
            return response.json();
        },
    });
};