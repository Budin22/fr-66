import React, { memo, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { UserInfo } from "./UserInfo";
import { OrderInfo } from "./OrderInfo";
import { useNavigate } from "react-router-dom";
import {
  useDispatchClearForm,
  useDispatchRemoveAllProducts,
  useSelectorAll,
} from "../../hooks/hooks";

export const OrderView = memo(() => {
  const { cart, form } = useSelectorAll();
  const dispatchRemoveAllProducts = useDispatchRemoveAllProducts();
  const dispatchClearForm = useDispatchClearForm();
  const navigation = useNavigate();

  const orderCompleteHandler = useCallback(() => {
    dispatchRemoveAllProducts();
    dispatchClearForm();
    console.log({ id: 1, form, cart });
    navigation("/order/done");
  }, [navigation, form, cart, dispatchRemoveAllProducts, dispatchClearForm]);

  const backHandler = useCallback(() => navigation("/form"), [navigation]);
  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Hello from cart page
      </Typography>
      <Stack spacing={2} marginBottom={2}>
        <UserInfo />
        <OrderInfo />
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={orderCompleteHandler}
          sx={{ marginRight: 2 }}
          variant="contained"
        >
          Complete order
        </Button>
        <Button onClick={backHandler} variant="contained">
          Change order
        </Button>
      </Box>
    </>
  );
});
