import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/items/itemsSlice";
import userReducer from "./features/user/userSlice";
import orderReducer, {
  itemsListenerMiddleware,
} from "./features/order/orderSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(itemsListenerMiddleware.middleware),
});
