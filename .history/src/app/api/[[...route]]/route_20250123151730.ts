import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
    return c.json({ hello: "world" });
});

app.get("/project/:projectId", (c) => {
    return c.json({ project: "prjectId"});
});

export const GET = handle(app);