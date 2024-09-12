import { SignInAPI } from "@/pages/sign-in/api/sign-in.api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [SignInAPI.reducerPath]: SignInAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SignInAPI.middleware),
});

export type TypedRootState = ReturnType<typeof store.getState>;
