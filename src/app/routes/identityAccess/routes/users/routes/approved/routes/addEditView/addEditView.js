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
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { Badge } from "reactstrap";

// Configs
import permissions from "config/permissions.js";
import scrutinizerActions from "config/scrutinizerActions";

// Actions
import * as usAc from "actions/Employee";
import * as dsAc from "actions/Designation";
import * as dpAc from "actions/Department";
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as grAc from "actions/Group";
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
      uId: null,
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
      ts: 0,

      imageURL: "",
      acronym: "",
      name: "",
      code: "",
      emailAddress: "",
      description: "",
      groups: [],
      groupIds: [],
      departmentList: [],
      departmentId: "",
      designationList: [],
      designationId: "",
      shp1: false,
      shp2: false,
      status: 0,
      errorText: {},
      error: {
        mobileNumber: false,
        email: false
      }
    };
  }

  componentDidMount() {
    this.props.resetUserSuccessIndicators();
    this.props.fetchAllGroups();
    this.props.fetchAllDepartments();
    this.props.fetchAllDesignations();

    let location = window.location.href;
    let mode =
      location.split("/").reverse()[0] === "add"
        ? "add"
        : location.split("/").reverse()[1];
    let uId = mode === "add" ? null : location.split("/").reverse()[0];

    if (location.split("/").reverse()[2] === "pending") {
      this.setState({
        isPending: true
      });
    }

    this.setState(
      {
        uId: uId ? uId : localStorage.getItem("uId"),
        sId: localStorage.getItem("sId"),
        mode: mode
      },
      () => {
        if (this.state.mode !== "add") {
          this.fetchUser();

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
      if (nextProps.adUsrSc) {
        NotificationManager.success("User added successfully.");
      } else if (nextProps.edUsrSc) {
        NotificationManager.success("User updated successfully.");
      } else if (nextProps.altMsg) {
        NotificationManager.error(nextProps.altMsg);
      }
      setTimeout(() => {
        this.props.hideUserMessage();
        isMessageShow = false;
      }, 1000);
    }

    if (this.state.groups.length === 0 && nextProps.groups.length !== 0)
      this.setState({ groups: nextProps.groups });

    if (
      this.state.departmentList.length === 0 &&
      nextProps.departmentsData.length !== 0
    )
      this.setState({ departmentList: nextProps.departmentsData }, () => {
        this.props.searchDesignation({
          DepartmentId: this.state.departmentId
        });
      });

    if (nextProps.allDesignations !== this.props.allDesignations)
      this.setState({ designationList: nextProps.allDesignations });
  }

  componentDidUpdate() {
    if (this.props.adUsrSc) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been Added as draft");
        this.props.data.history.push("/app/identity-management/users/pending");
      } else {
        NotificationManager.success("User has been Added");
        this.props.data.history.push("/app/identity-management/users/approved");
      }
    }
    if (this.props.edUsrSc) {
      if (this.props.isMakerCheckerEnabled || this.state.isPending) {
        NotificationManager.success("Your changes has been done as draft");
        this.props.data.history.push("/app/identity-management/users/pending");
      } else {
        NotificationManager.success("User has been updated");
        this.props.data.history.push("/app/identity-management/users/approved");
      }
    }
    if (this.props.dlScuSc) {
      NotificationManager.success("User has been deleted!");
      this.props.history.push("/app/identity-management/users/pending");
    }
    if (this.props.dlUsrSc) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/identity-management/users/pending");
      } else {
        NotificationManager.success("User has been deleted!");
      }
    }
    if (this.props.prRqSc) {
      this.props.history.push("/app/identity-management/users/pending");
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
        acronym: npI.name ? this.generateAcronym(npI.name) : "",
        name: npI.name ? npI.name : "",
        code: npI.code ? npI.code : "",
        emailAddress: npI.emailAddress ? npI.emailAddress : "",
        description: npI.description ? npI.description : "",
        groupIds: npI.groupIds ? npI.groupIds : [],
        status: typeof npI.status !== "undefined" ? npI.status : 0,
        departmentId: npI.departmentId ? npI.departmentId : "",
        designationId: npI.designationId ? npI.designationId : "",
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
            : "/" + this.state.uId
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

  fetchUser = () => {
    if (this.props.isMakerCheckerEnabled === "") return;

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      this.props.showScrutinizerLoader();
      this.props.fetchIndividualScrutinizer({ id: this.state.sId });
    } else {
      if (this.state.uId) {
        this.props.showUserLoader();
        this.props.fetchIndividualUser({
          userId: this.state.uId,
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
    this.setState(
      {
        [e.target.name]:
          e.target.name === "code" && e.nativeEvent.data === " "
            ? e.target.value.replace(/ /g, "")
            : e.target.value
      },
      () => {
        if (e.target.name === "departmentId") {
          this.props.searchDesignation({
            DepartmentId: e.target.value
          });
        }
      }
    );
  };

  onSubmitUser = () => {
    this.props.showUserLoader();
    if (this.state.mode === "add") {
      this.props.addUser({
        name: this.state.name,
        code: this.state.code,
        emailAddress: this.state.emailAddress,
        description: this.state.description,
        groupIds: this.state.groupIds,
        departmentId: this.state.departmentId,
        designationId: this.state.designationId
      });
    } else {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        this.props.editDraftUser({
          uId: this.state.uId,
          sId: this.state.sId,
          code: this.state.code,
          name: this.state.name,
          emailAddress: this.state.emailAddress,
          description: this.state.description,
          status: this.state.status,
          groupIds: this.state.groupIds,
          departmentId: this.state.departmentId,
          designationId: this.state.designationId
        });
      } else {
        this.props.editUser({
          uId: this.state.uId,
          name: this.state.name,
          code: this.state.code,
          emailAddress: this.state.emailAddress,
          description: this.state.description,
          status: this.state.status,
          groupIds: this.state.groupIds,
          departmentId: this.state.departmentId,
          designationId: this.state.designationId
        });
      }
    }
  };

  onDeleteUser = () => {
    this.props.showUserDeleteLoader();
    this.props.deleteUserFromViewPage(this.state.uId);
  };

  validateEmail = () => {
    if (this.state.emailAddress) {
      if (
        this.state.emailAddress.match(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
      ) {
        this.setState({ errorText: { email: false } });
      } else {
        this.setState({
          errorText: {
            email: "Invalid email address"
          }
        });
      }
    } else {
      this.setState({ errorText: { email: false } });
    }
  };

  handleRequest = () => {
    const obj = {
      id: this.state.sId,
      moduleCode: "PU",
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
        moduleCode: "PU"
      });
    } else {
      if (!window.confirm("Are you sure you want to DELETE this user?")) return;
      this.props.showUserDeleteLoader();
      this.props.deleteUser({
        id: this.state.uId,
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
                <IntlMessages id="component.addUser" />
              ) : this.state.mode === "edit" ? (
                <IntlMessages id="sidebar.components.editUser" />
              ) : (
                <IntlMessages id="sidebar.components.viewUser" />
              )}
              &nbsp;&nbsp;
              {this.state.uId ? (
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
                <div className="col-lg-4 col-md-4 col-sm-s12 m-b-15">
                  <TextField
                    type="email"
                    label="Email Address"
                    name="emailAddress"
                    disabled={this.state.mode === "view"}
                    value={this.state.emailAddress}
                    onChange={this.handleChange}
                    onBlur={this.validateEmail}
                    error={this.state.error.email}
                    margin="none"
                    autoComplete="off"
                    fullWidth
                  />
                  <div style={{ color: "red" }}>
                    {this.state.errorText["email"]}
                  </div>
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
                <div className="col-lg-4 col-md-4 col-sm-12 m-b-20">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="groupIds">Groups</InputLabel>
                    <Select
                      multiple
                      name="groupIds"
                      disabled={this.state.mode === "view"}
                      value={this.state.groupIds}
                      onChange={this.handleChange}
                    >
                      {this.props.groups
                        ? this.props.groups.map(data => (
                            <MenuItem key={data.groupId} value={data.groupId}>
                              {data.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 m-b-20">
                  <FormControl required className="w-100 mb-2">
                    <InputLabel htmlFor="departmentId">Department</InputLabel>
                    <Select
                      name="departmentId"
                      disabled={this.state.mode === "view"}
                      value={this.state.departmentId}
                      onChange={this.handleChange}
                    >
                      {this.state.departmentList
                        ? this.state.departmentList.map((data, index) => (
                            <MenuItem key={data.id} value={data.id}>
                              {data.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 m-b-20">
                  <FormControl required className="w-100 mb-2">
                    <InputLabel htmlFor="designationId">Designation</InputLabel>
                    <Select
                      name="designationId"
                      disabled={this.state.mode === "view"}
                      value={this.state.designationId}
                      onChange={this.handleChange}
                    >
                      {this.state.designationList
                        ? this.state.designationList.map((data, index) => (
                            <MenuItem key={data.id} value={data.id}>
                              {data.name}
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
                      disabled={
                        this.state.mode === "view" ||
                        !(this.state.status === 0 || this.state.status === 1)
                      }
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={0}>Active</MenuItem>
                      <MenuItem value={1}>InActive</MenuItem>
                      <MenuItem disabled value={2}>Deleted</MenuItem>
                      <MenuItem disabled value={3}>Force Password Change</MenuItem>
                      <MenuItem disabled value={4}>InActive</MenuItem>
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
                        `/app/identity-management/users/${
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
                      !this.state.emailAddress ||
                      // !this.state.code ||
                      !this.state.departmentId ||
                      !this.state.designationId ||
                      this.state.mode === "view" ||
                      Boolean(this.state.errorText.email)
                    }
                    onClick={this.onSubmitUser}
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
              eId={this.state.uId}
              mode={this.state.mode}
              history={this.props.history}
              path={`identity-management/users`}
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
                });
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
    iud: state.usersData.individualUserData
      ? state.usersData.individualUserData
      : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    isTrail: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData.data.trail
        ? state.scrutinizers.individualScrutinizerData.data.trail.length > 0
        : false
      : false,
    groups: state.groupsData.allGroups
      ? state.groupsData.allGroups.data.items
      : "",
    departmentsData: state.departmentsData.allDepartments
      ? state.departmentsData.allDepartments.data.items
      : [],
    designationsData: state.designationsData.designationsList
      ? state.designationsData.designationsList.data.items
      : [],
    allDesignations: state.designationsData.designationsList
      ? state.designationsData.designationsList.data.items
      : [],
    adUsrSc: state.usersData.addUserSuccess,
    edUsrSc: state.usersData.editUserSuccess,
    dlUsrSc: state.usersData.deleteUserSuccess,
    dlScuSc: state.scrutinizers.deleteScrutinizerSuccess,
    prRqSc: state.scrutinizers.processRequest,
    shMsg: state.usersData.showMessage,
    altMsg: state.usersData.alertMessage,
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
    ...usAc,
    ...dsAc,
    ...dpAc,
    ...scAc,
    ...acAc,
    ...grAc,
    ...mdAc
  }
)(AddEditView);
