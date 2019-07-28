import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import asyncComponent from "../../../util/asyncComponent";

const IdentityAccess = ({ match }) => (
  <div>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/product/:code`}
      />
      <Route
        path={`${match.url}/product/:code`}
        component={asyncComponent(() => import("./routes/product"))}
      />
    </Switch>
  </div>
);

export default IdentityAccess;
