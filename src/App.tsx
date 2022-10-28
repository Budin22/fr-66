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

// это я бы вынес в src/services/queryClient.ts
const queryClient = new QueryClient();

function App() {
  // я бы обернул это в useMemo или вынес из тела функции в отдельный файл src/routes.ts
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
      // юзер должен попадать сюда только после нажатия на кнопку "оформить заказ" на странице корзины
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
    // тут не хватает отдельной страницы с итогами заказа, куда юзер должен попадать при нажатии на кнопку сабмита на стнанице оформления заказа
  ];

  const root = useRoutes(routes);

  return (
    // обертку в QueryClientProvider я бы вынес в src/index.ts
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container sx={{ paddingTop: 8 }}>{root}</Container>
    </QueryClientProvider>
  );
}

export default App;
