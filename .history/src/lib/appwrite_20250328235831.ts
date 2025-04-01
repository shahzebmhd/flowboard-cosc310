import "server-only";

import {
    Client,
    Account,
    Databases,
    Users,
} from "node-appwrite"
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { DATABASE_ID, SETTINGS_ID } from "@/config";

export async function createSessionClient(){
    const client =new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const session = (await cookies()).get(AUTH_COOKIE)?.value;

    if (!session ||!session){
        throw new Error("Unauthorized");
    }

    client.setSession(session);

    return{
        get account(){
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },

    };
};

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!)

    return {
        get account() {
            return new Account (client);
        },
        get databases() {
            return new Databases(client);
        },
        get users() {
            return new Users(client);
        },
    };
};

export async function getSettingsDocument(documentId: string) {
    const { databases } = await createAdminClient();
    const databaseId = DATABASE_ID;
    const collectionId = SETTINGS_ID;

    try {
        const document = await databases.getDocument(databaseId, collectionId, documentId);
        return document;
    } catch (error) {
        console.error("Error fetching settings document:", error);
        throw new Error("Failed to fetch settings document");
    }
}