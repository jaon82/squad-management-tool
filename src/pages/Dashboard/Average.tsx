import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  teamsContainer: {
    background: "#e9e0e6",
    padding: theme.spacing(0, 1),
    borderRadius: 5,
    minHeight: "20vh",
  },
  teamContainer: {
    background: "#fff",
    borderRadius: 5,
    height: 50,
    margin: theme.spacing(1, 0),
    cursor: "pointer",
    padding: theme.spacing(0, 2),
    "&:hover": {
      border: "solid #e76f8a",
    },
  },
  teamName: {
    font: "inherit",
  },
  avg: {
    font: "inherit",
    fontWeight: "bold",
  },
}));

interface Data {
  id: number;
  name: string;
  avg: number;
}

interface DataProps {
  data: Data[];
}

export default function Average(props: DataProps) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item className={classes.teamsContainer}>
      {props.data.map(
        (item) =>
          item.avg > 0 && (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.teamContainer}
              key={item.id}
              onClick={() => {
                history.push(`/team/${item.id}`);
              }}
            >
              <Grid item>
                <Typography className={classes.teamName}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.avg}>
                  {item.avg.toFixed(1)}
                </Typography>
              </Grid>
            </Grid>
          )
      )}
    </Grid>
  );
}
