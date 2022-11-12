import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const OrderComplete = memo(() => {
  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Your order #1, we will call you soon!!! :)
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          LinkComponent={NavLink}
          {...{ to: "/products" }}
        >
          Go to Products page
        </Button>
      </Box>
    </>
  );
});
