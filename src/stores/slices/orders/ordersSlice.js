import _ from 'lodash';
import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { deleteItem as clientDeleteItem } from '@api/items';
import { submitOrder } from '@api/orders';

export const ordersSlice = createSlice({
  name: 'order',
  initialState: (state) => {
    const jsonOrder = localStorage.getItem('order') || '{}';
    const data = JSON.parse(jsonOrder);
    const order = data.value ? data.value : data;

    return {
      ...state,
      ...order,
    };
  },
  reducers: {
    addToOrder: (state, { payload: { itemKey, quantity } }) => {
      toast('Item added to order.');
      return {
        ...state,
        [itemKey]: state[itemKey] ? state[itemKey] + quantity : quantity,
      };
    },
    setOrder: (state, { payload }) => {
      return { ...payload };
    },
    deleteFromOrder: (state, { payload: key }) => {
      toast('Item removed from order.');
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
      toast('Order submitted successfully!');
      return {};
    });
  },
});

export const { loadOrder, addToOrder, deleteFromOrder, setOrder } =
  ordersSlice.actions;

export const itemsListenerMiddleware = createListenerMiddleware();
itemsListenerMiddleware.startListening({
  matcher: isAnyOf(addToOrder, deleteFromOrder, setOrder),
  effect: async (action, listenerApi) => {
    localStorage.setItem('order', JSON.stringify(listenerApi.getState().order));
  },
});

export const ordersReducer = ordersSlice.reducer;
