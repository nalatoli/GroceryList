import { z } from 'zod/v4';

export const GroceryInfoSchema = z.object({
  idx: z.number(),
  name: z.string(),
});

export type GroceryInfo = z.infer<typeof GroceryInfoSchema>;
