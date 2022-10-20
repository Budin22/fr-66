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

import { ProductsListSinglItem } from "./types";

const ProductsListItem = memo(({ product }: ProductsListSinglItem) => {
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
    <Card sx={{ maxWidth: "31%" }}>
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
          {...{ to: url }}
        >
          Show
        </Button>
        <Button variant="contained" LinkComponent={Link} {...{ to: url }}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
});

export default ProductsListItem;
