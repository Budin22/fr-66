import React, { memo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductItem } from "../ProductsView/types";
import { fetchLinks } from "../Units/fetch-links";
import { addProduct, removeProduct } from "../../redux/cart-duck";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export const ProductView = memo(() => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart);

  const fetchProduct = async () => {
    return await axios
      .get(`${fetchLinks.products}/${params.id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const { isError, data } = useQuery([`${params.id}`], fetchProduct);
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
  }: ProductItem = data;

  const ProductHandler = useCallback(() => {
    const index: number = cartProducts.findIndex((item) => item.id === id);
    if (index > -1) {
      dispatch(removeProduct({ index }));
    } else {
      dispatch(addProduct({ id, number: 1, photo, title, price }));
    }
  }, [cartProducts, id, photo, price, dispatch, title]);

  if (!data) {
    return (
      <Typography variant="h5" component="h6">
        Loading...
      </Typography>
    );
  }

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
          onClick={ProductHandler}
          variant="contained"
          disabled={!isInStock}
          color="success"
          LinkComponent={Link}
        >
          {!!cartProducts.find((item) => item.id === id)
            ? "Remove from cart"
            : "Add to cart"}
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Typography variant="h5" component="h6">
      isError
    </Typography>
  );
});
