import { useState, useEffect } from 'react';
import { type Grocery, GrocerySchema } from '../models/Grocery';
import { type GrocerySet, GrocerySetSchema } from '../models/GrocerySet';
import type { GroceryAddRequest } from '../models/GroceryAddRequest';
import { socket } from './socket';
import { type Aisle, AisleSchema } from '../models/Aisle';
import { z } from 'zod/v4';

export default function useGroceries(shopperId: number) {
  const [grocerySet, setGrocerySet] = useState<GrocerySet>({
    items: [],
    aisles: [],
    shopper: {
      idx: 1,
      name: '',
    },
  });
  const [nameText, setNameText] = useState('');
  const [quantityText, setQuantityText] = useState('');
  const [shopperText, setShopperText] = useState('');

  useEffect(() => {
    const handlers = {
      connect: () => {
        socket.emit('getGroceryList', shopperId);
      },

      getGroceryList: (payload: unknown) => {
        const grocerySet = GrocerySetSchema.parse(payload);
        console.log(grocerySet);
        setGrocerySet(grocerySet);
        setShopperText(grocerySet.shopper.name);
      },

      groceryItemUpdated: (payload: unknown) => {
        const data = GrocerySchema.parse(payload);
        setGrocerySet((prev) => ({
          ...prev,
          items: prev.items.map((g) =>
            g.idx === data.idx ? { ...g, ...data } : g,
          ),
        }));
      },

      groceryAisleUpdated: (payload: unknown) => {
        const data = z.array(AisleSchema).parse(payload);
        setGrocerySet((prev) => ({ ...prev, aisles: data }));
      },

      groceryItemDeleted: (payload: unknown) => {
        const data = GrocerySchema.parse(payload);
        setGrocerySet((prev) => ({
          ...prev,
          items: prev.items.filter((g) => g.idx !== data.idx),
        }));
      },

      addGroceryItem: (payload: unknown) => {
        const data = GrocerySchema.parse(payload);
        setGrocerySet((prev) => ({ ...prev, items: [...prev.items, data] }));
      },

      clearGroceryList: () => {
        setGrocerySet((prev) => ({ ...prev, items: [] }));
      },

      resetGroceryList: () => {
        setGrocerySet((prev) => ({
          ...prev,
          items: prev.items.map((g) => ({ ...g, isChecked: false })),
        }));
      },
    };

    for (const [event, handler] of Object.entries(handlers)) {
      socket.on(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(handlers)) {
        socket.off(event, handler);
      }
    };
  }, [shopperId]);

  const addGrocery = () => {
    const request: GroceryAddRequest = {
      name: nameText,
      quantity: quantityText || '1',
      shopperId: shopperId,
    };
    setNameText('');
    setQuantityText('');
    socket.emit('addGroceryItem', request);
  };

  const deleteGrocery = (payload: Grocery) => {
    socket.emit('deleteGroceryItem', payload);
  };

  const toggleGrocery = (grocery: Grocery) => {
    const newGrocery: Grocery = { ...grocery, isChecked: !grocery.isChecked };
    socket.emit('updateGroceryItem', newGrocery);
  };

  const updateGroceryAisle = (grocery: Grocery, aisle: Aisle | undefined) => {
    socket.emit('updateGroceryAisle', { grocery, aisle });
  };

  const clearGroceries = () => {
    socket.emit('clearGroceryList');
  };

  const resetGroceries = () => {
    socket.emit('resetGroceryList');
  };

  return {
    groceries: grocerySet,
    nameText,
    quantityText,
    shopperText,
    setNameText,
    setQuantityText,
    addGrocery,
    toggleGrocery,
    clearGroceries,
    resetGroceries,
    deleteGrocery,
    updateGroceryAisle,
  };
}
