import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "@/services/topicService";
import type {
  Topic,
  TopicCreateData,
  TopicUpdateData,
} from "@/types/topicTypes";

import type { PayloadAction } from "@reduxjs/toolkit";

type TopicsState = {
  items: Topic[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

const initialState: TopicsState = {
  items: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

const getTopicsErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Неизвестная ошибка.";

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;

  return "Не удалось выполнить действие с топиком.";
};

export const fetchTopics = createAsyncThunk<
  Topic[],
  number | null | undefined,
  { rejectValue: string }
>("topics/fetchTopics", async (sectionId, { rejectWithValue }) => {
  try {
    return await getTopics(sectionId);
  } catch (error) {
    return rejectWithValue(getTopicsErrorMessage(error));
  }
});

export const createTopicThunk = createAsyncThunk<
  Topic,
  TopicCreateData,
  { rejectValue: string }
>("topics/createTopic", async (data, { rejectWithValue }) => {
  try {
    return await createTopic(data);
  } catch (error) {
    return rejectWithValue(getTopicsErrorMessage(error));
  }
});

export const updateTopicThunk = createAsyncThunk<
  Topic,
  { topicId: number; data: TopicUpdateData },
  { rejectValue: string }
>("topics/updateTopic", async ({ topicId, data }, { rejectWithValue }) => {
  try {
    return await updateTopic(topicId, data);
  } catch (error) {
    return rejectWithValue(getTopicsErrorMessage(error));
  }
});

export const deleteTopicThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("topics/deleteTopic", async (topicId, { rejectWithValue }) => {
  try {
    await deleteTopic(topicId);

    return topicId;
  } catch (error) {
    return rejectWithValue(getTopicsErrorMessage(error));
  }
});

export const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopicsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearTopicsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          "Не удалось загрузить топики. Проверьте, что backend запущен.";
      })
      .addCase(createTopicThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createTopicThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(createTopicThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось создать топик.";
      })
      .addCase(updateTopicThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateTopicThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.map((topic) =>
          topic.id === action.payload.id ? action.payload : topic,
        );
      })
      .addCase(updateTopicThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось сохранить топик.";
      })
      .addCase(deleteTopicThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTopicThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (topic) => topic.id !== action.payload,
        );
      })
      .addCase(deleteTopicThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Не удалось удалить топик.";
      });
  },
});

export const { clearTopicsError, setTopicsError } = topicsSlice.actions;

export default topicsSlice.reducer;
