import React from "react";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import Footer from "./components/Footer";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d10042",
    },
    secondary: {
      main: "#97006b",
      dark: "#620089",
    },
  },
  typography: {
    h6: {
      fontWeight: "bold",
      color: "#620089",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#ededed",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    container: {
      minHeight: "100%",
    },
    mainContainer: {
      margin: theme.spacing(5),
      position: "relative",
      overflowY: "auto",
      background: "yellow",
    },
    main: {
      position: "absolute",
      height: "100%",
      width: "100%",
      display: "flex",
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Grid item xs className={classes.mainContainer}>
            <main className={classes.main}>
              <Routes />
            </main>
          </Grid>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
