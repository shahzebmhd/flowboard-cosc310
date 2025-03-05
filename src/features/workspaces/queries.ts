import { Query} from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

interface GetWorkspaceProps {
    workspaceId: string;
}

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
    try {
        const {databases, account} = await createSessionClient();
        const user = await account.get();
        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId,
        });


        if (!member) {
            console.warn("User is not a member of the workspace.");
            return null;
        }

     
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

interface GetWorkspaceInfoProps {
    workspaceId: string;
}

export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspaceInfoProps) => {
    try {
        const {databases, account} = await createSessionClient();
     
        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        );
        return {
            name: workspace.name,
            description: workspace.description,
            avatar: workspace.avatar,
        }

    } catch (error) {
        console.error("Error fetching workspace:", error);
        return null;
    }
};
export const getWorkspaces = async () =>{
    try{
        const {databases, account} =await createSessionClient();
     const user = await account.get();
 
     const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId", user.$id)]
    )

    if (members.total == 0) {
        return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);


    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
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