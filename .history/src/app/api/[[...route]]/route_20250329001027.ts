import {Hono} from "hono";
import {handle} from "hono/vercel";
import auth from "@/features/auth/server/route";
import settings from "@/features/settings/server/route";
import workspaces from "@/features/workspaces/server/route";
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";
import members from "@/features/members/server/route";

const app = new Hono().basePath("/api");

app.route("/auth", auth)
    .route("/workspaces", workspaces)
    .route("/projects", projects)
    .route("/tasks", tasks)
    .route("/members", members)
    .route("/account-settings", settings)


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;