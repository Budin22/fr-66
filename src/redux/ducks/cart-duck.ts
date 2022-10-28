import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  id: string;
  number: number;
  photo: string;
  title: string;
  price: string;
};

export type TInitialS = Array<TInitialState>;

export type TChangeNumberAction = {
  index: number;
  number: number;
};

export type TRemoveProductAction = {
  index: number;
};

const namespace = "cart" as const;

const initialState: TInitialS = [];

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
  name: namespace,
  initialState,
  reducers: {
    addProductsList(state, action: PayloadAction<TInitialS>) {
      return action.payload;
    },
    addProduct(state, action: PayloadAction<TInitialState>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<TRemoveProductAction>) {
      state.splice(action.payload.index, 1);
    },
    changeNumberProduct(state, action: PayloadAction<TChangeNumberAction>) {
      state[action.payload.index].number = action.payload.number;
    },
    removeAllProducts(state) {
      localStorage.removeItem("cart");
      state.length = 0;
    },
  },
});
