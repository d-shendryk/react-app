import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "./instance";

export const submitOrder = createAsyncThunk(
  "items/submitOrder",
  async (order) => {
    const response = await client.put("orders.json", order);
    return response.data;
  }
);
