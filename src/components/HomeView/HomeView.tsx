import React, { memo } from "react";
import Typography from "@mui/material/Typography";

export const HomeView = memo(() => {
  return (
    <>
      <Typography gutterBottom variant="h1" component="h1" textAlign="center">
        Hello from home page
      </Typography>
    </>
  );
});
