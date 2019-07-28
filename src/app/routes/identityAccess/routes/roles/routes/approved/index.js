import React from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import ApprovedTable from "./routes/approvedTable";
import ContainerHeader from "components/ContainerHeader/index";
import SearchApproved from "./routes/searchApproved";
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
            component={asyncComponent(() => import("./routes/addApproved"))}
          />
          <Route
            path={`${this.props.match.url}/view`}
            component={asyncComponent(() => import("./routes/viewApproved"))}
          />
          <Route
            path={`${this.props.match.url}/edit`}
            component={asyncComponent(() => import("./routes/editApproved"))}
          />
          <Route
            path={`${this.props.match.url}/`}
            render={() => (
              <div className="app-wrapper">
                <ContainerHeader
                  title={<IntlMessages id="sidebar.components.role" />}
                  match={this.props.match}
                />
                <SearchApproved />
                <div className="row animated slideInUpTiny animation-duration-3">
                  <CardBox
                    styleName="col-12"
                    cardStyle=" p-0"
                    headerOutside
                  >
                    <ApprovedTable history={this.props.history} />
                  </CardBox>
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
