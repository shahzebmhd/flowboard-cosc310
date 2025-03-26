import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {toast} from "sonner";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"],200>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param,json}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await client.api.members[":memberId"]["$patch"]({param,json});
            if (!response.ok) {
                throw new Error("failed to update member");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("member updated");
            queryClient.invalidateQueries({queryKey: ["members"]});
        },
        onError: () => {
            toast.error("Failed to update member");
        }
    });
} 
