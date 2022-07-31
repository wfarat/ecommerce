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

export const saveCart = createAsyncThunk('saveCart', async (data) => {
  const res = await axios(`api/cart/${data.data.userId}`, {
    method: 'POST',
    headers: { 'x-access-token': data.data.accessToken },
    data: data.items,
  });
  return res.data;
});
const cartSlice = createSlice({
  name: 'cart',
  initialState: { data: { cart: [] }, status: 'idle' },
  reducers: {
    emptyCart(state) {
      state.data.cart = [];
    },
    addToCart(state, { payload }) {
      state.data.cart.push(payload);
    },
    deleteOnCart(state, { payload }) {
      const index = state.data.cart.findIndex(
        (item) => item.item_id === payload.itemId
      );
      state.data.cart.splice(index, 1);
    },
    updateOnCart(state, { payload }) {
      const index = state.data.cart.findIndex(
        (item) => item.item_id === payload.item.id
      );
      state.data.cart.splice(index, 1);
      state.data.cart.splice(index, 0, payload.item);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.cart = payload.cart;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        if (payload.item) {
          state.data.cart.push(payload.item);
        }
      })
      .addCase(updateItemOnCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateItemOnCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        const index = state.data.cart.findIndex(
          (item) => item.item_id === payload.item.item_id
        );
        state.data.cart.splice(index, 1);
        state.data.cart.splice(index, 0, payload.item);
      })
      .addCase(deleteItemOnCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteItemOnCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        const index = state.data.cart.findIndex(
          (item) => item.item_id === payload.item.id
        );
        state.data.cart.splice(index, 1);
      })
      .addCase(saveCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(saveCart.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data.cart = payload.cart;
      });
  },
});

export const selectCart = (state) => state.cart.data;
export const selectStatus = (state) => state.cart.status;
export default cartSlice.reducer;
export const { emptyCart, deleteOnCart, updateOnCart, addToCart } =
  cartSlice.actions;
