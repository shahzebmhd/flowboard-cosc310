import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
    name: z.string().min(1, "Required"),
    status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
    workspaceId: z.string().trim().min(1, "Required"),
    projectId: z.string().trim().min(1, "Required"),
    // dueDate: z.coerce.date(),
    // assigneeId: z.string().trim().min(1, "Required"),
    description: z.string().optional(),
    tasks: z.array(
        z.object({
            $id: z.string(),
            status: z.nativeEnum(TaskStatus),
            position: z.number().int().positive().min(1000).max(1_000_000),
        })
    )
});

