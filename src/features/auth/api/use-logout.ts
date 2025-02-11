import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment



export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await client.api.auth.logout["$post"]();
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["current"]});
        }
    });
}