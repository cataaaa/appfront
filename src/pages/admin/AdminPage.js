import React from "react";
import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { AppWidgetSummary } from "../dashboard/sections/@dashboard/app";

const AdminPage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Link underline="none" to="/usuarios">
            <AppWidgetSummary title="Usuarios" total="" icon={"noto:person"} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link underline="none" to="/bitacora">
            <AppWidgetSummary
              title="Bitacora"
              total=""
              icon={"emojione-v1:open-book"}
              color="warning"
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPage;
