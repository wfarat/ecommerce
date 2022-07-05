import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/users/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
