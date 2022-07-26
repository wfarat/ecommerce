import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveOrder = createAsyncThunk('saveOrder', async (data) => {
  const res = await axios(`/api/cart/${data.userId}/checkout`, {
    method: 'POST',
    headers: { 'x-access-token': data.accessToken },
  });
  return res.data;
});
export const getOrders = createAsyncThunk('getOrders', async (data) => {
  const res = await axios(`/api/orders/${data.userId}`, {
    method: 'GET',
    headers: { 'x-access-token': data.accessToken },
  });
  return res.data;
});
export const getOrderItems = createAsyncThunk('getOrderItems', async (data) => {
  const res = await axios(`/api/orders/${data.userId}/${data.orderId}/items`, {
    method: 'GET',
    headers: { 'x-access-token': data.accessToken },
  });
  return res.data;
});
const ordersSlice = createSlice({
  name: 'orders',
  initialState: { data: { orders: [], orderItems: [] }, status: 'idle' },
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
      })
      .addCase(getOrderItems.pending, (state, { payload }) => {
        state.status = 'pending';
      })
      .addCase(getOrderItems.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.orderItems = payload.orderItems;
      });
  },
});

export const selectOrders = (state) => state.orders.data;
export const selectStatus = (state) => state.orders.status;
export default ordersSlice.reducer;
