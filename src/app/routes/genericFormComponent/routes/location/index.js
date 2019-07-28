import React from "react";
import GeoLocationWithReverseCoding from "./Components/GeoLocation";
import CardBox from "components/CardBox";
import ContainerHeader from "components/ContainerHeader";
import IntlMessages from "util/IntlMessages";
import GenericForm from "./Form";

export default class Location extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <ContainerHeader
            title={<IntlMessages id="sidebar.map.geoLocation" />}
            match={this.props.match}
          />
          <GenericForm />
          <div className="row">
            <CardBox styleName="col-lg-12">
              <GeoLocationWithReverseCoding />
            </CardBox>
          </div>
        </div>
      </div>
    );
  }
}
