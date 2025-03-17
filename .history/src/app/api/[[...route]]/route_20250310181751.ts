import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";

import { mockUsers } from "@/mocks/mock-user";

import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route"
import tasks from "@/features/tasks/server/route";

import { createTaskSchema } from "@/features/tasks/schemas";
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { getMember } from "@/features/members/utils";
import { Project } from "@/features/projects/types";
import { TaskStatus } from "@/features/tasks/types";
import { createAdminClient } from "@/lib/appwrite";


const app = new Hono().basePath("/api");
const route = app.route("/tasks", tasks);

app.get(
    "/",
    sessionMiddleware,
    zValidator(
        "query",
        z.object({
            workspaceId: z.string(),
            projectId: z.string().nullish(),
            assigneeId: z.string().nullish(),
            status: z.nativeEnum(TaskStatus).nullish(),
            search: z.string().nullish(),
            dueDate: z.string().nullish(),
        })
    ),
    async (c) => {
        const { users } = await createAdminClient();
        const databases = c.get("databases");
        const user = c.get("user");

        const { workspaceId, projectId, status, search, assigneeId, dueDate } = c.req.valid("query");

        const { username, password } = await c.req.json();
        const mockUser = mockUsers.find((u) => u.username === username && u.password === password);

        const member = await getMember({
            databases,
            workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const query = [
            Query.equal("workspaceId", workspaceId),
            Query.orderDesc("$createdAt"),
        ];

        if (projectId) query.push(Query.equal("projectId", projectId));
        if (status) query.push(Query.equal("status", status));
        if (assigneeId) query.push(Query.equal("assigneeId", assigneeId));
        if (dueDate) query.push(Query.equal("dueDate", dueDate));
        if (search) query.push(Query.search("name", search)); // ✅ Fixed typo

        const tasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, query);

        const projectIds = tasks.documents.map((task) => task.projectId);
        const assigneeIds = tasks.documents.map((task) => task.assigneeId);

        const projects = await databases.listDocuments<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
        );

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
        );

        const assignees = await Promise.all(
            members.documents.map(async (member) => {
                const user = await users.get(member.userId);
                return {
                    ...member,
                    name: user.name,
                    email: user.email,
                };
            })
        );

        const populatedTasks = tasks.documents.map((task) => {
            const project = projects.documents.find((project) => project.$id === task.projectId);
            const assignee = assignees.find((assignee) => assignee.$id === task.assigneeId);

            return {
                ...task,
                project,
                assignee,
            };
        });

        return c.json({
            data: {
                ...tasks,
                documents: populatedTasks,
            },
        });
    }
)

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
});

app.route("/auth", auth)
    .route("/workspaces",workspaces);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof app;
export default app;