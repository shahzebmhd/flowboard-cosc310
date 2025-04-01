"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";

interface useSettingsProps {
    theme: 'light',
    autoSave: true,
    customColors: {
        background: '#FFFFFF',
        text: '#000000',
    },
};

export type SettingsResponse = z.infer<typeof settingsSchema>;

export const useSettings = ({
    theme,
    autoSave,
    customColors,
}: useSettingsProps) => {
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
        queryKey: ["settings", theme, autoSave, customColors],
        queryFn: async() => {
            const response = await fetchSettings();

            return response;
        }

    })
};

const fetchSettings = async (): Promise<SettingsResponse> => {
    const response = await fetch('/api/appwrite');

    if(!response.ok) {
        throw new Error("Failed to fetch settings");
    }
    
    return response.json();
};