import React from "react";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
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
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Configs
import permissions from "config/permissions.js";
import scrutinizerActions from "config/scrutinizerActions";

// Actions
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as desAc from "actions/Designation";
import * as grAc from "actions/Department";
import * as mdAc from "actions/Module";

// Icons
import SFA from "@material-ui/icons/Rotate90DegreesCcw";
import SFR from "@material-ui/icons/Search";
import APR from "@material-ui/icons/Done";
import REJ from "@material-ui/icons/Clear";
import DEL from "@material-ui/icons/Delete";
import EDT from "@material-ui/icons/Edit";

// Components
import Loader from "components/loader/loader.js";

let isMessageShow = false;

class AddEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gId: null,
      sId: null,
      mode: "add",
      isPending: false,
      loading: false,
      isConfirmation: false,
      request: "",
      comments: "",
      action: null,
      maker: false,
      checker: false,
      sStatus: null,
      sUserId: null,
      designationIds: [],
      allDesignations: [],
      imageURL: "",
      acronym: "",
      name: "",
      code: "",
      description: "",
      status: 0
    };
  }

  componentDidMount() {
    this.props.resetDepartmentSuccessIndicators();
    this.props.fetchAllDesignations();

    let location = window.location.href;
    let mode =
      location.split("/").reverse()[0] === "add"
        ? "add"
        : location.split("/").reverse()[1];
    let gId = mode === "add" ? null : location.split("/").reverse()[0];

    if (location.split("/").reverse()[2] === "pending") {
      this.setState({
        isPending: true
      });
    }

    this.setState(
      {
        gId: gId ? gId : localStorage.getItem("gId"),
        sId: localStorage.getItem("sId"),
        mode: mode
      },
      () => {
        if (this.state.mode !== "add") {
          this.fetchDesignation();

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
      if (nextProps.adDepSc) {
        NotificationManager.success("Department added successfully.");
      } else if (nextProps.edGrpSc) {
        NotificationManager.success("Department updated successfully.");
      } else if (nextProps.altMsg) {
        NotificationManager.error(nextProps.altMsg);
      }
      setTimeout(() => {
        this.props.hideDepartmentMessage();
        isMessageShow = false;
      }, 1000);
    }

    if (
      this.state.allDesignations.length === 0 &&
      nextProps.allDesignations.length !== 0
    )
      this.setState({ allDesignations: nextProps.allDesignations });
  }

  componentDidUpdate() {
    if (this.props.adDepSc) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been Added as draft");
        this.props.data.history.push(
          "/app/masterdata-management/departments/pending"
        );
      } else {
        NotificationManager.success("Department has been Added");
        this.props.data.history.push(
          "/app/masterdata-management/departments/approved"
        );
      }
    }
    if (this.props.edGrpSc) {
      if (this.props.isMakerCheckerEnabled || this.state.isPending) {
        NotificationManager.success("Your changes has been done as draft");
        this.props.data.history.push(
          "/app/masterdata-management/departments/pending"
        );
      } else {
        NotificationManager.success("Department has been updated");
        this.props.data.history.push(
          "/app/masterdata-management/departments/approved"
        );
      }
    }
    if (this.props.dlScuSc) {
      NotificationManager.success("Department has been deleted!");
      this.props.history.push("/app/masterdata-management/departments/pending");
    }
    if (this.props.dlGrpSc) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push(
          "/app/masterdata-management/departments/pending"
        );
      } else {
        NotificationManager.success("Department has been deleted!");
      }
    }
    if (this.props.prRqSc) {
      this.props.history.push("/app/masterdata-management/departments/pending");
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
        designationIds: this.state.isPending
          ? npI.id
            ? npI.id
            : []
          : npI.designationIds
          ? npI.designationIds.map(key => {
              return key.id;
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
            : "/" + this.state.gId
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

  fetchDesignation = () => {
    if (this.props.isMakerCheckerEnabled === "") return;

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      this.props.showScrutinizerLoader();
      this.props.fetchIndividualScrutinizer({ id: this.state.sId });
    } else {
      if (this.state.gId) {
        this.props.showDepartmentLoader();
        this.props.fetchIndividualDepartment({
          id: this.state.gId,
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

  onSubmitDepartment = () => {
    this.props.showDepartmentLoader();
    if (this.state.mode === "add") {
      this.props.addDepartment({
        name: this.state.name,
        code: this.state.code,
        description: this.state.description,
        status: this.state.status,
        designationIds: this.state.designationIds
      });
    } else {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        this.props.editDraftDepartment({
          id: this.state.gId,
          sId: this.state.sId,
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          status: this.state.status,
          designationIds: this.state.designationIds
        });
      } else {
        this.props.editDepartment({
          id: this.state.gId,
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          status: this.state.status,
          designationIds: this.state.designationIds
        });
      }
    }
  };

  onDeleteDepartment = () => {
    this.props.showDepartmentDeleteLoader();
    this.props.deleteDepartmentFromViewPage(this.state.gId);
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
      if (!window.confirm("Are you sure you want to DELETE this department?"))
        return;
      this.props.showDepartmentDeleteLoader();
      this.props.deleteDepartment({
        id: this.state.gId,
        pageNumber: 1,
        pageSize: 10
      });
    }
  };

  abp = req => {
    if (req === "sfa") {
      return this.state.maker
        ? !(
            this.state.sStatus === 0 &&
            this.props.isModules.userId === this.state.sUserId
          )
        : this.state.sStatus === 1;
    } else if (req === "review") {
      return this.state.checker
        ? !(
            this.state.sStatus === 1 &&
            this.props.isModules.userId !== this.state.sUserId
          )
        : true;
    } else if (req === "approve") {
      return this.state.checker
        ? !(
            this.state.sStatus === 1 &&
            this.props.isModules.userId !== this.state.sUserId
          )
        : true;
    } else if (req === "reject") {
      return this.state.checker
        ? !(
            this.state.sStatus === 1 &&
            this.props.isModules.userId !== this.state.sUserId
          )
        : true;
    } else if (req === "edit") {
      return (
        this.state.mode === "edit" ||
        (this.state.sStatus !== 0 &&
          (this.props.isModules && this.props.isModules.userId) ===
            this.state.sUserId) ||
        this.state.status === 1
      );
    } else if (req === "delete") {
      return this.state.isPending
        ? !(
            this.state.sStatus === 0 ||
            (this.state.sStatus === 3 &&
              this.state.sAction === scrutinizerActions.Added)
          )
        : false;
    } else return false;
  };

  render() {
    return (
      <Paper>
        <Card>
          <CardHeader className="bg-white text-black">
            {this.state.mode === "add" ? (
              <IntlMessages id="component.addDepartment" />
            ) : this.state.mode === "edit" ? (
              <IntlMessages id="sidebar.components.editDepartment" />
            ) : (
              <IntlMessages id="sidebar.components.viewDepartment" />
            )}
            &nbsp;&nbsp;
            {this.state.gId ? (
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
                  <InputLabel htmlFor="designationIds">Designations</InputLabel>
                  <Select
                    multiple
                    name="designationIds"
                    disabled={this.state.mode === "view"}
                    value={this.state.designationIds}
                    onChange={this.handleChange}
                  >
                    {this.state.allDesignations
                      ? this.state.allDesignations.map(role => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
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
                      `/app/masterdata-management/departments/${
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
                  onClick={this.onSubmitDepartment}
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
          <div className="floatingActionsContainer">
            <Button
              name=""
              variant="fab"
              disabled={this.abp("edit")}
              onClick={() => {
                this.props.history.push(
                  this.state.isPending
                    ? `/app/masterdata-management/departments/pending/edit/${
                        this.state.sId
                      }`
                    : `/app/masterdata-management/departments/approved/edit/${
                        this.state.gId
                      }`
                );
              }}
              className={
                this.abp("edit")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-blue text-white"
              }
            >
              <Tooltip title="Edit">
                <EDT />
              </Tooltip>
            </Button>

            {this.state.isPending ? (
              <React.Fragment>
                <Button
                  name=""
                  variant="fab"
                  disabled={this.abp("sfa")}
                  onClick={() => {
                    this.setState({
                      isConfirmation: true,
                      action: 1,
                      request: "sfa"
                    });
                  }}
                  className={
                    this.abp("sfa")
                      ? "jr-fab-btn text-grey"
                      : "jr-fab-btn bg-indigo text-white"
                  }
                >
                  <Tooltip title="Send For Approval">
                    <SFA />
                  </Tooltip>
                </Button>
                <Button
                  name=""
                  variant="fab"
                  disabled={this.abp("review")}
                  onClick={() => {
                    this.setState({
                      isConfirmation: true,
                      action: 5,
                      request: "review"
                    });
                  }}
                  className={
                    this.abp("review")
                      ? "jr-fab-btn text-grey"
                      : "jr-fab-btn bg-teal text-white"
                  }
                >
                  <Tooltip title="Send For Review">
                    <SFR />
                  </Tooltip>
                </Button>
                <Button
                  name=""
                  variant="fab"
                  disabled={this.abp("approve")}
                  onClick={() => {
                    this.setState({
                      isConfirmation: true,
                      action: 2,
                      request: "approve"
                    });
                  }}
                  className={
                    this.abp("approve")
                      ? "jr-fab-btn text-grey"
                      : "jr-fab-btn bg-success text-white"
                  }
                >
                  <Tooltip title="Approve">
                    <APR />
                  </Tooltip>
                </Button>
                <Button
                  name=""
                  variant="fab"
                  disabled={this.abp("reject")}
                  onClick={() => {
                    this.setState({
                      isConfirmation: true,
                      action: 3,
                      request: "reject"
                    });
                  }}
                  className={
                    this.abp("reject")
                      ? "jr-fab-btn text-grey"
                      : "jr-fab-btn bg-deep-orange text-white"
                  }
                >
                  <Tooltip title="Reject">
                    <REJ />
                  </Tooltip>
                </Button>
              </React.Fragment>
            ) : null}

            <Button
              name=""
              variant="fab"
              disabled={this.abp("delete")}
              onClick={this.onDeleteRequest}
              className={
                this.abp("delete")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-red text-white"
              }
            >
              <Tooltip title="Delete">
                <DEL />
              </Tooltip>
            </Button>
          </div>
        ) : null}

        {this.state.isConfirmation ? (
          <Dialog
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            maxWidth="sm"
          >
            <DialogTitle>
              {this.state.request === "sfa"
                ? "Send For Approval"
                : this.state.request === "review"
                ? "Send For Review"
                : this.state.request === "approve"
                ? "Approve"
                : "Reject"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText />
              <TextField
                name="comments"
                autoFocus
                margin="dense"
                id="comments"
                label="Comment"
                type="text"
                onChange={this.handleChange}
                autoComplete="off"
                defaultValue={this.state.comments}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                name=""
                onClick={() => {
                  this.setState({
                    isConfirmation: false,
                    request: ""
                  });
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                name="handleRequest"
                onClick={this.handleRequest}
                disabled={
                  this.state.action === 3 || this.state.action === 5
                    ? !this.state.comments
                    : false
                }
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    permissions: state.actions.actionsData ? state.actions.actionsData : "",
    iud: state.departmentsData.individualDepartmentData
      ? state.departmentsData.individualDepartmentData
      : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    allDesignations: state.designationsData.allDesignations
      ? state.designationsData.allDesignations.data.items
      : [],
    adDepSc: state.departmentsData.addDepartmentSuccess,
    edGrpSc: state.departmentsData.editDepartmentSuccess,
    dlGrpSc: state.departmentsData.deleteDepartmentSuccess,
    dlScuSc: state.scrutinizers.deleteScrutinizerSuccess,
    prRqSc: state.scrutinizers.processRequest,
    shMsg: state.departmentsData.showMessage,
    altMsg: state.departmentsData.alertMessage,
    shPrRqMsg: state.scrutinizers.showProcessRequestMessage,
    loader: state.scrutinizers.loader
      ? state.scrutinizers.loader
      : state.departmentsData.loader,
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
    ...grAc,
    ...mdAc,
    ...desAc
  }
)(AddEditView);
