import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createGroup,
  deleteGroup,
  getGroups,
  runGroupAction,
  updateGroup,
} from "@/services/groupService";
import type {
  Group,
  GroupCreateData,
  GroupUpdateData,
} from "@/types/groupTypes";

import type { PayloadAction } from "@reduxjs/toolkit";

type GroupsState = {
  items: Group[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
};

const initialState: GroupsState = {
  items: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

const getGroupsErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Неизвестная ошибка.";

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;

  return "Не удалось выполнить действие с группой.";
};

export const fetchGroups = createAsyncThunk<
  Group[],
  void,
  { rejectValue: string }
>("groups/fetchGroups", async (_, { rejectWithValue }) => {
  try {
    return await getGroups();
  } catch (error) {
    return rejectWithValue(getGroupsErrorMessage(error));
  }
});

export const createGroupThunk = createAsyncThunk<
  Group,
  GroupCreateData,
  { rejectValue: string }
>("groups/createGroup", async (data, { rejectWithValue }) => {
  try {
    return await createGroup(data);
  } catch (error) {
    return rejectWithValue(getGroupsErrorMessage(error));
  }
});

export const updateGroupThunk = createAsyncThunk<
  Group,
  { groupId: number; data: GroupUpdateData },
  { rejectValue: string }
>("groups/updateGroup", async ({ groupId, data }, { rejectWithValue }) => {
  try {
    return await updateGroup(groupId, data);
  } catch (error) {
    return rejectWithValue(getGroupsErrorMessage(error));
  }
});

export const deleteGroupThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("groups/deleteGroup", async (groupId, { rejectWithValue }) => {
  try {
    await deleteGroup(groupId);

    return groupId;
  } catch (error) {
    return rejectWithValue(getGroupsErrorMessage(error));
  }
});

export const runGroupActionThunk = createAsyncThunk<
  void,
  { groupId: number; action: "submit" | "approve" | "reject" },
  { rejectValue: string }
>("groups/runGroupAction", async ({ groupId, action }, { rejectWithValue }) => {
  try {
    await runGroupAction(groupId, action);
  } catch (error) {
    return rejectWithValue(getGroupsErrorMessage(error));
  }
});

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroupsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearGroupsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          "Не удалось загрузить группы. Проверьте, что backend запущен.";
      })
      .addCase(createGroupThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createGroupThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(createGroupThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось создать группу.";
      })
      .addCase(updateGroupThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateGroupThunk.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.map((group) =>
          group.id === action.payload.id ? action.payload : group,
        );
      })
      .addCase(updateGroupThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось сохранить группу.";
      })
      .addCase(deleteGroupThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteGroupThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (group) => group.id !== action.payload,
        );
      })
      .addCase(deleteGroupThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Не удалось удалить группу.";
      })
      .addCase(runGroupActionThunk.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(runGroupActionThunk.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(runGroupActionThunk.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload ?? "Не удалось изменить статус группы.";
      });
  },
});

export const { clearGroupsError, setGroupsError } = groupsSlice.actions;

export default groupsSlice.reducer;
