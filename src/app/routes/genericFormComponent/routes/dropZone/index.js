import React from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import DropzoneComponent from "react-dropzone-component";
import ContainerHeader from "components/ContainerHeader/index";
import { Helmet } from "react-helmet";
import "../../../../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../../../../node_modules/dropzone/dist/min/dropzone.min.css";

var componentConfig = {
  postUrl: "https://reqres.in/api/users"
  // iconFiletypes: [".jpg", ".png", ".gif", "files"],
  // showFiletypeIcon: true
};
var djsConfig = { autoProcessQueue: true, addRemoveLinks: true, uploadMultiple: true, maxFiles: 1};
//here eventHandlers commented until and unless apis are not builds on backend side
var eventHandlers = {
  addedfile: file => {
    console.log('@@@',file)
    if(file.status === "success"){
      console.log(file)
    }
  }, 
  // All of these receive a list of files as first parameter
  // and are only called if the uploadMultiple option
  // in djsConfig is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null
};

class DropZone extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Loan Smart | LOS</title>
        </Helmet>
        <div className="app-wrapper">
          <ContainerHeader
            title={<IntlMessages id="sidebar.forms.DropZone" />}
            match={this.props.match}
          />
          <div className="row animated slideInUpTiny animation-duration-3">
            <CardBox
              styleName="col-12"
              cardStyle=" p-0"
              // heading={<IntlMessages id="table.heading.employeeListing"/>}
              headerOutside
            >
              <div className="app-wrapper">
                <DropzoneComponent
                  config={componentConfig}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
                />
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    );
  }
}

export default DropZone;
