import React from "react";
import Grid from "@material-ui/core/Grid";

import MyTeams from "./MyTeams";
import TopFive from "./TopFive";

function Dashboard() {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      spacing={5}
    >
      <Grid item md={6} xs={12}>
        <MyTeams />
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item>
            <TopFive />
          </Grid>
          <Grid item>
            <MyTeams />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
