import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import BasicCard from "./basicCards/BasicCard";
import IntlMessages from "util/IntlMessages";
import Button from "@material-ui/core/Button";
import View from "./view";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Avatar from "@material-ui/core/Avatar";

class ViewDetail extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Loan Smart | LOS</title>
        </Helmet>
        <div className="animated slideInUpTiny animation-duration-3">
          <ContainerHeader
            title={<IntlMessages id="sidebar.masterdata.hierarchy.hierarchy" />}
            match={this.props.match}
          />
          <View data={this.props}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getIndividualRecord: state
  };
}
export default connect(mapStateToProps, null)(ViewDetail);

