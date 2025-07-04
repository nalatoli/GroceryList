import styles from './GroceryList.module.css';
import type { Grocery } from '../../models/Grocery';
import GroceryItem from '../GroceryItem/GroceryItem';
import { useState } from 'react';
import type { GrocerySet } from '../../models/GrocerySet';
import type { Aisle } from '../../models/Aisle';
import { motion, AnimatePresence } from 'framer-motion';

export default function GroceryList({
  grocerySet,
  onToggle,
  onAisleSet,
  onDelete,
}: {
  grocerySet: GrocerySet;
  onToggle(grocery: Grocery): void;
  onAisleSet(grocery: Grocery, aisle: Aisle | undefined): void;
  onDelete(item: Grocery): void;
}) {
  const [contextMenuFor, setContextMenuFor] = useState<number | null>(null);
  const aisleByItemName = new Map<string, Aisle>();

  for (const aisle of grocerySet.aisles) {
    for (const info of aisle.infos) {
      aisleByItemName.set(info.name, aisle);
    }
  }

  const sortedItems = [...grocerySet.items].sort((a, b) => {
    if (a.isChecked !== b.isChecked) {
      return a.isChecked ? 1 : -1;
    }

    const aisleA = aisleByItemName.get(a.name)?.name ?? '';
    const aisleB = aisleByItemName.get(b.name)?.name ?? '';
    return aisleA.localeCompare(aisleB);
  });

  return (
    <motion.ul className={styles.list} layout>
      <AnimatePresence>
        {sortedItems.length === 0 ? (
          <li className={styles.empty}>
            The grocery list is empty.
            <br />
            Add items above to get started!
          </li>
        ) : (
          sortedItems.map((item) => (
            <motion.li
              key={item.idx}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <GroceryItem
                key={item.idx}
                grocery={item}
                aisle={grocerySet.aisles.find((a) =>
                  a.infos.some(
                    (info) =>
                      info.name.trim().localeCompare(item.name.trim(), 'en', {
                        sensitivity: 'base',
                      }) === 0,
                  ),
                )}
                availableAisles={grocerySet.aisles}
                highlighted={contextMenuFor === item.idx}
                onOpenConextMenu={() => setContextMenuFor(item.idx)}
                onCloseContextMenu={() => setContextMenuFor(null)}
                onToggle={() => onToggle(item)}
                onAisleSet={(val) => {
                  console.log(val);
                  onAisleSet(
                    item,
                    grocerySet.aisles.find(
                      (a) =>
                        `${a.name}${a.description ? ` (${a.description})` : ``}` ===
                        val,
                    ),
                  );
                }}
                onDelete={() => onDelete(item)}
              />
            </motion.li>
          ))
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
