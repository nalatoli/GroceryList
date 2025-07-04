import { z } from 'zod/v4';
import { GrocerySchema } from './Grocery';
import { AisleSchema } from './Aisle';

export const GrocerySetSchema = z.object({
  items: z.array(GrocerySchema),
  aisles: z.array(AisleSchema),
});

export type GrocerySet = z.infer<typeof GrocerySetSchema>;
