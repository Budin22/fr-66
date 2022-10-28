import React, { memo, useCallback } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
} from "@mui/material";

import { TFilterProps } from "./types";

export const Filter = memo((props: TFilterProps) => {
  const {
    ratingChange,
    priceChange,
    isNewChange,
    isInStockChange,
    isSaleChange,
    price,
    rating,
    limRating,
    limPrice,
    isSale,
    isInStock,
    isNew,
  } = props;

  const isNewHandler = useCallback(
    () => isNewChange(!isNew),
    [isNew, isNewChange]
  );
  const isSaleHandler = useCallback(
    () => isSaleChange(!isSale),
    [isSaleChange, isSale]
  );
  const isInStokeHandler = useCallback(
    () => isInStockChange(!isInStock),
    [isInStockChange, isInStock]
  );

  const priceHandler = useCallback(
    (event: Event, newValue: number | number[]) => {
      priceChange(newValue as number[]);
    },
    [priceChange]
  );

  const ratingHandler = useCallback(
    (event: Event, newValue: number | number[]) => {
      ratingChange(newValue as number[]);
    },
    [ratingChange]
  );

  const minPriceHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) > price[1]) {
        priceChange([price[1], price[1]]);
      } else {
        priceChange([Number(e.currentTarget.value), price[1]]);
      }
    },
    [price, priceChange]
  );

  const maxPriceHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) < price[0]) {
        priceChange([price[0], price[0]]);
      } else {
        priceChange([price[0], Number(e.currentTarget.value)]);
      }
    },
    [price, priceChange]
  );

  const minRatingHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) > rating[1]) {
        ratingChange([rating[1], rating[1]]);
      } else {
        ratingChange([Number(e.currentTarget.value), rating[1]]);
      }
    },
    [rating, ratingChange]
  );

  const maxRatingHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) < rating[0]) {
        ratingChange([rating[0], rating[0]]);
      } else {
        ratingChange([rating[0], Number(e.currentTarget.value)]);
      }
    },
    [rating, ratingChange]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" component="h6">
        Filters
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <FormGroup>
          <FormControlLabel
            onChange={isNewHandler}
            checked={isNew}
            control={<Checkbox />}
            label="isNew"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            onChange={isSaleHandler}
            checked={isSale}
            control={<Checkbox />}
            label="isSale"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            onChange={isInStokeHandler}
            checked={isInStock}
            control={<Checkbox />}
            label="isInStock"
          />
        </FormGroup>
        <Typography variant="h5" component="h6">
          Price
        </Typography>
        <Box display="flex" gap={3}>
          <TextField
            onChange={minPriceHandler}
            sx={{ minWidth: "25%" }}
            type="number"
            label="From"
            variant="standard"
            value={limPrice[0] > price[0] ? limPrice[0] : price[0]}
          />
          <TextField
            onChange={maxPriceHandler}
            sx={{ minWidth: "25%" }}
            type="number"
            label="To"
            variant="standard"
            value={limPrice[1] < price[1] ? limPrice[1] : price[1]}
          />
        </Box>
        <Box sx={{ width: "100%", marginTop: 5 }}>
          <Slider
            min={limPrice[0]}
            max={limPrice[1]}
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
          />
        </Box>
        <Typography variant="h5" component="h6">
          Rating
        </Typography>
        <Box display="flex" gap={3}>
          <TextField
            onChange={minRatingHandler}
            sx={{ minWidth: "25%" }}
            type="number"
            label="From"
            variant="standard"
            value={limRating[0] > rating[0] ? limRating[0] : rating[0]}
          />
          <TextField
            onChange={maxRatingHandler}
            sx={{ minWidth: "25%" }}
            type="number"
            label="To"
            variant="standard"
            value={limRating[1] < rating[1] ? limRating[1] : rating[1]}
          />
        </Box>
        <Box sx={{ width: "100%", marginTop: 5 }}>
          <Slider
            value={rating}
            min={limRating[0]}
            max={limRating[1]}
            onChange={ratingHandler}
            valueLabelDisplay="auto"
          />
        </Box>
      </Box>
    </Box>
  );
});
