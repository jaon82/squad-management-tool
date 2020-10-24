import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Player from "../../helpers/Player";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1, 0, 1, 3),
    borderRadius: 5,
    border: "dashed thin #dadada",
    background: "linear-gradient(0deg, #e5e5e5, #fff)",
    margin: theme.spacing(2, 1, 0, 0),
  },
  playerContainer: {
    height: 50,
    margin: theme.spacing(1, 0),
    cursor: "pointer",
  },
  label: {
    marginRight: 10,
    font: "inherit",
    fontWeight: "bold",
  },
  value: {
    font: "inherit",
    color: theme.palette.primary.main,
  },
}));

interface DataProps {
  data: Player;
}

export default function PlayerCard(props: DataProps) {
  const classes = useStyles();

  return (
    <Grid item className={classes.container}>
      <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.playerContainer}
      >
        <Grid item xs={5}>
          <span className={classes.label}>Name:</span>
          <span className={classes.value}>{props.data.player_name}</span>
        </Grid>
        <Grid item xs={5}>
          <span className={classes.label}>Age:</span>
          <span className={classes.value}>{props.data.age}</span>
        </Grid>
        <Grid item xs={10}>
          <span className={classes.label}>Nacionality:</span>
          <span className={classes.value}>{props.data.nationality}</span>
        </Grid>
      </Grid>
    </Grid>
  );
}
