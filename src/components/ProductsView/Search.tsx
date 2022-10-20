import React, { memo, useEffect, useState } from "react";
import { Input } from "@mui/material";
import { SearchProps } from "./types";

export const Search = memo(({ changeSearchValue }: SearchProps) => {
  const [value, setValue] = useState("");

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    changeSearchValue(value);
  }, [value, changeSearchValue]);

  return (
    <Input
      sx={{ alignText: "center" }}
      fullWidth={true}
      onChange={searchHandler}
      placeholder="Search your product by name"
      value={value}
    />
  );
});