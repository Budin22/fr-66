import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputsI } from "../../components/FormView/form-types";

// just "namespace"
const cartNamespace = "form" as const;

// я бы сделал отдельный тип Order
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
