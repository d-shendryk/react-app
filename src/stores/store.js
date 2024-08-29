import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/users/usersSlice';
import { itemsReducer } from './slices/items/itemsSlice';
import {
  ordersReducer,
  itemsListenerMiddleware,
} from './slices/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    order: ordersReducer,
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(itemsListenerMiddleware.middleware),
});
