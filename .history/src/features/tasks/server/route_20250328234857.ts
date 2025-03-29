/* eslint-disable @typescript-eslint/no-unused-vars */

/* All instances of Assignees and Due Dates have been removed for the time being
will add back at a later date. */
import { Hono } from "hono";
import { getMember } from "@/features/members/utils";
import { zValidator } from "@hono/zod-validator";
import { createTaskSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, TASKS_ID, MEMBERS_ID, PROJECTS_ID } from "@/config"; // TODO: pending code from Jessica
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { TaskStatus, Task} from "../types";
import { Project } from "@/features/projects/types"; // TODO: pending code from Jessica 
import { createAdminClient } from "@/lib/appwrite";
import { NextApiRequest, NextApiResponse } from "next";
import { useDeleteTask } from "../api/use-delete-tasks";


    
const app = new Hono();

app.get(
    "/:taskId",
    sessionMiddleware,
    zValidator(
        "query",
        z.object({
            workspaceId: z.string(),
            projectId: z.string().nullish(),
            // assigneeId: z.string().nullish();
            status: z.nativeEnum(TaskStatus).nullish(),
            search: z.string().nullish(),
            // dueDate: z.string().nullish(),
            // assigneeId: z.string().nullish(),
        })
    ),
    async (c) => {
        const { users } = await createAdminClient(); // UPDATE: added within createAdminClient get Users()
        const databases = c.get("databases");
        const user = c.get("user");
        const { taskId } = c.req.param();

        const { workspaceId, projectId, status, search, /*dueDate, assigneeId*/ } = c.req.valid("query");

        const task = await databases.getDocument<Task>(
            DATABASE_ID,
            TASKS_ID,
            taskId,
        );

        const member = await getMember({
            databases,
            workspaceId: task.workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const query = [
            Query.equal("workspaceId", workspaceId),
            Query.orderDesc("$createdAt"),
        ];

        if (projectId) {
            console.log("projectId:", projectId);
            query.push(Query.equal("projectId", projectId));
        }

        if (status) {
            console.log("status:", status);
            query.push(Query.equal("status", status));
        }
        /*  if(assigneeId) {
                console.log("assigneeId:", assigneeId);
                query.push(Query.equal("assigneeId:", assigneeId));
            }
        */
        // if (dueDate) {
        //     console.log("dueDate:", dueDate);
        //     query.push(Query.equal("dueDate", dueDate));
        // }
//         if (assigneeId) {
//             console.log("assigneeId:", assigneeId);
//             query.push(Query.equal("assigneeId", assigneeId));
//         }

        if (search) {
            console.log("search:", search);
            query.push(Query.search("name", search));
        }

        const tasks = await databases.listDocuments<Task>(DATABASE_ID, TASKS_ID, query);

        const projectIds = tasks.documents.map((task) => task.projectId);
        // const assigneeIds = tasks.documents.map((task) => task.assigneeId);

        const projects = await databases.listDocuments<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
        );

        /* const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
        );

        const assignees = await Promise.all(
            members.documents.map(async (member) => {
                try {
                    const user = await users.get(member.userId);
                    return {
                        ...member,
                        name: user.name,
                        email: user.email,
                    };
                } catch (error) {
                    // If we can't get user data, use the member's name or a fallback
                    return {
                        ...member,
                        name: member.name || `User ${member.userId.substring(0, 8)}`,
                        email: "unknown@example.com",
                    };
                }
            })
        ); */

        const populatedTasks = tasks.documents.map((task) => {
            const project = projects.documents.find((proj) => proj.$id === task.projectId);
            // const assignee = assignees.find((asg) => asg.$id === task.assigneeId);

            return {
                ...task,
                project,
                // assignee,
            };
        });

        return c.json({
            data: {
                ...tasks,
                documents: populatedTasks,
            },
        });
    }
);

app.post(
    "/bulk-update",
    sessionMiddleware,
    zValidator(
        "json", 
        createTaskSchema,
    ),
    async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const { name, status, workspaceId, projectId, tasks, /*dueDate, assigneeId*/ } = c.req.valid("json");

        const tasksToUpdate = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [Query.contains("$id", tasks.map((task) => task.$id))]
        );

        const workspaceIds = new Set(tasksToUpdate.documents.map(task => task.workspaceId));
        if (workspaceIds.size !== 1) {
            return c.json({ error: "All tasks must belong to the same workspace" });
        }

        const member = await getMember({
            databases,
            workspaceId,
            userId: user.$id,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const updatedTasks = await Promise.all(
            tasks.map(async (task) => {
                const { $id, status, position } = task;
                return databases.updateDocument<Task>(
                    DATABASE_ID,
                    TASKS_ID,
                    $id,
                    { status, position }
                );
            })
        );

        const highestPositionTask = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
            Query.equal("status", status),
            Query.equal("workspaceId", workspaceId),
            Query.orderAsc("position"),
            Query.limit(1),
        ]);

        const newPosition =
            highestPositionTask.documents.length > 0
                ? highestPositionTask.documents[0].position + 1000
                : 1000;

        const task = await databases.createDocument(DATABASE_ID, TASKS_ID, ID.unique(), {
            name,
            status,
            workspaceId,
            projectId,
            // dueDate,
            // assigneeId

            position: newPosition,
        });

        return c.json({ data:updatedTasks });
    }
);

export default app;
