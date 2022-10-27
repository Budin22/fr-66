import React, { memo, useCallback, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { CategoriesProps, Category } from "./categories-types";
import { fetchLinks } from "../../api/fetch-links";
import { useNavigate } from "react-router-dom";

const fetchCategories = async () => {
  return await axios
    .get(fetchLinks.categories)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const Categories = memo(
  ({ selectedCategory, selectCategoryHandler }: CategoriesProps) => {
    const [checkedAll, setCheckedAll] = useState(true);
    const navigation = useNavigate();
    const { isError, isLoading, data } = useQuery(
      ["categories"],
      fetchCategories,
      {
        staleTime: 60000,
      }
    );

    const categories: Category[] = data;

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

    return (
      <>
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
