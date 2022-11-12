import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../components/FormView/form-types";
import { setLocalStorage } from "../../services/setLocalStorege";

const namespace = "form" as const;

export const initialState: TOrder = {
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
  name: namespace,
  initialState,
  reducers: {
    submitForm(state, action: PayloadAction<TOrder>) {
      setLocalStorage(namespace, action.payload);
      return action.payload;
    },
    clearForm() {
      localStorage.removeItem(namespace);
      return initialState;
    },
  },
});
