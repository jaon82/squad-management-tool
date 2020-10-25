import React, { DragEvent, Fragment } from "react";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { useWatch, Control } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import Team from "../../helpers/Team";
import Player from "../../helpers/Player";

const useStyles = makeStyles((theme: Theme) => ({
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
    color: "#fff",
    fontWeight: 500,
  },
}));

interface Props {
  control: Control<Team>;
  players: Player[];
  disablePlayer: (idPlayer: number) => void;
  squad: any[];
  updateSquad: (squad: any[]) => void;
}

interface PositionProps {
  playerIndex: number;
  player: Player;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

export default function Formation({
  control,
  players,
  disablePlayer,
  squad,
  updateSquad,
}: Props) {
  const classes = useStyles();

  const formation = useWatch({
    control,
    name: "formation",
    defaultValue: control.getValues("formation"),
  });

  const fieldZones = formation ? formation.split(" - ").reverse() : [];

  const onDragOverHandler = (ev: DragEvent) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const onDropHandler = (ev: DragEvent, playerIndex: number) => {
    ev.preventDefault();
    const playerId = Number(ev.dataTransfer.getData("text"));
    const player = players.find((item) => item.player_id === playerId);
    const actualSquad = [...squad];
    actualSquad[playerIndex] = player;
    updateSquad(actualSquad);
    disablePlayer(playerId);
  };

  function PlayerContainer({ playerIndex, player }: PositionProps) {
    const playerName = player?.player_name.split(" ") || null;
    const initials = playerName
      ? `${playerName[0]?.charAt(0)} ${playerName[
          playerName.length - 1
        ]?.charAt(0)}`
      : null;

    return (
      <Grid item className={classes.playerContainer}>
        <HtmlTooltip
          title={
            <Fragment>
              <Typography color="inherit">{player.player_name}</Typography>
              <b>Country: </b> {player.birth_country}
              <br />
              <b>Birth Date: </b> {player.birth_date}
              <br />
              <b>Age: </b> {player.age}
            </Fragment>
          }
        >
          <div
            className={classes.playerBackground}
            onDrop={(event) => onDropHandler(event, playerIndex)}
            onDragOver={onDragOverHandler}
          >
            {initials}
            <Add
              fontSize="large"
              style={{
                color: "#fff",
                display: player ? "none" : "",
              }}
            />
          </div>
        </HtmlTooltip>
      </Grid>
    );
  }

  let positions: any[] = [];
  for (let i = 0; i < 10; i++) {
    positions.push(
      <PlayerContainer key={i} playerIndex={i} player={squad[i]} />
    );
  }

  const showPositions = (zone: number, index: number) => {
    let start = 0;
    for (let i = 0; i < index; i++) {
      start += Number(fieldZones[i]);
    }
    return positions.slice(start, start + zone);
  };

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
          {showPositions(Number(zone), index)}
        </Grid>
      ))}
      {formation && (
        <PlayerContainer key={11} playerIndex={10} player={squad[10]} />
      )}
    </Grid>
  );
}
