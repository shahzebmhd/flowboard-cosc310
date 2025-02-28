import { z } from "zod";

export const updateWorkspaceSchema = z.object({
    name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
    image: z.union([
        typeof File !== "undefined" ? z.instanceof(File) : z.never(), // ✅ Ensures File exists
        z.string().transform((value: any) => value === "" ? undefined : value),
    ]).optional(),
});

export const createWorkspaceSchema = z.object({
    name: z.string().trim().min(1, "required"),
    image: z.union([
        typeof File !== "undefined" ? z.instanceof(File) : z.never(), // ✅ Ensures File exists
        z.string().transform((value: any) => value === "" ? undefined : value),
    ]).optional(),
});
