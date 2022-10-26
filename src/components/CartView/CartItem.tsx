import React, { memo, useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { Button, ButtonGroup, TextField } from "@mui/material";

import {
  changeNumberProduct,
  initialStateI,
  removeProduct,
} from "../../redux/cart-duck";
import { useAppDispatch } from "../../redux/store";
import {
  changeNumberProductLS,
  removeProductLS,
} from "../../LocalStorage/Cart-LS";

interface CartItemProps {
  product: initialStateI;
  index: number;
}

export const CartItem = memo((props: CartItemProps) => {
  const { id, number, price, title, photo } = props.product;
  const index: number = props.index;

  const [count, setCount] = useState<number>(Number(number));
  const [totalPrice, setTotalPrice] = useState<number>(Number(price));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeNumberProduct({ index, number: count }));
    changeNumberProductLS({ index, number: count });
  }, [count, index, dispatch]);

  const priceHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!Number.isNaN(parseInt(e.currentTarget.value))) {
        setTotalPrice(Number(price) * parseInt(e.currentTarget.value));
        setCount(parseInt(e.currentTarget.value));
      }
    },
    [price]
  );

  const incHandler = useCallback(() => {
    setTotalPrice(Number(price) * (count + 1));
    setCount((state) => state + 1);
  }, [price, count]);

  const decHandler = useCallback(() => {
    if (count > 1) {
      setTotalPrice(Number(price) * (count - 1));
      setCount((state) => state - 1);
    }
  }, [price, count]);

  const removeHandler = useCallback(() => {
    dispatch(removeProduct({ index }));
    removeProductLS({ index });
  }, [dispatch, index]);

  return (
    <Card
      sx={{ display: "flex", padding: 1, minHeight: 110, position: "relative" }}
    >
      <Button
        onClick={removeHandler}
        id={id}
        sx={{
          display: "block",
          width: 30,
          height: 30,
          position: "absolute",
          right: 10,
          top: 10,
          padding: 0,
          minWidth: 24,
        }}
      >
        <CloseIcon />
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: 180,
        }}
      >
        <CardMedia
          component="img"
          sx={{ maxWidth: 150, maxHeight: 100 }}
          src={photo}
          alt={title}
        />
      </Box>
      <CardContent
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          maxWidth="60%"
          width="100%"
          variant="h5"
          color="text.secondary"
          component="h6"
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <ButtonGroup sx={{ marginRight: 4 }}>
            <Button onClick={decHandler} aria-label="reduce">
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              onChange={priceHandler}
              sx={{ width: 65 }}
              variant="outlined"
              value={count}
            />
            <Button
              onClick={incHandler}
              aria-label="increase"
              variant="outlined"
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
          <Typography
            sx={{ maxWidth: "30%", width: "100%" }}
            component="div"
            variant="h4"
          >
            {totalPrice} $
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});
