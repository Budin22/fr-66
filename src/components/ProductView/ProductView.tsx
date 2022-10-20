import React from "react";

import { ProductItem } from "../ProductsView/types";
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
import { fetchLinks } from "../Units/fetch-links";
import { useQuery } from "@tanstack/react-query";
import { binarySearch } from "../Units/binarySearch";

const fetchProducts = async () => {
  return await axios
    .get(fetchLinks.products)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ProductView = () => {
  const params = useParams();
  const { isError, data } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  let productIndex: number = -1;

  if (params.id && data) {
    productIndex = binarySearch(data, params.id);
  }

  if (productIndex < 0) {
    return (
      <Typography variant="h5" component="h6">
        Loading...
      </Typography>
    );
  }

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
  }: ProductItem = data[productIndex];

  return !isError ? (
    <Card sx={{ maxWidth: "25%" }}>
      <CardMedia
        component="img"
        height="140"
        image={`${photo}?v=${id}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
        <Typography gutterBottom variant="h6" component="div">
          Price: {price}
        </Typography>
        <Rating name="readOnly " readOnly precision={0.1} value={rating / 20} />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          {...{ to: "/products" }}
        >
          Back
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Typography variant="h5" component="h6">
      isError
    </Typography>
  );
};
