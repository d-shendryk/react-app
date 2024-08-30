import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from './instance';

export const getItems = createAsyncThunk('items/getItems', async () => {
  const response = await client.get('items.json');
  return response.data;
});

export const addItem = createAsyncThunk('items/addItems', async (item) => {
  const response = await client.patch('items.json', { [Date.now()]: item });
  return response.data;
});

export const updateItem = createAsyncThunk(
  'items/updateItems',
  async (item) => {
    const response = await client.patch('items.json', item);
    return response.data;
  },
);

export const deleteItem = createAsyncThunk(
  'items/deleteItems',
  async (items) => {
    const response = await client.put('items.json', items);
    return response.data;
  },
);
