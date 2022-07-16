import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk('login', async (data) => {
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  });
  const resJson = await res.json();
  return resJson;
});
export const logout = createAsyncThunk('logout', async () => {
  const res = await fetch('http://localhost:3000/logout');
  const resJson = await res.json();
  return resJson;
})

const loginSlice = createSlice({
  name: 'login',
  initialState: { data: { auth: false, userId: '' }, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data = payload.data;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.status = 'idle';
      })
  },
});

export const selectLogin = (state) => state.login.data;
export const selectStatus = (state) => state.login.status;
export default loginSlice.reducer;
