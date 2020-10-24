import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import AppRoute from "./AppRoute";

import Dashboard from "./pages/Dashboard/";
import TeamForm from "./pages/Team/TeamForm";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute exact path="/" component={Dashboard} />
        <AppRoute path="/team" component={TeamForm} />
        <AppRoute path="/team/:id" component={TeamForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
