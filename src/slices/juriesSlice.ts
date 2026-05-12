import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createJury,
  deleteJury,
  getJuries,
  updateJury,
} from "@/services/juryService";
import type { Jury, JuryCreateData, JuryUpdateData } from "@/types/juryTypes";

import type { PayloadAction } from "@reduxjs/toolkit";

type JuriesState = {
  items: Jury[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

const initialState: JuriesState = {
  items: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

const getJuriesErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Неизвестная ошибка.";

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;

  return "Не удалось выполнить действие с жюри.";
};

export const fetchJuries = createAsyncThunk<
  Jury[],
  void,
  { rejectValue: string }
>("juries/fetchJuries", async (_, { rejectWithValue }) => {
  try {
    return await getJuries();
  } catch (error) {
    return rejectWithValue(getJuriesErrorMessage(error));
  }
});

export const createJuryThunk = createAsyncThunk<
  Jury,
  JuryCreateData,
  { rejectValue: string }
>("juries/createJury", async (data, { rejectWithValue }) => {
  try {
    return await createJury(data);
  } catch (error) {
    return rejectWithValue(getJuriesErrorMessage(error));
  }
});

export const updateJuryThunk = createAsyncThunk<
  Jury,
  { juryId: number; data: JuryUpdateData },
  { rejectValue: string }
>("juries/updateJury", async ({ juryId, data }, { rejectWithValue }) => {
  try {
    return await updateJury(juryId, data);
  } catch (error) {
    return rejectWithValue(getJuriesErrorMessage(error));
  }
});

export const deleteJuryThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("juries/deleteJury", async (juryId, { rejectWithValue }) => {
  try {
    await deleteJury(juryId);

    return juryId;
  } catch (error) {
    return rejectWithValue(getJuriesErrorMessage(error));
  }
});

export const juriesSlice = createSlice({
  name: "juries",
  initialState,
  reducers: {
    setJuriesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearJuriesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJuries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJuries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchJuries.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          "Не удалось загрузить жюри. Проверьте, что backend запущен.";
      })
      .addCase(createJuryThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createJuryThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(createJuryThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось создать жюри.";
      })
      .addCase(updateJuryThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateJuryThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.map((jury) =>
          jury.id === action.payload.id ? action.payload : jury,
        );
      })
      .addCase(updateJuryThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось сохранить жюри.";
      })
      .addCase(deleteJuryThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteJuryThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((jury) => jury.id !== action.payload);
      })
      .addCase(deleteJuryThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Не удалось удалить жюри.";
      });
  },
});

export const { clearJuriesError, setJuriesError } = juriesSlice.actions;

export default juriesSlice.reducer;
