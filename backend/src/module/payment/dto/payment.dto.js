import z from "zod";

export const paymentIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id."),
});

export const orderIdSchema = z.object({
  orderId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id."),
});
