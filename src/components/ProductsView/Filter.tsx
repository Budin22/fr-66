import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
} from "@mui/material";

import { FilterProps } from "./types";

const Filter = memo(
  ({ filterHandler, ratingHandler, priceHandler }: FilterProps) => {
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isSale, setIsSale] = useState<boolean>(false);
    const [isInStock, setIsInStock] = useState<boolean>(false);

    const [price, setPrice] = useState<number[]>([20, 3500]);
    const [rating, setRating] = useState<number[]>([0, 100]);

    const isNewHandler = () => setIsNew((state) => !state);
    const isSaleHandler = () => setIsSale((state) => !state);
    const isInStokeHandler = () => setIsInStock((state) => !state);

    useEffect(() => {
      filterHandler({
        isNew,
        isSale,
        isInStock,
      });
    }, [isNew, isSale, isInStock, filterHandler]);

    useEffect(() => {
      ratingHandler(rating);
    }, [rating, ratingHandler]);

    useEffect(() => {
      priceHandler(price);
    }, [price, priceHandler]);

    const priceHandler1 = (event: Event, newValue: number | number[]) => {
      setPrice(newValue as number[]);
    };

    const ratingHandler1 = (event: Event, newValue: number | number[]) => {
      setRating(newValue as number[]);
    };

    const minPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) > price[1]) {
        setPrice([price[1], price[1]]);
      } else {
        setPrice([Number(e.currentTarget.value), price[1]]);
      }
    };

    const maxPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) < price[0]) {
        setPrice([price[0], price[0]]);
      } else {
        setPrice([price[0], Number(e.currentTarget.value)]);
      }
    };

    const minRatingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) > rating[1]) {
        setRating([rating[1], rating[1]]);
      } else {
        setRating([Number(e.currentTarget.value), rating[1]]);
      }
    };

    const maxRatingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.currentTarget.value) < rating[0]) {
        setRating([rating[0], rating[0]]);
      } else {
        setRating([rating[0], Number(e.currentTarget.value)]);
      }
    };

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
              value={price[0]}
            />
            <TextField
              onChange={maxPriceHandler}
              sx={{ minWidth: "25%" }}
              type="number"
              label="To"
              variant="standard"
              value={price[1]}
            />
          </Box>
          <Box sx={{ width: "100%", marginTop: 5 }}>
            <Slider
              min={0}
              max={5000}
              value={price}
              onChange={priceHandler1}
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
              value={rating[0]}
            />
            <TextField
              onChange={maxRatingHandler}
              sx={{ minWidth: "25%" }}
              type="number"
              label="To"
              variant="standard"
              value={rating[1]}
            />
          </Box>
          <Box sx={{ width: "100%", marginTop: 5 }}>
            <Slider
              value={rating}
              onChange={ratingHandler1}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      </Box>
    );
  }
);

export default Filter;
