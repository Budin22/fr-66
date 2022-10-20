import React, { memo, useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { FilterValue, ProductItem } from "./types";
import { fetchLinks } from "../Units/fetch-links";
import { Filter } from "./Filter";
import { Categories } from "./Categories";
import { ProductsListItem } from "./ProductsListItem";
import { Search } from "./Search";

const fetchProducts = async () => {
  return await axios
    .get(fetchLinks.products)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ProductsView = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<FilterValue>();
  const [rating, setRating] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([]);

  const { isError, isLoading, data } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  const products = data;

  const ratingHandler = useCallback((rating: number[]) => {
    setRating(rating);
  }, []);

  const priceHandler = useCallback((price: number[]) => {
    setPrice(price);
  }, []);

  const selectCategoryHandler = useCallback(
    (category: string) => {
      if (category === "all") {
        if (!selectedCategory.length) {
          setSelectedCategory(["none"]);
          return;
        } else {
          setSelectedCategory([]);
          return;
        }
      }
      if (selectedCategory.includes(category)) {
        setSelectedCategory(
          selectedCategory.filter((item) => item !== category)
        );
        return;
      } else {
        setSelectedCategory((state) => [...state, category]);
      }
    },
    [selectedCategory, setSelectedCategory]
  );

  const filterHandler = useCallback((filterValue: FilterValue) => {
    setFilterValue(filterValue);
  }, []);

  const changeSearchValue = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  let currentProducts: ProductItem[] = useMemo(() => {
    return products?.filter((item: ProductItem) => {
      let result: boolean = true;

      if (selectedCategory.length) {
        result =
          result &&
          !!selectedCategory.filter((cat) => item.categories.includes(cat))
            .length;
      }

      if (result && searchValue) {
        result =
          result &&
          item.title.toLowerCase().includes(searchValue.toLocaleString());
      }

      if (result && filterValue?.isNew) {
        result = result && item.isNew;
      }

      if (result && filterValue?.isSale) {
        result = result && item.isSale;
      }

      if (result && filterValue?.isInStock) {
        result = result && item.isInStock;
      }

      if (result) {
        result =
          result &&
          parseInt(item.price) <= price[1] &&
          price[0] <= parseInt(item.price);
      }

      if (result) {
        result = result && item.rating <= rating[1] && rating[0] <= item.rating;
      }

      return result;
    });
  }, [products, filterValue, price, rating, searchValue, selectedCategory]);

  // if (currentProducts?.length) {
  //   currentProducts.length = 10;
  // }

  return (
    <Box display="flex">
      <div className="card-body d-flex align-items-start p-2 flex-column col-3">
        <Categories
          selectCategoryHandler={selectCategoryHandler}
          selectedCategory={selectedCategory}
        />
        <Filter
          filterHandler={filterHandler}
          ratingHandler={ratingHandler}
          priceHandler={priceHandler}
        />
      </div>
      <div className="card-body d-flex align-items-center gap-3 p-2 flex-column w-100">
        <Search changeSearchValue={changeSearchValue} />

        {!products?.length && <h5 className="card-title">Loading...</h5>}

        {!isLoading && !!currentProducts.length && (
          <Box>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              {currentProducts.length} из {products.length}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
              {currentProducts.map((item) => (
                <ProductsListItem key={item.id} product={item} />
              ))}
            </Box>
          </Box>
        )}

        {!isLoading && isError && (
          <h5 className="card-title" style={{ color: "red" }}>
            {"Something went wrong"}
          </h5>
        )}
      </div>
    </Box>
  );
});
