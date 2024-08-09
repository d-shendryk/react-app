import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/items/itemsSlice";
import orderReducer from "./features/order/orderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      items: itemsReducer,
      order: orderReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
