import React from "react";
import PropTypes from "prop-types";
import keycode from "keycode";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "reactstrap";
import { connect } from "react-redux";
import Loader from '../../../../../../../../components/loader/loader';
import permissions from "../../../../../../../../config/permissions";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  showHierarchyMainPageLoader,
  fetchHierarchy,
  hideHierarchyMessage,
  hideHierarchyMainPageMessage,
  showHierarchyDeleteLoader,
  deleteHierarchy,
  showHierarchyLoader,
  fetchIndividualHierarchy,
  fetchAllHierarchy,
  getHierarchyTypes,
  getHierarchyTypesName
} from "actions/Hierarchy";
import { fetchAction } from 'actions/Action';
import { fetchModule, showModuleLoader } from "actions/Module";

let counter = 0;

function createData(code, name, type, status) {
  counter += 1;
  return { id: counter, code, name, type, status };
}

const columnData = [
  {
    id: "code",
    align: false,
    disablePadding: false,
    label: "Code"
  },
  {
    id: "name",
    align: false,
    disablePadding: false,
    label: "Name"
  },
  { id: "type", align: false, disablePadding: false, label: "Type" },
  { id: "status", align: false, disablePadding: false, label: "Status" },
  { id: "actions", align: false, disablePadding: false, label: "Actions" }
];

class DataTableHead extends React.Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class DataTable extends React.Component {
  parent = (element) => {
    element.modules.map(el => {
      if (el.modules.length) {
        this.parent(el);
      } else {
        this.children(el);
      }
    })
  }
  children = (element) => {
    if (element.route === this.props.history.location.pathname) {
      this.props.fetchAction(element);
      this.setState({
        permissions: element
      })
      if (element.actions) {
        element.actions.map((data) => {
          if (data.actionId === permissions.Add) {
            data.isSelected ? this.setState({ add: true }) : this.setState({ add: false })
          }
          else if (data.actionId === permissions.Update) {
            data.isSelected ? this.setState({ update: true }) : this.setState({ update: false })
          }
          else if (data.actionId === permissions.Delete) {
            data.isSelected ? this.setState({ delete: true }) : this.setState({ delete: false })
          }
          else if (data.actionId === permissions.View) {
            data.isSelected ? this.setState({ view: true }) : this.setState({ view: false })
          }
        })
      }
    }
  }
  componentDidMount() {
    if (this.props.isModules === undefined) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }
    const obj = {
      pageNumber: 1,
      pageSize: 5
    };
    this.props.showHierarchyMainPageLoader();
    this.props.fetchHierarchy(obj);
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
    if (nextProps.deleteHierarchySuccess) {
      this.setState({ warning: false })
    }
  }
  componentDidUpdate() {
    if (this.props.deleteHierarchySuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been deleted as draft!')
        this.props.history.push('/app/masterdata-management/hierarchies/pending');
      }
      else {
        NotificationManager.success('Hierarchy has been deleted!');
      }
    }
    if (this.props.individualHierarchyData && this.props.requestedPage) {
      if ((this.props.individualHierarchyData.data.page === 'view') && (this.props.requestedPage.page === 'view')) {
        this.props.history.push('/app/masterdata-management/hierarchies/approved/view/' + this.props.individualHierarchyData.data.id);
      }
      if ((this.props.individualHierarchyData.data.page === 'edit') && (this.props.requestedPage.page === 'edit')) {
        this.props.history.push('/app/masterdata-management/hierarchies/approved/edit/' + this.props.individualHierarchyData.data.id);
      }
    }
    if (this.props.hierarchyTypesSuccess && this.props.requestedPage.page === 'add') {
      this.props.history.push('/app/masterdata-management/hierarchies/approved/add');
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideHierarchyMessage();
      }, 100);
    }
    else if (this.props.showMainPageMessage) {
      if (this.props.alertMainPageMessage === 'Request failed with status code 404') {
        this.props.history.push('/app/extra-pages/error-400')
      }
      else {
        this.props.history.push('/app/extra-pages/error-500')
      }
      setTimeout(() => {
        this.props.hideHierarchyMainPageMessage();
      }, 100)
    }
  }
  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.props.hierarchyList.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.hierarchyList.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleKeyDown = (event, id) => {
    if (keycode(event) === "space") {
      this.handleClick(event, id);
    }
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    const obj = {
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage
    };
    this.props.showHierarchyMainPageLoader();
    this.props.fetchHierarchy(obj);
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    const obj = {
      pageNumber: 1,
      pageSize: event.target.value
    };
    this.props.showHierarchyMainPageLoader();
    this.props.fetchHierarchy(obj);
    this.setState({ rowsPerPage: event.target.value });
  };
  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      data: [
        createData(111, "Main Branch - Karachi", "Branch", 0),
        createData(112, "KAGHAN ROAD, BALAKOT", "City", 0),
        createData(
          113,
          "BARA TOWERS, JINNAHABAD, ABBOTTABAD",

          "Province",
          0
        ),
        createData(114, "SUPPLY BAZAR ATD", "Area", 0),
        createData(115, "AKALGARH", "Zone", 1),
        createData(116, "DADYAL BRANCH", "City", 1),
        createData(117, "CHATRO BRANCH", "Branch", 0)
      ].sort((a, b) => (a.name < b.name ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      add: false,
      update: false,
      delete: false,
      view: false,
      permissions: null,
      warning: false,
      id: ""
    };
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile = () => {
    const obj = {
      id: this.state.id,
      pageNumber: 1,
      pageSize: 5,
    }
    this.props.showHierarchyDeleteLoader();
    this.props.deleteHierarchy(obj);
  };
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  render() {
    const { data, order, orderBy, selected, rowsPerPage, page, permissions, warning } = this.state;
    const { showMessage, alertMessage, loader, deleteUserSuccess, actions, isModules } = this.props;
    return (
      <Paper>
        <Toolbar>
          <div className="title">
            <Typography type="title">Hierarchy Listing</Typography>
          </div>
          <div className="spacer" />
          <div className="actions">
            <Button name="" variant="contained" color="primary" className="jr-btn"
              disabled={this.state.add ? false : true}
              onClick={
                () => {
                  this.props.showHierarchyLoader();
                  this.props.getHierarchyTypes({ page: 'add' });
                }
              }>
              <i className="zmdi zmdi-plus-square" />
              <span>{<IntlMessages id="forms.button.add" />}</span>
            </Button>
          </div>
        </Toolbar>
        <div className="flex-auto">
          <div className="table-responsive-material">
            {this.props.mainLoader === false && this.props.hierarchyList ? (
              <Table className="">
                <DataTableHead
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={this.props.hierarchyList.length}
                />
                <TableBody>
                  {this.props.hierarchyList
                    .map(n => {
                      var str = n.name;
                      var acronym = /\s/g.test(str)
                        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
                        : str.charAt(0);
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={n.id}
                        >
                          <TableCell>
                            {n.code}
                          </TableCell>
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
                                  {n.name.toUpperCase()}
                                </h4>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {n.hierarchyTypeId === 1 ? (
                              <Badge color="secondary">City</Badge>
                            ) : n.hierarchyTypeId === 2 ? (
                              <Badge color="info">Area</Badge>
                            ) : n.hierarchyTypeId === 3 ? (
                              <Badge color="primary">Zone</Badge>
                            ) : (
                                    <Badge color="danger">Branch</Badge>
                                  )}
                          </TableCell>
                          <TableCell>
                            {n.status === 0 ? (
                              <Badge color="success" pill>
                                Active
                            </Badge>
                            ) : (
                                <Badge color="light" pill>
                                  InActive
                            </Badge>
                              )}
                          </TableCell>
                          <TableCell>
                            <div style={{ display: "inline-flex" }}>
                              <IconButton name=""
                                disabled={this.state.view ? false : true}
                                aria-label="View"
                                onClick={() => {
                                  this.props.showHierarchyLoader();
                                  this.props.fetchIndividualHierarchy({
                                    id: n.id,
                                    page: "view"
                                  });
                                  this.props.getHierarchyTypes({ page: 'view' });
                                  if (n.parentHierarchyTypeId) {
                                    this.props.showHierarchyLoader();
                                    this.props.getHierarchyTypesName(n.parentHierarchyTypeId);
                                  }
                                }}>
                                <Tooltip title="View">
                                  <ViewIcon />
                                </Tooltip>
                              </IconButton>
                              <IconButton name=""
                                disabled={this.state.update ? (n.status === 1 ? true : false) : true}
                                aria-label="Edit"
                                onClick={() => {
                                  localStorage.setItem('hId', n.id);
                                  this.props.showHierarchyLoader();
                                  this.props.fetchIndividualHierarchy({
                                    id: n.id,
                                    page: "edit"
                                  });
                                  this.props.getHierarchyTypes({ page: 'edit' });
                                  if (n.parentHierarchyTypeId) {
                                    this.props.showHierarchyLoader();
                                    this.props.getHierarchyTypesName(n.parentHierarchyTypeId);
                                  }
                                }}>
                                <Tooltip title="Edit">
                                  <EditIcon />
                                </Tooltip>
                              </IconButton>
                              <IconButton name=""
                                disabled={this.state.delete ? false : true}
                                aria-label="Delete"
                                onClick={() => this.setState({ id: n.id, warning: true })}>
                                <Tooltip title="Delete">
                                  <DeleteIcon />
                                </Tooltip>
                              </IconButton>
                              <SweetAlert
                                show={warning}
                                warning
                                showCancel
                                confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt" />}
                                confirmBtnBsStyle="danger"
                                cancelBtnBsStyle="default"
                                title={<IntlMessages id="sweetAlerts.areYouSure" />}
                                onConfirm={this.deleteFile}
                                onCancel={this.onCancelDelete}
                              >
                                {this.props.isLoadingDelete && (
                                  <div className="loader-view">
                                    <Loader />
                                  </div>
                                )}
                                <IntlMessages id="sweetAlerts.youWillNotAble" />
                              </SweetAlert>
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
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    hierarchyList: state.hierarchiesData.hierarchyList
      ? state.hierarchiesData.hierarchyList.data.items
      : "",
    deleteHierarchySuccess: state.hierarchiesData.deleteHierarchySuccess,
    paging: state.hierarchiesData.hierarchyList
      ? state.hierarchiesData.hierarchyList.data.paging
      : "",
    showMessage: state.hierarchiesData.showMessage,
    alertMessage: state.hierarchiesData.alertMessage,
    loader: state.hierarchiesData.loader,
    showMainPageMessage: state.hierarchiesData.showMainPageMessage,
    alertMainPageMessage: state.hierarchiesData.alertMainPageMessage,
    mainLoader: state.hierarchiesData.mainLoader,
    individualHierarchyData: state.hierarchiesData.individualHierarchyData,
    allGroups: state.groupsData.allGroups,
    isLoadingDelete: state.hierarchiesData.deleteHierarchyLoader,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : '',
    hierarchyTypesSuccess: state.hierarchiesData.hierarchyTypesSuccess,
    requestedPage: state.hierarchiesData.getHierarchyTypes ? state.hierarchiesData.getHierarchyTypes.data : ''
  };
}


export default connect(mapStateToProps, {
  showModuleLoader,
  fetchModule,
  showHierarchyMainPageLoader,
  fetchHierarchy,
  hideHierarchyMessage,
  hideHierarchyMainPageMessage,
  fetchAction,
  showHierarchyDeleteLoader,
  deleteHierarchy,
  showHierarchyLoader,
  fetchIndividualHierarchy,
  fetchAllHierarchy,
  getHierarchyTypes,
  getHierarchyTypesName

})(DataTable);
