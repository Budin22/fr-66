import React, { memo, useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderInfo } from "../OrderView/OrderInfo";
import { useSelectorAll } from "../../hooks/useSelectorAll";
import {
  useDispatchLogOutUser,
  useDispatchRemoveUser,
} from "../../hooks/user-hooks";

export const ProfileInfo = memo(() => {
  const dispatchLogOutUser = useDispatchLogOutUser();
  const dispatchRemoveUser = useDispatchRemoveUser();
  const {
    user: {
      activeUser: { email, orders, id },
    },
  } = useSelectorAll();

  const logOutHandler = useCallback(() => {
    dispatchLogOutUser();
  }, [dispatchLogOutUser]);

  const removeUser = useCallback(() => {
    dispatchLogOutUser();
    dispatchRemoveUser({ id });
  }, [dispatchLogOutUser, dispatchRemoveUser, id]);

  return (
    <Stack gap={3}>
      <Typography
        sx={{ textAlign: "center", width: "100%" }}
        component="h2"
        variant="h4"
        color="steelblue"
      >
        Profile Information user: {email}
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ textAlign: "center", width: "100%" }}
            component="h2"
            variant="h4"
            color="steelblue"
          >
            Check user info
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 15% 2% 15%" }}>
          <Stack direction="row" gap={4}>
            <Stack direction="column">
              <Stack direction="row" gap={2}>
                <Typography variant="h6" component="h6" color="steelblue">
                  Email:
                </Typography>
                <Typography variant="h5" component="h5">
                  {email}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ textAlign: "center", width: "100%" }}
            component="h2"
            variant="h4"
            color="steelblue"
          >
            List of your orders
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: 355, overflowY: "scroll" }}>
          {orders.map((item) => (
            <OrderInfo key={item.date} order={item.order} date={item.date} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
        <Button onClick={removeUser} variant="contained">
          Delete profile
        </Button>
        <Button onClick={logOutHandler} variant="contained">
          Log out
        </Button>
      </Box>
    </Stack>
  );
});
