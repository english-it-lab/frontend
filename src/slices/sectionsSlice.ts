import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "@/services/sectionService";
import type {
  Section,
  SectionCreateData,
  SectionUpdateData,
} from "@/types/sectionTypes";

import type { PayloadAction } from "@reduxjs/toolkit";

type SectionsState = {
  items: Section[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

const initialState: SectionsState = {
  items: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

const getSectionsErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Неизвестная ошибка.";

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;

  return "Не удалось выполнить действие с секцией.";
};

export const fetchSections = createAsyncThunk<
  Section[],
  void,
  { rejectValue: string }
>("sections/fetchSections", async (_, { rejectWithValue }) => {
  try {
    return await getSections();
  } catch (error) {
    return rejectWithValue(getSectionsErrorMessage(error));
  }
});

export const createSectionThunk = createAsyncThunk<
  Section,
  SectionCreateData,
  { rejectValue: string }
>("sections/createSection", async (data, { rejectWithValue }) => {
  try {
    return await createSection(data);
  } catch (error) {
    return rejectWithValue(getSectionsErrorMessage(error));
  }
});

export const updateSectionThunk = createAsyncThunk<
  Section,
  { sectionId: number; data: SectionUpdateData },
  { rejectValue: string }
>(
  "sections/updateSection",
  async ({ sectionId, data }, { rejectWithValue }) => {
    try {
      return await updateSection(sectionId, data);
    } catch (error) {
      return rejectWithValue(getSectionsErrorMessage(error));
    }
  },
);

export const deleteSectionThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("sections/deleteSection", async (sectionId, { rejectWithValue }) => {
  try {
    await deleteSection(sectionId);

    return sectionId;
  } catch (error) {
    return rejectWithValue(getSectionsErrorMessage(error));
  }
});

export const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSectionsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearSectionsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          "Не удалось загрузить секции. Проверьте, что backend запущен.";
      })
      .addCase(createSectionThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createSectionThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(createSectionThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось создать секцию.";
      })
      .addCase(updateSectionThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateSectionThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.map((section) =>
          section.id === action.payload.id ? action.payload : section,
        );
      })
      .addCase(updateSectionThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось сохранить секцию.";
      })
      .addCase(deleteSectionThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteSectionThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (section) => section.id !== action.payload,
        );
      })
      .addCase(deleteSectionThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Не удалось удалить секцию.";
      });
  },
});

export const { clearSectionsError, setSectionsError } = sectionsSlice.actions;

export default sectionsSlice.reducer;
