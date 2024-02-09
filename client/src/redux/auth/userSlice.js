import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {login, logout, setUser} = userSlice.actions

export default userSlice.reducer

