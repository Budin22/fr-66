import React, { memo, useCallback, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  FormHelperText,
  Input,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { NavLink } from "react-router-dom";
import {
  useDispatchAddUser,
  useDispatchSignInUser,
} from "../../hooks/user-hooks";
import { TUser } from "./registrationForm-types";

export const RegistrationForm = memo(() => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const dispatchSignInUser = useDispatchSignInUser();
  const dispatchAddUser = useDispatchAddUser();

  const schema = useMemo(
    () =>
      yup.object({
        password: yup.string().trim().min(3).max(15).required(),
        password2: isSignIn
          ? yup.string()
          : yup.string().oneOf([yup.ref("password")]),
        email: yup.string().email().required(),
      }),
    [isSignIn]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({
    resolver: yupResolver(schema),
  });

  const isSignInHandler = useCallback(() => {
    setIsSignIn((state) => !state);
  }, []);

  const onSubmit: SubmitHandler<TUser> = useCallback(
    (data) => {
      const { email, password } = data;
      if (isSignIn) {
        dispatchSignInUser({ email, password });
      } else {
        dispatchAddUser({
          email,
          password,
          id: Date.now().toString(),
          orders: [],
        });
      }

      reset();
    },
    [isSignIn, dispatchSignInUser, dispatchAddUser, reset]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        sx={{ textAlign: "center", width: "100%" }}
        component="h2"
        variant="h4"
        color="steelblue"
      >
        Registration form
      </Typography>
      <Box display="flex">
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Email</InputLabel>
          <Input {...register("email")} placeholder="name@example.com" />
          <FormHelperText id="email" error>
            {errors.email?.message}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex">
        <FormControl sx={{ minWidth: "25%" }} variant="standard">
          <InputLabel>Password</InputLabel>
          <Input type="password" {...register("password")} />
          <FormHelperText id="password" error>
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
      </Box>
      {!isSignIn && (
        <Box display="flex">
          <FormControl sx={{ minWidth: "25%" }} variant="standard">
            <InputLabel>Password again</InputLabel>
            <Input type="password" {...register("password2")} />
            <FormHelperText id="password2" error>
              {errors.password2?.message ? "Password should be the same" : ""}
            </FormHelperText>
          </FormControl>
        </Box>
      )}
      <Box
        display="flex"
        gap={3}
        flexDirection="column"
        alignItems="flex-start"
        mb={1}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={isSignInHandler} value={isSignIn} />}
            label="I'm Signed In"
          />
        </FormGroup>
      </Box>
      <Button
        variant="contained"
        type="submit"
        sx={{ maxWidth: "25%", marginRight: 2 }}
      >
        {isSignIn ? "Login" : "Registry"}
      </Button>
      <Button
        LinkComponent={NavLink}
        {...{ to: "/products" }}
        variant="contained"
        type="submit"
        sx={{ maxWidth: "25%" }}
      >
        Back to products
      </Button>
    </form>
  );
});
