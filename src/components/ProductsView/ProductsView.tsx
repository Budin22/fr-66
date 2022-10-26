import React, { memo, useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { FilterValue, ProductItem } from "./types";
import { fetchLinks } from "../../api/fetch-links";
import { Filter } from "./Filter";
import { Categories } from "./Categories";
import { ProductsListItem } from "./ProductsListItem";
import { Search } from "./Search";
import { ProductsPagination } from "./ProductsPagination";
import Typography from "@mui/material/Typography";

const fetchProducts = async () => {
  return await axios
    .get(fetchLinks.products)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ProductsView = memo(() => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<FilterValue>();
  const [rating, setRating] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([]);

  const { isError, isLoading, data } = useQuery(["products"], fetchProducts, {
    refetchInterval: 600000,
  });

  const products: ProductItem[] = data;

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const limPrice: number[] = useMemo(() => {
    if (products) {
      const price = products.map((item) => parseInt(item.price));
      return [Math.min(...price), Math.max(...price)];
    } else {
      return [0, 5000];
    }
  }, [products]);

  const limRating: number[] = useMemo(() => {
    if (products) {
      const rating = products.map((item) => item.rating);
      return [Math.min(...rating), Math.max(...rating)];
    } else {
      return [0, 100];
    }
  }, [products]);

  return (
    <Box display="flex" paddingTop={3}>
      <Box width={200}>
        <Categories
          selectCategoryHandler={selectCategoryHandler}
          selectedCategory={selectedCategory}
        />
        {!!currentProducts && (
          <Filter
            filterHandler={filterHandler}
            ratingHandler={ratingHandler}
            priceHandler={priceHandler}
            rating={limRating}
            price={limPrice}
          />
        )}
      </Box>
      <Box width="100%">
        <Search changeSearchValue={changeSearchValue} />
        {!products?.length && (
          <Typography
            width="100%"
            sx={{ textAlign: "center", padding: 2 }}
            color="steelblue"
            component="h4"
            variant="h3"
          >
            Loading...
          </Typography>
        )}

        {!isLoading && !!currentProducts.length && (
          <>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
              {(rowsPerPage > 0
                ? currentProducts.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : currentProducts
              ).map((item) => (
                <ProductsListItem key={item.id} product={item} />
              ))}
            </Box>
            <ProductsPagination
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              count={currentProducts.length}
              setRowsPerPage={setRowsPerPage}
              setPage={setPage}
            />
          </>
        )}

        {!isLoading && isError && (
          <Typography
            width="100%"
            sx={{ textAlign: "center", padding: 2 }}
            color="red"
            component="h4"
            variant="h3"
          >
            Something went wrong
          </Typography>
        )}
      </Box>
    </Box>
  );
});
