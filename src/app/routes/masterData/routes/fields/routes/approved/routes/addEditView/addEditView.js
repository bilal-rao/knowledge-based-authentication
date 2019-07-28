import React from "react";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import Paper from "@material-ui/core/Paper";
import { Card, CardBody, CardHeader } from "reactstrap";
import { NotificationManager } from "react-notifications";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

// Configs
import permissions from "config/permissions.js";

// Actions
import {
  fetchIndividualField,
  addField,
  editField,
  showFieldLoader,
  hideFieldMessage,
  showFieldDeleteLoader,
  deleteFieldFromViewPage
} from "actions/Fields";
import {
  showScrutinizerLoader,
  fetchIndividualScrutinizer,
  showScrutinizerDeleteLoader,
  deleteScrutinizer,
  hideScrutinizerMessage,
  hideProcessRequestMessage,
  showProcessRequestLoader,
  scrutinizerProcessRequest
} from "actions/Scrutinizer";
import { fetchAction } from "actions/Action";
import { fetchModule, showModuleLoader } from "actions/Module";

// Components
import Loader from "components/loader/loader.js";

let isMessageShow = false;
let count = 1;

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fId: null,
      sId: null,
      mode: "add",
      isPending: false,
      action: null,
      maker: false,
      checker: false,
      sStatus: null,
      sFieldId: null,

      imageURL: "",
      acronym: "",
      name: "",
      code: "",
      description: "",
      status: 0,
      allTypes: [{ name: "text" }, { name: "number" }],
      allDataTypes: [
        { name: "range", id: 0 },
        { name: "static", id: 1 },
        { name: "predefined", id: 2 }
      ],
      allMasterDataTypes: [
        { id: 1, name: "Custom" },
        { id: 2, name: "AcquisitionChannel" },
        { id: 3, name: "Agency" },
        { id: 4, name: "Agency Type" },
        { id: 5, name: "Bank" },
        { id: 6, name: "Business Borrower Code" },
        { id: 7, name: "Business Type" },
        { id: 8, name: "Dealer" },
        { id: 9, name: "Department" },
        { id: 10, name: "Designation" },
        { id: 11, name: "Deviation" },
        { id: 12, name: "Descrepancy" },
        { id: 13, name: "EducationType" },
        { id: 14, name: "Employer" },
        { id: 15, name: "Employment Status" },
        { id: 16, name: "Error Message" },
        { id: 17, name: "Federal Excise Duty" },
        { id: 18, name: "Field" },
        { id: 19, name: "FieldSet" },
        { id: 20, name: "Hierarchy" },
        { id: 21, name: "Hierachy Scheme" },
        { id: 22, name: "Hierarchy Type" },
        { id: 23, name: "Income Head" },
        { id: 24, name: "Income Source" },
        { id: 25, name: "Institution" },
        { id: 26, name: "Liability" },
        { id: 27, name: "Operator" },
        { id: 28, name: "Profession" },
        { id: 29, name: "Reason" },
        { id: 30, name: "Operator" },
        { id: 31, name: "Source" },
        { id: 32, name: "Vehicle" },
        { id: 33, name: "Vehicle Color" },
        { id: 34, name: "Vehicle Engine Size" },
        { id: 35, name: "Vehicle Make" },
        { id: 36, name: "Vehicle Model" },
        { id: 37, name: "Vehicle Type" },
        { id: 38, name: "Vehicle Year" }
      ],
      type: "",
      dataType: 0,
      masterDataType: 0,
      predefinedFields: [],
      customValue: "",
      isRequired: false,
      validationType: 0,
      supportFuzzySearch: 0,
      fuzzyThreshold: 0,
      belonging: ""
    };
  }

  handleRequestDelete = data => () => {
    if (this.state.mode !== "view") {
      const predefinedFields = [...this.state.predefinedFields];
      const chipToDelete = predefinedFields.indexOf(data);
      predefinedFields.splice(chipToDelete, 1);
      this.setState({ predefinedFields });
    } else {
      alert("you can't perform this operation in view mode");
    }
  };

  onValueChange = e => {
    this.setState({ customValue: e.target.value });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.setState({
        customValue: "",
        predefinedFields: this.state.predefinedFields.concat({
          id: count++,
          name: e.target.value
        })
      });
    }
  };

  componentDidMount() {
    let location = window.location.href;
    let mode =
      location.split("/").reverse()[0] === "add"
        ? "add"
        : location.split("/").reverse()[1];
    let fId = mode === "add" ? null : location.split("/").reverse()[0];

    if (location.split("/").reverse()[2] === "pending") {
      this.setState({
        isPending: true
      });
    }

    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    this.setState(
      {
        fId: fId ? fId : localStorage.getItem("fId"),
        sId: localStorage.getItem("sId"),
        mode: mode
      },
      () => {
        if (this.state.mode !== "add") {
          this.fetchField();
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isModules && nextProps.isModules !== this.props.isModules) {
      nextProps.isModules.modules.map(element => {
        if (element.modules.length) {
          this.parent(element);
        } else {
          this.children(element);
        }
      });
    }

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      if (nextProps.isd.data && nextProps.isd.data !== this.props.isd.data) {
        this.setState({
          sStatus: nextProps.isd.data.status,
          sAction: nextProps.isd.data.action,
          sFieldId: nextProps.isd.data.id
        });
      }
      this.mapDataFromPropsToState(
        nextProps.isd.data ? nextProps.isd.data.payload : "",
        this.props.isd.data ? this.props.isd.data.payload : ""
      );
    } else {
      this.mapDataFromPropsToState(
        nextProps.iud.data ? nextProps.iud.data : "",
        this.props.iud.data ? this.props.iud.data : ""
      );
    }

    if (nextProps.showMessage && !isMessageShow) {
      isMessageShow = true;
      if (nextProps.alertMessage)
        NotificationManager.error(nextProps.alertMessage);
      setTimeout(() => {
        this.props.hideFieldMessage();
        isMessageShow = false;
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (this.props.addFieldSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been Added as draft");
        this.props.data.history.push(
          "/app/masterdata-management/fields/pending"
        );
      } else {
        NotificationManager.success("Field has been Added");
        this.props.data.history.push(
          "/app/masterdata-management/fields/approved"
        );
      }
    }
    if (this.props.editFieldSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been Edited as draft");
        this.props.data.history.push(
          "/app/masterdata-management/fields/pending"
        );
      } else {
        NotificationManager.success("Field has been Edited");
        this.props.data.history.push(
          "/app/masterdata-management/fields/approved"
        );
      }
    }
    if (this.props.deleteScurtinizerSuccess) {
      NotificationManager.success("Field has been deleted!");
      this.props.history.push("/app/masterdata-management/fields/pending");
    }
    if (this.props.deleteFieldSuccess) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/masterdata-management/fields/pending");
      } else {
        NotificationManager.success("Field has been deleted!");
      }
    }
    if (this.props.processRequestSucess) {
      this.props.history.push("/app/masterdata-management/fields/pending");
    }
    if (this.props.showProcessRequestMessage) {
      setTimeout(() => {
        this.props.hideProcessRequestMessage();
      }, 100);
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideScrutinizerMessage();
      }, 100);
    }
  }

  mapDataFromPropsToState = (npI, pI) => {
    if (npI && npI !== pI) {
      this.setState({
        acronym: npI.name ? this.generateAcronym(npI.name) : "",
        name: npI.name ? npI.name : "",
        code: npI.code ? npI.code : "",
        description: npI.description ? npI.description : "",
        type: npI.type ? npI.type : "",
        dataType: npI.dataType ? npI.dataType : 0,
        masterDataType: npI.masterDataType ? npI.masterDataType : 0,
        predefinedFields: npI.predefinedFields ? npI.predefinedFields : [],
        validationType: npI.validationType ? npI.validationType : 0,
        isRequired: npI.isRequired ? npI.isRequired : false,
        supportFuzzySearch: npI.supportFuzzySearch ? npI.supportFuzzySearch : 0,
        fuzzyThreshold: npI.fuzzyThreshold ? npI.fuzzyThreshold : 0,
        belonging: npI.belonging ? String(npI.belonging) : "0",
        status: typeof npI.status !== "undefined" ? npI.status : 0,
        imageURL: npI.image ? npI.image : ""
      });
    }
  };

  parent = element => {
    element.modules.map(el => {
      if (el.modules.length) {
        this.parent(el);
      } else {
        this.children(el);
      }
    });
  };

  children = element => {
    if (
      element.route +
        "/" +
        this.state.mode +
        (this.state.mode !== "add"
          ? this.state.isPending
            ? "/" + this.state.sId
            : "/" + this.state.fId
          : "") ===
      this.props.history.location.pathname
    ) {
      this.props.fetchAction(element);
      this.setState({
        permissions: element
      });
      if (element.actions) {
        element.actions.map(data => {
          if (data.actionId === permissions.Add) {
            data.isSelected
              ? this.setState({ add: true })
              : this.setState({ add: false });
          } else if (data.actionId === permissions.Update) {
            data.isSelected
              ? this.setState({ update: true })
              : this.setState({ update: false });
          } else if (data.actionId === permissions.Delete) {
            data.isSelected
              ? this.setState({ delete: true })
              : this.setState({ delete: false });
          } else if (data.actionId === permissions.View) {
            data.isSelected
              ? this.setState({ view: true })
              : this.setState({ view: false });
          } else if (data.actionId === permissions.Maker) {
            data.isSelected
              ? this.setState({ maker: true })
              : this.setState({ maker: false });
          } else if (data.actionId === permissions.Checker) {
            data.isSelected
              ? this.setState({ checker: true })
              : this.setState({ checker: false });
          }
        });
      }
    }
  };

  fetchField = () => {
    if (this.props.isMakerCheckerEnabled === "") return;
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      this.props.showScrutinizerLoader();
      this.props.fetchIndividualScrutinizer({ id: this.state.sId });
    } else {
      if (this.state.fId) {
        this.props.showFieldLoader();
        this.props.fetchIndividualField({
          Id: this.state.fId,
          page: this.state.mode
        });
      }
    }
  };

  generateAcronym = str => {
    return /\s/g.test(str)
      ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
      : str.charAt(0);
  };

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]:
        e.target.name === "code" && e.nativeEvent.data === " "
          ? e.target.value.replace(/ /g, "")
          : e.target.value
    });
  };

  createField = () => {
    this.props.showFieldLoader();
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.props.isPending
    ) {
      this.props.editDraftField({
        ...this.state.product,
        sId: this.state.sId,
        Id: this.state.fId,
        name: this.state.name,
        code: this.state.code,
        description: this.state.description,
        type: this.state.type,
        dataType: this.state.dataType,
        masterDataType:
          this.state.dataType !== 2 ? 0 : this.state.masterDataType,
        predefinedFields:
          this.state.dataType !== 2 ? [] : this.state.predefinedFields,
        validationType: this.state.validationType,
        isRequired: this.state.isRequired,
        supportFuzzySearch: this.state.supportFuzzySearch,
        fuzzyThreshold: this.state.fuzzyThreshold,
        belonging: Number(this.state.belonging)
      });
    } else if (!this.props.isMakerCheckerEnabled && this.state.fId) {
      this.props.editField({
        ...this.state.product,
        Id: this.state.fId,
        name: this.state.name,
        code: this.state.code,
        description: this.state.description,
        type: this.state.type,
        dataType: this.state.dataType,
        masterDataType:
          this.state.dataType !== 2 ? 0 : this.state.masterDataType,
        predefinedFields:
          this.state.dataType !== 2 ? [] : this.state.predefinedFields,
        validationType: this.state.validationType,
        isRequired: this.state.isRequired,
        supportFuzzySearch: this.state.supportFuzzySearch,
        fuzzyThreshold: this.state.fuzzyThreshold,
        belonging: Number(this.state.belonging)
      });
    } else {
      this.props.addField({
        name: this.state.name,
        code: this.state.code,
        description: this.state.description,
        type: this.state.type,
        dataType: this.state.dataType,
        masterDataType:
          this.state.dataType !== 2 ? 0 : this.state.masterDataType,
        predefinedFields:
          this.state.dataType !== 2 ? [] : this.state.predefinedFields,
        validationType: this.state.validationType,
        isRequired: this.state.isRequired,
        supportFuzzySearch: this.state.supportFuzzySearch,
        fuzzyThreshold: this.state.fuzzyThreshold,
        belonging: Number(this.state.belonging)
      });
    }
  };

  onDeleteField = () => {
    this.props.showFieldDeleteLoader();
    this.props.deleteFieldFromViewPage(this.state.fId);
  };

  render() {
    return (
      <Paper>
        <Card>
          <CardHeader className="bg-white text-black">
            {this.state.mode !== "add" ? (
              this.state.imageURL ? (
                <React.Fragment>
                  <Avatar
                    style={{ display: "inline-table" }}
                    alt="Avatar"
                    src={this.state.imageURL}
                  />
                  &nbsp;&nbsp;
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Avatar
                    className="bg-warning"
                    style={{ display: "inline-flex" }}
                  >
                    <h3 className="m-0 text-white">
                      {this.state.acronym.toUpperCase()}
                    </h3>
                  </Avatar>
                  &nbsp;&nbsp;
                </React.Fragment>
              )
            ) : null}
            {this.state.mode === "add" ? (
              <IntlMessages id="sidebar.component.addField" />
            ) : this.state.mode === "edit" ? (
              <IntlMessages id="sidebar.components.editField" />
            ) : (
              <IntlMessages id="sidebar.components.viewField" />
            )}
          </CardHeader>
          <CardBody>
            {this.props.isLoading && (
              <div className="loader-view">
                <Loader />
              </div>
            )}
            <form className="row" autoComplete="off">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <TextField
                    label="Field Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    autoComplete="off"
                    fullWidth
                    disabled={this.state.mode === "view"}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-s12">
                <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="allTypes">Select Type</InputLabel>
                  <Select
                    name="type"
                    disabled={this.state.mode === "view"}
                    value={String(this.state.type)}
                    onChange={this.handleChange}
                  >
                    {this.state.allTypes
                      ? this.state.allTypes.map((data, index) => (
                          <MenuItem key={index} value={data.name}>
                            {data.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <TextField
                    label="Code"
                    name="code"
                    value={this.state.code}
                    onChange={this.handleChange}
                    helperText={
                      this.state.mode === "add"
                        ? "Space not allowed in code field"
                        : ""
                    }
                    autoComplete="off"
                    fullWidth
                    disabled={this.state.mode !== "add"}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-s12">
                <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="dataType">Select DataType</InputLabel>
                  <Select
                    name="dataType"
                    disabled={this.state.mode === "view"}
                    value={this.state.dataType}
                    onChange={this.handleChange}
                  >
                    {this.state.allDataTypes
                      ? this.state.allDataTypes.map((data, index) => (
                          <MenuItem key={data.id} value={data.id}>
                            {data.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </div>
              {this.state.dataType === 2 ? (
                <div className="col-lg-4 col-md-4 col-sm-s12">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="allMasterDataTypes">
                      Select Master Data Type
                    </InputLabel>
                    <Select
                      name="masterDataType"
                      disabled={this.state.mode === "view"}
                      value={this.state.masterDataType}
                      onChange={this.handleChange}
                    >
                      {this.state.allMasterDataTypes
                        ? this.state.allMasterDataTypes.map((data, index) => (
                            <MenuItem key={data.id} value={data.id}>
                              {data.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </div>
              ) : null}
              {this.state.masterDataType === 1 && this.state.dataType === 2 ? (
                <div
                  className="col-lg-4 col-md-4 col-sm-12"
                  style={{ paddingTop: "15px" }}
                >
                  <div className="form-group">
                    <div className="manage-margin d-flex flex-wrap">
                      {this.state.predefinedFields.map(data => {
                        return (
                          <Chip
                            avatar={
                              <Avatar>
                                {data.name.charAt(0).toUpperCase()}
                              </Avatar>
                            }
                            label={data.name}
                            key={data.id}
                            onDelete={this.handleRequestDelete(data)}
                          />
                        );
                      })}
                      <Input
                        fullWidth
                        disabled={this.state.mode === "view"}
                        margin="none"
                        name="predefinedValue"
                        type="text"
                        placeholder="Select Custom Value"
                        onChange={this.onValueChange.bind(this)}
                        value={this.state.customValue}
                        onKeyPress={this._handleKeyPress.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <TextField
                    label="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    autoComplete="off"
                    fullWidth
                    disabled={this.state.mode === "view"}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <TextField
                    type="number"
                    label="Fuzzy Threshold"
                    name="fuzzyThreshold"
                    value={this.state.fuzzyThreshold}
                    onChange={this.handleChange}
                    autoComplete="off"
                    fullWidth
                    disabled={this.state.mode === "view"}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControlLabel
                  label="Validation Type"
                  className="p-t-20"
                  control={
                    <Switch
                      classes={{
                        checked: "text-primary",
                        bar: "bg-primary"
                      }}
                      name="validationType"
                      checked={this.state.validationType}
                      onChange={event =>
                        this.setState({ validationType: event.target.checked })
                      }
                      aria-label="validationType"
                      disabled={this.state.mode === "view"}
                    />
                  }
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControlLabel
                  label="Mandatory"
                  className="p-t-20"
                  control={
                    <Switch
                      classes={{
                        checked: "text-primary",
                        bar: "bg-primary"
                      }}
                      name="isRequired"
                      checked={this.state.isRequired}
                      onChange={event =>
                        this.setState({ isRequired: event.target.checked })
                      }
                      aria-label="isRequired"
                      disabled={this.state.mode === "view"}
                    />
                  }
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControlLabel
                  label="Support Fuzzy Search"
                  className="p-t-20"
                  control={
                    <Switch
                      classes={{
                        checked: "text-primary",
                        bar: "bg-primary"
                      }}
                      name="supportFuzzySearch"
                      checked={this.state.supportFuzzySearch}
                      onChange={event =>
                        this.setState({
                          supportFuzzySearch: event.target.checked
                        })
                      }
                      aria-label="supportFuzzySearch"
                      disabled={this.state.mode === "view"}
                    />
                  }
                />
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <FormControl component="fieldset" required>
                    <FormHelperText className="text-grey">
                      Belonging
                    </FormHelperText>
                    <RadioGroup
                      name="belonging"
                      value={this.state.belonging}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        disabled={this.state.mode === "view"}
                        value={"0"}
                        control={<Radio color="primary" />}
                        label="Custom"
                      />
                      <FormControlLabel
                        disabled={this.state.mode === "view"}
                        value={"1"}
                        control={<Radio color="primary" />}
                        label="Application"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 text-right m-t-20">
                <Button
                  name="cancel"
                  variant="contained"
                  className="jr-btn bg-white text-black"
                  onClick={() =>
                    this.props.data.history.push(
                      `/app/masterdata-management/fields/approved`
                    )
                  }
                >
                  Cancel
                </Button>

                <Button
                  name="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    !this.state.name ||
                    !this.state.code ||
                    !this.state.type ||
                    !this.state.belonging ||
                    this.state.mode === "view"
                  }
                  onClick={this.createField}
                  className="jr-btn"
                >
                  <span>Save</span>
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    iud: state.fieldsData.individualFieldData
      ? state.fieldsData.individualFieldData
      : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    isModules: state.modules.moduleData.data,
    isLoading: state.fieldsData.loader,
    isDeleteLoading: state.fieldsData.deleteFieldLoader,
    addFieldSuccess: state.fieldsData.addFieldSuccess,
    editFieldSuccess: state.fieldsData.editFieldSuccess,
    showMessage: state.fieldsData.showMessage,
    alertMessage: state.fieldsData.alertMessage,
    scrutinizerLoader: state.scrutinizers.loader,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : "",
    permissions: state.actions.actionsData ? state.actions.actionsData : "",
    deleteScurtinizerSuccess: state.scrutinizers.deleteScrutinizerSuccess,
    deleteFieldSuccess: state.fieldsData.deleteFieldSuccess,
    processRequestSucess: state.scrutinizers.processRequest,
    showProcessRequestMessage: state.scrutinizers.showProcessRequestMessage
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAction,
    fetchIndividualField,
    showFieldLoader,
    addField,
    editField,
    hideFieldMessage,
    showFieldDeleteLoader,
    deleteFieldFromViewPage,
    showModuleLoader,
    fetchModule,
    showScrutinizerLoader,
    fetchIndividualScrutinizer,
    showScrutinizerDeleteLoader,
    deleteScrutinizer,
    hideScrutinizerMessage,
    hideProcessRequestMessage,
    showProcessRequestLoader,
    scrutinizerProcessRequest
  }
)(AddForm);
