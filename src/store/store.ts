import { combineReducers, configureStore } from "@reduxjs/toolkit";

import groupsReducer from "@/slices/groupsSlice";
import juriesReducer from "@/slices/juriesSlice";
import sectionsReducer from "@/slices/sectionsSlice";
import topicsReducer from "@/slices/topicsSlice";
import universitiesReducer from "@/slices/universitiesSlice";
import usersReducer from "@/slices/usersSlice";

import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  groupsReducer,
  juriesReducer,
  sectionsReducer,
  topicsReducer,
  universitiesReducer,
  userReducer,
  usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
