import React, { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Backdrop from "@mui/material/Backdrop";

import { clearForm } from "../../redux/ducks/form-duck";
import { removeAllProducts } from "../../redux/ducks/cart-duck";
import { CartItem } from "./CartItem";
import { OrderInfo } from "./OrderInfo";

export const CartProductsList = memo(() => {
  const [open, setOpen] = useState(false);
  const cartProducts = useAppSelector((state) => state.cart); // отдельный селектор и хук
  const formValue = useAppSelector((state) => state.form); // отдельный селектор и хук

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPrice = useMemo(
    () => cartProducts.reduce((a, b) => a + parseInt(b.price) * b.number, 0), // отдельный селектор и хук
    [cartProducts]
  );

  const handleClose = () => {
    setOpen(false);
    console.log({ cart: cartProducts, userInfo: formValue });
    dispatch(removeAllProducts()); // отдельный хук
    dispatch(clearForm()); // отдельный хук
    localStorage.removeItem("cart"); // это должно быть в редьюсере после срабатывания экшена
    localStorage.removeItem("form"); // это должно быть в редьюсере после срабатывания экшена
    navigate("/products");
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {!!cartProducts.length ? (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{ textAlign: "center", width: "100%" }}
                component="h2"
                variant="h4"
              >
                Product list
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxHeight: 355, overflowY: "scroll" }}>
              {cartProducts.map((item, index) => (
                <CartItem key={item.id} index={index} product={item} />
              ))}
            </AccordionDetails>
          </Accordion>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{ maxWidth: "30%", width: "100%", fontWeight: "bold" }}
              component="div"
              variant="h4"
              color="steelblue"
            >
              Total price: {totalPrice} $
            </Typography>
            <>
              <Button
                onClick={handleToggle}
                variant="contained"
                disabled={!formValue.firstName}
              >
                Make order
              </Button>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
              >
                <OrderInfo />
              </Backdrop>
            </>
          </Box>
        </>
      ) : (
        <Typography
          sx={{ textAlign: "center" }}
          color="steelblue"
          component="h4"
          variant="h3"
        >
          You need to choose some products
        </Typography>
      )}
    </>
  );
});
