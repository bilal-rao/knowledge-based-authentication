import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

class User extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Redirect
            exact
            from={`${this.props.match.url}/`}
            to={`${this.props.match.url}/approved`}
          />
          <Route
            path={`${this.props.match.url}/approved`}
            component={asyncComponent(() => import("./routes/approved"))}
          />
          <Route
            path={`${this.props.match.url}/pending`}
            component={asyncComponent(() => import("./routes/pending"))}
          />
          <Route
            component={asyncComponent(() =>
              import("app/routes/extraPages/routes/404")
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default User;
