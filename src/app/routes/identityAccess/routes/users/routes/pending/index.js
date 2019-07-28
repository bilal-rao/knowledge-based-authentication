import React from "react";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import PendingList from "./../../../../../../../components/customComponents/pendingList/index";

class Pending extends React.Component {
  render() {
    const params = {
      history: this.props.history,
      head: "User",
      mud: "user",
      mc: "PU",
      mId: "uId",
      mainMud: "identity"
    };
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}/view`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            path={`${this.props.match.url}/edit`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            exact
            path={`${this.props.match.url}/`}
            render={() => (
              <div className="app-wrapper">
                <ContainerHeader
                  title={
                    <IntlMessages id="sidebar.identity.user.pendingUsers" />
                  }
                  match={this.props.match}
                />
                <div className="row animated slideInUpTiny animation-duration-3">
                  <div className="col-lg-12 col-md-12 col-sm-s12">
                    <PendingList {...params} />
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Pending;
