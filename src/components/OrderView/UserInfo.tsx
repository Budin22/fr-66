import React, { memo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelectorAll } from "../../hooks/useSelectorAll";

export const UserInfo = memo(() => {
  const {
    form: {
      firstName,
      lastName,
      address,
      address2,
      city,
      country,
      email,
      phone,
      checkbox,
      textarea,
      delivery,
    },
  } = useSelectorAll();
  return (
    <Accordion>
      <AccordionSummary
        disabled={!firstName}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {!!firstName ? (
          <Typography
            sx={{ textAlign: "center", width: "100%" }}
            component="h2"
            variant="h4"
          >
            Check user info
          </Typography>
        ) : (
          <Typography
            sx={{ textAlign: "center", width: "100%" }}
            color="red"
            component="h2"
            variant="h4"
          >
            You need to fill up the form
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 15% 2% 15%" }}>
        <Stack direction="row" gap={4}>
          <Stack direction="column">
            <Stack direction="row" gap={2} width="100%">
              <Typography variant="h6" component="h6" color="steelblue">
                First name:
              </Typography>
              <Typography variant="h5" component="h5">
                {firstName}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Country:
              </Typography>
              <Typography variant="h5" component="h5">
                {country}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Email:
              </Typography>
              <Typography variant="h5" component="h5">
                {email}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Address:
              </Typography>
              <Typography variant="h5" component="h5">
                {address}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                I'm the best of the best:
              </Typography>
              <Typography variant="h5" component="h5">
                {checkbox ? "Agree" : "Disagree"}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Last name:
              </Typography>
              <Typography variant="h5" component="h5">
                {lastName}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                City:
              </Typography>
              <Typography variant="h5" component="h5">
                {city}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Phone number:
              </Typography>
              <Typography variant="h5" component="h5">
                {phone}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Address2:
              </Typography>
              <Typography variant="h5" component="h5">
                {address2}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h6" component="h6" color="steelblue">
                Delivery type:
              </Typography>
              <Typography variant="h5" component="h5">
                {delivery}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="h6" component="h6" color="steelblue">
            Comments:
          </Typography>
          <Typography variant="h5" component="h5">
            {textarea}
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
});
