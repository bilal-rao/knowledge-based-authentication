import React from "react";
import AddEditView from "./addEditView";
import ContainerHeader from "components/ContainerHeader/index";
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
            title={<IntlMessages id="sidebar.components.department" />}
            match={this.props.match}
          />
          <AddEditView data={this.props} history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default Form;
