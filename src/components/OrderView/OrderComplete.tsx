import React, { memo, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderComplete = memo(() => {
  const navigation = useNavigate();

  const toProductsPageHandler = useCallback(() => {
    navigation("/products");
  }, [navigation]);
  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Your order #1, we will call you soon!!! :)
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={toProductsPageHandler} variant="contained">
          Go to Products page
        </Button>
      </Box>
    </>
  );
});
