import{ useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc"; // Assuming it's exported with the type above

export const useCurrent = () => {
    const query =useQuery({
        queryKey:["current"],
        queryFn : async () => {
            // @ts-expect-error
            const response = await client.api.auth.current.$get();

            if (!response.ok) {
                return null;
            }

            const {data} = await response.json();

            return data;
        },
    });

    return query;
};

