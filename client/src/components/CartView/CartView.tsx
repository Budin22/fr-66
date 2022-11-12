import React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import { CartProductsList } from "./CartProductsList";

export const CartView = () => {
  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Hello from cart page
      </Typography>
      <Stack spacing={2}>
        <CartProductsList />
      </Stack>
    </>
  );
};
