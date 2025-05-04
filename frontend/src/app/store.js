import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import authReducer from "@/features/auth/authSlice";
import { countriesApi } from "@/api/countriesApi";
import { backendApi } from "@/api/backendApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
  [backendApi.reducerPath]: backendApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(countriesApi.middleware)
      .concat(backendApi.middleware),
});

export const persistor = persistStore(store);
