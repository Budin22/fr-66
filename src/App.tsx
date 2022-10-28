import React from "react";
import { useRoutes } from "react-router-dom";
import { Container } from "@mui/material";

import { Header } from "./components/Header";
import { routes } from "./routes";

function App() {
  const root = useRoutes(routes);
  return (
    <>
      <Header />
      <Container sx={{ paddingTop: 8 }}>{root}</Container>
    </>
  );
}

export default App;
