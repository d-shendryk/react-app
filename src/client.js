const axios = require("axios");

const baseUrl = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : "http://127.0.0.1/";

const authToken = process.env.REACT_APP_AUTH_TOKEN;

export async function getItems() {
  const response = await axios.get(baseUrl + "items.json", {
    params: { auth: authToken },
  });

  if (response.data) {
    return response.data.filter((a) => a);
  }

  return [];
}

export async function saveItems(items) {
  const response = await axios.put(baseUrl + "items.json", items, {
    params: { auth: authToken },
  });
  return response.data;
}

export async function updateItem(item) {
  const response = await axios.patch(baseUrl + "items.json", item, {
    params: { auth: authToken },
  });
  return response.data;
}

export async function submitOrder(order) {
  const response = await axios.put(baseUrl + "orders.json", order, {
    params: { auth: authToken },
  });
  return response.data;
}
