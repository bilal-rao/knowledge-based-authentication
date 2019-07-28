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
  fetchIndividualDeviation,
  addDeviation,
  editDeviation,
  showDeviationLoader,
  hideDeviationMessage,
  showDeviationDeleteLoader,
  deleteDeviationFromViewPage
} from "actions/Deviation";
import { showRoleLoader, fetchAllRoles } from "actions/Role";
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
      sDeviationId: null,

      imageURL: "",
      acronym: "",
      name: "",
      code: "",
      description: "",
      status: 0,
      makers: [],
      checkers: []
    };
  }

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
          this.fetchDeviation();
        }
      }
    );
    //Roles Get for actor and checker
    const obj = {
      method: "post",
      pId: this.state.pId
    };
    this.props.showRoleLoader();
    this.props.fetchAllRoles(obj);
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
          sDeviationId: nextProps.isd.data.id
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
        this.props.hideDeviationMessage();
        isMessageShow = false;
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (this.props.addDeviationSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been Added as draft");
        this.props.data.history.push(
          "/app/masterdata-management/deviations/pending"
        );
      } else {
        NotificationManager.success("Deviation has been Added");
        this.props.data.history.push(
          "/app/masterdata-management/deviations/approved"
        );
      }
    }
    if (this.props.editDeviationSuccess) {
      if (this.props.isMakerCheckerEnabled || this.state.isPending) {
        NotificationManager.success("Your changes has been done as draft");
        this.props.data.history.push(
          "/app/masterdata-management/deviations/pending"
        );
      } else {
        NotificationManager.success("Deviation has been updated");
        this.props.data.history.push(
          "/app/masterdata-management/deviations/approved"
        );
      }
    }
    if (this.props.deleteScurtinizerSuccess) {
      NotificationManager.success("Deviation has been deleted!");
      this.props.history.push("/app/masterdata-management/deviations/pending");
    }
    if (this.props.deleteDeviationSuccess) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push(
          "/app/masterdata-management/deviations/pending"
        );
      } else {
        NotificationManager.success("Deviation has been deleted!");
      }
    }
    if (this.props.processRequestSucess) {
      this.props.history.push("/app/masterdata-management/deviations/pending");
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
        makers: npI.makers ? npI.makers : [],
        checkers: npI.checkers ? npI.checkers : [],
        code: npI.code ? npI.code : "",
        description: npI.description ? npI.description : "",
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

  fetchDeviation = () => {
    if (this.props.isMakerCheckerEnabled === "") return;
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      this.props.showScrutinizerLoader();
      this.props.fetchIndividualScrutinizer({ id: this.state.sId });
    } else {
      if (this.state.fId) {
        this.props.showDeviationLoader();
        this.props.fetchIndividualDeviation({
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

  createDeviation = () => {
    this.props.showDeviationLoader();
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.props.isPending
    ) {
      this.props.editDraftDeviation({
        ...this.state.product,
        sId: this.state.sId,
        Id: this.state.fId,
        name: this.state.name,
        makers: this.state.makers,
        checkers: this.state.checkers,
        code: this.state.code,
        description: this.state.description
      });
    } else if (!this.props.isMakerCheckerEnabled && this.state.fId) {
      this.props.editDeviation({
        ...this.state.product,
        Id: this.state.fId,
        name: this.state.name,
        makers: this.state.makers,
        checkers: this.state.checkers,
        code: this.state.code,
        description: this.state.description
      });
    } else {
      this.props.addDeviation({
        name: this.state.name,
        makers: this.state.makers,
        checkers: this.state.checkers,
        code: this.state.code,
        description: this.state.description
      });
    }
  };

  onDeleteDeviation = () => {
    this.props.showDeviationDeleteLoader();
    this.props.deleteDeviationFromViewPage(this.state.fId);
  };

  render() {
    const { getAllMdmDiscrepencies, getAllRoles } = this.props;
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
              <IntlMessages id="sidebar.component.addDeviation" />
            ) : this.state.mode === "edit" ? (
              <IntlMessages id="sidebar.components.editDeviation" />
            ) : (
              <IntlMessages id="sidebar.components.viewDeviation" />
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
                    label="Deviation Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    autoComplete="off"
                    fullWidth
                    disabled={this.state.mode === "view"}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="makers">Makers</InputLabel>
                    <Select
                      multiple
                      name="makers"
                      value={this.state.makers}
                      onChange={this.handleChange}
                      input={<Input name="" id="makers" />}
                      disabled={this.state.mode === "view"}
                    >
                      {getAllRoles ? (
                        getAllRoles.map((data, index) => (
                          <MenuItem key={data.roleId} value={data.roleId}>
                            {data.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>Not found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="checkers">Checkers</InputLabel>
                    <Select
                      multiple
                      name="checkers"
                      value={this.state.checkers}
                      onChange={this.handleChange}
                      input={<Input name="" id="checkers" />}
                      disabled={this.state.mode === "view"}
                    >
                      {getAllRoles ? (
                        getAllRoles.map((data, index) => (
                          <MenuItem key={data.roleId} value={data.roleId}>
                            {data.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>Not found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
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
              <div className="col-lg-12 col-md-12 col-sm-12 text-right m-t-20">
                <Button
                  name="cancel"
                  variant="contained"
                  className="jr-btn bg-white text-black"
                  onClick={() =>
                    this.props.data.history.push(
                      `/app/masterdata-management/deviations/approved`
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
                    !this.state.makers ||
                    !this.state.checkers ||
                    this.state.mode === "view"
                  }
                  onClick={this.createDeviation}
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
    iud: state.deviationData.individualDeviationData
      ? state.deviationData.individualDeviationData
      : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    isModules: state.modules.moduleData.data,
    isLoading: state.deviationData.loader,
    isDeleteLoading: state.deviationData.deleteDeviationLoader,
    addDeviationSuccess: state.deviationData.addDeviationSuccess,
    editDeviationSuccess: state.deviationData.editDeviationSuccess,
    showMessage: state.deviationData.showMessage,
    alertMessage: state.deviationData.alertMessage,
    scrutinizerLoader: state.scrutinizers.loader,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : "",
    permissions: state.actions.actionsData ? state.actions.actionsData : "",
    deleteScurtinizerSuccess: state.scrutinizers.deleteScrutinizerSuccess,
    processRequestSucess: state.scrutinizers.processRequest,
    showProcessRequestMessage: state.scrutinizers.showProcessRequestMessage,
    getAllRoles: state.rolesData.allRoles
      ? state.rolesData.allRoles.data.items
      : []
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAction,
    fetchIndividualDeviation,
    showDeviationLoader,
    addDeviation,
    editDeviation,
    hideDeviationMessage,
    showDeviationDeleteLoader,
    deleteDeviationFromViewPage,
    showModuleLoader,
    fetchModule,
    showScrutinizerLoader,
    fetchIndividualScrutinizer,
    showScrutinizerDeleteLoader,
    deleteScrutinizer,
    hideScrutinizerMessage,
    hideProcessRequestMessage,
    showProcessRequestLoader,
    scrutinizerProcessRequest,
    showRoleLoader,
    fetchAllRoles
  }
)(AddForm);
