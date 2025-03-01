import {Hono, Context} from "hono";
import {sessionMiddleware} from "@/lib/session-middleware";
import {DATABASE_ID, MEMBERS_ID, TASKS_ID} from "@/config";
import {ID, Query} from "node-appwrite";

const app = new Hono()
    .get("/getProjectTasks", sessionMiddleware, async (c) => {
            return readTasks(c, [Query.equal("workspaceId", c.req.query().workspaceId)])
        }
    )
    .post("/createTask", sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const queryParams = c.req.query();
            const userId = user.$id;

            //check if user has access to workspace and the workspace exists
            const access = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal("userId", userId),
                    Query.equal("workspaceId", queryParams.workspaceId)]
            )
            if (access.total == 0) { // user doesn't have access to workspace or workspace doesn't exist
                return c.json({error: "Forbidden"}, 403); //todo not sure if 401 or 403
            }

            // Prepare task data
            const taskData = {
                //required fields
                dueDate: queryParams.dueDate ? new Date(queryParams.dueDate) : undefined,
                assignedUserId: [user.$id],
                priority: queryParams.priority,
                status: queryParams.status,
                title: queryParams.title,
                createdAt: new Date().toISOString(),
                workspaceId: queryParams.workspaceId,

                //optional fields
                description: queryParams.description,
                createdByUserId: user.$id,
            };

            //todo some sort of validation should be done
            //
            // Validate and clean data
            // const validatedTask = taskSchema.parse(taskData);
            //
            // Remove undefined values
            // const cleanedTask = Object.fromEntries(
            //     Object.entries(validatedTask).filter(([_, value]) => value !== undefined)
            // );

            const task = await databases.createDocument(
                DATABASE_ID,
                TASKS_ID,
                ID.unique(),
                taskData
            );

            return c.json({data: task});
        }
    ).post("/deleteTask", sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const queryParams = c.req.query();
            const userId = user.$id;

            //check if user has access to workspace and the workspace exists
            const access = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal("userId", userId),
                    Query.equal("workspaceId", queryParams.workspaceId)]
            )
            if (access.total == 0) { // user doesn't have access to the workspace or the workspace doesn't exist
                return c.json({error: "Forbidden"}, 403); //todo not sure if 401 or 403
            }

            const task = await databases.deleteDocument(
                DATABASE_ID,
                TASKS_ID,
                queryParams.taskId //todo discuss if user should be allowed to delete task not assigned to them
            );

            return c.json({data: task});
        }
    );

export default app;


async function readTasks(c: Context, filterCondition: string[]) {
    const databases = c.get("databases");
    const user = c.get("user");
    const queryParams = c.req.query();
    const userId = user.$id;

    //check if user has access to workspace and the workspace exists
    const access = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId", userId),
            Query.equal("workspaceId", queryParams.workspaceId)]
    )
    if (access.total == 0) { // user doesn't have access to workspace or workspace doesn't exist
        return c.json({error: "Forbidden"}, 403); //todo not sure if 401 or 403
    } else {
        const tasks = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            filterCondition
        )
        return c.json({data: tasks})
    }
}