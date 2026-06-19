import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Product {
  id: number;
  title: string;
  price: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartProducts: CartItem[];
}

const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartProducts.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== action.payload.id,
        );
      }
    },

    deleteFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id,
      );
    },
  },
});

export const { addToCart, decreaseQuantity, deleteFromCart } =
  cartSlice.actions;

export const selectCartTotal = (state: RootState) =>
  state.cart.cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
