import { createSlice } from "@reduxjs/toolkit";

import type { IUser } from "@/interfaces/userInterface";

import type { PayloadAction } from "@reduxjs/toolkit";

interface userStorageInterface {
  user: IUser | null;
  isLogin: boolean;
  isAuthChecked: boolean;
}

const initialState: userStorageInterface = {
  user: null,
  isLogin: false,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, user: PayloadAction<IUser>) {
      state.user = user.payload;
    },
    setIsLogin(state, bool: PayloadAction<boolean>) {
      state.isLogin = bool.payload;
    },
    setAuthChecked(state, bool: PayloadAction<boolean>) {
      state.isAuthChecked = bool.payload;
    },
    clearSession(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export default userSlice.reducer;
