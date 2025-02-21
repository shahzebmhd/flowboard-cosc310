import { cookies } from "next/headers";
import {Databases, Client, Query, Account } from "node-appwrite";

import {AUTH_COOKIE} from "@/features/auth/constants";
import {DATABASE_ID, MEMBERS_ID, WORKSPACE_ID} from "@/config";
import {getMember} from "@/features/members/utils";
import {Workspace} from "./types";


interface GetWorkspaceProps {
    workspaceId: string;
};

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
    try {
        const client = new Client()
        .setEndpoint(process .env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process .env_NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = await cookies().get(AUTH_COOKIE);

        if (!session) return null;
        client.setSession(session.value);
        const databases = new Databases(client);
        const account = new Account(client);
        const user = await account.get();
        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId,
        })
        // const workspaceIds = members.documents.map((member) => member.workspaceId);  incomming change should have this variable
        // 6:51:44 to see settings display NPM RUN DEV

        if(!member){
            return null;
        }
        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId,
        );
        return workspace;
    } catch {
        return null
    }
}