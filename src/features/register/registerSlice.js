import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {
    registerSuccess: (state, action) => {},
    registerFail: (state, action) => {},
  },
});

export const { registerSuccess, registerFail } = registerSlice.actions;

export default registerSlice.reducer;
