import { z } from 'zod/v4';

export const ShopperSchema = z.object({
  idx: z.number(),
  name: z.string(),
});

export type Shopper = z.infer<typeof ShopperSchema>;
