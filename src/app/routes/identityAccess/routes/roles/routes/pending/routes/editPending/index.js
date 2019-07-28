import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import BasicCard from "./basicCards/BasicCard";
import IntlMessages from "util/IntlMessages";
import Button from "@material-ui/core/Button";
import Edit from "./edit";
import { Helmet } from "react-helmet";

class EditUser extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Loan Smart | LOS</title>
        </Helmet>
        <div className="animated slideInUpTiny animation-duration-3">
          <ContainerHeader
            title={<IntlMessages id="sidebar.identity.role.pendingRoles" />}
            match={this.props.match}
          />
          <Edit data={this.props} />
        </div>
      </div>
    );
  }
}

export default EditUser;
