import React from "react";
import Typography from "@mui/material/Typography";
import { CartItem } from "./CartItem";
import { Stack } from "@mui/material";
import { UserInfo } from "./UserInfo";
import { cardGlobalStateI, initialStateI } from "../redux/cart-duck";
import { useSelector } from "react-redux";

export const CartView = () => {
  const cartProducts: initialStateI[] = useSelector(
    (state: cardGlobalStateI): initialStateI[] => state.cart
  );
  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Hello from cart page
      </Typography>

      <Stack spacing={2}>
        <UserInfo />
        {cartProducts.length
          ? cartProducts.map((item, index) => (
              <CartItem key={item.id} index={index} product={item} />
            ))
          : null}
      </Stack>
    </>
  );
};
