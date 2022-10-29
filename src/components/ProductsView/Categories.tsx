import React, { memo, useCallback } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import { CategoriesProps } from "./categories-types";
import { useProductsQuery } from "../../hooks/useCatalogQuery";

export const Categories = memo(
  ({
    selectedCategory,
    selectCategoryHandler,
    selectAllCategories,
  }: CategoriesProps) => {
    const { isError, isLoading, data } = useProductsQuery();
    const categories = data;

    const categoriesHandler = useCallback(
      (event: React.SyntheticEvent<Element, Event>) => {
        const id = event.currentTarget.getAttribute("name");
        if (id !== null) {
          selectCategoryHandler(id);
        }
      },
      [selectCategoryHandler]
    );

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
        {isLoading && (
          <Typography
            variant="h5"
            component="h6"
            color="steelblue"
            sx={{ textAlign: "center" }}
          >
            Loading...
          </Typography>
        )}
        {!isLoading && categories?.length && (
          <>
            <Typography variant="h5" component="h6">
              Categories
            </Typography>
            <FormGroup>
              <FormControlLabel
                onChange={categoriesHandler}
                control={<Checkbox checked={selectAllCategories} />}
                label="All categories"
                name="all"
                value={selectAllCategories}
              />
            </FormGroup>
            {categories.length
              ? categories.map(({ name, id }) => (
                  <FormGroup key={id} sx={{ width: "100%" }}>
                    <FormControlLabel
                      onChange={categoriesHandler}
                      control={
                        <Checkbox
                          checked={
                            selectedCategory.includes(id) || selectAllCategories
                          }
                        />
                      }
                      label={name}
                      name={id}
                      value={
                        selectedCategory.includes(id) || selectAllCategories
                      }
                    />
                  </FormGroup>
                ))
              : null}
          </>
        )}
      </>
    );
  }
);
