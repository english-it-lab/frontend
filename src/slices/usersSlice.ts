import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import type {
  IUser,
  UserCreateData,
  UserUpdateData,
} from "@/interfaces/userInterface";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/services/userService";

import type { PayloadAction } from "@reduxjs/toolkit";

type UsersState = {
  items: IUser[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

const getUsersErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Неизвестная ошибка.";

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;

  return "Не удалось выполнить действие с пользователем.";
};

export const fetchUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await getUsers();
  } catch (error) {
    return rejectWithValue(getUsersErrorMessage(error));
  }
});

export const createUserThunk = createAsyncThunk<
  IUser,
  UserCreateData,
  { rejectValue: string }
>("users/createUser", async (data, { rejectWithValue }) => {
  try {
    return await createUser(data);
  } catch (error) {
    return rejectWithValue(getUsersErrorMessage(error));
  }
});

export const updateUserThunk = createAsyncThunk<
  IUser,
  { userId: string; data: UserUpdateData },
  { rejectValue: string }
>("users/updateUser", async ({ userId, data }, { rejectWithValue }) => {
  try {
    return await updateUser(userId, data);
  } catch (error) {
    return rejectWithValue(getUsersErrorMessage(error));
  }
});

export const deleteUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await deleteUser(userId);

    return userId;
  } catch (error) {
    return rejectWithValue(getUsersErrorMessage(error));
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearUsersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          "Не удалось загрузить пользователей. Проверьте, что backend запущен.";
      })
      .addCase(createUserThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось создать пользователя.";
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось сохранить пользователя.";
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Не удалось удалить пользователя.";
      });
  },
});

export const { clearUsersError, setUsersError } = usersSlice.actions;

export default usersSlice.reducer;
