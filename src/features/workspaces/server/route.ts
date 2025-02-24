import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createWorkspaceSchema} from "@/features/workspaces/schemas";
import {sessionMiddleware} from "@/lib/session-middleware";
import {DATABASE_ID, IMAGES_BUCKET_ID, WOKRSPACES_ID} from "@/config";
import {ID} from "node-appwrite";

const app = new Hono()
    .get("/", sessionMiddleware, async (c) => {
        const databases = c.get("databases");

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WOKRSPACES_ID,
        );

        return c.json({data: workspaces});
    })
    .post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const {name, image} = c.req.valid("form");

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );

                const arratBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arratBuffer).toString("base64")}`
            }

            const workspaces = await databases.createDocument(
                DATABASE_ID,
                WOKRSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                },
            )

            return c.json({data: workspaces});
        }
    )
;


app.get(
    "/current",
    sessionMiddleware,
    (c) => {
        const user = c.get("user");

        return c.json({data: user});
    }
);
export default app;