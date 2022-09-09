import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const cartIndex = state.cartItems.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (cartIndex >= 0) {
        state.cartItems[cartIndex] = {
          ...state.cartItems[cartIndex],
          ...action.payload,
          cartQuantity: (state.cartItems[cartIndex].cartQuantity += 1),
        };
      } else {
        const tempCartItems = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempCartItems);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      // const nextCartItems = state.cartItems.filter(
      //   (item) =>
      //     item.color === action.payload.color &&
      //     item.size === action.payload.size
      // );

      // state.cartItems = nextCartItems;

      const cartIndex = state.cartItems.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (cartIndex >= 0) {
        state.cartItems.splice(cartIndex, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        // const nextCartItems = state.cartItems.filter(
        //   (item) => item.name !== action.payload.name
        // );
        // state.cartItems = nextCartItems;

        if (itemIndex > 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      state.cartItems[itemIndex].cartQuantity += 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotalPrice: (state, action) => {
      const total = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity, price } = cartItem;
          const totalCartPrice = cartQuantity * price;

          cartTotal.price += totalCartPrice;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          price: 0,
          quantity: 0,
        }
      );

      state.totalPrice = total.price;
      state.totalQuantity = total.quantity;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  decreaseQuantity,
  increaseQuantity,
  getTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
