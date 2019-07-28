import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import asyncComponent from "../../../util/asyncComponent";

export default class GenericFormComponents extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Redirect
            exact
            from={`${this.props.match.url}/`}
            to={`${this.props.match.url}/dropzone`}
          />
          <Route
            path={`${this.props.match.url}/dropzone`}
            component={asyncComponent(() => import("./routes/dropZone"))}
          />
          <Route
            path={`${this.props.match.url}/location`}
            component={asyncComponent(() => import("./routes/location"))}
          />
          <Route
            path={`${this.props.match.url}/personalInformation`}
            component={asyncComponent(() => import("./routes/personalInformation"))}
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
