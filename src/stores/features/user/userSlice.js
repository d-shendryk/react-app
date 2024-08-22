import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "order",
  initialState: null,
  reducers: {
    setUser: (state, { payload }) => {
      const jsonData = JSON.stringify(payload);
      localStorage.setItem("user", jsonData);
      return jsonData ? payload : null;
    },
    loadUser: (state) => {
      const jsonOrder = localStorage.getItem("user") || null;
      const user = jsonOrder ? JSON.parse(jsonOrder) : jsonOrder;
      return user;
    },
  },
});

export const { setUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
