import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {loginSchema, registerSchema, settingsSchema} from "@/features/auth/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import {deleteCookie, setCookie} from "hono/cookie"
import { AUTH_COOKIE } from "@/features/auth/constants";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, SETTINGS_ID } from "@/config";

const app = new Hono();
app.get(
    "/current",
    sessionMiddleware,
    (c) => {
        const user = c.get("user");

        return c.json({ data: user });
    }
);


    app.post("/login", zValidator("json", loginSchema), async (c) => {
    const {email, password} = c.req.valid("json");
    const {account} = await createAdminClient();
    const session = await account.createEmailPasswordSession(
        email,
        password,
    );

    setCookie(c,AUTH_COOKIE, session.secret,{
        path:"/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
    } );
    return c.json({success:true});
}).post("/register", zValidator("json", registerSchema), 
async (c) => {
    const {name, email, password} = c.req.valid("json");
    const {account}= await createAdminClient();
    await account.create(
        ID.unique(),
        email,
        password,
        name,
    );

    const session = await  account.createEmailPasswordSession(
        email,
        password,
    );

    setCookie(c,AUTH_COOKIE, session.secret,{
        path:"/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
    } );

    return c.json({success:true});
})
.post("/logout",sessionMiddleware,async (c) => {
    const account = c.get("account");
    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
})

app.get(
    "/settings",
    sessionMiddleware,
    async(c) => {
        const databases = c.get("databases");
        try{ 
            const settings = await databases.getDocument(
                DATABASE_ID,
                SETTINGS_ID,
                [

                ],
            );
        } catch (error) {
            console.error("Error fetching settings:", error);
            return c.json({ error: "Failed to fetch settings"}, 500);
        }
    }
);

app.post("/settings", sessionMiddleware, zValidator("json", settingsSchema), async (c) => {
    const { theme, autoSave, customColors } = c.req.valid("json");

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
});

export default app;
