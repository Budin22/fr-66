import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../services/setLocalStorege";
import {
  TChangeNumberAction,
  TInitialS,
  TInitialState,
  TRemoveProductAction,
} from "./cart-types";

const namespace = "cart" as const;

const initialState: TInitialS = {
  date: "",
  order: [],
};

export const {
  actions: {
    addProduct,
    removeProduct,
    changeNumberProduct,
    removeAllProducts,
    addAllProduct,
  },
  reducer,
} = createSlice({
  name: namespace,
  initialState,
  reducers: {
    addAllProduct(state, action: PayloadAction<TInitialS>) {
      return action.payload;
    },
    addProduct(state, action: PayloadAction<TInitialState>) {
      state.order.push(action.payload);
      state.date = new Date().toLocaleString();
      setLocalStorage(namespace, state);
    },
    removeProduct(state, action: PayloadAction<TRemoveProductAction>) {
      state.date = new Date().toLocaleString();
      state.order.splice(action.payload.index, 1);
      setLocalStorage(namespace, state);
    },
    changeNumberProduct(state, action: PayloadAction<TChangeNumberAction>) {
      state.order[action.payload.index].number = action.payload.number;
      state.date = new Date().toLocaleString();
      setLocalStorage(namespace, state);
    },
    removeAllProducts(state) {
      localStorage.removeItem(namespace);
      state.order.length = 0;
      setLocalStorage(namespace, state);
    },
  },
});
