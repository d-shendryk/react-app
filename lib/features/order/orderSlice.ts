import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteItem as clientDeleteItem, submitOrder } from "@/utils/client";
import _ from "lodash";

interface InitialState {
  value: Order;
}

export type Order = {
  [key: number]: number;
};

const initialState: InitialState = {
  value: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    addToOrder: (state, action: PayloadAction<number>) => {
      const key = action.payload;
      state.value[key] = state.value[key] + 1 || 1;
      localStorage.setItem("order", JSON.stringify(state.value));
    },
    deleteFromOrder: (state, action: PayloadAction<number>) => {
      const key = action.payload;
      delete state.value[key];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clientDeleteItem.fulfilled, (state, { payload }) => {
      let keys: string[] = [];
      if (payload) {
        keys = Object.keys(payload);
      }
      state.value = _.pick(state.value, ...keys) as Order;
    });
    builder.addCase(submitOrder.fulfilled, (state, { payload }) => {
      state.value = {};
    });
  },
});

export const { addToOrder, deleteFromOrder, setOrder } = orderSlice.actions;

export default orderSlice.reducer;
