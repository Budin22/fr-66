import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouteObject, useRoutes } from "react-router-dom";
import { Container } from "@mui/material";
import { useAppDispatch } from "./redux/store";

import { Header } from "./components/Header";
import { ProductsPage } from "./pages/ProductsPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { FormPage } from "./pages/FormPage";
import { InputsI } from "./components/FormView/form-types";
import { submitForm } from "./redux/ducks/form-duck";
import { addProductsList, initialStateI } from "./redux/ducks/cart-duck";

const queryClient = new QueryClient();

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("User");
    const cart = localStorage.getItem("Cart");

    if (user) {
      const data: InputsI = JSON.parse(user);
      dispatch(submitForm(data));
    }

    if (cart) {
      const data: initialStateI[] = JSON.parse(cart);
      dispatch(addProductsList(data));
    }
  }, [dispatch]);

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
    {
      path: "/form",
      element: <FormPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
    },
  ];

  const root = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container sx={{ paddingTop: 8 }}>{root}</Container>
    </QueryClientProvider>
  );
}

export default App;
