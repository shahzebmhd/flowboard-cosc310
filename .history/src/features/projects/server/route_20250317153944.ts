/* eslint-disable @typescript-eslint/no-unused-vars */
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { createProjectSchema, updateProjectSchema } from "../schemas";
import { Project } from "../types";


const app = new Hono();

// Create a new project
app.post(
    "/",
    sessionMiddleware,
    zValidator("form", createProjectSchema),
    async (c) => {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const { name, image, workspaceId} = c.req.valid("form");
        
        if (!workspaceId) {
            return c.json({ error: "Missing workspaceId" }, 400);
        }

        let uploadedImageUrl: string | undefined;

        if (image instanceof File) {
            try {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            } catch (error) {
                return c.json({ error: "Image upload failed" }, 500);
            }
        }

        const member = await getMember({
            workspaceId,
            userId: user.$id,
            databases,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const project = await databases.createDocument(
            DATABASE_ID,
            PROJECTS_ID,
            ID.unique(),
            {
                name,
                ImageUrl: uploadedImageUrl,
                workspaceId,
            }
        );

        return c.json({ data: project });
    }
);

// Fetch all projects for a workspace
app.get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })), 
    async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const { workspaceId } = c.req.valid("query");

        if (!workspaceId) {
            return c.json({ error: "Missing workspaceId" }, 400);
        }

        const member = await getMember({
            workspaceId,
            userId: user.$id,
            databases,
        });

        if (!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const projects = await databases.listDocuments(
            DATABASE_ID,
            PROJECTS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.orderDesc("$createdAt"),
            ]
        );

        console.log({ projects }); // TEST

        return c.json({ data: projects });
    }
);

app.get(
    "/:projectId",
    sessionMiddleware,
    async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");
        const { projectId } = c.req.param();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            TASKS_ID,
            projectId,
        );

        const member = await getMember({
            databases,
            workspaceId: project.workspaceId,
            userId: user.$id,
        });

        if(!member) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        return c.json({ data: project });
    }
);

// Update workspace details
app.patch(
    "/:projectId", 
    sessionMiddleware,
    zValidator("form", updateProjectSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { projectId } = c.req.param();
      const { name, image } = c.req.valid("form");
      
      const existingProject = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      )
      
      
      const member = await getMember({
        databases,
        workspaceId : existingProject.workspaceId, 
        userId: user.$id,
      });
      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      
      let uploadedImageUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(IMAGES_BUCKET_ID, ID.unique(), image);
        const arrayBuffer = await storage.getFilePreview(IMAGES_BUCKET_ID, file.$id);
        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      } else {
        uploadedImageUrl = image;
      }
      const project = await databases.updateDocument(
        DATABASE_ID, PROJECTS_ID, projectId, {
        name,
        ImageUrl: uploadedImageUrl,
      });
      return c.json({ data: project });
    }
  );


// UPDATE: DELETE for projects, may or may not work because not completely implemented
app.delete(
    "/:projectId",
    sessionMiddleware,
    async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { projectId } = c.req.param();
        const existingProject = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId
        )

        const member = await getMember({
            databases,
            workspaceId: existingProject.workspaceId,
            userId: user.$id,
        });

        if (!member){
            return c.json({ error: "Unauthorized" }, 401)
        }

        // TODO: delete tasks 
        await databases.deleteDocument(
            DATABASE_ID,
            PROJECTS_ID,
            projectId,
        );
        
        return c.json({ data: { $id: existingProject.$id }});
    }
)

export default app;
