import React, { memo } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldError,
} from "react-hook-form";
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { InputsI } from "./form-types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { submitForm } from "../../redux/ducks/form-duck";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup.string().trim().min(3).max(15).required(),
    lastName: yup.string().trim().min(3).max(15).required(),
    country: yup
      .string()
      .trim()
      .oneOf(["Ukraine", "Finland", "Poland"])
      .required(),
    city: yup.string().trim().min(3).max(15).required(),
    delivery: yup
      .string()
      .oneOf(["By wolfs", "By rabbit", "By duck"])
      .required(),
    email: yup.string().email().required(),
    phone: yup.string().min(9).max(12).required(),
    address: yup.string().trim().min(5).max(20).required(),
    address2: yup.string().trim().min(5).max(20).required(),
    textarea: yup.string(),
    checkbox: yup.boolean(),
  })
  .required();

export const FormView = memo(() => {
    
  const formValue = useAppSelector((state) => state.form);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InputsI>({
    defaultValues: formValue,
    resolver: yupResolver(schema),
  });

  const errorHandler = () => {
    const errorArray: [string, FieldError][] = Object.entries(errors);

    if (errorArray.length) {
      const myError: [string, FieldError] = errorArray[0];
      alert(`${myError[0]}: ${myError[1].message}`);
    }
  };

  const onSubmit: SubmitHandler<InputsI> = (data) => {
    dispatch(submitForm(data));
    navigation("/products");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={3} marginTop={3}>
        <TextField
          sx={{ minWidth: "25%" }}
          label="First name"
          variant="standard"
          inputRef={}
          {...register("firstName")}
        />
        <TextField
          sx={{ minWidth: "25%" }}
          label="Last name"
          variant="standard"
          {...register("lastName")}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={3}>
        <FormControl variant="standard" sx={{ minWidth: "25%" }}>
          <InputLabel id="demo-simple-select-standard-label">
            Country
          </InputLabel>
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Country"
                value={value}
              >
                <MenuItem value="Ukraine">Ukraine</MenuItem>
                <MenuItem value="Finland">Finland</MenuItem>
                <MenuItem value="Poland">Poland</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <TextField
          sx={{ minWidth: "25%" }}
          label="City"
          variant="standard"
          {...register("city")}
        />
        <FormControl variant="standard" sx={{ minWidth: "25%" }}>
          <InputLabel id="demo-simple-select-standard-label">
            Delivery type
          </InputLabel>
          <Controller
            control={control}
            name="delivery"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Delivery type"
                value={value}
              >
                <MenuItem value="By wolfs">By wolfs</MenuItem>
                <MenuItem value="By rabbit">By rabbit</MenuItem>
                <MenuItem value="By duck">By duck</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Box display="flex" gap={3}>
        <TextField
          sx={{ minWidth: "25%" }}
          label="Email address"
          variant="standard"
          placeholder="name@example.com"
          {...register("email")}
        />
        <TextField
          sx={{ minWidth: "25%" }}
          label="Phone number"
          variant="standard"
          placeholder="+3848454845"
          type="number"
          {...register("phone")}
        />
      </Box>
      <Box display="flex" gap={3} mb={4}>
        <TextField
          sx={{ minWidth: "25%" }}
          label="Address"
          variant="standard"
          {...register("address")}
        />
        <TextField
          sx={{ minWidth: "25%" }}
          label="Address 2"
          variant="standard"
          {...register("address2")}
        />
      </Box>
      <Box display="flex" gap={3}>
        <TextField
          sx={{
            maxWidth: "52%",
            width: "100%",
          }}
          multiline
          rows={4}
          label="Example textarea"
          {...register("textarea")}
        />
      </Box>
      <Box
        display="flex"
        gap={3}
        flexDirection="column"
        alignItems="flex-start"
        mb={1}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="checkbox"
                render={({ field }) => (
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={!!field.value}
                  />
                )}
              />
            }
            label="I'm the best of the best"
          />
        </FormGroup>
      </Box>
      <Button
        onClick={errorHandler}
        variant="contained"
        type="submit"
        sx={{ maxWidth: "25%" }}
      >
        Add your info
      </Button>
    </form>
  );
});
