import { z } from 'zod/v4';
import { GrocerySchema } from './Grocery';
import { AisleSchema } from './Aisle';
import { ShopperSchema } from './Shopper';

export const GrocerySetSchema = z.object({
  items: z.array(GrocerySchema),
  aisles: z.array(AisleSchema),
  shopper: ShopperSchema,
});

export type GrocerySet = z.infer<typeof GrocerySetSchema>;
