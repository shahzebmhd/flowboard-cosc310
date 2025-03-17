import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc"; 

interface useGetWorkspaceProps {
    workspaceId: string;
};
export const useGetWorkspace = ({
    workspaceId,
}:useGetWorkspaceProps) => {
    return useQuery({
        queryKey: ["workspace", workspaceId],
        queryFn: async () => {
            // TODO: to find out
            // @ts-expect-error client type is actually known
            const response = await client.api.workspaces[":workspaceId"].$get({
                param: { workspaceId },
            });

            if (!response.ok) {
                throw new Error("failed to fetch workspace");
            }

            const { data } = await response.json();

            return data;
        },
    });
};
