"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
import { client } from "@/lib/rpc";

export type SettingsResponse = z.infer<typeof settingsSchema>;

// interface useSettingsProps {
//     data: {
//         theme: 'light',
//         autoSave: true,
//         customColors: {
//             background: '#FFFFFF',
//             text: '#000000',
//         },
//     }
// }

export const useSettings = () => {
    return useQuery<SettingsResponse, Error>({
        queryKey: ["settings"],
        queryFn: async() => {
            // @ts-expect-error
            const response = await client.databases.settings.$get({
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