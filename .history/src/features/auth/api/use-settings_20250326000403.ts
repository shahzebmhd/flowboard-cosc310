"use client";

import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { settingsSchema } from "../schemas";
// @ts-ignore
export type SettingsResponse = InferResponseType<typeof settingsSchema>;

export const useSettings = () => {
    const { data, error, isLoading, isError } = useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],  // Unique key for the query
        queryFn: async (): Promise<SettingsResponse> => {
            try {
                // @ts-ignore
                const response = await client.api.settings.get["$get"]();
                // @ts-ignore
                return response.json();
            } catch (error) {
                console.error("Error loading settings:", error);
                throw error;
            }
        },
        //@ts-ignore
        onError: (error) => {
            toast.error("Failed to load settings");
            console.error("Failed to load settings:", error);
        },
    });

    return { data, error, isLoading, isError };
};