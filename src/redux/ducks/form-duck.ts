import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputsI } from "../../components/FormView/form-types";

const cartNamespace = "form" as const;

export const initialState: InputsI = {
  address: "",
  address2: "",
  checkbox: false,
  city: "",
  country: "",
  delivery: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  textarea: "",
};

export const {
  actions: { submitForm, clearForm },
  reducer,
} = createSlice({
  name: cartNamespace,
  initialState,
  reducers: {
    submitForm(state, action: PayloadAction<InputsI>) {
      return action.payload;
    },
    clearForm() {
      return initialState;
    },
  },
});
