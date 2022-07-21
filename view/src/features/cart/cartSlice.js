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
      body: JSON.stringify(data.qty)
    });
    const resJson = await res.json();
    return resJson;
  });
const cartSlice = createSlice({
  name: 'cart',
  initialState: { data: { items: []}, status: 'idle'},
  reducers: {},
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
      .addCase(addItemToCart.fulfilled, (state, {payload}) => {
        state.status = 'idle';
        if (payload.item) {
        state.data.items.push(payload.item);
        }
      })
  },
});

export const selectCart = (state) => state.cart.data;
export const selectStatus = (state) => state.cart.status;
export default cartSlice.reducer;