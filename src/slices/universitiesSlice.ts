import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createUniversity,
  getUniversities,
} from "@/services/universityService";
import type { University, UniversityCreateData } from "@/types/universityTypes";

import type { PayloadAction } from "@reduxjs/toolkit";

type UniversitiesState = {
  items: University[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

const initialState: UniversitiesState = {
  items: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

const getUniversitiesErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Неизвестная ошибка.";

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;

  return "Не удалось выполнить действие с университетом.";
};

export const fetchUniversities = createAsyncThunk<
  University[],
  void,
  { rejectValue: string }
>("universities/fetchUniversities", async (_, { rejectWithValue }) => {
  try {
    return await getUniversities();
  } catch (error) {
    return rejectWithValue(getUniversitiesErrorMessage(error));
  }
});

export const createUniversityThunk = createAsyncThunk<
  University,
  UniversityCreateData,
  { rejectValue: string }
>("universities/createUniversity", async (data, { rejectWithValue }) => {
  try {
    return await createUniversity(data);
  } catch (error) {
    return rejectWithValue(getUniversitiesErrorMessage(error));
  }
});

export const universitiesSlice = createSlice({
  name: "universities",
  initialState,
  reducers: {
    setUniversitiesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearUniversitiesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          "Не удалось загрузить университеты. Проверьте, что backend запущен.";
      })
      .addCase(createUniversityThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createUniversityThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(createUniversityThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось создать университет.";
      });
  },
});

export const { clearUniversitiesError, setUniversitiesError } =
  universitiesSlice.actions;

export default universitiesSlice.reducer;
