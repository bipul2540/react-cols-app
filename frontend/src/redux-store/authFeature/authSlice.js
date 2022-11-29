import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: {
    authData: {},
    email: {},
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authData: (state, action) => {
      state.authData = action.payload;
    },

    emailStore: (state, acction) => {
      state.authData.email = acction.payload;
    },
  },
});

export const { authData, emailStore } = authSlice.actions;

export default authSlice.reducer;
