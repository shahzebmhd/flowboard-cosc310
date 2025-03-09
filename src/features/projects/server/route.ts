import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { create } from "domain";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import {z} from "zod";
import { createProjectSchema } from "../schemas";
import { MemberRole } from "@/features/members/type";
import { generateInviteCode } from "@/lib/utils";
import { get } from "http";


const app = new Hono();
app.post(
    "/",
    sessionMiddleware,
    zValidator("form",createProjectSchema),
    async (c) => {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const {name, image,workspaceId} = c.req.valid("form");

        let uploadedImageUrl: string | undefined;

        if (image instanceof File) {
            const file = await storage.createFile(
                IMAGES_BUCKET_ID,
                ID.unique(),
                image
            );

            const arrayBuffer = await storage.getFilePreview(
                IMAGES_BUCKET_ID,
                file.$id,
            );

            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
        }

        const project = await databases.createDocument(
            DATABASE_ID,
            PROJECTS_ID,
            ID.unique(),
            {
                name,
                imageUrl: uploadedImageUrl,
                workspaceId
            },
        )
        const member = await getMember({
            workspaceId,
            userId: user.$id,
            databases,
        });
        if (!member) {
            return c.json({error:"Unauthorized"},401);
        }

       


        return c.json({data: project});
    }
)
;

app.get(
    "/",
    sessionMiddleware,
    zValidator("query",z.object({workspaceid: z.string()})),
    async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const { workspaceId } = c.req.valid("query");

        if(!workspaceId)    {

            return c.json({error:"Missing workspaceId"},400);
        };
        const member = await getMember({
            workspaceId,
            userId: user.$id,
            databases,
        });

        if (!member) {
            return c.json({error:"Unauthorized"},401);
        }

        const projects = await databases.listDocuments(
            DATABASE_ID,
            PROJECTS_ID,

            [
                Query.equal ("workspaceId", workspaceId),
                Query.orderDesc("$createdAt"),

                
            ],
);

        return c.json({data: projects});
        
    }
)

export default app;
