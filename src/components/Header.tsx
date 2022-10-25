import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge, { BadgeProps } from "@mui/material/Badge";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { cardGlobalStateI, initialStateI } from "../redux/cart-duck";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&.active": {
    color: theme.palette.grey["500"],
  },
  "&:hover": {
    color: theme.palette.primary.light,
  },
}));

export function Header() {
  const cartProducts: initialStateI[] = useSelector(
    (state: cardGlobalStateI): initialStateI[] => state.cart
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Budin
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <StyledButton
              color="inherit"
              LinkComponent={NavLink}
              {...{ to: "/", end: true }}
            >
              Home
            </StyledButton>
            <StyledButton
              color="inherit"
              LinkComponent={NavLink}
              {...{ to: "/products" }}
            >
              product
            </StyledButton>
            <StyledButton
              color="inherit"
              LinkComponent={NavLink}
              {...{ to: "/about", end: true }}
            >
              About
            </StyledButton>
            <StyledButton
              color="inherit"
              LinkComponent={NavLink}
              {...{ to: "/form" }}
            >
              form
            </StyledButton>
            <StyledButton
              color="inherit"
              LinkComponent={NavLink}
              {...{ to: "/cart" }}
            >
              cart
            </StyledButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              LinkComponent={NavLink}
              {...{ to: "/cart" }}
            >
              <StyledBadge badgeContent={cartProducts.length} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={25} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
