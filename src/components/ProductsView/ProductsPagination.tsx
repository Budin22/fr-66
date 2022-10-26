import React, { memo } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, NativeSelect } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductsPagination = memo((props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, setRowsPerPage, setPage } =
    props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const changePageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setRowsPerPage(count);
      setPage(0);
    } else {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      columnGap={2}
    >
      <Typography
        variant="h6"
        component="h6"
        textAlign="center"
        maxWidth="100%"
      >
        Products per page:
      </Typography>
      <FormControl variant="filled">
        <NativeSelect
          sx={{ maxWidth: "100%", width: 50 }}
          onChange={changePageHandler}
          id="demo-customized-select-native"
          defaultValue="6"
        >
          <option value="9">9</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="all">All</option>
        </NativeSelect>
      </FormControl>

      <Typography
        variant="h6"
        component="h6"
        textAlign="center"
        maxWidth="100%"
      >
        {!page ? page + 1 : page * rowsPerPage + 1}-
        {page * rowsPerPage + rowsPerPage < count
          ? page * rowsPerPage + rowsPerPage
          : count}{" "}
        of {count}
      </Typography>

      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    </Box>
  );
});
