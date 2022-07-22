import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseURL } from '../../config';
import axios from 'axios';
export const login = createAsyncThunk('login', async (data) => {
  const res = await axios(`${BaseURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    withCredentials: true,
    data: data,
  });
  return res.data;
});
export const loginGoogle = createAsyncThunk('loginGoogle', async () => {
  const res = await axios(`${BaseURL}/login/google`, {
    method: 'GET',
    withCredentials: true,
  }
  );
  return res.data;
})
export const logout = createAsyncThunk('logout', async () => {
  const res = await axios(`${BaseURL}/logout`);
  return res.data;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: { auth: false, userId: '', message: '' },
    status: 'idle',
  },
  reducers: {
    purgeMessage(state) {
      state.data.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data = payload.data;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'rejected';
        state.data.message = 'Invalid username and/or password.';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.message = payload.message;
      })
      .addCase(loginGoogle.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginGoogle.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data = payload.data;
      })
  },
});

export const selectLogin = (state) => state.login.data;
export const selectStatus = (state) => state.login.status;
export default loginSlice.reducer;
export const { purgeMessage } = loginSlice.actions;
