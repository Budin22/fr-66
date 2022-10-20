import React, { memo, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { CategoriesProps, Category } from "./categories-types";
import { fetchLinks } from "../Units/fetch-links";

const fetchData = async () => {
  console.log("запит");
  return await axios
    .get(fetchLinks.categories)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const Categories = memo(
  ({ selectedCategory, selectCategoryHandler }: CategoriesProps) => {
    const [checkedAll, setCheckedAll] = useState(true);

    const { isError, isLoading, data } = useQuery(["categories"], fetchData, {
      staleTime: 60000,
    });

    const categories: Category[] = data;

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
            {isError || "Something went wrong"}
          </h5>
        )}
      </>
    );
  }
);
