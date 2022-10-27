import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as Cart from "./ducks/cart-duck";
import * as Form from "./ducks/form-duck";
import { InputsI } from "../components/FormView/form-types";
import { InitialStateI } from "./ducks/cart-duck";

const cart: InitialStateI[] = JSON.parse(localStorage.getItem("cart") || "[]");
const form: InputsI = JSON.parse(localStorage.getItem("form") || "{}");

export const store = configureStore({
  reducer: {
    cart: Cart.reducer,
    form: Form.reducer,
  },
  preloadedState: {
    cart,
    form,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  localStorage.setItem("form", JSON.stringify(store.getState().form));
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
