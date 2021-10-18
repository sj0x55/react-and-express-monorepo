import { configureStore } from '@reduxjs/toolkit';
import appSliceReducer from './slice';

export const store = configureStore({
  reducer: {
    app: appSliceReducer,
  },
});