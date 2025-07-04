import { z } from 'zod/v4';

export const GroceryAddRequestSchema = z.object({
  name: z.string(),
  quantity: z.string(),
});

export type GroceryAddRequest = z.infer<typeof GroceryAddRequestSchema>;
