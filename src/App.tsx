import React from "react";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

import Header from "./components/Header";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d10042",
    },
    secondary: {
      main: "#97006b",
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
