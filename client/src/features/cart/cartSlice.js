import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
export const getCart = createAsyncThunk('getCart', async (data) => {
  const res = await axios(`/api/cart/${data.userId}`, {
    method: 'GET',
    headers: { 'x-access-token': data.accessToken },
  });
  return res.data;
});
export const addItemToCart = createAsyncThunk('addItemToCart', async (data) => {
  const res = await axios(`/api/cart/${data.userId}/${data.itemId}`, {
    method: 'POST',
    headers: { 'x-access-token': data.accessToken },
    data: data.qty,
  });
  return res.data;
});
export const updateItemOnCart = createAsyncThunk(
  'updateItemOnCart',
  async (data) => {
    const res = await axios(`/api/cart/${data.userId}/${data.itemId}`, {
      method: 'PUT',
      data: data.qty,
      headers: { 'x-access-token': data.accessToken },
    });
    return res.data;
  }
);
export const deleteItemOnCart = createAsyncThunk(
  'deleteItemOnCart',
  async (data) => {
    const res = await axios(`/api/cart/${data.userId}/${data.itemId}`, {
      method: 'DELETE',
      headers: { 'x-access-token': data.accessToken },
    });
    return res.data;
  }
);
const cartSlice = createSlice({
  name: 'cart',
  initialState: { data: { items: [] }, status: 'idle' },
  reducers: {
    emptyCart(state) {
      state.data.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.items = payload.items;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        if (payload.item) {
          state.data.items.push(payload.item);
        }
      })
      .addCase(updateItemOnCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateItemOnCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        const index = state.data.items.findIndex(
          (item) => item.item_id === payload.item.item_id
        );
        state.data.items.splice(index, 1);
        state.data.items.splice(index, 0, payload.item);
      })
      .addCase(deleteItemOnCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteItemOnCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        const index = state.data.items.findIndex(
          (item) => item.item_id === payload.item.id
        );
        state.data.items.splice(index, 1);
      });
  },
});

export const selectCart = (state) => state.cart.data;
export const selectStatus = (state) => state.cart.status;
export default cartSlice.reducer;
export const { emptyCart } = cartSlice.actions;
