"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsSchema } from "../schemas";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";
// @ts-expect-error
export type ResponseType = InferResponseType<typeof client.api.auth.settings["$get"],200>;
// @ts-expect-error
export type RequestType = InferRequestType<typeof client.api.auth.settings["$get"]>;

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

    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({form}) => {
            // @ts-expect-error
            const response = await client.api.auth.settings["$get"]({form});

            if (!response.ok) {
                throw new Error("Failed to load settings");
            }
            return await response.json();
        },

        onSuccess: () => {
            toast.success("Settings loaded");
            queryClient.invalidateQueries({ queryKey: ["settings"]});
        },
        onError: () => {
            toast.error("Failed to load settings");
        }
    })
};