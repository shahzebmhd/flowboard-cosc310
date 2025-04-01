"use client";

import { z } from "zod";

import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
import { client } from "@/lib/rpc";
import { SETTINGS_ID } from "@/config";

export type SettingsResponse = z.infer<typeof settingsSchema>;

export const useSettings = () => {
    const settingsId = SETTINGS_ID;

    return useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: async() => {
            // @ts-expect-error
            const response = await client.api.settings.$get({
                query: {
                    
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