import { z } from "zod";

export const issueSchema = z.object({
  name: z.string().min(1, "Enter a valid name").max(255),
  description: z.string().min(1, "Enter a valid description").max(65535),
});

export const patchIssueSchema = z.object({
  name: z.string().min(1, "Enter a valid name").max(255).optional(),
  description: z
    .string()
    .min(1, "Enter a valid description")
    .max(65535)
    .optional(),
  assignedToUserId: z.string().min(1).max(65535).optional().nullable(),
});
