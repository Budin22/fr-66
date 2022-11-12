import React, { memo } from "react";
import {
  Button,
  CardContent,
  CardMedia,
  CardActions,
  Card,
  Rating,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { TProductsObj } from "./types";
import { useIsInCart } from "../../hooks/cart-hooks";

export const ProductsListItem = memo(({ product }: TProductsObj) => {
  const isInCart = useIsInCart();
  const {
    photo,
    title,
    description,
    price,
    id,
    rating,
    isNew,
    isSale,
    isInStock,
  } = product;

  const url = `/product/${id}`;

  return (
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
          variant="contained"
          disabled={!isInStock}
          color="success"
          LinkComponent={Link}
          {...{ to: url }}
        >
          Show {isInCart(id) ? "(Product in cart)" : ""}
        </Button>
      </CardActions>
    </Card>
  );
});
