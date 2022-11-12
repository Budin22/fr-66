import React, { memo, useCallback } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
  FormHelperText,
  Input,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TOrder } from "./form-types";
import { useNavigate } from "react-router-dom";
import { useSelectorAll } from "../../hooks/useSelectorAll";
import { useDispatchSubmitForm } from "../../hooks/form-hooks";

const schema = yup.object({
  firstName: yup.string().trim().min(3).max(15).required(),
  lastName: yup.string().trim().min(3).max(15).required(),
  country: yup
    .string()
    .trim()
    .oneOf(["Ukraine", "Finland", "Poland"])
    .required(),
  city: yup.string().trim().min(3).max(15).required(),
  delivery: yup.string().oneOf(["By wolfs", "By rabbit", "By duck"]).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(9).max(12).required(),
  address: yup.string().trim().min(5).max(20).required(),
  address2: yup.string(),
  textarea: yup.string(),
  checkbox: yup.boolean(),
});

export const FormView = memo(() => {
  const { form } = useSelectorAll();
  const dispatchSubmitForm = useDispatchSubmitForm();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TOrder>({
    defaultValues: form,
    resolver: yupResolver(schema),
  });

  const backHandler = useCallback(() => {
    navigation("/cart");
  }, [navigation]);

  const onSubmit: SubmitHandler<TOrder> = (data) => {
    dispatchSubmitForm(data);
    navigation("/order");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={3} marginTop={3}>
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>First name</InputLabel>
          <Input {...register("firstName")} />
          <FormHelperText id="firstName" error>
            {errors.firstName?.message}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Last name</InputLabel>
          <Input {...register("lastName")} />
          <FormHelperText id="lastName" error>
            {errors.lastName?.message}
          </FormHelperText>
        </FormControl>
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
          <FormHelperText id="country" error>
            {errors.country?.message}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>City</InputLabel>
          <Input {...register("city")} />
          <FormHelperText id="city" error>
            {errors.city?.message}
          </FormHelperText>
        </FormControl>
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
          <FormHelperText id="delivery" error>
            {errors.delivery?.message}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" gap={3}>
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Email</InputLabel>
          <Input {...register("email")} placeholder="name@example.com" />
          <FormHelperText id="email" error>
            {errors.email?.message}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Phone number</InputLabel>
          <Input {...register("phone")} type="number" />
          <FormHelperText id="phone" error>
            {errors.phone?.message}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" gap={3} mb={4}>
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Address</InputLabel>
          <Input {...register("address")} />
          <FormHelperText id="address" error>
            {errors.address?.message}
          </FormHelperText>
        </FormControl>
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
        variant="contained"
        type="submit"
        sx={{ maxWidth: "25%", marginRight: 2 }}
      >
        Add your info
      </Button>
      <Button
        onClick={backHandler}
        variant="contained"
        type="submit"
        sx={{ maxWidth: "25%" }}
      >
        Back
      </Button>
    </form>
  );
});
