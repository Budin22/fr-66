import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as Cart from "./ducks/cart-duck";
import * as Form from "./ducks/form-duck";
import * as User from "./ducks/user-duck";

export const store = configureStore({
  reducer: {
    cart: Cart.reducer,
    form: Form.reducer,
    user: User.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
