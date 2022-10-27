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
import { useNavigate } from "react-router-dom";
import { useDebounce } from "./useDebounce";

const fetchProducts = async () => {
  return await axios
    .get(fetchLinks.products)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ProductsView = memo(() => {
  const navigation = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<FilterValue>();
  const [rating, setRating] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const debouncedSearch = useDebounce(searchValue, 300);
  const debouncedCategory = useDebounce(selectedCategory, 500);
  const debouncedFilterValue = useDebounce(filterValue, 500);
  const debouncedRating = useDebounce(rating, 500);
  const debouncedPrice = useDebounce(price, 500);

  const { isError, isLoading, data } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
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

      if (debouncedCategory.length) {
        result =
          result &&
          !!debouncedCategory.filter((cat) => item.categories.includes(cat))
            .length;
      }

      if (result && debouncedSearch) {
        result =
          result &&
          item.title.toLowerCase().includes(debouncedSearch.toLocaleString());
      }

      if (result && debouncedFilterValue?.isNew) {
        result = result && item.isNew;
      }

      if (result && debouncedFilterValue?.isSale) {
        result = result && item.isSale;
      }

      if (result && debouncedFilterValue?.isInStock) {
        result = result && item.isInStock;
      }

      if (result) {
        result =
          result &&
          parseInt(item.price) <= debouncedPrice[1] &&
          debouncedPrice[0] <= parseInt(item.price);
      }

      if (result) {
        result =
          result &&
          item.rating <= debouncedRating[1] &&
          debouncedRating[0] <= item.rating;
      }

      return result;
    });
  }, [
    products,
    debouncedFilterValue,
    debouncedPrice,
    debouncedRating,
    debouncedSearch,
    debouncedCategory,
  ]);

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

  if (isError) {
    setTimeout(() => navigation("/"), 2000);
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

  currentProducts?.sort((a, b) => (a.isInStock < b.isInStock ? 1 : -1));

  return (
    <Box display="flex" paddingTop={3} columnGap={4}>
      <Box width={250}>
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
      <Box sx={{ width: "100%" }}>
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
            <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
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
      </Box>
    </Box>
  );
});
