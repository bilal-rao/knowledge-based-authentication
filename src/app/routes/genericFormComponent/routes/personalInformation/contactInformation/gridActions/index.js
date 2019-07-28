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
  editContact,
  deleteContact
} from "../../../../../../../actions/PersonalInformation";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, ModalHeader } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      edit: false,
      warning: false,
      mobilePhoneNo: "",
      email: "",
      extension: "",
      officePhone: "",
      resPhone: "",
      addressForm: [],
      addAddressState: true,
      openForView: false,
      openForEdit: false
    };
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    this.props.deleteContact(id);
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
  onAddressClose = () => {
    this.setState({ openForView: false, view: false, openForEdit: false });
  };
  onEditAddress = () => {
    const data = {
      id: this.props.id,
      resPhone: this.state.resPhone,
      email: this.state.email,
      extension: this.state.extension,
      officePhone: this.state.officePhone,
      mobilePhoneNo: this.state.mobilePhoneNo,
      nearestLandMark: this.state.nearestLandMark,
      provinceCode: this.state.provinceCode,
      postalCode: this.state.postalCode
    };
    this.props.editContact(data);
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  viewDetails(obj) {
    this.setState({
      view: true,
      openForView: true,
      postalCode: obj.postalCode,
      provinceCode: obj.provinceCode,
      nearestLandMark: obj.nearestLandMark,
      mobilePhoneNo: obj.mobilePhoneNo,
      email: obj.email,
      extension: obj.extension,
      officePhone: obj.officePhone,
      resPhone: obj.resPhone
    });
  }
  editDetails(obj) {
    this.setState({
      edit: true,
      openForEdit: true,
      view: false,
      openForView: false,
      postalCode: obj.postalCode,
      provinceCode: obj.provinceCode,
      nearestLandMark: obj.nearestLandMark,
      mobilePhoneNo: obj.mobilePhoneNo,
      email: obj.email,
      extension: obj.extension,
      officePhone: obj.officePhone,
      resPhone: obj.resPhone
    });
  }
  render() {
    const {
      warning,
      resPhone,
      officePhone,
      extension,
      email,
      mobilePhoneNo,
      nearestLandMark,
      provinceCode,
      postalCode
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
              toggle={this.onAddressClose}
              isOpen={this.state.openForView}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.viewAddress" />
                <IconButton name=""
                  className="text-white"
                  onClick={this.onAddressClose}
                >
                  <CloseIcon />
                </IconButton>
              </ModalHeader>

              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      id="required"
                      label={<IntlMessages id="contacts.resPhone" />}
                      value={resPhone}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      label={<IntlMessages id="contacts.email" />}
                      value={email}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      label={<IntlMessages id="contacts.extension" />}
                      value={extension}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      label={<IntlMessages id="contacts.officePhone" />}
                      value={officePhone}
                      margin="normal"
                      type="number"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      id="required"
                      label={<IntlMessages id="contacts.mobilePhoneNo" />}
                      value={mobilePhoneNo}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </Modal>
          ) : this.state.edit ? (
            <Modal
              className="modal-box"
              toggle={this.onAddressClose}
              isOpen={this.state.openForEdit}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.viewAddress" />
                <IconButton name=""
                  className="text-white"
                  onClick={this.onAddressClose}
                >
                  <CloseIcon />
                </IconButton>
              </ModalHeader>

              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      id="required"
                      label={<IntlMessages id="contacts.resPhone" />}
                      onChange={this.handleChange("resPhone")}
                      value={resPhone}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      label={<IntlMessages id="contacts.email" />}
                      onChange={this.handleChange("email")}
                      value={email}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      label={<IntlMessages id="contacts.extension" />}
                      onChange={this.handleChange("extension")}
                      value={extension}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      label={<IntlMessages id="contacts.officePhone" />}
                      onChange={this.handleChange("officePhone")}
                      value={officePhone}
                      margin="normal"
                      type="number"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      id="required"
                      label={<IntlMessages id="contacts.mobilePhoneNo" />}
                      onChange={this.handleChange("mobilePhoneNo")}
                      value={mobilePhoneNo}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                </div>
              </div>

              <div className="modal-box-footer d-flex flex-row">
                <Button name=""
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.onEditAddress();
                    this.onAddressClose();
                  }}
                >
                  <IntlMessages id="personalInformation.saveAddress" />
                </Button>
              </div>
            </Modal>
          ) : (
            ""
          )}
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
    editContact,
    deleteContact
  }
)(Actions);
