"use client";

import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
// @ts-ignore
export type SettingsResponse = InferResponseType<typeof settingsSchema>;

export const useSettings = () => {
    const { data, error, isLoading, isError } = useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: fetchSettings,
        onError: (error: Error) => {
            toast.error("Failed to load settings");
            console.error("Failed to load settings:", error);
        },
    });
    
    return { data, error, isLoading, isError, };
};

const fetchSettings = async (): Promise<SettingsResponse> => {
    const response = await fetch('/api/appwrite');

    if(!response.ok) {
        throw new Error("Failed to fetch settings");
    }
    // @ts-expect-error
    return response.json();
};