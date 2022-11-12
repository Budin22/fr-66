import React, { memo, useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";

import { TProduct, TProductsList } from "./types";
import { Filter } from "./Filter";
import { Categories } from "./Categories";
import { ProductsListItem } from "./ProductsListItem";
import { Search } from "./Search";
import { ProductsPagination } from "./ProductsPagination";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useProductsQuery } from "../../hooks/useProductsQuery";

export const ProductsView = memo(() => {
  const navigation = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectAllCategories, setSelectAllCategories] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  const [isNew, setIsNew] = useState<boolean>(false);
  const [isSale, setIsSale] = useState<boolean>(false);
  const [isInStock, setIsInStock] = useState<boolean>(false);

  const [rating, setRating] = useState<number[]>([0, 100]);
  const [price, setPrice] = useState<number[]>([0, 1000]);

  const debouncedSearch = useDebounce(searchValue, 300);
  const debouncedCategory = useDebounce(selectedCategory, 500);

  const debouncedIsNew = useDebounce(isNew, 500);
  const debouncedIsSale = useDebounce(isSale, 500);
  const debouncedIsInStock = useDebounce(isInStock, 500);
  const debouncedRating = useDebounce(rating, 500);
  const debouncedPrice = useDebounce(price, 500);

  const { isError, isLoading, data } = useProductsQuery();

  const products: TProductsList = useMemo(() => (data ? data : []), [data]);

  const isNewChange = useCallback((isNew: boolean) => {
    setIsNew(isNew);
  }, []);
  const isSaleChange = useCallback((isSale: boolean) => {
    setIsSale(isSale);
  }, []);
  const isInStockChange = useCallback((isInStock: boolean) => {
    setIsInStock(isInStock);
  }, []);

  const ratingChange = useCallback((rating: number[]) => {
    setRating(rating);
  }, []);

  const priceChange = useCallback((price: number[]) => {
    setPrice(price);
  }, []);

  const selectCategoryHandler = useCallback(
    (category: string) => {
      if (category === "all") {
        if (!selectedCategory.length) {
          setSelectAllCategories(false);
          setSelectedCategory(["none"]);
          return;
        } else {
          setSelectAllCategories(true);
          setSelectedCategory([]);
          return;
        }
      }
      if (selectedCategory.includes(category)) {
        setSelectedCategory(
          selectedCategory.filter((item) => item !== category)
        );
      } else {
        setSelectAllCategories(false);
        setSelectedCategory((state) => [...state, category]);
      }
    },
    [selectedCategory, setSelectedCategory]
  );

  const changeSearchValue = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  let currentProducts: TProduct[] = useMemo(() => {
    return products.filter((item: TProduct) => {
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

      if (result && debouncedIsNew) {
        result = result && item.isNew;
      }

      if (result && debouncedIsSale) {
        result = result && item.isSale;
      }

      if (result && debouncedIsInStock) {
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
    debouncedIsInStock,
    debouncedIsSale,
    debouncedIsNew,
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
          selectAllCategories={selectAllCategories}
        />
        {!!currentProducts && (
          <Filter
            isNew={isNew}
            isSale={isSale}
            isInStock={isInStock}
            isNewChange={isNewChange}
            isSaleChange={isSaleChange}
            isInStockChange={isInStockChange}
            ratingChange={ratingChange}
            priceChange={priceChange}
            rating={rating}
            price={price}
            limRating={limRating}
            limPrice={limPrice}
          />
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Search
          changeSearchValue={changeSearchValue}
          searchValue={searchValue}
        />
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
