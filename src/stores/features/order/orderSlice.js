import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { deleteItem as clientDeleteItem } from "../../../api/items";
import { submitOrder } from "../../../api/order";
import _ from "lodash";

export const orderSlice = createSlice({
  name: "order",
  initialState: (state) => {
    const jsonOrder = localStorage.getItem("order") || "{}";
    const data = JSON.parse(jsonOrder);
    const order = data.value ? data.value : data;

    return {
      ...state,
      ...order,
    };
  },
  reducers: {
    addToOrder: (state, { payload: { itemKey, quantity } }) => {
      return {
        ...state,
        [itemKey]: state[itemKey] ? state[itemKey] + quantity : quantity,
      };
    },
    setOrder: (state, { payload }) => {
      return { ...payload };
    },
    deleteFromOrder: (state, { payload: key }) => {
      const { [key]: _, ...newState } = state;
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clientDeleteItem.fulfilled, (state, { payload }) => {
      const keys = payload ? Object.keys(payload) : [];
      return _.pick(state, ...keys);
    });
    builder.addCase(submitOrder.fulfilled, () => {
      return {};
    });
  },
});

export const { loadOrder, addToOrder, deleteFromOrder, setOrder } =
  orderSlice.actions;

export const itemsListenerMiddleware = createListenerMiddleware();
itemsListenerMiddleware.startListening({
  matcher: isAnyOf(addToOrder, deleteFromOrder, setOrder),
  effect: async (action, listenerApi) => {
    localStorage.setItem("order", JSON.stringify(listenerApi.getState().order));
  },
});

export default orderSlice.reducer;
