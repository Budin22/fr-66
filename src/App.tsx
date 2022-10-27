import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouteObject, useRoutes } from "react-router-dom";
import { Container } from "@mui/material";

import { Header } from "./components/Header";
import { ProductsPage } from "./pages/ProductsPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { FormPage } from "./pages/FormPage";

const queryClient = new QueryClient();

function App() {
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
