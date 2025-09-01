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
    const onConnect = () => {
      console.log(`Connecting as shopper ${shopperId}`);
      socket.emit('registerGroceryList', shopperId);
    };

    socket.on('connect', onConnect);

    const getGroceryList = (payload: unknown) => {
      const grocerySet = GrocerySetSchema.parse(payload);
      setGrocerySet(grocerySet);
      setShopperText(grocerySet.shopper.name);
    };

    const groceryItemUpdated = (payload: unknown) => {
      const data = GrocerySchema.parse(payload);
      setGrocerySet((prev) => ({
        ...prev,
        items: prev.items.map((g) =>
          g.idx === data.idx ? { ...g, ...data } : g,
        ),
      }));
    };
    const groceryAisleUpdated = (payload: unknown) => {
      const data = z.array(AisleSchema).parse(payload);
      setGrocerySet((prev) => ({ ...prev, aisles: data }));
    };
    const groceryItemDeleted = (payload: unknown) => {
      const data = GrocerySchema.parse(payload);
      setGrocerySet((prev) => ({
        ...prev,
        items: prev.items.filter((g) => g.idx !== data.idx),
      }));
    };
    const addGroceryItem = (payload: unknown) => {
      const data = GrocerySchema.parse(payload);
      setGrocerySet((prev) => ({ ...prev, items: [...prev.items, data] }));
    };
    const clearGroceryList = () => {
      setGrocerySet((prev) => ({ ...prev, items: [] }));
    };
    const resetGroceryList = () => {
      setGrocerySet((prev) => ({
        ...prev,
        items: prev.items.map((g) => ({ ...g, isChecked: false })),
      }));
    };

    socket.on('getGroceryList', getGroceryList);
    socket.on('groceryItemUpdated', groceryItemUpdated);
    socket.on('groceryAisleUpdated', groceryAisleUpdated);
    socket.on('groceryItemDeleted', groceryItemDeleted);
    socket.on('addGroceryItem', addGroceryItem);
    socket.on('clearGroceryList', clearGroceryList);
    socket.on('resetGroceryList', resetGroceryList);

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('getGroceryList', getGroceryList);
      socket.off('groceryItemUpdated', groceryItemUpdated);
      socket.off('groceryAisleUpdated', groceryAisleUpdated);
      socket.off('groceryItemDeleted', groceryItemDeleted);
      socket.off('addGroceryItem', addGroceryItem);
      socket.off('clearGroceryList', clearGroceryList);
      socket.off('resetGroceryList', resetGroceryList);
    };
  }, []);

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
    socket.emit('clearGroceryList', shopperId);
  };

  const resetGroceries = () => {
    socket.emit('resetGroceryList', shopperId);
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
