import React, { memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

import { useSelectorAll, useSelectorCartTotalPrice } from "../../hooks/hooks";

export const OrderInfo = memo(() => {
  const { cart } = useSelectorAll();
  const totalPrice = useSelectorCartTotalPrice();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <TableContainer
        sx={{ maxHeight: 400, overflowY: "auto" }}
        component={Paper}
      >
        <Typography
          sx={{ textAlign: "center", width: "100%" }}
          component="h2"
          variant="h4"
        >
          Your order #25 is complete! Good shopping:))
        </Typography>
        <Table
          sx={{ minWidth: 650, maxWidth: "60%", width: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                  {row.number * parseInt(row.price)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{totalPrice} $</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});
