import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createWorkspaceSchema} from "@/features/workspaces/schemas";
import {sessionMiddleware} from "@/lib/session-middleware";
import {DATABASE_ID, WOKRSPACES_ID} from "@/config";
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
    .post("/", zValidator("json", createWorkspaceSchema), sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");

            const name = c.req.valid("json").name.trim();

            const workspaces = await databases.createDocument(
                DATABASE_ID,
                WOKRSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id
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