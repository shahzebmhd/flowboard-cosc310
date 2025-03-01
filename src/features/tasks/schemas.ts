import { z } from 'zod';
import { TaskPriority, TaskStatus } from './type';

//todo to be used by validation later
export const taskSchema = z.object({
    // required fields
    title: z.string().min(1, "Required"),
    status: z.enum(Object.values(TaskStatus) as readonly string[]).default(TaskStatus.TODO),
    workspaceId: z.string().min(1, "Required"), // length to be determined later
    createdByUserId: z.string().min(1, "Required"),
    createdAt: z.string().default(() => new Date().toISOString()),

    //optional fields
    description: z.string(),
    dueDate: z.date(),
    assignedUserId: z.string().min(1, "Required"),
    priority: z.enum(Object.values(TaskPriority) as readonly string[]).optional(), // priority is optional and can be one of 0 to 5
});
