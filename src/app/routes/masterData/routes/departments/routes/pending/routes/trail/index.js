import React from "react";
import Trail from "./../../../../../../../../../components/customComponents/trail/index";
import ContainerHeader from "components/ContainerHeader";
import { Helmet } from "react-helmet";

import IntlMessages from "util/IntlMessages";

class Form extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Loan Smart | LOS</title>
        </Helmet>
        <div className="animated slideInUpTiny animation-duration-3">
          <ContainerHeader
            title={
              <IntlMessages id="sidebar.identity.group.pendingGroups" />
            }
            match={this.props.match}
          />
          <Trail data={this.props} history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default Form;
