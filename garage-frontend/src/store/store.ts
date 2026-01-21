import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import garageSlice from './slices/garageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    garage: garageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;