import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseURL } from '../../config';
export const saveOrder = createAsyncThunk('saveOrder', async (userId) => {
  const res = await fetch(`${BaseURL}/cart/${userId}/checkout`, {
    method: 'POST',
  });
  const resJson = await res.json();
  return resJson;
});
export const getOrders = createAsyncThunk('getOrders', async (userId) => {
  const res = await fetch(`${BaseURL}/orders/${userId}`);
  const resJson = await res.json();
  return resJson;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { data: { orders: [] }, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveOrder.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(saveOrder.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.orders.push(payload.order);
      })
      .addCase(getOrders.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.orders = payload.orders;
      });
  },
});

export const selectOrders = (state) => state.orders.data;
export const selectStatus = (state) => state.orders.status;
export default ordersSlice.reducer;
