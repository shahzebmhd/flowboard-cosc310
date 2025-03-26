import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
// @ts-ignore
type ResponseType = InferResponseType<typeof client.api.settings["$patch"], 200>;
// @ts-ignore
type RequestType = InferRequestType<typeof client.api.settings["$patch"]>;

export const useAccountSettings = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            // @ts-ignore
            const response = await client.api.settings["$patch"]({ json });

            if (!response.ok) {
                throw new Error("Failed to fetch settings");
            }
            return await response.json();
        }
    })
}