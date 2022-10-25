import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateI {
  id: string;
  number: number;
  photo: string;
  title: string;
  price: string;
}

export interface changeActionI {
  index: number;
  number: number;
}

export interface removeActionI {
  index: number;
}

export interface cardGlobalStateI {
  cart: initialStateI[];
}

type namespaceT = "cart";

export const cartNamespace: namespaceT = "cart";

const initialState: initialStateI[] = [];

export const {
  actions: {
    addProduct,
    removeProduct,
    changeNumberProduct,
    removeAllProducts,
  },
  reducer,
} = createSlice({
  name: cartNamespace,
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<initialStateI>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<removeActionI>) {
      state.splice(action.payload.index, 1);
    },
    changeNumberProduct(state, action: PayloadAction<changeActionI>) {
      state[action.payload.index].number = action.payload.number;
    },
    removeAllProducts(state) {
      state.length = 0;
    },
  },
});
