import { cookies } from "next/headers";
import { Databases, Client, Query, Account } from "node-appwrite";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { Workspace } from "./types";

interface GetWorkspaceProps {
    workspaceId: string;
}
export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!); 

        const session = cookies().get(AUTH_COOKIE);
        if (!session || !session.value) {
            console.warn("No valid session found.");
            return null;
        }

        client.setSession(session.value);
        const databases = new Databases(client);
        const account = new Account(client);
        
        // Get user details
        const user = await account.get();
        
        // Get member details for the workspace
        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId,
        });

        // Future change: Extract workspace IDs from members
        // const workspaceIds = members.documents.map((member) => member.workspaceId);

        if (!member) {
            console.warn("User is not a member of the workspace.");
            return null;
        }

        // Fetch workspace document
        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        );
        return workspace;

    } catch (error) {
        console.error("Error fetching workspace:", error);
        return null;
    }
};
export const getWorkspaces = async () =>{
    try{const client =new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
     const session = (await cookies()).get(AUTH_COOKIE);

     if (!session) return { documents: [], total: 0 };
     client.setSession(session.value);

     const databases =new Databases(client);
     const account = new Account(client);
     const user = await account.get();

     const member = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId", user.$id)]
    )

    if (member.total == 0) {
        return { documents: [], total: 0 };
    }

    const workspaceIds = member.documents.map((member) => member.workspaceId);


    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WOKRSPACES_ID,
        [
            Query.orderDesc("$createdAt"),
            Query.contains("$id", workspaceIds)
        ],
    );

    return workspaces;
    }catch {
        return { documents: [], total: 0 };

    }


}


