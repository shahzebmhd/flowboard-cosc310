"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";

export type SettingsResponse = z.infer<typeof settingsSchema>;

export const useSettings = () => {
    // const { data, error, isLoading, isError } = useQuery<SettingsResponse, Error>({
    //     queryKey: ["settings"],
    //     queryFn: fetchSettings,
    //     // @ts-expect-error
    //     onError: (error: Error) => {
    //         toast.error("Failed to load settings");
    //         console.error("Failed to load settings:", error);
    //     },
    // });
    // return { data, error, isLoading, isError, };
    return useQuery({
        queryKey: ["settings"],
        queryFn: async() => {
            await fetchSettings();
        },
    })
};

const fetchSettings = async (): Promise<SettingsResponse> => {
    const response = await fetch("/api/appwrite");

    if(!response.ok) {
        throw new Error("Failed to fetch settings");
    }

    return response.json();
};