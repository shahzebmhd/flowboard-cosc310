import { updateWorkspaceSchema } from "../schemas";
import { getMember } from "@/features/members/utils";

.patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", updateWorkspaceSchema)
    async (c) => {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const { workspaceId } = c.req.param();
        const  {name, image } = c.req.valid("form");
        const member = getMember({
            databases,
            worksapceId,
            userId: user.$id,
        });

        if (!member || member.role !== MemberRole.ADMIN) {
            return c.json({ error: "Unauthorized" }, 401);
        }

// Posted from POST
        let uploadedImageUrl: string | undefined;
        if (image instanceof File) {
            const file = await storage.createFile(
                IMAGES_BUCKET_ID,
                ID.unique(),
                image,
            );

            const arrayBuffer = await storage.getFilePreview(
                IMAGES_BUCKET_ID,
                file.$id,
            );

            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString}`
        } else {
            uploadedImageUrl = image;
        }

        cosnt workspace = await databases.updateDocument(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId,
            { 
                name, 
                imageUrl: uploadedImageUrl
            }
        );

        return c.json({data: workspace});
    }   
);

export default app;