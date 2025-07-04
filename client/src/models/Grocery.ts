import { z } from 'zod/v4';

export const GrocerySchema = z.object({
  idx: z.number(),
  isChecked: z.boolean(),
  name: z.string(),
  quantity: z.string(),
});

export type Grocery = z.infer<typeof GrocerySchema>;
