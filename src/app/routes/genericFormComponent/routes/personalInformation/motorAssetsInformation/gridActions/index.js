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
  editMotorAssets,
  deleteMotorAssets
} from "../../../../../../../actions/PersonalInformation";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, ModalHeader } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      edit: false,
      warning: false,
      make: "",
      model: "",
      years: "",
      registrationNo: "",
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
    this.props.deleteMotorAssets(id);
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
  onAssetClose = () => {
    this.setState({ openForView: false, view: false, openForEdit: false });
  };
  onEditAssets = () => {
    const data = {
      id: this.props.id,
      model: this.state.model,
      years: this.state.years,
      registrationNo: this.state.registrationNo,
      make: this.state.make
    };
    this.props.editMotorAssets(data);
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleCheckBox = name => (event, checked) => {
    this.setState({[name]: checked});
};
  viewDetails(obj) {
    this.setState({
      view: true,
      openForView: true,
      make: obj.make,
      model: obj.model,
      years: obj.years,
      registrationNo: obj.registrationNo
    });
  }
  editDetails(obj) {
    this.setState({
      edit: true,
      openForEdit: true,
      view: false,
      openForView: false,
      make: obj.make,
      model: obj.model,
      years: obj.years,
      registrationNo: obj.registrationNo
    });
  }
  render() {
    const {
      warning,
      resPhone,
      registrationNo,
      years,
      model,
      make,
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
              toggle={this.onAssetClose}
              isOpen={this.state.openForView}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.motor.viewAssets" />
                <IconButton name="" className="text-white" onClick={this.onAssetClose}>
                  <CloseIcon />
                </IconButton>
              </ModalHeader>

              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      value={make}
                      required
                      id="required"
                      label={<IntlMessages id="assets.motor.make" />}
                      onChange={this.handleChange("make")}
                      type="text"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      value={model}
                      id="required"
                      label={<IntlMessages id="assets.motor.model" />}
                      onChange={this.handleChange("model")}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      value={years}
                      id="required"
                      label={<IntlMessages id="assets.motor.years" />}
                      onChange={this.handleChange("years")}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      value={registrationNo}
                      id="required"
                      label={<IntlMessages id="assets.motor.registrationNo" />}
                      onChange={this.handleChange("registrationNo")}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={this.state.carFinance}
                            onChange={this.handleCheckBox("carFinance")}
                            value="carFinance"
                          />
                        }
                        disabled
                        label="Finance / Leased"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </Modal>
          ) : this.state.edit ? (
            <Modal
              className="modal-box"
              toggle={this.onAssetClose}
              isOpen={this.state.openForEdit}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.motor.editAssets" />
                <IconButton name="" className="text-white" onClick={this.onAssetClose}>
                  <CloseIcon />
                </IconButton>
              </ModalHeader>
              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      value={make}
                      id="required"
                      label={<IntlMessages id="assets.motor.make" />}
                      onChange={this.handleChange("make")}
                      type="text"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      value={model}
                      label={<IntlMessages id="assets.motor.model" />}
                      onChange={this.handleChange("model")}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      value={years}
                      label={<IntlMessages id="assets.motor.years" />}
                      onChange={this.handleChange("years")}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      value={registrationNo}
                      label={<IntlMessages id="assets.motor.registrationNo" />}
                      onChange={this.handleChange("registrationNo")}
                      type="number"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={this.state.carFinance}
                            onChange={this.handleCheckBox("carFinance")}
                            value="carFinance"
                          />
                        }
                        label="Finance / Leased"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>

              <div className="modal-box-footer d-flex flex-row">
                <Button name=""
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.onEditAssets();
                    this.onAssetClose();
                  }}
                >
                  <IntlMessages id="personalInformation.saveAssests" />
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
    editMotorAssets,
    deleteMotorAssets
  }
)(Actions);
