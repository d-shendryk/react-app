import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'user',
  initialState: () => {
    const jsonUser = localStorage.getItem('user') || '{}';
    return JSON.parse(jsonUser);
  },
  reducers: {
    setUser: (_, { payload }) => {
      const jsonData = JSON.stringify(payload);
      localStorage.setItem('user', jsonData);
      return jsonData ? payload : null;
    },
  },
});

export const { setUser, loadUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
