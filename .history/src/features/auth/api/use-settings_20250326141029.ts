"use client";

import { z } from "zod";

import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
import { client } from "@/lib/rpc";

export type SettingsResponse = z.infer<typeof settingsSchema>;

interface useSettingsProps {
    theme: 'light' | 'dark',
    autoSave: boolean,
    customColors: {
        background: string,
        text: string,
    },
}

export const useSettings = () => {
    useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: async() => {
            // @ts-expect-error
            const response = await client.api.settings.$get({
                query: {
                    theme
                }
            })

            if(!response.ok) {
                throw new Error("Failed to load settings");
            }

            const { data } = await response.json();

            return data;
        },
    });
};