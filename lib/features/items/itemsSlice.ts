import {
  getItems,
  updateItem as clientUpdateItem,
  deleteItem as clientDeleteItem,
} from "@/utils/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ShopItem = {
  name: string;
  price: number;
  status: string;
  description: string;
  image: string;
};

export interface ShopItems {
  [key: number | string]: ShopItem;
}

interface UpdatePayload {
  key: number;
  item: ShopItem;
}

interface InitialState {
  value: ShopItems;
}

const initialState: InitialState = {
  value: {},
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShopItem>) => {
      state.value[Date.now()] = action.payload;
    },
    updateItem: (state, action: PayloadAction<UpdatePayload>) => {
      const { key, item } = action.payload;
      state.value[key] = item;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const key = action.payload;
      delete state.value[key];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      state.value = { ...payload };
    });
    builder.addCase(clientUpdateItem.fulfilled, (state, { payload }) => {
      state.value = { ...state.value, ...payload };
    });
    builder.addCase(clientDeleteItem.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.value = { ...payload };
    });
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;

export default itemsSlice.reducer;
