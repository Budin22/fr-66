import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {InputsI} from "../FormView/form-types";

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

type namespaceT = "form";

export const cartNamespace: namespaceT = "form";

// const initialState: InputsI =  {
//   address: "",
//   address2: "",
//   checkbox: false,
//   city: "",
//   country: "",
//   delivery: "",
//   email: "",
//   firstName: "",
//   lastName: "",
//   phone: "",
//   textarea: "",
// };

// export const {
//   actions: { addProduct, removeProduct, changeNumberProduct },
//   reducer,
// } = createSlice({
//   name: cartNamespace,
//   initialState,
//   reducers: {
//     addProduct(state: initialStateI[], action: PayloadAction<initialStateI>) {
//       state.push(action.payload);
//     },
//     removeProduct(
//       state: initialStateI[],
//       action: PayloadAction<removeActionI>
//     ) {
//       state.splice(action.payload.index, 1);
//     },
//     changeNumberProduct(
//       state: initialStateI[],
//       action: PayloadAction<changeActionI>
//     ) {
//       state[action.payload.index].number = action.payload.number;
//     },
//   },
// });
