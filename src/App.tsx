import React from "react";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

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
    MuiFormLabel: {
      root: {
        color: "inherit",
        fontWeight: 500,
        lineHeight: 2,
      },
    },
    MuiButton: {
      containedSecondary: {
        backgroundColor: "#96007b",
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
