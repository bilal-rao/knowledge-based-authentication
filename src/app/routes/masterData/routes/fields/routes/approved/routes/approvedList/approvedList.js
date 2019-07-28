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
  showFieldMainPageLoader,
  fetchField,
  hideFieldMessage,
  hideFieldMainPageMessage,
  showFieldDeleteLoader,
  deleteField,
  showFieldLoader
} from "actions/Fields";
import { fetchAction } from "actions/Action";
import { fetchModule, showModuleLoader } from "actions/Module";

// Icons
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import Clear from "@material-ui/icons/Clear";
import ResetSearch from "@material-ui/icons/Loop";
import FieldAdd from "@material-ui/icons/AddBox";
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
      type: null,
      columnData: [
        { id: "name", align: false, disablePadding: false, label: "Name" },
        {
          id: "type",
          align: false,
          disablePadding: false,
          label: "Type"
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
    this.props.showFieldMainPageLoader();
    this.props.fetchField(obj);
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
    if (this.props.deleteFieldSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/masterdata-management/fields/pending");
      } else {
        NotificationManager.success("Field has been deleted!");
      }
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideFieldMessage();
      }, 100);
    } else if (this.props.showMainPageMessage) {
      if (
        this.props.alertMainPageMessage === "Request failed with status code 404"
      ) {
        this.props.history.push("/app/extra-pages/error-400");
      } else {
        this.props.history.push("/app/extra-pages/error-500");
      }
      setTimeout(() => {
        this.props.hideFieldMainPageMessage();
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
    this.props.showFieldMainPageLoader();
    this.props.fetchField({
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage
    });
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.showFieldMainPageLoader();
    this.props.fetchField({
      pageNumber: 1,
      pageSize: event.target.value
    });
    this.setState({ rowsPerPage: event.target.value });
  };

  onHandleClick = (mode, id) => {
    this.props.showFieldLoader();
    this.props.history.push(
      `/app/masterdata-management/fields/approved/${mode}/${id}`
    );
  };

  deleteField = fId => {
    if (!window.confirm("Are you sure you want to DELETE this field?")) return;
    this.props.showFieldDeleteLoader();
    this.props.deleteField({
      id: fId,
      pageNumber: 1,
      pageSize: 10
    });
  };

  onClickFilter = () => {
    this.setState({ isModalOpen: true });
  };

  onClickReset = () => {
    this.props.showFieldLoader();
    this.setState({
      name: null,
      type: null
    });
    this.props.fetchField({
      pageNumber: 1,
      pageSize: 10,
      type: "mainPage"
    });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSaveFilter = (name, type) => {
    this.setState({ name, type });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { showMessage, alertMessage, loader } = this.props;

    return (
      <Paper>
        <Toolbar>
          <div className="title">
            <Typography type="title">Fields Listing</Typography>
          </div>
          <div className="actions">
            {this.state.name || this.state.type ? (
              <div className="filterParams">
                {this.state.name ? (
                  <div className="filterItem">
                    <strong>Name: </strong>
                    {this.state.name}
                  </div>
                ) : null}
                {this.state.type ? (
                  <div className="filterItem">
                    <strong>Type: </strong>
                    {this.state.type}
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
              name="AddNewField"
              aria-label="Add New Field"
              disabled={this.state.add ? false : true}
              onClick={() =>
                this.props.history.push(
                  "/app/masterdata-management/fields/approved/add"
                )
              }
            >
              <Tooltip title="Add New Field">
                <FieldAdd />
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
            {this.props.mainLoader === false && this.props.fieldsList ? (
              <Table className="">
                <DataTableHead
                  columns={this.state.columnData}
                  data={this.props.fieldsList}
                />
                <TableBody>
                  {this.props.fieldsList.map(n => {
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
                        <TableCell>{n.type ? n.type : 'N/A'}</TableCell>
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
                                this.deleteField(n.id);
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
            type={this.state.type}
          />
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    fieldsList: state.fieldsData.fieldsList
      ? state.fieldsData.fieldsList.data.items
      : "",
    deleteFieldSuccess: state.fieldsData.deleteFieldSuccess,
    paging: state.fieldsData.fieldsList
      ? state.fieldsData.fieldsList.data.paging
      : "",
    showMessage: state.fieldsData.showMessage,
    alertMessage: state.fieldsData.alertMessage,
    loader: state.fieldsData.loader,
    showMainPageMessage: state.fieldsData.showMainPageMessage,
    alertMainPageMessage: state.fieldsData.alertMainPageMessage,
    mainLoader: state.fieldsData.mainLoader,
    allGroups: state.groupsData.allGroups,
    isLoadingDelete: state.fieldsData.deleteFieldLoader,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : ""
  };
}

export default connect(
  mapStateToProps,
  {
    showFieldMainPageLoader,
    fetchField,
    hideFieldMessage,
    hideFieldMainPageMessage,
    fetchAction,
    showModuleLoader,
    fetchModule,
    showFieldDeleteLoader,
    deleteField,
    showFieldLoader
  }
)(DataTable);
