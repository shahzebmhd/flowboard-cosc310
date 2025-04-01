"use client";

import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { settingsSchema } from "../schemas";
// @ts-ignore
export type SettingsResponse = InferResponseType<typeof settingsSchema>;

export const useSettings = () => {
    const queryClient = useQueryClient();
    
    const { data, error, isLoading, isError } = useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: fetchSettings,
        onSubmit: () => {
            toast.success("Settings loaded successfully");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error: Error) => {
            toast.error("Failed to load settings");
            console.error("Failed to load settings:", error);
            return error;
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