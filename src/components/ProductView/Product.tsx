import React, { memo, useCallback } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { TProduct } from "../ProductsView/types";
import { useSelectorAll } from "../../hooks/useSelectorAll";
import {
  useDispatchAddProduct,
  useDispatchRemoveProduct,
  useIsInCart,
} from "../../hooks/cart-hooks";
import { ProductPropsI } from "./product-types";

export const Product = memo((props: ProductPropsI) => {
  const isInCart = useIsInCart();
  const dispatchAddProduct = useDispatchAddProduct();
  const dispatchRemoveProduct = useDispatchRemoveProduct();

  const { cart } = useSelectorAll();

  const {
    photo,
    id,
    rating,
    isNew,
    isSale,
    isInStock,
    price,
    title,
    description,
  }: TProduct = props.data;
  const isError = props.isError;

  const productHandler = useCallback(() => {
    const index: number = cart.order?.findIndex((item) => item.id === id);
    if (index > -1) {
      dispatchRemoveProduct({ index });
    } else {
      dispatchAddProduct({ id, number: 1, photo, title, price });
    }
  }, [
    cart,
    id,
    photo,
    price,
    dispatchAddProduct,
    dispatchRemoveProduct,
    title,
  ]);

  return !isError ? (
    <Card
      sx={{
        maxWidth: "31%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={`${photo}?v=${id}`}
          alt="green iguana"
        />
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {description}
        </Typography>
        {isNew ? (
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "green", fontWeight: "bold" }}
          >
            IsNew
          </Typography>
        ) : null}
        {isSale ? (
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "blue", fontWeight: "bold" }}
          >
            IsSale
          </Typography>
        ) : null}
        {isInStock ? (
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "pink", fontWeight: "bold" }}
          >
            IsInStock
          </Typography>
        ) : null}
      </CardContent>
      <CardActions
        sx={{ flexDirection: "column", alignItems: "flex-start", rowGap: 1 }}
      >
        <Typography gutterBottom variant="h6" component="h6">
          Price: {price}
        </Typography>
        <Rating name="readOnly " readOnly precision={0.1} value={rating / 20} />
        <Button
          fullWidth={true}
          onClick={productHandler}
          variant="contained"
          disabled={!isInStock}
          color="success"
          LinkComponent={Link}
        >
          {isInCart(id) ? "Remove from cart" : "Add to cart"}
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Typography variant="h5" component="h6">
      isError
    </Typography>
  );
});
