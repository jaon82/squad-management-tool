import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import AppRoute from "./AppRoute";

import Dashboard from "./pages/Dashboard/";
import TeamForm from "./pages/Team/TeamForm";

function Routes() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <AppRoute exact path="/" component={Dashboard} />
        <AppRoute exact path="/team" component={TeamForm} />
        <AppRoute exact path="/team/:id" component={TeamForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
