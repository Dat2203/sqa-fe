// import { configureStore } from "@reduxjs/toolkit";
import postModalReducer from "./postModalSlice";

// export const store = configureStore({
//   reducer: {
//     postModal: postModalReducer,
//   },
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import UserReducer from "./useSlice";

const persistConfig = {
  key: "root",
  storage,
};
const appReducer = combineReducers({
  user: UserReducer,
  postModal: postModalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    //clear redux persist state
    Object.keys(state).forEach((key) => {
      storage.removeItem(`persist:${key}`);
    });
    //clear state
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
