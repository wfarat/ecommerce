import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('getUser', async (userId) => {
  const res = await axios(`/users/${userId}`, {
    method: 'GET',
    withCredentials: true,
  });
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: { id: '', firstname: '', lastname: '', email: '' },
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.user;
      });
  },
});

export const selectUser = (state) => state.user.data;
export const selectStatus = (state) => state.user.status;
export default userSlice.reducer;
