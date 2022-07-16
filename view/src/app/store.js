import loginSlice from '../features/users/loginSlice';
import userSlice from '../features/users/userSlice';
import itemsSlice from '../features/items/itemsSlice';
import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "redux"; 
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSlice from '../features/cart/cartSlice';
import ordersSlice from '../features/orders/ordersSlice';

const appReducer = combineReducers({
  login: loginSlice,
  user: userSlice,
  items: itemsSlice,
  cart: cartSlice,
  orders: ordersSlice
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root')
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
