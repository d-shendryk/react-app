import { ShopItems } from "@/lib/features/items/itemsSlice";
import { Order } from "@/lib/features/order/orderSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : "http://127.0.0.1/";

const authToken = process.env.REACT_APP_AUTH_TOKEN;

const client = axios.create({
  baseURL: baseUrl,
  params: { auth: authToken },
});

export const getItems = createAsyncThunk<ShopItems>(
  "items/getItems",
  async () => {
    const response = await client.get("items.json");
    return response.data;
  }
);

export async function saveItems(items: ShopItems) {
  const response = await client.put("items.json", items);
  return response.data;
}

export const updateItem = createAsyncThunk<ShopItems, ShopItems>(
  "items/updateItems",
  async (item) => {
    const response = await client.patch("items.json", item);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk<ShopItems, ShopItems>(
  "items/deleteItems",
  async (items) => {
    const response = await client.put("items.json", items);
    return response.data;
  }
);

export const submitOrder = createAsyncThunk<Order, Order>(
  "items/submitOrder",
  async (order) => {
    const response = await client.put("orders.json", order);
    return response.data;
  }
);
