"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";

export type SettingsResponse = z.infer<typeof settingsSchema>;

interface useSettingsProps {
    theme: 'light',
    autoSave: true,
    customColors: {
        background: '#FFFFFF',
        text: '#000000',
    },
}

export const useSettings = (): useSettingsProps => {
    const { data, error, isLoading, isError } = useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: fetchSettings,
        // @ts-expect-error
        onError: (error: Error) => {
            toast.error("Failed to load settings");
            console.error("Failed to load settings:", error);
        },
    });
    return { data, error, isLoading, isError, };
};

const fetchSettings = async (): Promise<SettingsResponse> => {
    const response = await client.api.settings.$get({
        query: {
            data,
        }
    });

    if(!response.ok) {
        throw new Error("Failed to fetch settings");
    }

    return response.json();
};