import React from "react";
import { Route } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import Footer from "./components/Footer";

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

const AppRoute = (routeProps: AppRouteProps) => {
  const classes = useStyles();
  const Component = routeProps.component;

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
              render={(props) => <Component {...props} />}
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
