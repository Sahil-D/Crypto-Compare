import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoAnalysisApi } from '../services/cryptoAnalysisApi';
import { userSlice } from '../services/user';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  cryptoApi: cryptoApi.reducer,
  cryptoAnalysisApi: cryptoAnalysisApi.reducer,
  user: userSlice.reducer,
});

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

export const persistor = persistStore(store);
