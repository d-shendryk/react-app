import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  getItems,
  updateItem as clientUpdateItem,
  deleteItem as clientDeleteItem,
  addItem as clientAddItem,
} from '@api/items';
import { checkFileRequired, checkFileSize } from '@utils/utils';

export const itemSchema = yup
  .object({
    name: yup.string().min(3).max(40).required().trim(),
    price: yup.number().positive().integer().required(),
    image: yup
      .mixed()
      .required()
      .test('required', 'File is required.', checkFileRequired)
      .test('fileSize', 'File is too large.', checkFileSize),
    status: yup.string().oneOf(['available', 'unavailable']),
    description: yup.string().max(400),
  })
  .required();

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {},
  reducers: {
    updateItem: (state, { payload: { key, item } }) => {
      toast('Item updated successfully.');
      return { [key]: item, ...state };
    },
    deleteItem: (state, { payload: { key } }) => {
      toast('Item deleted successfully.');
      const { [key]: _, ...newState } = state;
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (_, { payload }) => {
      return { ...payload };
    });
    builder.addCase(clientAddItem.fulfilled, (state, { payload }) => {
      toast('Item added successfully.');
      return { ...state, ...payload };
    });
    builder.addCase(clientUpdateItem.fulfilled, (state, { payload }) => {
      toast('Item updated successfully.');
      return { ...state, ...payload };
    });
    builder.addCase(clientDeleteItem.fulfilled, (_, { payload }) => {
      toast('Item deleted successfully.');
      return { ...payload };
    });
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;

export const itemsReducer = itemsSlice.reducer;
