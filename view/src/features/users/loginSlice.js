import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('login/loginUser', async (data) => {
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  });
  const resJson = await res.json();
  return resJson;
});
const loginSlice = createSlice({
  name: 'login',
  initialState: { data: { auth: false, userId: '0' }, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.data.auth = action.payload.data.auth;
        state.data.userId = action.payload.data.userId;
      });
  },
});

export const selectLogin = (state) => state.login.data;
export const selectStatus = (state) => state.login.status;
export default loginSlice.reducer;
