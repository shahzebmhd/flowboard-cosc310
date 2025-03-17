import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {toast} from "sonner";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({form}) => {
            const formData = new FormData();
            formData.append("name", form.name);
            console.log("Sending FormData:", formData);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await client.api.workspaces["$post"]({form});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Workspace created");
            queryClient.invalidateQueries({queryKey: ["workspaces"]});
        },
        onError: () => {
            toast.error("Failed to create Workspace");
        }
    });
}