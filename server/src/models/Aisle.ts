import { z } from 'zod/v4';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroceryEntity } from './Grocery';
import { GroceryInfoEntity, GroceryInfoSchema } from './GroceryInfo';

export const AisleSchema = z.object({
  idx: z.number(),
  name: z.string(),
  description: z.string(),
  infos: z.array(GroceryInfoSchema),
});

@Entity()
export class AisleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => GroceryInfoEntity, (groceryInfo) => groceryInfo.aisle)
  groceryInfos: GroceryInfoEntity[];

  @OneToMany(() => GroceryEntity, (grocery) => grocery.aisle)
  groceries: GroceryEntity[];
}

export type Aisle = z.infer<typeof AisleSchema>;
