import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('getUser', async (userId) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const resJson = res.json();
    return resJson;
})

const userSlice = createSlice({
    name: 'user',
    initialState: { data: { id: '', fullname: 'No user', email: '' }, status: 'idle' },
    reducers: {
        purgeUser(state) {
            state.data = { id: '', fullname: 'No user', email: '' };
        }
    },
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
export const {purgeUser} = userSlice.actions;