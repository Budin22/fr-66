import React, { memo, useCallback, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import { CategoriesProps } from "./categories-types";
import { useProductsQuery } from "../../hooks/useCatalogQuery";

export const Categories = memo(
  ({ selectedCategory, selectCategoryHandler }: CategoriesProps) => {
    const [checkedAll, setCheckedAll] = useState(true);
    const { isError, isLoading, data } = useProductsQuery();
    const categories = data;

    const categoriesHandler = useCallback(
      (event: React.SyntheticEvent<Element, Event>) => {
        setCheckedAll(false);
        const id = event.currentTarget.getAttribute("name");
        if (id !== null) {
          selectCategoryHandler(id);
        }
      },
      [selectCategoryHandler]
    );

    const allCheckedHandler = useCallback(() => {
      selectCategoryHandler("all");
      setCheckedAll((state) => !state);
    }, [selectCategoryHandler]);

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
                onChange={allCheckedHandler}
                control={<Checkbox checked={checkedAll} />}
                label="All categories"
                value={checkedAll}
              />
            </FormGroup>
            {categories.length
              ? categories.map(({ name, id }) => (
                  <FormGroup key={id} sx={{ width: "100%" }}>
                    <FormControlLabel
                      onChange={categoriesHandler}
                      control={
                        <Checkbox
                          checked={selectedCategory.includes(id) || checkedAll}
                        />
                      }
                      label={name}
                      name={id}
                      value={selectedCategory.includes(id) || checkedAll}
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
