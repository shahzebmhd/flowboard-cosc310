import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc"; // Assuming it's exported with the type above
import { string } from "zod";

interface useGetMembersProps {
    workspaceId:string;
}
export const useGetMembers = ({
    workspaceId,
}:useGetMembersProps) => {
    return useQuery({
        queryKey: ["members",workspaceId],
        queryFn: async () => {
            // @ts-expect-error client type is actually known
            const response =await client.api.members.$get({query:{workspaceId}});
            console.log(response);

            if (!response.ok) {
                throw new Error("failed to fetch workspaces");
            }

            const {data} = await response.json();

            return data;
        },
    });
};

