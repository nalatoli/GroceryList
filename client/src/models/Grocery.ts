import { z } from 'zod/v4';
import { ShopperSchema } from './Shopper';

export const GrocerySchema = z.object({
  idx: z.number(),
  isChecked: z.boolean(),
  name: z.string(),
  quantity: z.string(),
  shopper: ShopperSchema,
});

export type Grocery = z.infer<typeof GrocerySchema>;
