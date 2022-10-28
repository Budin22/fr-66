import React, { memo, useCallback } from "react";
import { Input } from "@mui/material";

import { SearchProps } from "./types";

export const Search = memo(
  ({ changeSearchValue, searchValue }: SearchProps) => {
    const searchHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        changeSearchValue(e.currentTarget.value);
      },
      [changeSearchValue]
    );

    return (
      <Input
        sx={{ alignText: "center", marginBottom: 2 }}
        fullWidth={true}
        onChange={searchHandler}
        placeholder="Search your product by name"
        value={searchValue}
      />
    );
  }
);
