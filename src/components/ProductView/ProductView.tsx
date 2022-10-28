import React, { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { Product } from "./Product";
import { TProduct, TProductsList } from "../ProductsView/types";
import { useProductsQuery } from "../../hooks/useProductsQuery";

export const ProductView = memo(() => {
  const params = useParams();

  const { isError, data } = useProductsQuery();
  let allProducts: TProductsList = useMemo(() => (data ? data : []), [data]);

  const currentProduct: TProduct = useMemo(
    () => allProducts?.filter((item) => +item.id === Number(params.id))[0],
    [allProducts, params.id]
  );

  const someProduct: TProductsList = [];

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

    if (someProduct.length === 3) break;
  }

  return (
    <>
      {isError && (
        <Typography
          gutterBottom
          variant="h5"
          component="h6"
          color="darkred"
          sx={{ textAlign: "center" }}
        >
          Some thing went wrong
        </Typography>
      )}
      {!data && (
        <Typography variant="h5" component="h6">
          Loading...
        </Typography>
      )}
      {data && (
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
      )}
    </>
  );
});
