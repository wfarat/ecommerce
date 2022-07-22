import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseURL } from '../../config';

export const login = createAsyncThunk('login', async (data) => {
  const res = await fetch(`${BaseURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  const resJson = await res.json();
  return resJson;
});
export const logout = createAsyncThunk('logout', async () => {
  const res = await fetch(`${BaseURL}/logout`);
  const resJson = await res.json();
  return resJson;
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
      });
  },
});

export const selectLogin = (state) => state.login.data;
export const selectStatus = (state) => state.login.status;
export default loginSlice.reducer;
export const { purgeMessage } = loginSlice.actions;
