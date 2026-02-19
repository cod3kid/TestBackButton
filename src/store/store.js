import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import your slice reducers here
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Optionally, you can whitelist specific reducers to persist
  // Note: customWorkouts are now stored in Firestore, not locally
  whitelist: ['theme']
};

const rootReducer = combineReducers({
  // Add your reducers here
  user: userReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
