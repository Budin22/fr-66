import { InputsI } from "../../components/FormView/form-types";

const User: "User" = "User";

export const submitFormLS = (action: InputsI) => {
  localStorage.setItem(User, JSON.stringify(action));
};

export const clearFormLS = () => {
  localStorage.removeItem(User);
};
