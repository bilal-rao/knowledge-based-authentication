import React from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import { Helmet } from "react-helmet";
import PersonalInformationForm from "./personalInformationForm";

class PersonalInformation extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Loan Smart | LOS</title>
        </Helmet>
        <div className="app-wrapper">
          <ContainerHeader
            title={<IntlMessages id="sidebar.forms.PersonalInformation" />}
            match={this.props.match}
          />
          <div className="row animated slideInUpTiny animation-duration-3">
              <div className="app-wrapper">
                <PersonalInformationForm />
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInformation;
