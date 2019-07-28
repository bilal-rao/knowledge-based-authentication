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
  editAddress,
  deleteAddress
} from "../../../../../../../actions/PersonalInformation";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, ModalHeader } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import CountrySelect from "../../reactSelect/countryList";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      edit: false,
      warning: false,
      addressType: "",
      postalCode: "",
      provinceCode: "",
      nearestLandMark: "",
      country: "",
      city: "",
      area: "",
      streetNo: "",
      houseNo: "",
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
    this.props.deleteAddress(id);
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
      addressType: this.state.addressType,
      houseNo: this.state.houseNo,
      city: this.state.city,
      area: this.state.area,
      streetNo: this.state.streetNo,
      country: this.state.country,
      nearestLandMark: this.state.nearestLandMark,
      provinceCode: this.state.provinceCode,
      postalCode: this.state.postalCode
    };
    this.props.editAddress(data);
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
      addressType: obj.addressType,
      postalCode: obj.postalCode,
      provinceCode: obj.provinceCode,
      nearestLandMark: obj.nearestLandMark,
      country: obj.country,
      city: obj.city,
      area: obj.area,
      streetNo: obj.streetNo,
      houseNo: obj.houseNo
    });
  }
  editDetails(obj) {
    this.setState({
      edit: true,
      openForEdit: true,
      view: false,
      openForView: false,
      addressType: obj.addressType,
      postalCode: obj.postalCode,
      provinceCode: obj.provinceCode,
      nearestLandMark: obj.nearestLandMark,
      country: obj.country,
      city: obj.city,
      area: obj.area,
      streetNo: obj.streetNo,
      houseNo: obj.houseNo
    });
  }
  countryCallback = dataFromChild => {
    this.setState({
      country: dataFromChild
    });
  };
  render() {
    const {
      warning,
      houseNo,
      streetNo,
      area,
      city,
      country,
      nearestLandMark,
      provinceCode,
      postalCode,
      addressType
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
                      label={<IntlMessages id="address.addressType" />}
                      value={addressType}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      label={<IntlMessages id="address.houseNo" />}
                      value={houseNo}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      label={<IntlMessages id="address.city" />}
                      value={city}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      label={<IntlMessages id="address.area" />}
                      value={area}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      label={<IntlMessages id="address.streetNo" />}
                      value={streetNo}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      id="required"
                      label={<IntlMessages id="address.country" />}
                      value={country}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      id="required"
                      label={<IntlMessages id="address.nearestLandMark" />}
                      value={nearestLandMark}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      id="required"
                      label={<IntlMessages id="address.provinceCode" />}
                      value={provinceCode}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      required
                      id="required"
                      label={<IntlMessages id="address.postalCode" />}
                      value={postalCode}
                      margin="normal"
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
                <IntlMessages id="personalInformation.editAddress" />
                <IconButton name=""
                  className="text-white"
                  onClick={this.onAddressClose}
                >
                  <CloseIcon />
                </IconButton>
              </ModalHeader>

              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12" style={{ paddingTop: '16px' }}>
                    <FormControl className="w-100 mb-2">
                      <InputLabel htmlFor="address-simple">Address Type</InputLabel>
                      <Select name=""
                        value={addressType}
                        onChange={this.handleChange("addressType")}
                        input={<Input name="" id="address-simple" />}
                      >
                        <MenuItem value={"office"}>Office</MenuItem>
                        <MenuItem value={"home"}>Home</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12" style={{ paddingTop: "30px" }}>
                    <CountrySelect
                      country={this.countryCallback}
                      value={country}
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      id="required"
                      label={<IntlMessages id="address.houseNo" />}
                      onChange={this.handleChange("houseNo")}
                      value={houseNo}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      label={<IntlMessages id="address.city" />}
                      onChange={this.handleChange("city")}
                      value={city}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      label={<IntlMessages id="address.area" />}
                      onChange={this.handleChange("area")}
                      value={area}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      label={<IntlMessages id="address.streetNo" />}
                      onChange={this.handleChange("streetNo")}
                      value={streetNo}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      id="required"
                      label={<IntlMessages id="address.nearestLandMark" />}
                      onChange={this.handleChange("nearestLandMark")}
                      value={nearestLandMark}
                      margin="normal"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      id="required"
                      label={<IntlMessages id="address.provinceCode" />}
                      onChange={this.handleChange("provinceCode")}
                      value={provinceCode}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      required
                      id="required"
                      label={<IntlMessages id="address.postalCode" />}
                      onChange={this.handleChange("postalCode")}
                      value={postalCode}
                      margin="normal"
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
    editAddress,
    deleteAddress
  }
)(Actions);
