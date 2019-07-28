import React from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import PendingTable from "./routes/pendingTable";
import ContainerHeader from "components/ContainerHeader/index";
import SearchPending from "./routes/searchPending";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";


class Pending extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}/view`}
            component={asyncComponent(() => import("./routes/viewPending"))}
          />
          <Route
            path={`${this.props.match.url}/edit`}
            component={asyncComponent(() => import("./routes/editPending"))}
          />
          <Route
            path={`${this.props.match.url}/`}
            render={() => (
              <div className="app-wrapper">
                <ContainerHeader
                  title={<IntlMessages id="sidebar.masterdata.bank.pendingbank" />}
                  match={this.props.match}
                />
                <SearchPending />
                <div className="row animated slideInUpTiny animation-duration-3">
                  <CardBox
                    styleName="col-12"
                    cardStyle=" p-0"
                    headerOutside
                  >
                    <PendingTable history={this.props.history} />
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

export default Pending;
