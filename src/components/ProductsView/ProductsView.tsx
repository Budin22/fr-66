import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Filter from "./Filter";
import Categories from "./Categories";
import ProductsListItem from "./ProductsListItem";
import { queryState } from "../Units/query-state";
import { getFetchData } from "../Units/getFetchData";
import { fetchLinks } from "../Units/fetch-links";
import { FilterValue, ProductItem, QueryError } from "./types";
import { Search } from "./Search";

export const ProductsView = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productsQueryStatus, setProductsQueryStatus] = useState(
    queryState.initial
  );
  const [productsQueryError, setProductsQueryError] =
    useState<QueryError>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<FilterValue>();
  const [rating, setRating] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([]);

  useEffect(() => {
    setProductsQueryStatus(queryState.loading);

    getFetchData(fetchLinks.products)
      .then((productsList) => {
        setProducts(productsList);
        setProductsQueryStatus(queryState.success);
        setProductsQueryError(null);
      })
      .catch((error) => {
        setProductsQueryStatus(queryState.error);
        setProductsQueryError(error);
      });
  }, []);

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

  const isLoading = useMemo(
    () =>
      productsQueryStatus === queryState.loading ||
      productsQueryStatus === queryState.initial,
    [productsQueryStatus]
  );
  const isSuccess = useMemo(
    () => productsQueryStatus === queryState.success,
    [productsQueryStatus]
  );
  const isError = useMemo(
    () => productsQueryStatus === queryState.error,
    [productsQueryStatus]
  );

  const currentProducts = useMemo(() => {
    return products.filter((item) => {
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
  }, [selectedCategory, products, searchValue, price, rating, filterValue]);

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

        {isLoading && <h5 className="card-title">Loading...</h5>}

        {!isLoading && isSuccess && (
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
              {currentProducts.length
                ? currentProducts.map((item) => (
                    <ProductsListItem key={item.id} product={item} />
                  ))
                : null}
            </Box>
          </Box>
        )}

        {!isLoading && isError && (
          <h5 className="card-title" style={{ color: "red" }}>
            {productsQueryError?.message || "Something went wrong"}
          </h5>
        )}
      </div>
    </Box>
  );
});
