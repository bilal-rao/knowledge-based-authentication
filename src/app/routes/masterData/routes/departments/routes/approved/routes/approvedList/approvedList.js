import React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { NotificationManager } from "react-notifications";
import { Badge } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";

// Configs
import permissions from "config/permissions";

// Actions
import {
  showDepartmentMainPageLoader,
  fetchDepartment,
  hideDepartmentMessage,
  hideDepartmentMainPageMessage,
  showDepartmentDeleteLoader,
  deleteDepartment,
  showDepartmentLoader
} from "actions/Department";
import { fetchAction } from "actions/Action";
import { fetchModule, showModuleLoader } from "actions/Module";

// Icons
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import Clear from "@material-ui/icons/Clear";
import ResetSearch from "@material-ui/icons/Loop";
import GroupAdd from "@material-ui/icons/GroupAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";

// Components
import Search from "./search";
import Loader from "components/loader/loader";
import DataTableHead from "components/customComponents/DataTableHead/dataTableHead";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      add: false,
      update: false,
      delete: false,
      view: false,
      permissions: null,
      id: "",
      isModalOpen: false,
      name: null,
      email: null,
      columnData: [
        { id: "name", align: false, disablePadding: false, label: "Name" },
        {
          id: "description",
          align: false,
          disablePadding: false,
          label: "Description"
        },
        {
          id: "status",
          align: false,
          disablePadding: false,
          label: "Status"
        },
        {
          id: "actions",
          align: false,
          disablePadding: false,
          label: "Actions"
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.isModules === undefined) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }
    const obj = {
      pageNumber: 1,
      pageSize: 10
    };
    this.props.showDepartmentMainPageLoader();
    this.props.fetchDepartment(obj);

    localStorage.removeItem("gId");
    localStorage.removeItem("sId");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isModules) {
      nextProps.isModules.modules.map(element => {
        if (element.modules.length) {
          this.parent(element);
        } else {
          this.children(element);
        }
      });
    }
  }

  componentDidUpdate() {
    if (this.props.deleteDepartmentSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push(
          "/app/masterdata-management/departments/pending"
        );
      } else {
        NotificationManager.success("Department has been deleted!");
      }
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideDepartmentMessage();
      }, 100);
    } else if (this.props.showMainPageMessage) {
      if (
        this.props.alertMainPageMessage ===
        "Request failed with status code 404"
      ) {
        this.props.history.push("/app/extra-pages/error-400");
      } else {
        this.props.history.push("/app/extra-pages/error-1000");
      }
      setTimeout(() => {
        this.props.hideDepartmentMainPageMessage();
      }, 100);
    }
  }

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
    if (element.route === this.props.history.location.pathname) {
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
          }
        });
      }
    }
  };

  handleChangePage = (event, page) => {
    this.props.showDepartmentMainPageLoader();
    this.props.fetchDepartment({
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage
    });
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.showDepartmentMainPageLoader();
    this.props.fetchDepartment({
      pageNumber: 1,
      pageSize: event.target.value
    });
    this.setState({ rowsPerPage: event.target.value });
  };

  onHandleClick = (mode, id) => {
    this.props.showDepartmentLoader();
    this.props.history.push(
      `/app/masterdata-management/departments/approved/${mode}/${id}`
    );
  };

  deleteDepartment = gId => {
    if (!window.confirm("Are you sure you want to DELETE this department?"))
      return;
    this.props.showDepartmentDeleteLoader();
    this.props.deleteDepartment({
      id: gId,
      pageNumber: 1,
      pageSize: 10
    });
  };

  onClickFilter = () => {
    this.setState({ isModalOpen: true });
  };

  onClickReset = () => {
    this.props.showDepartmentLoader();
    this.setState({
      name: null,
      email: null
    });
    this.props.fetchDepartment({
      pageNumber: 1,
      pageSize: 10,
      type: "mainPage"
    });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSaveFilter = (name, email) => {
    this.setState({ name, email });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { showMessage, alertMessage, loader } = this.props;

    return (
      <Paper>
        <Toolbar>
          <div className="title">
            <Typography type="title">Departments Listing</Typography>
          </div>
          <div className="actions">
            {this.state.name || this.state.email ? (
              <div className="filterParams">
                {this.state.name ? (
                  <div className="filterItem">
                    <strong>Name: </strong>
                    {this.state.name}
                  </div>
                ) : null}
                {this.state.email ? (
                  <div className="filterItem">
                    <strong>Email: </strong>
                    {this.state.email}
                  </div>
                ) : null}
                <IconButton
                  name="Clear Filter"
                  aria-label="Clear Filter"
                  onClick={this.onClickReset}
                >
                  <Tooltip title="Clear Filter">
                    <Clear />
                  </Tooltip>
                </IconButton>
              </div>
            ) : null}
            <IconButton
              name="AddNewDepartment"
              aria-label="Add New Department"
              disabled={this.state.add ? false : true}
              onClick={() =>
                this.props.history.push(
                  "/app/masterdata-management/departments/approved/add"
                )
              }
            >
              <Tooltip title="Add New Department">
                <GroupAdd />
              </Tooltip>
            </IconButton>
            <IconButton
              name="Reset Search"
              aria-label="Reset Search"
              onClick={this.onClickReset}
            >
              <Tooltip title="Reset Search">
                <ResetSearch />
              </Tooltip>
            </IconButton>
            <IconButton
              name="Filter"
              aria-label="Filter"
              onClick={this.onClickFilter}
            >
              <Tooltip title="Filter">
                <FilterList />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
        <div className="flex-auto">
          <div className="table-responsive-material">
            {this.props.loader === false && this.props.departmentsList ? (
              <Table className="">
                <DataTableHead
                  columns={this.state.columnData}
                  data={this.props.departmentsList}
                />
                <TableBody>
                  {this.props.departmentsList &&
                    this.props.departmentsList.map(n => {
                      var str = n.name;
                      var acronym = /\s/g.test(str)
                        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
                        : str.charAt(0);
                      return (
                        <TableRow hover tabIndex={-1} key={n.id}>
                          <TableCell>
                            <div
                              style={{ padding: "0px" }}
                              className="user-profile d-flex flex-row align-items-center"
                            >
                              {n.image ? (
                                <Avatar
                                  className="size-40"
                                  alt="Avatar"
                                  src={n.image}
                                />
                              ) : (
                                <Avatar className="bg-warning">
                                  <h3 className="m-0 text-white">
                                    {acronym.toUpperCase()}
                                  </h3>
                                </Avatar>
                              )}
                              &nbsp;&nbsp;
                              <div className="user-detail">
                                <h4 className="user-name text-capitalize">
                                  {n.name}
                                </h4>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{n.description}</TableCell>
                          <TableCell>
                            {n.status === 0 ? (
                              <Badge color="success">Active</Badge>
                            ) : (
                              <Badge color="light">InActive</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div style={{ display: "inline-flex" }}>
                              <IconButton
                                name=""
                                disabled={this.state.view ? false : true}
                                aria-label="View"
                                onClick={() => {
                                  this.onHandleClick("view", n.id);
                                }}
                              >
                                <Tooltip title="View">
                                  <ViewIcon />
                                </Tooltip>
                              </IconButton>
                              <IconButton
                                name=""
                                disabled={
                                  this.state.update
                                    ? n.status === 1
                                      ? true
                                      : false
                                    : true
                                }
                                aria-label="Edit"
                                onClick={() => {
                                  this.onHandleClick("edit", n.id);
                                }}
                              >
                                <Tooltip title="Edit">
                                  <EditIcon />
                                </Tooltip>
                              </IconButton>
                              <IconButton
                                name=""
                                disabled={this.state.delete ? false : true}
                                aria-label="Delete"
                                onClick={() => {
                                  this.deleteDepartment(n.id);
                                }}
                              >
                                <Tooltip title="Delete">
                                  <DeleteIcon />
                                </Tooltip>
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={this.props.paging.totalItems}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <Loader />
            )}
            {loader && <Loader />}
            {showMessage && NotificationManager.error(alertMessage)}
          </div>
        </div>
        {this.state.isModalOpen ? (
          <Search
            onSaveFilter={this.onSaveFilter}
            onCloseModal={this.onCloseModal}
            name={this.state.name}
            email={this.state.email}
          />
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    departmentsList: state.departmentsData.departmentsList
      ? state.departmentsData.departmentsList.data.items
      : "",
    deleteDepartmentSuccess: state.departmentsData.deleteDepartmentSuccess,
    paging: state.departmentsData.departmentsList
      ? state.departmentsData.departmentsList.data.paging
      : "",
    showMessage: state.departmentsData.showMessage,
    alertMessage: state.departmentsData.alertMessage,
    loader: state.departmentsData.loader,
    showMainPageMessage: state.departmentsData.showMainPageMessage,
    alertMainPageMessage: state.departmentsData.alertMainPageMessage,
    allDepartments: state.departmentsData.allDepartments,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : ""
  };
}

export default connect(
  mapStateToProps,
  {
    showDepartmentMainPageLoader,
    fetchDepartment,
    hideDepartmentMessage,
    hideDepartmentMainPageMessage,
    fetchAction,
    showModuleLoader,
    fetchModule,
    showDepartmentDeleteLoader,
    deleteDepartment,
    showDepartmentLoader
  }
)(DataTable);
