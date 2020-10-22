import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import logoVenturus from "../images/logo-venturus.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: "#f2f4f7",
      color: theme.palette.getContrastText("#f2f4f7"),
      marginLeft: theme.spacing(1),
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logoVenturus} alt="Logo" />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Squad Management Tool
          </Typography>
          <Typography>John Doe</Typography>
          <Avatar aria-label="recipe" className={classes.avatar}>
            JD
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
