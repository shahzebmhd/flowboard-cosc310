"use client";

import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
// @ts-ignore
export type SettingsResponse = z.infer<typeof settingsSchema>;

export const useSettings = () => {
    const queryOptions: UseQueryOptions<SettingsResponse, Error> = {
        queryKey: ["settings"],
        queryFn: fetchSettings,
        onError: (error: Error) => {
            toast.error("Failed to load settings");
            console.error("Failed to load settings:", error);
        },
    };
    const { data, error, isLoading, isError } = useQuery(queryOptions);
    return { data, error, isLoading, isError, };
};

const fetchSettings = async (): Promise<SettingsResponse> => {
    const response = await fetch('/api/appwrite');

    if(!response.ok) {
        throw new Error("Failed to fetch settings");
    }
    return response.json();
};