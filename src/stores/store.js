import { configureStore } from '@reduxjs/toolkit';
import {
  ordersReducer,
  itemsListenerMiddleware,
  itemsReducer,
  usersReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    order: ordersReducer,
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(itemsListenerMiddleware.middleware),
});
