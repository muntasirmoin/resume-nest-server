import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string("Project title is required"),
  description: z.string("Description is required"),
  thumbnail: z.string("Thumbnail URL is required"),
  projectLink: z.string("Project link is required"),
  liveSite: z.string("Live site URL is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  authorId: z.string("Author ID is required"),
});
