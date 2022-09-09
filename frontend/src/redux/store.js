import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { getTotalPrice } from "./cartSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
});

store.dispatch(getTotalPrice());

export default store;
