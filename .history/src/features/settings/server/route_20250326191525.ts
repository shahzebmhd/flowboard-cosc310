import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { settingsSchema } from "@/features/auth/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, SETTINGS_ID } from "@/config";

const app = new Hono();
app.get(
    "/account-settings",
    sessionMiddleware,
    async(c) => {
        const databases = c.get("databases");
        console.log("Settings path has been read.");
        const settingsId = await JSON.stringify(process.env.SETTINGS_ID);
        try{ 
            const settings = await databases.getDocument(
                DATABASE_ID,
                SETTINGS_ID,
                settingsId,
            );
            return c.json({ data: settings });
        } catch (error) {
            console.error("Error fetching settings:", error);
            return c.json({ error: "Failed to fetch settings"}, 500);
        }

    }
);

app.post(
    "/account-settings", 
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