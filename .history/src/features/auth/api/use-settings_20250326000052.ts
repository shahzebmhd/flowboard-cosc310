"use client";

import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { settingsSchema } from "../schemas";
// @ts-ignore
export type SettingsResponse = InferResponseType<typeof settingsSchema>;

export const useSettings = () => {
    const mutation = useMutation<SettingsResponse, Error>({
        mutationFn: async (): Promise<SettingsResponse> => {
            // @ts-ignore
            const response = await client.api.settings.get["$get"]();
            // @ts-ignore
            return response.json();
        },
        onError: (error) => {
            toast.error("Failed to load settings");
            console.error("Failed to load settings", error);
        },
    });

    return mutation;
};