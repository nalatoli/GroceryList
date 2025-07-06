import { z } from 'zod/v4';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroceryEntity } from './Grocery';

export const ShopperSchema = z.object({
  idx: z.number(),
  name: z.string(),
});

@Entity()
export class ShopperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => GroceryEntity, (grocery) => grocery.shopper)
  groceries: GroceryEntity[];
}

export type Shopper = z.infer<typeof ShopperSchema>;
