import {z} from 'zod';
import {TaskPriority, TaskStatus} from './type';

export const taskSchema = z.object({
    // required fields
    title: z.string().min(1, "Required"),
    // @ts-expect-error the type is correct
    status: z.enum(Object.values(TaskStatus) as readonly string[]).default(TaskStatus.TODO),
    workspaceId: z.string().min(1, "Required"), // length to be determined later
    createdByUserId: z.string().min(1, "Required"),
    createdAt: z.string().default(() => new Date().toISOString()),
    locked: z.boolean(),

    //optional fields
    description: z.string().optional(),
    dueDate: z.date().optional(),
    assignedUserId: z.array(z.string()).optional(),
    // @ts-expect-error the type is correct
    priority: z.enum(Object.values(TaskPriority) as readonly string[]).optional(), // priority is optional and can be one of 0 to 5
});
