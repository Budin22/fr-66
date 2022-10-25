import React, { memo } from "react";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormView } from "../FormView";

export const UserInfo = memo(() => {
  return (
    <Box>
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
          >
            User info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormView />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});
