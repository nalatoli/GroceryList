import { z } from 'zod/v4';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AisleEntity } from './Aisle';
import { ShopperEntity, ShopperSchema } from './Shopper';

export const GrocerySchema = z.object({
  idx: z.number(),
  isChecked: z.boolean(),
  name: z.string(),
  quantity: z.string(),
  shopper: ShopperSchema,
});

@Entity()
export class GroceryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isChecked: boolean;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @ManyToOne(() => AisleEntity, (aisle) => aisle.groceries, {
    eager: true,
    nullable: true,
  })
  aisle: AisleEntity;

  @ManyToOne(() => ShopperEntity, (shopper) => shopper.groceries, {
    eager: true,
  })
  shopper: ShopperEntity;
}

export type Grocery = z.infer<typeof GrocerySchema>;
