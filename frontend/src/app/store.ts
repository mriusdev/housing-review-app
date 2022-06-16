import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import privateProfileReducer from '../features/profile/privateProfileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    privateProfile: privateProfileReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
