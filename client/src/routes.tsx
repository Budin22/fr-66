import { RouteObject } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { FormPage } from "./pages/FormPage";
import { AboutPage } from "./pages/AboutPage";
import { CartPage } from "./pages/CartPage";
import { ProductPage } from "./pages/ProductPage";
import { OrderPage } from "./pages/OrderPage";
import { OrderComplete } from "./components/OrderView/OrderComplete";
import { ProfilePage } from "./pages/ProfilePage";

export const routes: RouteObject[] = [
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
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/order",
    children: [
      {
        path: "done",
        element: <OrderComplete />,
      },
    ],
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
