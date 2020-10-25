import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Props from "../../helpers/Props";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: theme.spacing(3, 0, 0),
  },
  mostPickedContainer: {
    background: "linear-gradient(0deg, #6f0084, #cb0074)",
    borderTopLeftRadius: theme.spacing(2),
    borderRight: "solid thin #fff",
    overflow: "hidden",
  },
  lessPickedContainer: {
    background: "linear-gradient(0deg, #6f0084, #cb0074)",
    borderTopRightRadius: theme.spacing(2),
    borderLeft: "solid thin #fff",
    overflow: "hidden",
  },
  midfieldLeft: {
    height: "20%",
    float: "right",
    width: "10%",
    position: "relative",
    top: "40%",
    border: "solid #fff thin",
    borderRadius: "50%",
    left: "5%",
  },
  midfieldRight: {
    height: "20%",
    float: "left",
    width: "10%",
    position: "relative",
    top: "40%",
    border: "solid #fff thin",
    borderRadius: "50%",
    right: "5%",
  },
  mostPicked: {
    float: "left",
  },
  lessPicked: {
    float: "right",
  },
  pickedPlayer: {
    height: "100%",
    width: "90%",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: "#fff",
    fontSize: theme.typography.h5.fontSize,
    fontWeight: "bold",
  },
  pickedPlayerTitle: {
    color: "#fff",
  },
  pickedPlayerPercentage: {
    borderBottom: "solid thin",
    width: "15%",
    margin: "10px 0px 0px 65%",
    textAlign: "left",
  },
  pickedPlayerAvatarContainer: {
    position: "relative",
  },
  pickedPlayerAvatar: {
    border: "dashed #b665c1",
    height: 120,
    width: 120,
    position: "absolute",
    left: "50%",
    marginLeft: -60,
    marginTop: -20,
    background: "transparent",
    fontSize: 64,
  },
}));

interface PickedPlayer {
  id: number;
  name: string;
  total: number;
}

export default function PickedPlayer(props: Props) {
  const classes = useStyles();

  const getPlayerInitials = (name: string) => {
    const playerName = name.split(" ");
    const initials = `${playerName[0]?.charAt(0)} ${playerName[
      playerName.length - 1
    ]?.charAt(0)}`;
    return initials;
  };

  const pickedPlayers: PickedPlayer[] = [];
  for (let team of props.teams) {
    for (let player of team.squad) {
      const playerIndex = pickedPlayers.findIndex(
        (item) => item.id === player.player_id
      );
      if (playerIndex !== -1) {
        pickedPlayers[playerIndex].total++;
      } else {
        pickedPlayers.push({
          id: player.player_id,
          name: getPlayerInitials(player.player_name),
          total: 1,
        });
      }
    }
  }
  pickedPlayers.sort((a, b) => b.total - a.total);
  const mostpicked = pickedPlayers.shift();
  const mostPickedPercent = (
    ((mostpicked?.total || 0) / props.teams.length) *
    100
  ).toFixed(0);
  const lesspicked = pickedPlayers.pop();
  const lessPickedPercent = (
    ((lesspicked?.total || 0) / props.teams.length) *
    100
  ).toFixed(0);

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      className={classes.root}
    >
      <Grid item md={6} xs={12} className={classes.mostPickedContainer}>
        <div className={clsx(classes.mostPicked, classes.pickedPlayer)}>
          <div className={classes.pickedPlayerTitle}>Most picked player</div>
          <div className={classes.pickedPlayerPercentage}>
            {mostPickedPercent}%
          </div>
          <div className={classes.pickedPlayerAvatarContainer}>
            <Avatar className={classes.pickedPlayerAvatar}>
              {mostpicked?.name}
            </Avatar>
          </div>
        </div>
        <div className={classes.midfieldLeft}></div>
      </Grid>
      <Grid item md={6} xs={12} className={classes.lessPickedContainer}>
        <div className={classes.midfieldRight}></div>
        <div className={clsx(classes.lessPicked, classes.pickedPlayer)}>
          <div className={classes.pickedPlayerTitle}>Less picked player</div>
          <div className={classes.pickedPlayerPercentage}>
            {lessPickedPercent}%
          </div>
          <div className={classes.pickedPlayerAvatarContainer}>
            <Avatar className={classes.pickedPlayerAvatar}>
              {lesspicked?.name}
            </Avatar>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
