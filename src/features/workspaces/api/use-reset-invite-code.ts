import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {toast} from "sonner";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"][$post],200>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"][$post]>;

export const useResetInviteCode = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({param});
            return await response.json();

            if (!response.ok){
                throw new Error("Failed to reset invite code");
            }

            return await response.json();

        },
        onSuccess: () => {
            toast.success("Invite code reset");
            queryClient.invalidateQueries({queryKey: ["workspaces"]});
        },
        onError: () => {
            toast.error("Failed to reset invite code");
        }
    });
}