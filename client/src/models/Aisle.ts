import { z } from 'zod/v4';
import { GroceryInfoSchema } from './GroceryInfo';

export const AisleSchema = z.object({
  idx: z.number(),
  name: z.string(),
  description: z.nullable(z.string()),
  infos: z.array(GroceryInfoSchema),
});

export type Aisle = z.infer<typeof AisleSchema>;
