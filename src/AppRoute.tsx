import React, { useState } from "react";
import { Route } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Team from "./helpers/Team";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    container: {
      minHeight: "100%",
    },
    main: {
      padding: 40,
    },
  })
);

interface AppRouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

interface StorageTeams {
  teams: Team[];
}

const AppRoute = (routeProps: AppRouteProps) => {
  const storageToken = "@venturus-squad-management-tool";
  const classes = useStyles();
  const Component = routeProps.component;
  let storageTeams = [];
  const storageString = localStorage.getItem(storageToken);
  if (storageString) {
    const storageObject = JSON.parse(storageString);
    storageTeams = storageObject.teams;
  }
  const [teams, setTeams] = useState<Team[]>(storageTeams);

  const updateTeams = (teams: Team[]) => {
    const storageString = localStorage.getItem(storageToken);
    let storageObject = storageString ? JSON.parse(storageString) : {};
    storageObject.teams = teams;
    localStorage.setItem(storageToken, JSON.stringify(storageObject));
    setTeams(teams);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className={classes.container}
      >
        <Grid item>
          <Header />
        </Grid>
        <Grid item xs>
          <main className={classes.main}>
            <Route
              exact
              path={routeProps.path}
              render={(props) => (
                <Component {...props} teams={teams} updateTeams={updateTeams} />
              )}
            />
          </main>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default AppRoute;
