import React from "react";
import PropTypes from "prop-types";
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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import SweetAlert from "react-bootstrap-sweetalert";
import permissions from "../../../../../../../../config/permissions";
import { connect } from "react-redux";
import {
  fetchScrutinizer,
  showScrutinizerMainPageLoader,
  hideScrutinizerMessage,
  hideScrutinizerMainPageMessage,
  hideProcessRequestMessage,
  showScrutinizerDeleteLoader,
  deleteScrutinizer,
  showScrutinizerLoader,
  fetchIndividualScrutinizer,
  showProcessRequestLoader,
  scrutinizerProcessRequest
} from "actions/Scrutinizer";
import {
  showRoleLoader,
  fetchAllModules
} from 'actions/Role';
import { fetchAction } from 'actions/Action';
import { fetchModule, showModuleLoader } from "actions/Module";
import IntlMessages from "util/IntlMessages";
import Loader from '../../../../../../../../components/loader/loader';
import Avatar from "@material-ui/core/Avatar";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Badge } from "reactstrap";
import scrutinizerActions from "../../../../../../../../config/scrutinizerActions";

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: "name", align: false, disablePadding: false, label: "Name" },
  { id: "status", align: false, disablePadding: false, label: "Requested Status" },
  { id: "operation", align: false, disablePadding: false, label: "Operation" },
  { id: "actions", align: false, disablePadding: false, label: "Actions" }
];

class DataTableHead extends React.Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
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
          <TableCell padding="checkbox" />
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

let DataTableToolbar = props => {
  return (
    <Toolbar>
      <div className="title">
        <Typography type="title">Roles Listing</Typography>
      </div>
      <div className="spacer" />
      <div className="actions" />
    </Toolbar>
  );
};

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
      if (element.actions) {
        element.actions.map((data) => {
          if (data.actionId === permissions.Update) {
            data.isSelected ? this.setState({ update: true }) : this.setState({ update: false })
          }
          else if (data.actionId === permissions.Delete) {
            data.isSelected ? this.setState({ delete: true }) : this.setState({ delete: false })
          }
          else if (data.actionId === permissions.View) {
            data.isSelected ? this.setState({ view: true }) : this.setState({ view: false })
          }
          else if (data.actionId === permissions.Maker) {
            data.isSelected ? this.setState({ maker: true }) : this.setState({ maker: false })
          }
          else if (data.actionId === permissions.Checker) {
            data.isSelected ? this.setState({ checker: true }) : this.setState({ checker: false })
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
      pageSize: 5,
      moduleCode: 'PR'
    };
    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer(obj);
  }

  componentDidUpdate() {
    if (this.props.deleteRoleSuccess) {
      NotificationManager.success('Role has been deleted!');
    }
    if (this.props.processRequestSucess) {
      if (this.props.requestData.request === 'sfa') {
        NotificationManager.success('Request for Authorization has been Success');
      }
      else if (this.props.requestData.request === 'approve') {
        NotificationManager.success('Request for Approval has been Success');
      }
      else {
        NotificationManager.success('Request for Rejection has been Success');
      }
    }
    if (this.props.individualRoleData !== null) {
      if (this.props.individualRoleData.data.page === 'view') {
        this.props.history.push('/app/identity-management/roles/pending/view/' + this.props.individualRoleData.data.id);
      }
      else {
        this.props.history.push('/app/identity-management/roles/pending/edit/' + this.props.individualRoleData.data.id);
      }
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
    else if (this.props.showMainPageMessage) {
      if (this.props.alertMainPageMessage === 'Request failed with status code 404') {
        this.props.history.push('/app/extra-pages/error-400')
      }
      else {
        this.props.history.push('/app/extra-pages/error-500')
      }
      setTimeout(() => {
        this.props.hideScrutinizerMainPageMessage();
      }, 100)
    }
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
    if (this.props.deleteRoleSuccess || this.props.showMessage) {
      this.setState({ warning: false })
    }
    if (this.props.processRequestSucess || this.props.showProcessRequestMessage) {
      this.setState({ warningMaker: false, warningApprove: false, warningReject: false })
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.props.rolesList.sort(
          (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        )
        : this.props.rolesList.sort(
          (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
        );

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    const obj = {
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage,
      moduleCode: 'PR'
    };
    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer(obj);
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    const obj = {
      pageNumber: 1,
      pageSize: event.target.value,
      moduleCode: 'PR'
    };
    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer(obj);
    this.setState({ rowsPerPage: event.target.value });
  };
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile() {
    const obj = {
      id: this.state.id,
      pageNumber: 1,
      pageSize: 5,
      moduleCode: 'PR'
    }
    this.props.showScrutinizerDeleteLoader();
    this.props.deleteScrutinizer(obj);
  }
  sfa(comment) {
    const obj = {
      id: this.state.id,
      moduleCode: 'PR',
      pageNumber: 1,
      pageSize: 5,
      action: 1,
      comment: comment,
      request: 'sfa'
    }
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  }
  approve(comment) {
    const obj = {
      id: this.state.id,
      moduleCode: 'PR',
      pageNumber: 1,
      pageSize: 5,
      action: 2,
      comment: comment,
      request: 'approve'
    }
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  }
  reject(comment) {
    const obj = {
      id: this.state.id,
      moduleCode: 'PR',
      pageNumber: 1,
      pageSize: 5,
      action: 3,
      comment: comment,
      request: 'reject'
    }
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  onCancelMakerWarning = () => {
    this.setState({
      warningMaker: false
    });
  };
  onCancelApproveWarning = () => {
    this.setState({
      warningApprove: false
    });
  };
  onCancelRejectWarning = () => {
    this.setState({
      warningReject: false
    });
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      data: [
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Donut", 452, 25.0, 51, 4.9),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
        createData("Honeycomb", 408, 3.2, 87, 6.5),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Jelly Bean", 375, 0.0, 94, 0.0),
        createData("KitKat", 518, 26.0, 65, 7.0),
        createData("Lollipop", 392, 0.2, 98, 0.0),
        createData("Marshmallow", 318, 0, 81, 2.0),
        createData("Nougat", 360, 19.0, 9, 37.0),
        createData("Oreo", 437, 18.0, 63, 4.0)
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      update: false,
      delete: false,
      view: false,
      maker: false,
      checker: false,
      warning: false,
      warningMaker: false,
      warningApprove: false,
      warningReject: false,
      comment: "",
      id: ""
    };
  }

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page, warning, warningMaker, warningApprove, warningReject } = this.state;
    const { showMessage, alertMessage, loader, deleteGroupSuccess, actions, isModules, showProcessRequestMessage, alertProcessRequestMessage } = this.props;
    return (
      <Paper>
        <DataTableToolbar />
        <div className="flex-auto">
          <div className="table-responsive-material">
            {(this.props.mainLoader === false && this.props.rolesList) ||
              this.props.isLoad ? (
                <Table className="">
                  <DataTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={this.handleRequestSort}
                    rowCount={this.props.rolesList.length}
                  />
                  <TableBody>
                    {this.props.rolesList
                      .map(n => {
                        var data = JSON.parse(n.payload)
                        var str = data.name;
                        var acronym = /\s/g.test(str)
                          ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
                          : str.charAt(0);
                        return (
                          <TableRow hover tabIndex={n.id} key={n.id}>
                            <TableCell padding="checkbox" />
                            <TableCell>
                              <div
                                style={{ padding: "0px" }}
                                className="user-profile d-flex flex-row align-items-center"
                              >
                                {data.image ? (
                                  <Avatar
                                    className="size-40"
                                    alt="Avatar"
                                    src={data.image}
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
                                    {data.name}
                                  </h4>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {n.status === 0 ? <Badge color="info" pill>
                                Draft
                              </Badge> : n.status === 1 ? (<Badge color="primary" pill>
                                  Send For Authorization
                              </Badge>) : n.status === 2 ? <Badge color="success" pill>
                                    Approved
                              </Badge> :
                                    <Badge color="danger" pill>
                                      Rejected
                              </Badge>
                              }
                            </TableCell>
                            <TableCell>
                              {n.action === 0 ? <Badge color="primary">
                                Added
                              </Badge> : n.action === 1 ? (<Badge color="info">
                                  Edited
                              </Badge>) :
                                  <Badge color="danger">
                                    Deleted
                              </Badge>
                              }
                            </TableCell>
                            <TableCell>
                              <div style={{ display: "inline-flex" }}>
                                <IconButton name=""
                                  disabled={this.state.view ? false : true}
                                  aria-label="View" onClick={() => {
                                    this.props.showScrutinizerLoader();
                                    this.props.fetchIndividualScrutinizer({
                                      id: n.id,
                                      page: "view",
                                      moduleCode: 'PR'
                                    });
                                    this.props.showRoleLoader();
                                    this.props.fetchAllModules();
                                  }}>
                                  <Tooltip title="View">
                                    <ViewIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton name=""
                                  disabled={this.state.update ? (n.status === 1 ? true : false) : true}
                                  aria-label="Edit"
                                  onClick={() => {
                                    localStorage.setItem('rId', n.id);
                                    this.props.showScrutinizerLoader();
                                    this.props.fetchIndividualScrutinizer({
                                      id: n.id,
                                      page: "edit",
                                      moduleCode: 'PR'
                                    });
                                    this.props.showRoleLoader();
                                    this.props.fetchAllModules();
                                  }}>
                                  <Tooltip title="Edit">
                                    <EditIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton 
                                  name="Delete"
                                  disabled={this.state.delete ? (((n.status === 0) || (n.status === 3 && n.action === scrutinizerActions.Added)) ? false : true) : false}
                                  aria-label="Delete"
                                  onClick={() => this.setState({ id: n.id, warning: true })}>
                                  <Tooltip title="Delete">
                                    <DeleteIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton 
                                  name="SFA"
                                  disabled={this.state.maker ? (((n.status === 0) && (isModules.userId === n.userId)) ? false : true) : (n.status === 1 ? true : false)}
                                  aria-label="Send For Approval"
                                  onClick={() => this.setState({ id: n.id, warningMaker: true })}>
                                  <Tooltip title="Send For Approval">
                                    <i className="zmdi zmdi-rotate-cw"></i>
                                  </Tooltip>
                                </IconButton>
                                <IconButton 
                                  name="Approve"
                                  disabled={this.state.checker ? (((n.status === 1) && (isModules.userId !== n.userId)) ? false : true) : true}
                                  aria-label="Approve"
                                  onClick={() => this.setState({ id: n.id, warningApprove: true })}>
                                  <Tooltip title="Approve">
                                    <i className="zmdi zmdi-check"></i>
                                  </Tooltip>
                                </IconButton>
                                <IconButton name=""
                                  disabled={this.state.checker ? (((n.status === 1) && (isModules.userId !== n.userId)) ? false : true) : true}
                                  aria-label="Reject"
                                  onClick={() => this.setState({ id: n.id, warningReject: true })}>
                                  <Tooltip title="Reject">
                                    <i className="zmdi zmdi-tag-close"></i>
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
                                  onConfirm={() => this.deleteFile(n.id)}
                                  onCancel={this.onCancelDelete}
                                >
                                  {this.props.isLoadingDelete && (
                                    <div className="loader-view">
                                      <Loader />
                                    </div>
                                  )}
                                  <IntlMessages id="sweetAlerts.youWillNotAble" />
                                </SweetAlert>
                                <SweetAlert
                                  show={warningMaker}
                                  input
                                  required={false}
                                  showCancel
                                  confirmBtnText="Yes"
                                  confirmBtnBsStyle="danger"
                                  cancelBtnBsStyle="default"
                                  title={<IntlMessages id="sweetAlerts.sentForApproval" />}
                                  inputPlaceHolder={<IntlMessages id="sweetAlerts.anInput" />}
                                  onConfirm={(input) => this.sfa(input)}
                                  onCancel={this.onCancelMakerWarning}
                                >
                                  {this.props.isLoadingProcessDelete && (
                                    <div className="loader-view">
                                      <Loader />
                                    </div>
                                  )}
                                  <IntlMessages id="sweetAlerts.comments" />
                                </SweetAlert>
                                <SweetAlert
                                  show={warningApprove}
                                  input
                                  required={false}
                                  showCancel
                                  confirmBtnText="Yes"
                                  confirmBtnBsStyle="danger"
                                  cancelBtnBsStyle="default"
                                  title={<IntlMessages id="sweetAlerts.approve" />}
                                  inputPlaceHolder={<IntlMessages id="sweetAlerts.anInput" />}
                                  onConfirm={(input) => this.approve(input)}
                                  onCancel={this.onCancelApproveWarning}
                                >
                                  {this.props.isLoadingProcessDelete && (
                                    <div className="loader-view">
                                      <Loader />
                                    </div>
                                  )}
                                  <IntlMessages id="sweetAlerts.comments" />
                                </SweetAlert>
                                <SweetAlert
                                  show={warningReject}
                                  input
                                  required
                                  showCancel
                                  confirmBtnText="Yes"
                                  confirmBtnBsStyle="danger"
                                  cancelBtnBsStyle="default"
                                  title={<IntlMessages id="sweetAlerts.reject" />}
                                  inputPlaceHolder={<IntlMessages id="sweetAlerts.anInput" />}
                                  onConfirm={(input) => this.reject(input)}
                                  onCancel={this.onCancelRejectWarning}
                                >
                                  {this.props.isLoadingProcessDelete && (
                                    <div className="loader-view">
                                      <Loader />
                                    </div>
                                  )}
                                  <IntlMessages id="sweetAlerts.comments" />
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
                <center>
                  <Loader />
                </center>
              )}
            {loader && <Loader />}
            {showMessage && NotificationManager.error(alertMessage)}
            {showProcessRequestMessage && NotificationManager.error(alertProcessRequestMessage)}
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    rolesList: state.scrutinizers.scrutinizersList
      ? state.scrutinizers.scrutinizersList.data.items
      : "",
    paging: state.scrutinizers.scrutinizersList
      ? state.scrutinizers.scrutinizersList.data.paging
      : "",
    deleteRoleSuccess: state.scrutinizers.deleteScrutinizerSuccess,
    showMessage: state.scrutinizers.showMessage,
    alertMessage: state.scrutinizers.alertMessage,
    loader: state.scrutinizers.loader,
    showMainPageMessage: state.scrutinizers.showMainPageMessage,
    alertMainPageMessage: state.scrutinizers.alertMainPageMessage,
    mainLoader: state.scrutinizers.mainLoader,
    individualRoleData: state.scrutinizers.individualScrutinizerData,
    isLoadingDelete: state.scrutinizers.deleteScrutinizerLoader,
    isLoadingProcessDelete: state.scrutinizers.processRequestLoader,
    showProcessRequestMessage: state.scrutinizers.showProcessRequestMessage,
    alertProcessRequestMessage: state.scrutinizers.alertProcessRequestMessage,
    processRequestSucess: state.scrutinizers.processRequest,
    requestData: state.scrutinizers.requestData ? state.scrutinizers.requestData.data : null
  };
}

export default connect(
  mapStateToProps,
  {
    showScrutinizerMainPageLoader,
    fetchScrutinizer,
    hideScrutinizerMessage,
    hideScrutinizerMainPageMessage,
    hideProcessRequestMessage,
    showScrutinizerDeleteLoader,
    deleteScrutinizer,
    showScrutinizerLoader,
    fetchIndividualScrutinizer,
    fetchAction,
    showModuleLoader,
    fetchModule,
    showRoleLoader,
    fetchAllModules,
    showProcessRequestLoader,
    scrutinizerProcessRequest
  }
)(DataTable);
