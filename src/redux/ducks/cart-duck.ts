import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateI {
  id: string;
  number: number;
  photo: string;
  title: string;
  price: string;
}

export interface ChangeActionI {
  index: number;
  number: number;
}

export interface RemoveActionI {
  index: number;
}

const cartNamespace = "cart" as const;

const initialState: InitialStateI[] = [];

export const {
  actions: {
    addProduct,
    removeProduct,
    changeNumberProduct,
    removeAllProducts,
    addProductsList,
  },
  reducer,
} = createSlice({
  name: cartNamespace,
  initialState,
  reducers: {
    addProductsList(state, action: PayloadAction<InitialStateI[]>) {
      return action.payload;
    },
    addProduct(state, action: PayloadAction<InitialStateI>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<RemoveActionI>) {
      state.splice(action.payload.index, 1);
    },
    changeNumberProduct(state, action: PayloadAction<ChangeActionI>) {
      state[action.payload.index].number = action.payload.number;
    },
    removeAllProducts(state) {
      state.length = 0;
    },
  },
});
