import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { NotificationManager } from "react-notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// Configs
import permissions from "./../../../config/permissions";
import scrutinizerActions from "./../../../config/scrutinizerActions";

// Actions
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as mdAc from "actions/Module";

// Icons
import IconButton from "@material-ui/core/IconButton";
import ResetSearch from "@material-ui/icons/Loop";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import SFA from "@material-ui/icons/Rotate90DegreesCcw";
import SFR from "@material-ui/icons/Search";
import APR from "@material-ui/icons/Done";
import REJ from "@material-ui/icons/Clear";
import MOR from "@material-ui/icons/MoreVert";

// Components
import Loader from "./../../../components/loader/loader";
import DataTableHead from "./../DataTableHead/dataTableHead";
import MCConfirmation from "./../makerCheckerConfirmation/index";
import Search from "./search";

function Comment(props) {
  return (
    <div {...props}>
      {props.comments.length > 10
        ? props.comments.slice(0, 9) + ".."
        : props.comments}
    </div>
  );
}

class PendingList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      anchorEl: undefined,
      menuState: false,
      md: {},
      maker: false,
      checker: false,
      isConfirmation: false,
      comments: "",
      id: "",
      sId: "",
      isModalOpen: false,
      name: null,
      code: null,
      action: "",
      request: "",
      pendingList: [],
      columnData: [
        { id: "name", align: false, disablePadding: false, label: "Name" },
        {
          id: "code",
          align: false,
          disablePadding: false,
          label: "Code"
        },
        {
          id: "status",
          align: false,
          disablePadding: false,
          label: "Requested Status"
        },
        {
          id: "operation",
          align: false,
          disablePadding: false,
          label: "Operation"
        },
        {
          id: "comments",
          align: false,
          disablePadding: false,
          label: "Comments"
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
    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer({
      pageNumber: 1,
      pageSize: 10,
      moduleCode: this.props.mc
    });

    localStorage.removeItem(this.props.mId);
    localStorage.removeItem("sId");
    localStorage.removeItem("maxStep");
  }

  componentDidUpdate() {
    if (this.props.deleteRequestSuccess) {
      NotificationManager.success("Request has been deleted!");
    }
    if (this.props.processRequestSucess) {
      if (this.props.requestData.request === "sfa") {
        NotificationManager.success(
          "Request for Authorization has been Success"
        );
      } else if (this.props.requestData.request === "approve") {
        NotificationManager.success("Request for Approval has been Success");
      } else if (this.props.requestData.request === "review") {
        NotificationManager.success("Request for Review has been Success");
      } else {
        NotificationManager.success("Request for Rejection has been Success");
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
    } else if (this.props.showMainPageMessage) {
      if (
        this.props.alertMainPageMessage ===
        "Request failed with status code 404"
      ) {
        this.props.history.push("/app/extra-pages/error-400");
      } else {
        this.props.history.push("/app/extra-pages/error-500");
      }
      setTimeout(() => {
        this.props.hideScrutinizerMainPageMessage();
      }, 100);
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
    if (
      this.props.processRequestSucess ||
      this.props.showProcessRequestMessage
    ) {
      this.setState({
        isConfirmation: false
      });
    }

    if (
      nextProps.pendingList &&
      nextProps.pendingList !== this.props.pendingList
    ) {
      this.setState({
        pendingList: nextProps.pendingList
      });
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
      if (element.actions) {
        element.actions.map(data => {
          if (data.actionId === permissions.Maker) {
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

  handleChangePage = (event, page) => {
    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer({
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage,
      moduleCode: this.props.mc
    });
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer({
      pageNumber: 1,
      pageSize: event.target.value,
      moduleCode: this.props.mc
    });
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRequest = () => {
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest({
      id: this.state.id,
      moduleCode: this.props.mc,
      pageNumber: 1,
      pageSize: 10,
      action: this.state.action,
      comments: this.state.comments,
      request: this.state.request
    });
  };

  onClickFilter = () => {
    this.setState({ isModalOpen: true });
  };

  onClickReset = () => {
    this.setState({
      name: null,
      code: null
    });

    this.props.showScrutinizerMainPageLoader();
    this.props.fetchScrutinizer({
      pageNumber: 1,
      pageSize: 10,
      moduleCode: this.props.mc
    });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSaveFilter = (name, code) => {
    this.setState({ name, code });
  };

  onViewEntity = () => {
    localStorage.setItem("sId", this.state.sId);
    this.props.history.push(
      `/app/${this.props.mainMud}-management/${this.props.mud}s/pending/view/${
        this.state.sId
      }`
    );
  };

  onEditEntity = () => {
    localStorage.setItem("sId", this.state.sId);
    this.props.history.push(
      `/app/${this.props.mainMud}-management/${this.props.mud}s/pending/edit/${
        this.state.sId
      }`
    );
  };

  onDeleteEntity = () => {
    if (!window.confirm("Are you sure you want to DELETE this request?"))
      return;
    this.props.showScrutinizerDeleteLoader();
    this.props.deleteScrutinizer({
      id: this.state.sId,
      pageNumber: 1,
      pageSize: 10,
      moduleCode: this.props.mc
    });
  };

  onOpenOtherOptions = md => event => {
    this.setState({
      sId: md.id,
      md: md,
      menuState: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const {
      showMessage,
      alertMessage,
      loader,
      isModules,
      alertProcessRequestMessage
    } = this.props;
    return (
      <Paper>
        <Toolbar>
          <div className="title">
            <Typography type="title">Pending {this.props.head}</Typography>
          </div>
          <div className="actions">
            {this.state.name || this.state.code ? (
              <div className="filterParams">
                {this.state.code ? (
                  <div className="filterItem">
                    <strong>Code: </strong>
                    {this.state.code}
                  </div>
                ) : null}
                {this.state.name ? (
                  <div className="filterItem">
                    <strong>Name: </strong>
                    {this.state.name}
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
            {!this.props.loader &&
            this.state.pendingList === this.props.pendingList ? (
              <Table>
                <DataTableHead
                  columns={this.state.columnData}
                  data={this.state.pendingList}
                />
                <TableBody>
                  {this.state.pendingList.map(n => {
                    var data = {};
                    n.payload ? (data = n.payload) : (data["name"] = "NA");
                    var str = data.name;
                    var acronym = /\s/g.test(str)
                      ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
                      : str.charAt(0);
                    return (
                      <TableRow hover tabIndex={-1} key={n.id}>
                        <TableCell>
                          <div className="user-profile d-flex flex-row align-items-center p-0">
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
                          {n.payload
                            ? n.payload.code
                              ? n.payload.code
                              : "N/A"
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {n.status === 0 ? (
                            <Badge color="info">Draft</Badge>
                          ) : n.status === 1 ? (
                            <Badge color="primary">
                              Send For Authorization
                            </Badge>
                          ) : n.status === 2 ? (
                            <Badge color="success">Approved</Badge>
                          ) : (
                            <Badge color="danger">Rejected</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {n.action === 0 ? (
                            <Badge color="primary">Added</Badge>
                          ) : n.action === 1 ? (
                            <Badge color="info">Edited</Badge>
                          ) : (
                            <Badge color="danger">Deleted</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {n.comments ? (
                            n.comments.length > 10 ? (
                              <Tooltip title={n.comments}>
                                <Comment comments={n.comments} />
                              </Tooltip>
                            ) : (
                              n.comments
                            )
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "inline-flex" }}>
                            <IconButton
                              name="sfa"
                              disabled={
                                this.state.maker
                                  ? n.status === 0 &&
                                    isModules &&
                                    isModules.userId === n.userId
                                    ? false
                                    : true
                                  : n.status === 1
                                  ? true
                                  : false
                              }
                              aria-label="Sent For Approval"
                              onClick={() =>
                                this.setState({
                                  id: n.id,
                                  isConfirmation: true,
                                  request: "sfa",
                                  action: 1,
                                  comments: ""
                                })
                              }
                            >
                              <Tooltip title="Sent For Approval">
                                <SFA />
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              name=""
                              disabled={
                                this.state.checker
                                  ? n.status === 1 &&
                                    isModules &&
                                    isModules.userId !== n.userId
                                    ? false
                                    : true
                                  : true
                              }
                              aria-label="Approve"
                              onClick={() =>
                                this.setState({
                                  id: n.id,
                                  isConfirmation: true,
                                  comments: "",
                                  request: "approve",
                                  action: 2
                                })
                              }
                            >
                              <Tooltip title="Approve">
                                <APR />
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              name=""
                              disabled={
                                this.state.checker
                                  ? n.status === 1 &&
                                    isModules &&
                                    isModules.userId !== n.userId
                                    ? false
                                    : true
                                  : true
                              }
                              aria-label="Reject"
                              onClick={() =>
                                this.setState({
                                  id: n.id,
                                  isConfirmation: true,
                                  comments: "",
                                  request: "reject",
                                  action: 3
                                })
                              }
                            >
                              <Tooltip title="Reject">
                                <REJ />
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              name=""
                              disabled={
                                this.state.checker
                                  ? n.status === 1 &&
                                    isModules &&
                                    isModules.userId !== n.userId
                                    ? false
                                    : true
                                  : true
                              }
                              aria-label="Sent For Review"
                              onClick={() =>
                                this.setState({
                                  id: n.id,
                                  isConfirmation: true,
                                  comments: "",
                                  request: "review",
                                  action: 5
                                })
                              }
                            >
                              <Tooltip title="Sent For Review">
                                <SFR />
                              </Tooltip>
                            </IconButton>

                            <IconButton
                              aria-label="More Options"
                              onClick={this.onOpenOtherOptions(n)}
                            >
                              <Tooltip title="More Options">
                                <MOR />
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
            {alertProcessRequestMessage &&
              NotificationManager.error(alertProcessRequestMessage)}
          </div>
        </div>

        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.menuState}
          onClose={this.handleRequestClose}
          MenuListProps={{
            style: {
              width: 80
            }
          }}
        >
          <MenuItem>
            <IconButton
              aria-label="View"
              onClick={() => {
                this.onViewEntity();
              }}
            >
              <Tooltip title="View">
                <ViewIcon />
              </Tooltip>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="Edit"
              disabled={
                this.state.md.status !== 0 &&
                isModules &&
                isModules.userId === this.state.md.userId
              }
              onClick={() => {
                this.onEditEntity();
              }}
            >
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="Delete"
              disabled={
                this.state.md.status === 0 ||
                (this.state.md.status === 3 &&
                  this.state.md.action === scrutinizerActions.Added)
                  ? false
                  : true
              }
              onClick={() => {
                this.onDeleteEntity();
              }}
            >
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </MenuItem>
        </Menu>

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

        {this.state.isModalOpen ? (
          <Search
            mud={this.props.mud}
            onSaveFilter={this.onSaveFilter}
            onCloseModal={this.onCloseModal}
            code={this.state.code}
            name={this.state.name}
          />
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    pendingList: state.scrutinizers.scrutinizersList
      ? state.scrutinizers.scrutinizersList.data.items
      : "",
    deleteRequestSuccess: state.scrutinizers.deleteScrutinizerSuccess,
    paging: state.scrutinizers.scrutinizersList
      ? state.scrutinizers.scrutinizersList.data.paging
      : "",
    showMessage: state.scrutinizers.showMessage,
    alertMessage: state.scrutinizers.alertMessage,
    showMainPageMessage: state.scrutinizers.showMainPageMessage,
    alertMainPageMessage: state.scrutinizers.alertMainPageMessage,
    loader: state.scrutinizers.loader,
    showProcessRequestMessage: state.scrutinizers.showProcessRequestMessage,
    alertProcessRequestMessage: state.scrutinizers.alertProcessRequestMessage,
    processRequestSucess: state.scrutinizers.processRequest,
    requestData: state.scrutinizers.requestData
      ? state.scrutinizers.requestData.data
      : null
  };
}

export default connect(
  mapStateToProps,
  {
    ...scAc,
    ...acAc,
    ...mdAc
  }
)(PendingList);
