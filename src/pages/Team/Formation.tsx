import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useWatch, Control } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";

import Team from "../../helpers/Team";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: theme.spacing(5, 0),
  },
  playerContainer: {
    height: "6vw",
    width: "6vw",
    border: "dashed #a543b3",
    borderRadius: "3vw",
    padding: 3,
  },
  playerBackground: {
    width: "100%",
    height: "100%",
    background: "#c78bbc",
    borderRadius: "3vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface Props {
  control: Control<Team>;
}

export default function Formation({ control }: Props) {
  const classes = useStyles();

  const formation = useWatch({
    control,
    name: "formation",
    defaultValue: "",
  });

  const fieldZones = formation ? formation.split(" - ").reverse() : [];

  function PlayerContainer() {
    return (
      <Grid item className={classes.playerContainer}>
        <div className={classes.playerBackground}>
          <Add
            fontSize="large"
            style={{
              color: "#fff",
            }}
          />
        </div>
      </Grid>
    );
  }

  const items = fieldZones.map((zone, index) => {
    let zoneItems = [];
    for (let i = 0; i < Number(zone); i++) {
      zoneItems.push(<PlayerContainer key={i} />);
    }
    return zoneItems;
  });

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      {fieldZones.map((zone, index) => (
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          key={index}
        >
          {items[index]}
        </Grid>
      ))}
      {formation && <PlayerContainer />}
    </Grid>
  );
}
