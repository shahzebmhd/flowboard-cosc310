"use server"

import { cookies } from "next/headers";
import { Client } from "node-appwrite";

export const getCurrent = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        const session = await cookies()
}