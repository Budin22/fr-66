import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { fetchLinks } from "../Units/fetch-links";
import { Product } from "./Product";
import { ProductItem } from "../ProductsView/types";

export const ProductView = memo(() => {
  const params = useParams();

  const fetchProduct = async () => {
    return await axios
      .get(fetchLinks.products)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const { isError, data } = useQuery(["products"], fetchProduct);
  const allProducts: ProductItem[] = data;

  if (!data) {
    return (
      <Typography variant="h5" component="h6">
        Loading...
      </Typography>
    );
  }

  const currentProduct: ProductItem = allProducts?.filter(
    (item) => +item.id === Number(params.id)
  )[0];

  const someProduct: ProductItem[] = [];

  for (let i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].categories.some((item) =>
        currentProduct.categories.includes(item)
      ) &&
      allProducts[i].id !== currentProduct.id &&
      allProducts[i].isInStock
    ) {
      someProduct.push(allProducts[i]);
      console.log(someProduct);
    }

    if (someProduct.length === 3) {
      i = allProducts.length;
    }
  }

  return (
    <>
      <Product
        key={currentProduct.id}
        data={currentProduct}
        isError={isError}
      />
      <Typography
        sx={{ textAlign: "center", padding: 2 }}
        color="steelblue"
        component="h4"
        variant="h3"
      >
        Maybe you also want to buy some of them? :)))))
      </Typography>
      <Stack direction="row" spacing={2}>
        {!!someProduct.length &&
          someProduct.map((item) => (
            <Product key={item.id} data={item} isError={isError} />
          ))}
      </Stack>
    </>
  );
});
