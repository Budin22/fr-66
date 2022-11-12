import React, { memo, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { UserInfo } from "./UserInfo";
import { OrderInfo } from "./OrderInfo";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatchAddUserOrder } from "../../hooks/user-hooks";
import { useDispatchClearForm } from "../../hooks/form-hooks";
import { useDispatchRemoveAllProducts } from "../../hooks/cart-hooks";
import { useSelectorAll } from "../../hooks/useSelectorAll";

export const OrderView = memo(() => {
  const { cart, form, user } = useSelectorAll();
  const dispatchAddUserOrder = useDispatchAddUserOrder();
  const dispatchRemoveAllProducts = useDispatchRemoveAllProducts();
  const dispatchClearForm = useDispatchClearForm();
  const navigation = useNavigate();

  const orderCompleteHandler = useCallback(() => {
    dispatchRemoveAllProducts();
    dispatchClearForm();
    if (user.activeUser.email) {
      dispatchAddUserOrder(cart);
    }
    console.log(form, cart, "create send to server");
    navigation("/order/done");
  }, [
    navigation,
    user.activeUser.email,
    form,
    cart,
    dispatchRemoveAllProducts,
    dispatchClearForm,
    dispatchAddUserOrder,
  ]);

  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Hello from cart page
      </Typography>
      <Stack spacing={2} marginBottom={2}>
        <UserInfo />
        <OrderInfo order={cart.order} date={cart.date} />
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={orderCompleteHandler}
          sx={{ marginRight: 2 }}
          variant="contained"
        >
          Complete order
        </Button>
        <Button
          variant="contained"
          LinkComponent={NavLink}
          {...{ to: "/form" }}
        >
          Change order
        </Button>
      </Box>
    </>
  );
});
