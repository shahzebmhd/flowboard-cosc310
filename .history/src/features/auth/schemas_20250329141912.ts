import {z} from 'zod';


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1,"Required"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1,"Required"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum of 8 characters required"),
});

export const settingsSchema = z.object({
    theme: z.enum(['light', 'dark']),
    autoSave: z.boolean(),
    customTheme: z.boolean(),
    customColors: z.object({
        background: z.string(), 
        text: z.string(),
    }),
});