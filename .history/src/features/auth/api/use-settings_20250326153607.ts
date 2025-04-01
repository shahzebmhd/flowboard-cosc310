"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";
// @ts-expect-error
export type SettingsResponse = InferResponseType<typeof client.api.auth.settings["$get"],200>;
// @ts-expect-error
export type SettingsRequest = InferRequestType<typeof client.api.auth.settings["$get"]>;

export const useSettings = () => {
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
    // @ts-ignore
    const response = await client.api.auth.settings;

    if(!response.ok) {
        throw new Error("Failed to fetch settings");
    }

    return response.json();
};