import React from "react";
import IntlMessages from "util/IntlMessages";
import ApprovedList from "./routes/approvedList/approvedList";
import ContainerHeader from "components/ContainerHeader/index";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

class Approved extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact={true}
            path={`${this.props.match.url}/add`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            path={`${this.props.match.url}/view`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            path={`${this.props.match.url}/edit`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            path={`${this.props.match.url}/`}
            render={() => (
              <div className="app-wrapper">
                <ContainerHeader
                  title={<IntlMessages id="sidebar.components.deviations" />}
                  match={this.props.match}
                />
                <div className="row animated slideInUpTiny animation-duration-3">
                  <div className="col-lg-12 col-md-12 col-sm-s12">
                    <ApprovedList history={this.props.history} />
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

export default Approved;
