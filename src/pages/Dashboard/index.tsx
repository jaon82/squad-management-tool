import React from "react";
import Grid from "@material-ui/core/Grid";

import MyTeams from "./MyTeams";

function Dashboard() {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
    >
      <Grid item md={5} xs={12}>
        <MyTeams />
      </Grid>
      <Grid item md={5} xs={12}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item>a</Grid>
          <Grid item>
            <MyTeams />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
