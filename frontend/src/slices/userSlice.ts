import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/userInterface";

interface userStorageInterface {
    user: IUser | null;
    isLogin: boolean;
}

const initialState: userStorageInterface = {
    user: null,
    isLogin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, user: PayloadAction<IUser>) {
            state.user = user.payload;
        },
        setIsLogin(state, bool: PayloadAction<boolean>) {
            state.isLogin = bool.payload;
        },
    }
})

export default userSlice.reducer;
