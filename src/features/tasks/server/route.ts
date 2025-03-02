import {Hono, Context} from "hono";
import {sessionMiddleware} from "@/lib/session-middleware";
import {DATABASE_ID, MEMBERS_ID, TASKS_ID, WORKSPACES_ID} from "@/config";
import {ID, Query} from "node-appwrite";
import {taskSchema} from "@/features/tasks/schemas";

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
            const exist = await databases.listDocuments(
                DATABASE_ID,
                WORKSPACES_ID,
                [Query.equal("workspaceId", queryParams.workspaceId)]
            )

            if (exist.total == 0) { // workspace doesn't exist
                return c.json({error: "Not found"}, 404);
            }

            const access = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal("userId", userId)]
            )
            if (access.total == 0) { // user doesn't have access to workspace
                return c.json({error: "Not found"}, 404); //fix
            }

            // Prepare task data
            const taskData = {
                //required fields
                assignedUserId: [user.$id],
                title: queryParams.title,
                createdAt: new Date().toISOString(),
                workspaceId: queryParams.workspaceId,
                locked: queryParams.dueDate ? queryParams.dueDate : false,

                //optional fields
                dueDate: queryParams.dueDate ? new Date(queryParams.dueDate) : undefined,
                description: queryParams.description,
                createdByUserId: user.$id,
                priority: queryParams.priority,
                status: queryParams.status,
            };

            // Validate and clean data
            const validatedTask = taskSchema.parse(taskData);
            // Remove undefined values
            const cleanedTask = Object.fromEntries(
                Object.entries(validatedTask).filter(([_, value]) => value !== undefined)
            );
            console.log(cleanedTask);

            const task = await databases.createDocument(
                DATABASE_ID,
                TASKS_ID,
                ID.unique(),
                cleanedTask
            );

            return c.json({data: task});
        }
    ).post("/deleteTask", sessionMiddleware, //todo
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const queryParams = c.req.query();
            const userId = user.$id;

            //check if task exist:
            const exist = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID, // Assuming this is the collection for workspace members
                [
                    Query.equal("$id", queryParams.taskId),
                ]
            );
            if (exist.total === 0) {
                // User does not have access to the workspace
                return c.json({error: "Not found"}, 404);
            }


            //check if user have access to task
            const access = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID, // Assuming this is the collection for workspace members
                [
                    Query.equal("workspaceId", queryParams.workspaceId),
                    Query.equal("userId", queryParams.userId) // Assuming userId is available in queryParams
                ]
            );
            if (access.total === 0) {
                // User does not have access to the workspace
                return c.json({error: "Forbidden"}, 403);
            }


            const task = await databases.deleteDocument(
                DATABASE_ID,
                TASKS_ID,
                queryParams.taskId //todo discuss if user should be allowed to delete task not assigned to them
            );

            return c.json({data: task});
        }
        //todo set task lock status
        //todo update task
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