import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: "#eae1e8",
    },
    title: {
      flexGrow: 1,
      color: theme.palette.getContrastText("#eae1e8"),
      textAlign: "center",
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  const year = new Date().getFullYear();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title}>
          {year} - All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
