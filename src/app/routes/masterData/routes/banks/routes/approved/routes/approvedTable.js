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
import { connect } from "react-redux";
import {
  showBankMainPageLoader,
  fetchBank,
  hideBankMessage,
  hideBankMainPageMessage,
  showBankDeleteLoader,
  deleteBank,
  showBankLoader,
  fetchIndividualBank,
} from "actions/Bank";
import { fetchAction } from 'actions/Action';
import { fetchModule, showModuleLoader } from "actions/Module";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import Loader from '../../../../../../../../components/loader/loader';
import Avatar from "@material-ui/core/Avatar";
import {
  NotificationManager
} from "react-notifications";
import { Badge } from "reactstrap";
import permissions from "../../../../../../../../config/permissions";

let counter = 0;




function createData(name, code, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, code, calories, fat, carbs, protein };
}

const columnData = [
  { id: "code", align: false, disablePadding: false, label: "Code" },
  { id: "name", align: false, disablePadding: false, label: "Name" },
  { id: "status", align: false, disablePadding: false, label: "Status" },
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
        <Typography type="title">Banks Listing</Typography>
      </div>
      <div className="spacer" />
      <div className="actions">
        <Button name="" variant="contained" color="primary" className="jr-btn"
          disabled={props.isEnable ? false : true}
          onClick={() => props.history.push('/app/masterdata-management/bank/bank/add')}>
          <i className="zmdi zmdi-account-add" />
          <span>{<IntlMessages id="forms.button.addBanks" />}</span>
        </Button>
      </div>
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
    this.props.showBankMainPageLoader();
    this.props.fetchBank(obj);
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
    if (nextProps.deleteBankSuccess || nextProps.showMessage) {
      this.setState({ warning: false })
    }
  }
  componentDidUpdate() {
    if (this.props.deleteBankSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been deleted as draft!')
        this.props.history.push('/app/masterdata-management/bank/pendingbank');
      }
      else {
        NotificationManager.success('Bank has been deleted!')
      }
    }
    if (this.props.individualBankData !== null) {
      if (this.props.individualBankData.data.page === 'view') {
        this.props.history.push('/app/masterdata-management/bank/bank/view/' + this.props.individualBankData.data.id);
      }
      else {
        this.props.history.push('/app/masterdata-management/bank/bank/edit/' + this.props.individualBankData.data.id);
      }
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideBankMessage();
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
        this.props.hideBankMainPageMessage();
      }, 100)
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
        ? this.props.banksList.sort(
          (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        )
        : this.props.banksList.sort(
          (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
        );

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    const obj = {
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage
    };
    this.props.showBankMainPageLoader();
    this.props.fetchBank(obj);
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    const obj = {
      pageNumber: 1,
      pageSize: event.target.value
    };
    this.props.showBankMainPageLoader();
    this.props.fetchBank(obj);
    this.setState({ rowsPerPage: event.target.value });
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
      add: false,
      update: false,
      delete: false,
      view: false,
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
    this.props.showBankDeleteLoader();
    this.props.deleteBank(obj);
  };
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  render() {
    const { data, order, orderBy, selected, rowsPerPage, page, warning } = this.state;
    const { showMessage, alertMessage, loader, roleLoader, deleteBankSuccess, actions, isModules } = this.props;
    return (
      <Paper>
        <DataTableToolbar
          history={this.props.history}
          isEnable={this.state.add}
        />
        <div className="flex-auto">
          <div className="table-responsive-material">
            {(this.props.mainLoader === false && this.props.banksList) ||
              this.props.isLoad ? (
                <Table className="">
                  <DataTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={this.handleRequestSort}
                    rowCount={this.props.banksList.length}
                  />
                  <TableBody>
                    {this.props.banksList
                      .map(n => {
                        var str = n.name;
                        var acronym = /\s/g.test(str)
                          ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
                          : str.charAt(0);
                        return (
                          <TableRow hover tabIndex={-1} key={n.id}>
                            <TableCell padding="checkbox" />
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
                                    {n.name}
                                  </h4>
                                </div>
                              </div>
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
                                  aria-label="View" onClick={() => {
                                    this.props.showBankLoader();
                                    this.props.fetchIndividualBank({
                                      id: n.id,
                                      page: "view"
                                    })
                                  }}>
                                  <Tooltip title="View">
                                    <ViewIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton name=""
                                  disabled={this.state.update ? (n.status === 1 ? true : false) : true} aria-label="Edit"
                                  onClick={() => {
                                    localStorage.setItem('bId', n.id);
                                    this.props.showBankLoader();
                                    this.props.fetchIndividualBank({
                                      id: n.id,
                                      page: "edit"
                                    })
                                  }}>
                                  <Tooltip title="Edit">
                                    <EditIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton name=""
                                  aria-label="Delete"
                                  disabled={this.state.delete ? false : true}
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
                <center>
                  <Loader />
                </center>
              )}
            {loader && <Loader />}
            {roleLoader && <Loader />}
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
    banksList: state.banksData.banksList
      ? state.banksData.banksList.data.items
      : "",
    paging: state.banksData.banksList
      ? state.banksData.banksList.data.paging
      : "",
    deleteBankSuccess: state.banksData.deleteBankSuccess,
    showMessage: state.banksData.showMessage,
    alertMessage: state.banksData.alertMessage,
    loader: state.banksData.loader,
    roleLoader: state.rolesData.loader,
    showMainPageMessage: state.banksData.showMainPageMessage,
    alertMainPageMessage: state.banksData.alertMainPageMessage,
    mainLoader: state.banksData.mainLoader,
    individualBankData: state.banksData.individualBankData,
    allRoles: state.rolesData.allRoles
      ? state.rolesData.allRoles.data.items
      : null,
    isLoadingDelete: state.banksData.deleteBankLoader,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : ''
  };
}

export default connect(
  mapStateToProps,
  {
    showBankMainPageLoader,
    fetchBank,
    hideBankMessage,
    hideBankMainPageMessage,
    showModuleLoader,
    fetchModule,
    fetchAction,
    showBankDeleteLoader,
    deleteBank,
    showBankLoader,
    fetchIndividualBank,
  }
)(DataTable);
