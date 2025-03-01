import {Hono} from "hono";
import {handle} from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route"
import tasks from "@/features/tasks/server/route"

const app = new Hono().basePath("/api");

app.route("/auth", auth)
    .route("/workspaces",workspaces)
    .route("/tasks",tasks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof app;
