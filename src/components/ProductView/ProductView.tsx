import React, { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { fetchLinks } from "../../api/fetch-links";
import { Product } from "./Product";
import { ProductItem } from "../ProductsView/types";

export const ProductView = memo(() => {
  const navigation = useNavigate();
  const params = useParams();

  // вынести это в src/api/catalog-api.ts
  const fetchProduct = async () => {
    return await axios
      .get(fetchLinks.products)
      .then((res) => res.data)
      .catch((err) => {
        throw Error(err.massage);
      });
  };

  // вынести это в отдельный хук src/hooks/useProductsQuery.ts
  const { isError, data } = useQuery(["products"], fetchProduct, {
    staleTime: 60000,
  });
  const allProducts: ProductItem[] = data;

  if (isError) {
    // не согласен с редиректом через 2 секунды - юзер просто не поймет, что произошло
    setTimeout(() => navigation(-1), 2000);
    return (
      <Typography
        gutterBottom
        variant="h5"
        component="h6"
        color="darkred"
        sx={{ textAlign: "center" }}
      >
        Some thing went wrong
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h5" component="h6">
        Loading...
      </Typography>
    );
  }

  // вынести все это в useMemo и поставить перед рендером
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
