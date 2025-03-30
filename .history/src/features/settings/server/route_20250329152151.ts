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

            return c.json({ data: settings.documents[0] });
        } catch (error) {
            console.error("Error fetching settings:", error);
            return c.json({ error: "Failed to fetch settings"}, 500);
        }

    }
);

app.post(
    "/", 
    sessionMiddleware, 
    zValidator("json", settingsSchema), // Changed from "form" to "json"
    async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");
        const settingsData = c.req.valid("json");
        
        try {
            // Find existing settings document
            const existingSettings = await databases.listDocuments(
                DATABASE_ID,
                SETTINGS_ID,
                [Query.equal("userId", user.$id)]
            );
            
            if (existingSettings.documents.length === 0) {
                // Create new settings if none exist
                const newSettings = await databases.createDocument(
                    DATABASE_ID,
                    SETTINGS_ID,
                    ID.unique(),
                    {
                        userId: user.$id,
                        ...settingsData
                    }
                );
                return c.json({ data: newSettings });
            }
            
            // Update existing settings
            const updatedSettings = await databases.updateDocument(
                DATABASE_ID,
                SETTINGS_ID,
                existingSettings.documents[0].$id,
                settingsData
            );
            
            return c.json({ data: updatedSettings });
        } catch (error) {
            console.error("Error updating settings:", error);
            return c.json({ error: "Failed to update settings" }, 500);
        }
    }
);

export default app;