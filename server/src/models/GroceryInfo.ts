import { z } from 'zod/v4';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AisleEntity } from './Aisle';

export const GroceryInfoSchema = z.object({
  idx: z.number(),
  name: z.string(),
});

@Entity()
export class GroceryInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => AisleEntity, (aisle) => aisle.groceries, { eager: true })
  aisle: AisleEntity;
}

export type GroceryInfo = z.infer<typeof GroceryInfoSchema>;
