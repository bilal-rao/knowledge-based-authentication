import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import keycode from "keycode";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core/Table";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  editIdentity,
  deleteIdentity
} from "../../../../../../../actions/PersonalInformation";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, ModalHeader } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "material-ui-pickers";
import IdentitySelect from './identityType'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MaskedInput from "react-text-mask";


class NicMask extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[
          /[1-9]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/
        ]}
        // placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}
class PassportMask extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[
          /[A-Z]/,
          /[A-Z]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        //   placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}


class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      edit: false,
      warning: false,
      openForView: false,
      openForEdit: false,
      identityType: '',
      newCnicMask: "     -       - ",
      oldCnicMask: "     -       - ",
      passportCnicMask: "         ",
      identityNumber: '',
      issuanceDate: '',
      expiryDate: ''
    };
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    this.props.deleteIdentity(id);
    this.setState({
      warning: false
    });
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  WarningTrue = () => {
    this.setState({
      warning: true
    });
  };
  onIdentityClose = () => {
    this.setState({ openForView: false, view: false, openForEdit: false });
  };
  identityCallback = dataFromChild => {
    this.setState({
      identityType: dataFromChild
    });
  };
  onEditIdentity = () => {
    const data = {
      id: this.props.id,
      identityType: this.state.identityType,
      identityNumber: this.state.identityNumber,
      issuanceDate: this.state.issuanceDate,
      expiryDate: this.state.expiryDate
    };
    this.props.editIdentity(data);
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      identityNumber: event.target.value
    });
  };
  viewDetails(obj) {
    this.setState({
      view: true,
      openForView: true,
      identityType: obj.identityType,
      identityNumber: obj.identityNumber,
      issuanceDate: obj.issuanceDate,
      expiryDate: obj.expiryDate
    });
  }
  editDetails(obj) {
    this.setState({
      edit: true,
      openForEdit: true,
      view: false,
      openForView: false,
      identityType: obj.identityType,
      identityNumber: obj.identityNumber,
      issuanceDate: obj.issuanceDate,
      expiryDate: obj.expiryDate
    });
    if(obj.identityType === 'CNIC'){
        this.setState({
          newCnicMask: obj.identityNumber,
          oldCnicMask: '',
          passportCnicMask:'',
        })
    }
    else if(obj.identityType === 'Old CNIC'){
      this.setState({
        newCnicMask: '',
        oldCnicMask: obj.identityNumber,
        passportCnicMask:'',
      })
    }
    else {
      this.setState({
        passportCnicMask: obj.identityNumber
      })
    }
  }
  render() {
    const {
      warning,
      identityType,
      identityNumber,
      issuanceDate,
      expiryDate,
      newCnicMask,
      oldCnicMask,
      passportCnicMask
    } = this.state;
    return (
      <div style={{ display: "inline-flex" }}>
        <Tooltip title="View">
          <IconButton name=""
            aria-label="View"
            onClick={this.viewDetails.bind(this, this.props.data)}
          >
            <ViewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton name=""
            aria-label="Edit"
            onClick={this.editDetails.bind(this, this.props.data)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton name="" aria-label="Delete" onClick={this.WarningTrue}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <div>
          {this.state.view ? (
            <Modal
              className="modal-box"
              toggle={this.onIdentityClose}
              isOpen={this.state.openForView}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.viewIdentity" />
                <IconButton name=""
                  className="text-white"
                  onClick={this.onIdentityClose}
                >
                  <CloseIcon />
                </IconButton>
              </ModalHeader>

              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      label="Identity Type"
                      value={identityType ? identityType : "Not Found"}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      label="Identity Number"
                      value={identityNumber ? identityNumber : "Not Found"}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12" style={{ marginTop: "15px" }}>
                    <TextField name=""
                      disabled
                      label="Issuance Date"
                      value={issuanceDate ? issuanceDate : "Not Found"}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12" style={{ marginTop: "15px" }}>
                    <TextField name=""
                      disabled
                      label="Expiry Date"
                      value={expiryDate ? expiryDate : "Not Found"}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </Modal>
          ) : this.state.edit ?
              <Modal
                className="modal-box"
                toggle={this.onIdentityClose}
                isOpen={this.state.openForEdit}
              >
                <ModalHeader className="modal-box-header bg-primary">
                  <IntlMessages id="personalInformation.EditIdentity" />
                  <IconButton name=""
                    className="text-white"
                    onClick={this.onIdentityClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </ModalHeader>
                <div className="modal-box-content">
                  <div className="row">
                    <div className="col-md-6 col-12" style={{ paddingTop: "15px" }}>
                      <IdentitySelect
                        options={JSON.parse(localStorage.getItem("identityType"))}
                        identity={this.identityCallback}
                        value={identityType}
                      />
                    </div>
                    {this.state.identityType === "CNIC" ? (
                      <div className="col-md-6 col-12">
                        <FormControl className="mb-3" fullWidth>
                          <InputLabel>CNIC Number</InputLabel>
                          <Input name=""
                            value={newCnicMask}
                            inputComponent={NicMask}
                            onChange={this.handleChange("newCnicMask")}
                          />
                        </FormControl>
                      </div>
                    ) : this.state.identityType === "Old CNIC" ? (
                      <div className="col-md-6 col-12">
                        <FormControl className="mb-3" fullWidth>
                          <InputLabel>Old CNIC Number</InputLabel>
                          <Input name=""
                            placeholder="Old CNIC Number"
                            value={oldCnicMask}
                            inputComponent={NicMask}
                            onChange={this.handleChange("oldCnicMask")}
                          />
                        </FormControl>
                      </div>
                    ) : this.state.identityType === "Passport" ? (
                      <div className="col-md-6 col-12">
                        <FormControl className="mb-3" fullWidth>
                          <InputLabel>Passport Number</InputLabel>
                          <Input name=""
                            value={passportCnicMask}
                            inputComponent={PassportMask}
                            onChange={this.handleChange("passportCnicMask")}
                          />
                        </FormControl>
                      </div>
                    ) : (
                            <div
                              className="col-md-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <Input name="" placeholder="Identity Number" disabled fullWidth />
                            </div>
                          )}
                    <div className="col-md-6 col-12" style={{ marginTop: "15px" }}>
                      <DatePicker
                        fullWidth
                        value={issuanceDate}
                        label="Issuance Date"
                        onChange={date =>
                          this.setState({
                            issuanceDate: date.format("YYYY-MM-DD")
                          })
                        }
                        animateYearScrolling={false}
                        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                      />
                    </div>
                    <div className="col-md-6 col-12" style={{ marginTop: "15px" }}>
                      <DatePicker
                        fullWidth
                        value={expiryDate}
                        label="Expiry Date"
                        onChange={date =>
                          this.setState({
                            expiryDate: date.format("YYYY-MM-DD")
                          })
                        }
                        animateYearScrolling={false}
                        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-box-footer d-flex flex-row">
                  <Button name=""
                    disabled={
                      newCnicMask && oldCnicMask && passportCnicMask === ""
                        ? true
                        : false
                    }
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({
                        id: this.state.id
                      });
                      this.onEditIdentity();
                      this.setState({
                        newCnicMask: "",
                        oldCnicMask: "",
                        passportCnicMask: ""
                      });
                      this.onIdentityClose();
                    }}
                  >
                    <IntlMessages id="personalInformation.saveIdentity" />
                  </Button>
                </div>
              </Modal>
              :
              ""
          }
        </div>
        <SweetAlert
          show={warning}
          warning
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt" />}
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={() => this.deleteFile(this.props.data.id)}
          onCancel={this.onCancelDelete}
        >
          {this.props.isloading && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
          <IntlMessages id="sweetAlerts.youWillNotAble" />
        </SweetAlert>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isloading: state.usersData.deleteUserPending
  };
}

export default connect(
  mapStateToProps,
  {
    editIdentity,
    deleteIdentity
  }
)(Actions);
