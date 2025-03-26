import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {toast} from "sonner";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$delete"],200>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$delete"]>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await client.api.workspaces[":workspaceId"]["$delete"]({param});
            if (!response.ok) {
                throw new Error("failed to delete Workspace");
            }
            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Workspace deleted");
            queryClient.invalidateQueries({queryKey: ["workspaces"]});
            queryClient.invalidateQueries({queryKey: ["workspace",data.$id]});
        },
        onError: () => {
            toast.error("Failed to delete Workspace");
        }
    });
}