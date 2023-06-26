import React from 'react'
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AppWidgetSummary,
} from "../dashboard/sections/@dashboard/app";

const ColdecamPage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Link underline="none" to="/coldecam/nuevoingreso">
            <AppWidgetSummary title="Nuevo Ingreso" total="" icon={"fontisto:truck"} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link underline="none" to="/coldecam/ingresos">
            <AppWidgetSummary
              title="Ingresos"
              total=""
              icon={"emojione-v1:open-book"}
              color="warning"
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ColdecamPage

