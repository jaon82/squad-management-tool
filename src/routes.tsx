import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/";
import TeamForm from "./pages/Team/TeamForm";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/team" component={TeamForm} />
        <Route path="/team/:id" component={TeamForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
