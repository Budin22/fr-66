import React, { memo, useEffect, useMemo, useState } from "react";

import { queryState } from "../Units/query-state";
import { getFetchData } from "../Units/getFetchData";
import { fetchLinks } from "../Units/fetch-links";
import { QueryError } from "./types";
import { CategoriesProps, Category } from "./categories-types";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

const Categories = memo(
  ({ selectedCategory, selectCategoryHandler }: CategoriesProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesQueryStatus, setCategoriesQueryStatus] =
      useState<queryState>(queryState.initial);
    const [categoriesQueryError, setCategoriesQueryError] =
      useState<QueryError>(null);
    const [checkedAll, setCheckedAll] = useState(true);

    useEffect(() => {
      setCategoriesQueryStatus(queryState.loading);

      getFetchData(fetchLinks.categories)
        .then((categoriesList) => {
          setCategories(categoriesList);
          setCategoriesQueryStatus(queryState.success);
          setCategoriesQueryError(null);
        })
        .catch((error) => {
          setCategoriesQueryStatus(queryState.error);
          setCategoriesQueryError(error);
        });
    }, []);

    const isLoading = useMemo(
      () =>
        categoriesQueryStatus === queryState.loading ||
        categoriesQueryStatus === queryState.initial,
      [categoriesQueryStatus]
    );

    const isSuccess = useMemo(
      () => categoriesQueryStatus === queryState.success,
      [categoriesQueryStatus]
    );

    const isError = useMemo(
      () => categoriesQueryStatus === queryState.error,
      [categoriesQueryStatus]
    );

    const categoriesHandler = (event: React.SyntheticEvent<Element, Event>) => {
      setCheckedAll(false);
      const id = event.currentTarget.getAttribute("name");
      if (id !== null) {
        selectCategoryHandler(id);
      }
    };

    const allCheckedHandler = () => {
      selectCategoryHandler("all");
      setCheckedAll((state) => !state);
    };

    return (
      <>
        {isLoading && <h5 className="card-title">Loading...</h5>}

        {!isLoading && isSuccess && (
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
                  <FormGroup key={id}>
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

        {!isLoading && isError && (
          <h5 className="card-title" style={{ color: "red" }}>
            {categoriesQueryError?.message || "Something went wrong"}
          </h5>
        )}
      </>
    );
  }
);

export default Categories;
