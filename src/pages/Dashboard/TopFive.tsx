import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Average from "./Average";
import Props from "../../helpers/Props";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 500,
    lineHeight: "1.5rem",
    fontSize: "0.875rem",
    letterSpacing: "0.01071em",
  },
}));

interface Data {
  id: number;
  name: string;
  avg: number;
}

export default function TopFive(props: Props) {
  const classes = useStyles();
  const teamsAge = props.teams.map((team) => ({
    id: team.id,
    name: team.name,
    avg: team.squad.reduce((sum, player) => sum + player.age, 0) / 11,
  }));

  const highestAge = [...teamsAge].sort((a, b) => b.avg - a.avg).slice(0, 5);

  const lowestAge = [...teamsAge].sort((a, b) => a.avg - b.avg).slice(0, 5);

  return (
    <Card>
      <CardHeader title="Top 5" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item md={6} xs={12}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Typography className={classes.title}>
                  Highest avg age
                </Typography>
              </Grid>
              <Average data={highestAge} />
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Typography className={classes.title}>
                  Lowest avg age
                </Typography>
              </Grid>
              <Average data={lowestAge} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
