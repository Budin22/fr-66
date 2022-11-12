import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Container } from "@mui/material";

import { Header } from "./components/Header";
import { routes } from "./routes";
import { useDispatchAddAllProduct } from "./hooks/cart-hooks";
import { useDispatchAddAllUsers } from "./hooks/user-hooks";
import { useDispatchSubmitForm } from "./hooks/form-hooks";

function App() {
  const root = useRoutes(routes);
  const dispatchAddAllProduct = useDispatchAddAllProduct();
  const dispatchSubmitForm = useDispatchSubmitForm();
  const dispatchAddAllUsers = useDispatchAddAllUsers();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const form = localStorage.getItem("form");
    const user = localStorage.getItem("user");
    if (cart !== null) {
      dispatchAddAllProduct(JSON.parse(cart));
    }
    if (form !== null) {
      dispatchSubmitForm(JSON.parse(form));
    }
    if (user !== null) {
      dispatchAddAllUsers(JSON.parse(user));
    }
  }, [dispatchAddAllProduct, dispatchSubmitForm, dispatchAddAllUsers]);
  return (
    <>
      <Header />
      <Container sx={{ paddingTop: 8 }}>{root}</Container>
    </>
  );
}

export default App;
