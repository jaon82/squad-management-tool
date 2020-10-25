import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MyTeams from "./MyTeams";
import TopFive from "./TopFive";
import PickedPlayer from "./PickedPlayer";

import Props from "../../helpers/Props";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

function Dashboard(props: Props) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      spacing={5}
    >
      <Grid item md={6} xs={12}>
        <MyTeams {...props} />
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          className={classes.root}
        >
          <Grid item>
            <TopFive {...props} />
          </Grid>
          <Grid item xs>
            <PickedPlayer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
