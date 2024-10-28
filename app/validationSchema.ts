import { z } from "zod";

export const createIssueSchema = z.object({
  name: z.string().min(1, "Enter a valid name").max(255),
  description: z.string().min(1, "Enter a valid description"),
});