import { z } from 'zod/v4';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AisleEntity } from './Aisle';

export const GrocerySchema = z.object({
  idx: z.number(),
  isChecked: z.boolean(),
  name: z.string(),
  quantity: z.string(),
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
}

export type Grocery = z.infer<typeof GrocerySchema>;
