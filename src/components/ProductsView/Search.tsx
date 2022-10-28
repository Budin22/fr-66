import React, { memo, useCallback, useEffect, useState } from "react";
import { Input } from "@mui/material";

import { SearchProps } from "./types";

// тут не хватает текущего значения поиска из пропсов, иначе у тебя получается неконтролируемый инпут
export const Search = memo(({ changeSearchValue }: SearchProps) => {
  const [value, setValue] = useState("");

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    []
  );

  useEffect(() => {
    // зачем? можно же сразу в хендлере вызывать changeSearchValue
    changeSearchValue(value);
  }, [value, changeSearchValue]);

  return (
    <Input
      sx={{ alignText: "center", marginBottom: 2 }}
      fullWidth={true}
      onChange={searchHandler}
      placeholder="Search your product by name"
      value={value}
    />
  );
});
