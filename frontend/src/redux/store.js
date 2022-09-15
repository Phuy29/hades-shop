import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { getTotal } from "./cartSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
});

store.dispatch(getTotal());

export default store;
