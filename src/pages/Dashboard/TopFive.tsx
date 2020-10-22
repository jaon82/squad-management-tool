import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Average from "./Average";

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

const data: Data[] = [
  { id: 1, name: "Barcelona", avg: 31.9 },
  { id: 2, name: "Real Madrid", avg: 31.7 },
  { id: 3, name: "Milan", avg: 31.7 },
  { id: 4, name: "Liverpool", avg: 31.7 },
  { id: 5, name: "Bayern Munich", avg: 31.7 },
];

export default function TopFive() {
  const classes = useStyles();

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
              <Average data={data} />
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
              <Average data={data} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
