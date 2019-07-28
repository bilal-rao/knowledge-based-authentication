import React from "react";
import AddForm from "./addForm";
import ContainerHeader from "components/ContainerHeader/index";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";


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
                  <IntlMessages id="sidebar.masterdata.hierarchy.hierarchy" />
                }
                match={this.props.match}
              />
              <AddForm data={this.props} />
            </div>
          </div>
    );
  }
}

export default Form;
