import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getItems = createAsyncThunk('getItems', async () => {
  const res = await axios(`/api/items`);
  return res.data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: { data: {}, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getItems.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.items = payload.items;
      });
  },
});

export const selectItems = (state) => state.items.data;
export const selectStatus = (state) => state.items.status;
export default itemsSlice.reducer;
