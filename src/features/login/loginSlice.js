import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    message: "",
    userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? {},
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log("action", action);
      state.isLoggedIn = true;
      state.userInfo = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("lastOnlineTime", new Date().getTime());
    },
    loginFail: (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload;
    },
    logout: (state) => {
      console.log("hello");
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginSuccess, loginFail, logout } = loginSlice.actions;

export const selectUserInfo = (state) => state.login.userInfo;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectMessage = (state) => state.login.message;

export default loginSlice.reducer;
