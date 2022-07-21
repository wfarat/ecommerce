import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseURL } from '../../config';
export const getUser = createAsyncThunk('getUser', async (userId) => {
    const res = await fetch(`${BaseURL}/users/${userId}`);
    const resJson = res.json();
    return resJson;
})

const userSlice = createSlice({
    name: 'user',
    initialState: { data: { id: '', firstname: '', lastname: '', email: '' }, status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.status = 'idle';
          state.data = action.payload.user;
        })
    },
  });

export const selectUser = (state) => state.user.data;
export const selectStatus = (state) => state.user.status;
export default userSlice.reducer;