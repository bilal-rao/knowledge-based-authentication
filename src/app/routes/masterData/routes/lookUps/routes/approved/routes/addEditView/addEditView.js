import React from "react";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Card, CardBody, CardHeader } from "reactstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { Badge } from "reactstrap";

// Configs
import permissions from "config/permissions.js";
import scrutinizerActions from "config/scrutinizerActions";

// Actions
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as luAc from "actions/LookUp";
import * as mdAc from "actions/Module";

// Components
import Loader from "components/loader/loader.js";
import Trail from "components/customComponents/trail/index";
import Comparison from "components/customComponents/trail/comparison";
import Actions from "components/customComponents/makerCheckerActions/index";
import MCConfirmation from "components/customComponents/makerCheckerConfirmation/index";

let isMessageShow = false;

class AddEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lId: null,
      sId: null,
      mode: "add",
      isPending: false,
      loading: false,
      isConfirmation: false,
      isCompareModalOpen: false,
      request: "",
      comments: "",
      action: null,
      maker: false,
      checker: false,
      sStatus: null,
      sUserId: null,
      imageURL: "",
      acronym: "",
      name: "",
      code: "",
      description: "",
      status: 0
    };
  }

  componentDidMount() {
    this.props.resetLookUpSuccessIndicators();

    let location = window.location.href;
    let mode =
      location.split("/").reverse()[0] === "add"
        ? "add"
        : location.split("/").reverse()[1];
    let lId = mode === "add" ? null : location.split("/").reverse()[0];

    if (location.split("/").reverse()[2] === "pending") {
      this.setState({
        isPending: true
      });
    }

    this.setState(
      {
        lId: lId ? lId : localStorage.getItem("lId"),
        sId: localStorage.getItem("sId"),
        mode: mode
      },
      () => {
        if (this.state.mode !== "add") {
          this.fetchLookUp();

          if (this.props.isModules) {
            this.props.isModules.modules.map(element => {
              if (element.modules.length) {
                this.parent(element);
              } else {
                this.children(element);
              }
            });
          } else {
            this.props.showModuleLoader();
            this.props.fetchModule();
          }
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
          sUserId: nextProps.isd.data.userId
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

    if (nextProps.shMsg && !isMessageShow) {
      isMessageShow = true;
      if (nextProps.adLupSc) {
        NotificationManager.success("LookUp added successfully.");
      } else if (nextProps.edLupSc) {
        NotificationManager.success("LookUp updated successfully.");
      } else if (nextProps.altMsg) {
        NotificationManager.error(nextProps.altMsg);
      }
      setTimeout(() => {
        this.props.hideLookUpMessage();
        isMessageShow = false;
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (this.props.adLupSc) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been Added as draft");
        this.props.data.history.push(
          "/app/masterdata-management/lookups/pending"
        );
      } else {
        NotificationManager.success("LookUp has been Added");
        this.props.data.history.push(
          "/app/masterdata-management/lookups/approved"
        );
      }
    }
    if (this.props.edLupSc) {
      if (this.props.isMakerCheckerEnabled || this.state.isPending) {
        NotificationManager.success("Your changes has been done as draft");
        this.props.data.history.push(
          "/app/masterdata-management/lookups/pending"
        );
      } else {
        NotificationManager.success("LookUp has been updated");
        this.props.data.history.push(
          "/app/masterdata-management/lookups/approved"
        );
      }
    }
    if (this.props.dlScuSc) {
      NotificationManager.success("LookUp has been deleted!");
      this.props.history.push("/app/masterdata-management/lookups/pending");
    }
    if (this.props.dlLupSc) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/masterdata-management/lookups/pending");
      } else {
        NotificationManager.success("LookUp has been deleted!");
      }
    }
    if (this.props.prRqSc) {
      this.props.history.push("/app/masterdata-management/lookups/pending");
    }
    if (this.props.shPrRqMsg) {
      setTimeout(() => {
        this.props.hideProcessRequestMessage();
      }, 100);
    }
    if (this.props.shMsg) {
      setTimeout(() => {
        this.props.hideScrutinizerMessage();
      }, 100);
    }
  }

  mapDataFromPropsToState = (npI, pI) => {
    if (npI && npI !== pI) {
      this.setState({
        name: npI.name ? npI.name : "",
        description: npI.description ? npI.description : "",
        code: npI.code ? npI.code : "",
        roles: this.state.isPending
          ? npI.roleIds
            ? npI.roleIds
            : []
          : npI.roles
          ? npI.roles.map(key => {
              return key.roleId;
            })
          : [],
        status: typeof npI.status !== "undefined" ? npI.status : 0
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
            : "/" + this.state.lId
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

  fetchLookUp = () => {
    if (this.props.isMakerCheckerEnabled === "") return;

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      this.props.showScrutinizerLoader();
      this.props.fetchIndividualScrutinizer({ id: this.state.sId });
    } else {
      if (this.state.lId) {
        this.props.showLookUpLoader();
        this.props.fetchIndividualLookUp({
          id: this.state.lId,
          page: this.state.mode
        });
      }
    }
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

  onSubmitLookUp = () => {
    this.props.showLookUpLoader();
    if (this.state.mode === "add") {
      this.props.addLookUp({
        name: this.state.name,
        code: this.state.code,
        description: this.state.description,
        status: this.state.status
      });
    } else {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        this.props.editDraftLookUp({
          id: this.state.lId,
          sId: this.state.sId,
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          status: this.state.status
        });
      } else {
        this.props.editLookUp({
          id: this.state.lId,
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          status: this.state.status
        });
      }
    }
  };

  onDeleteLookUp = () => {
    this.props.showLookUpDeleteLoader();
    this.props.deleteLookUpFromViewPage(this.state.lId);
  };

  handleRequest = () => {
    const obj = {
      id: this.state.sId,
      moduleCode: "PG",
      pageNumber: 1,
      pageSize: 10,
      action: this.state.action,
      comments: this.state.comments,
      request: this.state.request
    };
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  };

  onDeleteRequest = () => {
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      if (!window.confirm("Are you sure you want to DELETE this request?"))
        return;
      this.props.showScrutinizerDeleteLoader();
      this.props.deleteScrutinizer({
        id: this.state.sId,
        pageNumber: 1,
        pageSize: 10,
        moduleCode: "PG"
      });
    } else {
      if (!window.confirm("Are you sure you want to DELETE this lookup?"))
        return;
      this.props.showLookUpDeleteLoader();
      this.props.deleteLookUp({
        id: this.state.lId,
        pageNumber: 1,
        pageSize: 10
      });
    }
  };

  onMCActions = type => {
    if (type === "com") {
      this.setState({
        isCompareModalOpen: true
      });
    } else if (type === "sfa") {
      this.setState({
        isConfirmation: true,
        action: 1,
        request: "sfa"
      });
    } else if (type === "review") {
      this.setState({
        isConfirmation: true,
        action: 5,
        request: "review"
      });
    } else if (type === "approve") {
      this.setState({
        isConfirmation: true,
        action: 2,
        request: "approve"
      });
    } else if (type === "reject") {
      this.setState({
        isConfirmation: true,
        action: 3,
        request: "reject"
      });
    } else if (type === "delete") {
      this.onDeleteRequest();
    }
  };

  onCloseModal = () => {
    this.setState({
      isCompareModalOpen: false
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isPending ? (
          this.props.isTrail ? (
            <React.Fragment>
              <Trail />
              <br />
            </React.Fragment>
          ) : null
        ) : null}
        <Paper>
          <Card>
            <CardHeader className="bg-white text-black">
              {this.state.mode === "add"
                ? `Add ${localStorage.getItem("lookUpName")}`
                : this.state.mode === "edit"
                ? `Edit ${localStorage.getItem("lookUpName")}`
                : `View ${localStorage.getItem("lookUpName")}`}
              &nbsp;&nbsp;
              {this.state.lId ? (
                <span>
                  {this.state.sStatus !== null ? (
                    this.state.sStatus === 0 ? (
                      <Badge color="info">Draft</Badge>
                    ) : this.state.sStatus === 1 ? (
                      <Badge color="primary">Send For Authorization</Badge>
                    ) : this.state.sStatus === 2 ? (
                      <Badge color="success">Approved</Badge>
                    ) : (
                      <Badge color="danger">Rejected</Badge>
                    )
                  ) : null}
                </span>
              ) : null}
            </CardHeader>
            <CardBody>
              {this.props.loader && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
              <form className="row" autoComplete="off">
                <div className="col-lg-4 col-md-4 col-sm-s12 m-b-15">
                  <TextField
                    type="text"
                    label="Name"
                    name="name"
                    disabled={this.state.mode === "view"}
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="none"
                    autoComplete="off"
                    fullWidth
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-s12 m-b-20">
                  <TextField
                    type="text"
                    label="Description"
                    name="description"
                    disabled={this.state.mode === "view"}
                    value={this.state.description}
                    onChange={this.handleChange}
                    margin="none"
                    fullWidth
                    autoComplete="off"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-s12 m-b-15">
                  <div className="form-group">
                    <TextField
                      label="Code"
                      name="code"
                      disabled={this.state.mode !== "add"}
                      helperText={
                        this.state.mode === "add"
                          ? "Space not allowed in code field"
                          : ""
                      }
                      value={this.state.code}
                      onChange={this.handleChange}
                      margin="none"
                      autoComplete="off"
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 m-b-20">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                      name="status"
                      disabled={this.state.mode === "view"}
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={0}>Active</MenuItem>
                      <MenuItem value={1}>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-right m-t-20">
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={() =>
                      this.props.data.history.push(
                        `/app/masterdata-management/lookups/${
                          this.state.isPending ? "pending" : "approved"
                        }`
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
                      !this.state.description ||
                      // !this.state.code ||
                      this.state.mode === "view"
                    }
                    onClick={this.onSubmitLookUp}
                    className="jr-btn"
                  >
                    <span>Save</span>
                  </Button>
                </div>
              </form>
            </CardBody>
            <NotificationContainer />
          </Card>

          {this.state.mode !== "add" ? (
            <Actions
              onClk={this.onMCActions}
              sId={this.state.sId}
              eId={this.state.lId}
              mode={this.state.mode}
              history={this.props.history}
              path={`masterdata-management/lookups`}
              maker={this.state.maker}
              checker={this.state.checker}
              status={this.state.status}
              sStatus={this.state.sStatus}
              sUserId={this.state.sUserId}
              isModules={this.props.isModules}
              isPending={this.state.isPending}
              isTrail={this.props.isTrail}
              sAction={this.state.sAction}
              sAdded={scrutinizerActions.Added}
            />
          ) : null}

          {this.state.isConfirmation ? (
            <MCConfirmation
              request={this.state.request}
              comments={this.state.comments}
              action={this.state.action}
              request={this.state.request}
              hc={this.handleChange}
              hr={this.handleRequest}
              cl={() => {
                this.setState({
                  isConfirmation: false,
                  request: ""
                })
              }}
            />
          ) : null}

          {this.state.isCompareModalOpen ? (
            <Comparison
              data={this.props.isd ? this.props.isd.data : {}}
              onCloseModal={this.onCloseModal}
            />
          ) : null}
        </Paper>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    permissions: state.actions.actionsData ? state.actions.actionsData : "",
    iud: state.lookUpsData.individualLookUpData
      ? state.lookUpsData.individualLookUpData
      : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    isTrail: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData.data.trail
        ? state.scrutinizers.individualScrutinizerData.data.trail.length > 0
        : false
      : false,
    adLupSc: state.lookUpsData.addLookUpSuccess,
    edLupSc: state.lookUpsData.editLookUpSuccess,
    dlLupSc: state.lookUpsData.deleteLookUpSuccess,
    dlScuSc: state.scrutinizers.deleteScrutinizerSuccess,
    prRqSc: state.scrutinizers.processRequest,
    shMsg: state.lookUpsData.showMessage,
    altMsg: state.lookUpsData.alertMessage,
    shPrRqMsg: state.scrutinizers.showProcessRequestMessage,
    loader: state.scrutinizers.loader
      ? state.scrutinizers.loader
      : state.usersData.loader,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : ""
  };
}

export default connect(
  mapStateToProps,
  {
    ...scAc,
    ...acAc,
    ...luAc,
    ...mdAc
  }
)(AddEditView);
