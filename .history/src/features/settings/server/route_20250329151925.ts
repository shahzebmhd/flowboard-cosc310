import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { settingsSchema } from "@/features/auth/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, SETTINGS_ID } from "@/config";
import { Query, ID } from "node-appwrite";

const app = new Hono();
app.get(
    "/",
    sessionMiddleware,
    async(c) => {
        const databases = c.get("databases");
        console.log("Settings path has been read.");
        const user = c.get("user");
        // const settingsId = await JSON.stringify(process.env.SETTINGS_ID);
        try{ 
            const settings = await databases.listDocuments(
                DATABASE_ID,
                SETTINGS_ID,
                [Query.equal("userId", user.$id)],
            );

            if (settings.documents.length === 0) {
                // Create default settings if none exist
                const defaultSettings = await databases.createDocument(
                    DATABASE_ID,
                    SETTINGS_ID,
                    ID.unique(),
                    {
                        userId: user.$id,
                        theme: "light",
                        autoSave: true,
                        customColors: {
                            background: "#FFFFFF",
                            text: "#000000"
                        }
                    }
                );
                return c.json({ data: defaultSettings });
            }

            return c.json({ data: settings });
        } catch (error) {
            console.error("Error fetching settings:", error);
            return c.json({ error: "Failed to fetch settings"}, 500);
        }

    }
);

app.post(
    "/", 
    sessionMiddleware, 
    zValidator("form", settingsSchema), 
    async (c) => {
        const { theme, autoSave, customColors } = c.req.valid("form");
        console.log("Settings path has been read.");

        const { databases } = await createAdminClient();
        try {
            const settingsUpdate = JSON.stringify({
                theme: theme,
                autoSave: autoSave,
                customColors: customColors,
            });

            const updatedSettings = await databases.updateDocument(
                DATABASE_ID,
                SETTINGS_ID,
                settingsUpdate,
            );

            return c.json({ success: true, data: updatedSettings });
        } catch (error) {
            console.error("Error updating settings:", error);
            return c.json({ error: "Failed to update settings" }, 500);
        }
    }
);

export default app;