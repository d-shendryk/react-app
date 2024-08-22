import {
  getItems,
  updateItem as clientUpdateItem,
  deleteItem as clientDeleteItem,
  addItem as clientAddItem,
} from "../../../api/items";
import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {},
  reducers: {
    updateItem: (state, { payload: { key, item } }) => {
      state[key] = item;
    },
    deleteItem: (state, { payload: { key } }) => {
      delete state[key];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      return { ...payload };
    });
    builder.addCase(clientAddItem.fulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });
    builder.addCase(clientUpdateItem.fulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });
    builder.addCase(clientDeleteItem.fulfilled, (state, { payload }) => {
      return { ...payload };
    });
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;

export default itemsSlice.reducer;
