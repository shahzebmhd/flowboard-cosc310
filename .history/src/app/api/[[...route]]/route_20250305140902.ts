import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";

import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route"
import tasks from "@/features/tasks/server/route";

import { createTaskSchema } from "@/features/tasks/schemas";
import { DATABASE_ID, TASKS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { getMember } from "@/features/members/utils";


const app = new Hono().basePath("/api");
const route = app.route("/tasks", tasks);

app.post(
    "/tasks", 
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
        const { name, status, workspaceId, projectId, dueDate, assigneeId } = c.req.valid("json");
        const databases = c.get("databases");
        const user = c.get("user");

        const member = await getMember({
            databases,
            workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized "}, 401);
        }

        const highestPositionTask = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("status", status),
                Query.equal("workspaceId", workspaceId),
                Query.orderAsc("position"),
                Query.limit(1),
            ]
        );

        const newPosition = highestPositionTask.documents.length > 0 ? highestPositionTask.documents[0].position + 1000 : 1000;

        const task = await databases.createDocument(
            DATABASE_ID,
            TASKS_ID,
            ID.unique(),
            {
                name,
                status,
                workspaceId,
                projectId: projectId || null,
                dueDate: dueDate || null,
                assigneeId: assigneeId || null,
                position: newPosition,
            }
        )

    return c.json({ data: task });
})

app.route("/auth", auth)
    .route("/workspaces",workspaces);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof app;
export default app;