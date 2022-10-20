import React, { useEffect, useState } from "react";

import { ProductItem } from "../ProductsView/types";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getFetchData } from "../Units/getFetchData";

export const ProductView = () => {
  const style = { width: "18rem" };

  const productId = useParams();
  const url = `https://61f5558a62f1e300173c40f3.mockapi.io/products/${productId.id}`;

  const [product, setProduct] = useState<ProductItem>();

  useEffect(() => {
    getFetchData(url).then((data: ProductItem) => setProduct({ ...data }));
  }, [url]);

  return (
    <div className="card" style={style}>
      <img
        src={`${product?.photo}?v=${product?.id}`}
        className="card-img-top"
        alt={product?.title}
      />
      <div className="card-body">
        <h5 className="card-title">{product?.title}</h5>
        <p className="card-text">{product?.description}</p>
        {product?.isNew ? <p className="card-text">Новинка</p> : null}
        {product?.isSale ? <p className="card-text">Распродажа</p> : null}
        {product?.isInStock ? (
          <p className="card-text">В наличии / Нет в наличии</p>
        ) : null}
        <p className="card-text">{product?.price} $</p>
        <p className="card-text">Рейтинг: {product?.rating}</p>
        <Button
          variant="contained"
          LinkComponent={Link}
          {...{ to: "/products" }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
