import React, { memo, useMemo } from "react";
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

import { CartItem } from "./CartItem";
import { useSelectorAll } from "../../hooks/useSelectorAll";

export const CartProductsList = memo(() => {
  const { cart } = useSelectorAll();
  const navigate = useNavigate();
  const totalPrice = useMemo(
    () => cart.order?.reduce((a, b) => a + parseInt(b.price) * b.number, 0),
    [cart]
  );

  const orderHandler = () => {
    navigate("/form");
  };

  return (
    <>
      {!!cart.order?.length ? (
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
              {cart.order.map((item, index) => (
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
            <Button onClick={orderHandler} variant="contained">
              Make order
            </Button>
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
