import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: (state) => {
    const jsonUser = localStorage.getItem("user") || "{}";
    return JSON.parse(jsonUser);
  },
  reducers: {
    setUser: (state, { payload }) => {
      const jsonData = JSON.stringify(payload);
      localStorage.setItem("user", jsonData);
      return jsonData ? payload : null;
    },
  },
});

export const { setUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
