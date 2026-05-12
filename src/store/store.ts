import { combineReducers, configureStore } from "@reduxjs/toolkit";

import juriesReducer from "@/slices/juriesSlice";
import sectionsReducer from "@/slices/sectionsSlice";
import universitiesReducer from "@/slices/universitiesSlice";

import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  juriesReducer,
  sectionsReducer,
  universitiesReducer,
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
