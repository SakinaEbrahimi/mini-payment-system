import z from "zod";

export const productIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id."),
});

export const buyProductSchema = z.object({
  quantity: z.number().positive().min(1),
});

export const searchQuerySchema = z.object({
  search: z.string().trim().min(2),
});
