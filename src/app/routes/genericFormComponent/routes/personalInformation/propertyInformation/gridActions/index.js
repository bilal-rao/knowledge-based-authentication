import React from "react";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core/Table";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import { connect } from "react-redux";
import {
  editProperty,
  deleteProperty
} from "../../../../../../../actions/PersonalInformation";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, ModalHeader } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      edit: false,
      warning: false,
      addressForm: [],
      addAddressState: true,
      openForView: false,
      openForEdit: false,
      totalArea: "",
      coveredArea: "",
      currentValue: "",
      purchaseValue: "",
      propertyAddress: "",
      propertyType: "",
    };
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    this.props.deleteProperty(id);
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
  onPropertyClose = () => {
    this.setState({ openForView: false, view: false, openForEdit: false });
  };
  onEditProperty = () => {
    const data = {
      id: this.props.id,
      propertyType: this.state.propertyType,
      propertyAddress: this.state.propertyAddress,
      purchaseValue: this.state.purchaseValue,
      currentValue: this.state.currentValue,
      totalArea: this.state.totalArea,
      coveredArea: this.state.coveredArea,
    };
    this.props.editProperty(data);
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
      propertyType: obj.propertyType,
      propertyAddress: obj.propertyAddress,
      purchaseValue: obj.purchaseValue,
      currentValue: obj.currentValue,
      totalArea: obj.totalArea,
      coveredArea: obj.coveredArea
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
      propertyType,
      propertyAddress,
      currentValue,
      purchaseValue,
      totalArea,
      coveredArea
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
              toggle={this.onPropertyClose}
              isOpen={this.state.openForView}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.viewProperty" />
                <IconButton name=""
                  className="text-white"
                  onClick={this.onPropertyClose}
                >
                  <CloseIcon />
                </IconButton>
              </ModalHeader>
              <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <FormControl className="w-100 mb-2">
                      <InputLabel htmlFor="age-simple">
                        Property Type
                      </InputLabel>
                      <Select name=""
                        disabled
                        value={propertyType}
                        onChange={this.handleChange("propertyType")}
                        input={<Input name="" id="age-simple" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"land"}>Land</MenuItem>
                        <MenuItem value={"building"}>Building</MenuItem>
                        <MenuItem value={"shop"}>Shop</MenuItem>
                        <MenuItem value={"house"}>House</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      disabled
                      id="required"
                      value={propertyAddress}
                      label={<IntlMessages id="property.completeAddress" />}
                      onChange={this.handleChange("propertyAddress")}
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="purchaseValue">
                        Purchase Value
                      </InputLabel>
                      <Input name=""
                        disabled
                        type="number"
                        id="purchaseValue"
                        value={purchaseValue}
                        onChange={this.handleChange("purchaseValue")}
                        startAdornment={
                          <InputAdornment position="start">Rs</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="currentValue">
                        Current Value
                      </InputLabel>
                      <Input name=""
                        disabled
                        type="number"
                        id="currentValue"
                        value={currentValue}
                        onChange={this.handleChange("currentValue")}
                        startAdornment={
                          <InputAdornment position="start">Rs</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="totalArea">Total Area</InputLabel>
                      <Input name=""
                        disabled
                        type="number"
                        id="totalArea"
                        value={totalArea}
                        onChange={this.handleChange("totalArea")}
                        endAdornment={
                          <InputAdornment position="end">Yards</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="coveredArea">
                        Covered Area
                      </InputLabel>
                      <Input name=""
                        disabled
                        type="number"
                        id="coveredarea"
                        value={coveredArea}
                        onChange={this.handleChange("coveredArea")}
                        endAdornment={
                          <InputAdornment position="end">Yards</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </Modal>
          ) : this.state.edit ? (
            <Modal
              className="modal-box"
              toggle={this.onPropertyClose}
              isOpen={this.state.openForEdit}
            >
              <ModalHeader className="modal-box-header bg-primary">
                <IntlMessages id="personalInformation.editProperty" />
                <IconButton name=""
                  className="text-white"
                  onClick={this.onPropertyClose}
                >
                  <CloseIcon />
                </IconButton>
              </ModalHeader>

               <div className="modal-box-content">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <FormControl className="w-100 mb-2">
                      <InputLabel htmlFor="age-simple">
                        Property Type
                      </InputLabel>
                      <Select name=""
                        value={propertyType}
                        onChange={this.handleChange("propertyType")}
                        input={<Input name="" id="age-simple" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"land"}>Land</MenuItem>
                        <MenuItem value={"building"}>Building</MenuItem>
                        <MenuItem value={"shop"}>Shop</MenuItem>
                        <MenuItem value={"house"}>House</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <TextField name=""
                      id="required"
                      value={propertyAddress}
                      label={<IntlMessages id="property.completeAddress" />}
                      onChange={this.handleChange("propertyAddress")}
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="purchaseValue">
                        Purchase Value
                      </InputLabel>
                      <Input name=""
                        type="number"
                        id="purchaseValue"
                        value={purchaseValue}
                        onChange={this.handleChange("purchaseValue")}
                        startAdornment={
                          <InputAdornment position="start">Rs</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="currentValue">
                        Current Value
                      </InputLabel>
                      <Input name=""
                        type="number"
                        id="currentValue"
                        value={currentValue}
                        onChange={this.handleChange("currentValue")}
                        startAdornment={
                          <InputAdornment position="start">Rs</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="totalArea">Total Area</InputLabel>
                      <Input name=""
                        type="number"
                        id="totalArea"
                        value={totalArea}
                        onChange={this.handleChange("totalArea")}
                        endAdornment={
                          <InputAdornment position="end">Yards</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="coveredArea">
                        Covered Area
                      </InputLabel>
                      <Input name=""
                        type="number"
                        id="coveredarea"
                        value={coveredArea}
                        onChange={this.handleChange("coveredArea")}
                        endAdornment={
                          <InputAdornment position="end">Yards</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
              </div>


              <div className="modal-box-footer d-flex flex-row">
                <Button name=""
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.onEditProperty();
                    this.onPropertyClose();
                  }}
                >
                  <IntlMessages id="personalInformation.saveProperty" />
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
    editProperty,
    deleteProperty
  }
)(Actions);
