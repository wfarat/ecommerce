import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseURL } from '../../config';
export const getCart = createAsyncThunk('getCart', async (userId) => {
  const res = await fetch(`${BaseURL}/cart/${userId}`);
  const resJson = await res.json();
  return resJson;
});
export const addItemToCart = createAsyncThunk('addItemToCart', async (data) => {
  const res = await fetch(`${BaseURL}/cart/${data.userId}/${data.itemId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data.qty),
  });
  const resJson = await res.json();
  return resJson;
});
export const updateItemOnCart = createAsyncThunk(
  'updateItemOnCart',
  async (data) => {
    const res = await fetch(`${BaseURL}/cart/${data.userId}/${data.itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data.qty),
    });
    const resJson = await res.json();
    return resJson;
  }
);
export const deleteItemOnCart = createAsyncThunk(
  'deleteItemOnCart',
  async (data) => {
    const res = await fetch(`${BaseURL}/cart/${data.userId}/${data.itemId}`, {
      method: 'DELETE',
    });
    const resJson = await res.json();
    return resJson;
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
