import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  showHierarchyLoader,
  fetchIndividualHierarchy,
  showHierarchyDeleteLoader,
  deleteHierarchyFromViewPage,
  removeIndividualHierarchyData,
  hideHierarchyMessage,
} from "actions/Hierarchy";
import Button from "@material-ui/core/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import permissions from "../../../../../../../../../config/permissions";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      name: "",
      email: "",
      status: "",
      salary: "",
      description: null,
      image: "",
      acronym: "",
      groupId: "",
      hierarchyTypeId: "",
      IsEditFromView: false,
      isMakerCheckerEnabled: true,
      update: false,
      delete: false
    };
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    this.props.showHierarchyDeleteLoader();
    this.props.deleteHierarchyFromViewPage(id);
    this.setState({
      warning: false
    });
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  componentWillUnmount() {
    if (!this.state.IsEditFromView) {
      this.props.removeIndividualHierarchyData();
    }
  }
  componentWillMount() {
    if (this.props.getIndividualRecord) {
      var str = this.props.getIndividualRecord.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        type: this.props.getIndividualRecord.hierarchyTypeId,
        code: this.props.getIndividualRecord.code,
        secondaryCode: this.props.getIndividualRecord.secondaryCode,
        name: this.props.getIndividualRecord.name,
        email: this.props.getIndividualRecord.emailAddress,
        contactNumber: this.props.getIndividualRecord.contactNumber,
        status: this.props.getIndividualRecord.status,
        description: this.props.getIndividualRecord.description,
        image: this.props.getIndividualRecord.image,
        acronym: acronym
      });
    }
    //Permission on Button For Enabling / Disabling 

    if (this.props.permissions) {
      this.props.permissions.map((data) => {
        if (data.actionId === permissions.Update) {
          data.isSelected ? this.setState({ update: true }) : this.setState({ update: false })
        }
        else if (data.actionId === permissions.Delete) {
          data.isSelected ? this.setState({ delete: true }) : this.setState({ delete: false })
        }
      })
    }
  }
  componentDidUpdate() {
    if (this.props.getIndividualRecord.page === 'edit') {
      this.props.data.history.push('/app/masterdata-management/hierarchies/pending/edit/' + this.props.getIndividualRecord.id);
    }
    if (this.props.deleteHierarchySuccess) {
      // if (this.state.isMakerCheckerEnabled) {
      //   NotificationManager.success('Your changes has been deleted as draft!')
      //   this.props.data.history.push('/app/masterdata-management/hierarchies/pending');
      // }
      // else {
      NotificationManager.success('Hierarchy has been deleted!')
      this.props.data.history.push('/app/masterdata-management/hierarchies/pending');
    }
    // }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideHierarchyMessage();
      }, 100);
    }
  }

  render() {
    const { acronym, image, hierarchyTypeId, code, secondaryCode, name, email, contactNumber, description, status, warning } = this.state;
    const { showMessage, alertMessage, loader } = this.props;
    return (
      <div>
        <Card className="shadow border-0">
          <CardHeader>
            {image ? (
              <Avatar
                style={{ display: "inline-table" }}
                alt="Avatar"
                src={image}
              />
            ) : (
                <Avatar className="bg-warning" style={{ display: "inline-flex" }}>
                  <h3 className="m-0 text-white">{acronym.toUpperCase()}</h3>
                </Avatar>
              )}
            &nbsp;&nbsp;
            {<IntlMessages id="sidebar.master.hierarchy.view" />}
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Hierarchy Type"
                  fullWidth
                  value={hierarchyTypeId === 0 ? 'Area ' : hierarchyTypeId === 1 ? 'Branch' : hierarchyTypeId === 2 ? 'City' : hierarchyTypeId === 3 ? 'Province' : 'Zone '}
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Code"
                  fullWidth
                  value={code}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Secondary Code"
                  fullWidth
                  value={secondaryCode}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Name"
                  type="text"
                  value={name}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  helperText="jsmith@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  disabled
                  value={email}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  helperText="923XZYYYYYYY"
                  label="Contact Number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  disabled
                  value={contactNumber}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Description"
                  fullWidth
                  disabled
                  defaultValue={description ? description : "Not Found"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Status"
                  defaultValue={status === 0 ? "Active" : "InActive"}
                  fullWidth
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div
                className="col-md-12 col-12"
                style={{ textAlign: "right", marginTop: "15px" }}
              >
                <div className="jr-btn-group">
                  <Button name=""
                    variant="contained"
                    color="primary"
                    className="jr-btn bg-cyan text-white"
                    disabled={this.state.update ? (this.props.getIndividualRecord.status === 1 ? true : false) : true}
                    onClick={() => {
                      localStorage.setItem('hId', this.props.getIndividualRecord.id);
                      this.props.showHierarchyLoader();
                      this.setState({ IsEditFromView: true })
                      this.props.fetchIndividualHierarchy({
                        id: this.props.getIndividualRecord.id,
                        page: "edit"
                      });
                    }}
                  >
                    <i className="zmdi zmdi-edit" />
                    <span>Edit</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-red text-white"
                    disabled={this.state.delete ? false : true}
                    onClick={() => this.setState({ warning: true })}
                  >
                    <i className="zmdi zmdi-delete" />
                    <span>Delete</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn"
                    onClick={() => this.props.data.history.goBack()}
                  >
                    <i className="zmdi zmdi-arrow-left" />
                    <span>Back</span>
                  </Button>
                </div>
              </div>
            </div>
            <SweetAlert
              show={warning}
              warning
              showCancel
              confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt" />}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={<IntlMessages id="sweetAlerts.areYouSure" />}
              onConfirm={
                () => this.deleteFile(this.props.getIndividualRecord.id)
              }
              onCancel={this.onCancelDelete}
            >
              {this.props.isLoad && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
              <IntlMessages id="sweetAlerts.youWillNotAble" />
            </SweetAlert>
          </CardBody>
        </Card>
        {loader && <Loader />}
        {showMessage && NotificationManager.error(alertMessage)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getIndividualRecord: state.hierarchiesData
      ? state.hierarchiesData.individualHierarchyData.data
      : "",

    isSuccess: state.hierarchiesData.userDetailSuccess,
    isLoad: state.hierarchiesData.deleteHierarchyLoader,
    alertMessage: state.hierarchiesData.alertMessage,
    loader: state.hierarchiesData.loader,
    deleteHierarchySuccess: state.hierarchiesData.deleteHierarchySuccess,
    permissions: state.actions.actionsData ? state.actions.actionsData.actions : []
  };
}
export default connect(mapStateToProps, {
  showHierarchyDeleteLoader,
  deleteHierarchyFromViewPage,
  showHierarchyLoader,
  fetchIndividualHierarchy,
  removeIndividualHierarchyData,
  hideHierarchyMessage,
})(View);


