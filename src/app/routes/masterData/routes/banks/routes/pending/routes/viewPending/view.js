import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  fetchIndividualBank,
  showBankLoader,
  showBankDeleteLoader,
  deleteBankFromViewPage,
  removeIndividualBankData
} from "actions/Bank";

import Button from "@material-ui/core/Button";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardHeader,
  CardText,
  CardFooter
} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import { Badge } from "reactstrap";
import permissions from "../../../../../../../../../config/permissions";

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      name: "",
      status: "",
      description: "",
      code: "",
      banks: null,
      image: "",
      acronym: "",
      id: "",
      IsEditFromView: false,
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
    this.props.showBankDeleteLoader();
    this.props.deleteBankFromViewPage(id);
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  componentDidUpdate() {
    if (this.props.getIndividualRecord.page === 'edit') {
      this.props.data.history.push('/app/masterdata-management/bank/bank/edit/' + this.props.getIndividualRecord.id);
    }
    if (this.props.deleteBankSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been deleted as draft!')
        this.props.data.history.push('/app/masterdata-management/bank/pendingbank');
      }
      else {
        NotificationManager.success('Bank has been deleted!')
        this.props.data.history.push('/app/masterdata-management/bank/bank');
      }
    }
  }
  componentWillUnmount() {
    if (!this.state.IsEditFromView) {
      this.props.removeIndividualBankData();
    }
  }
  componentWillMount() {
    if (this.props.getIndividualRecord) {
      var str = this.props.getIndividualRecord.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        name: this.props.getIndividualRecord.name,
        status: this.props.getIndividualRecord.status,
        description: this.props.getIndividualRecord.description,
        code:this.props.getIndividualRecord.code,
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
  render() {
    const { warning } = this.state;
    const { showMessage, alertMessage, loader } = this.props;
    return (
      <div>
        <Card className="shadow border-0">
          <CardHeader>
            {this.state.image ? (
              <Avatar
                style={{ display: "inline-table" }}
                alt="Avatar"
                src={this.state.image}
              />
            ) : (
                <Avatar
                  className="bg-warning"
                  style={{ display: "inline-flex" }}
                >
                  <h3 className="m-0 text-white">
                    {this.state.acronym.toUpperCase()}
                  </h3>
                </Avatar>
              )}
            &nbsp;&nbsp;
                        {<IntlMessages id="sidebar.components.viewBank" />}
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Name"
                  value={this.state.name}
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Status"
                  defaultValue={
                    this.state.status === 0 ? "Active" : "InActive"
                  }
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Code"
                  fullWidth
                  disabled
                  defaultValue={this.state.code ? this.state.code : "Not Found"}
                  margin="normal"
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Description"
                  fullWidth
                  disabled
                  defaultValue={this.state.description ? this.state.description : "Not Found"}
                  margin="normal"
                />
              </div>
              <div
                className="col-md-12 col-12"
                style={{ textAlign: "right", marginTop: "15px" }}
              >
                <div className="jr-btn-bank">
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-cyan text-white"
                    disabled={this.state.update ? (this.props.getIndividualRecord.status === 1 ? true : false) : true}
                    onClick={() => {
                      localStorage.setItem('bId', this.props.getIndividualRecord.id);
                      this.props.showBankLoader();
                      this.setState({ IsEditFromView: true })
                      this.props.fetchIndividualBank({
                        id: this.props.getIndividualRecord.id,
                        page: "edit"
                      })
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
              onConfirm={() =>
                this.deleteFile(this.props.getIndividualRecord.id)
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
    getIndividualRecord: state.banksData
      ? state.banksData.individualBankData.data
      : [],
    isLoad: state.banksData.deleteBankLoader,
    showMessage: state.banksData.showMessage,
    alertMessage: state.banksData.alertMessage,
    loader: state.banksData.loader,
    deleteBankSuccess: state.banksData.deleteBankSuccess,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : '',
    permissions: state.actions.actionsData ? state.actions.actionsData.actions : []
  };
}
export default connect(
  mapStateToProps,
  {
    showBankDeleteLoader,
    deleteBankFromViewPage,
    showBankLoader,
    fetchIndividualBank,
    removeIndividualBankData
  }
)(View);

