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
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Configs
import permissions from "config/permissions";

// Actions
import * as luAc from "actions/LookUp";
import * as acAc from "actions/Action";
import * as mdAc from "actions/Module";

// Icons
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import Clear from "@material-ui/icons/Clear";
import ResetSearch from "@material-ui/icons/Loop";
import LookUpAdd from "@material-ui/icons/Loupe";
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
      isLookUpModalOpen: true,
      name: null,
      code: null,
      lookUpValue: "",
      lookUpName: "",
      lookUpPath: "",
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
      ],
      lookUpTypes: [
        {
          value: "DESIG",
          text: "Designation",
          path: "designations",
          active: false
        },
        {
          value: "ET",
          text: "Education",
          path: "educationtypes",
          active: true
        },
        {
          value: "IH",
          text: "Income Head",
          path: "incomeheads",
          active: true
        },
        {
          value: "IS",
          text: "Income Source",
          path: "incomesources",
          active: true
        },
        {
          value: "AT",
          text: "Agency Type",
          path: "agencytypes",
          active: false
        },
        {
          value: "Reason",
          text: "Reasons",
          path: "reasons",
          active: true
        },
        {
          value: "AC",
          text: "Aquisition Channels",
          path: "acquisitionchannels",
          active: true
        },
        {
          value: "BBC",
          text: "Business Borrower Code",
          path: "businessborrowercodes",
          active: true
        },
        {
          value: "VT",
          text: "Vehicle Type",
          path: "vehicletypes",
          active: true
        },
        {
          value: "LT",
          text: "Liability Type",
          path: "liabilitytypes",
          active: true
        },
        {
          value: "P",
          text: "Profession",
          path: "professions",
          active: true
        },
        {
          value: "EMPS",
          text: "Employment Status",
          path: "employmentsstatus",
          active: true
        },
        {
          value: "BT",
          text: "Business Type",
          path: "businesstypes",
          active: true
        },
        {
          value: "EMP",
          text: "Employer",
          path: "employers",
          active: false
        },
        {
          value: "VM",
          text: "Vehicle Make",
          path: "vehiclemakes",
          active: false
        },
        {
          value: "VC",
          text: "Vehicle Color",
          path: "vehiclecolors",
          active: false
        },
        {
          value: "VES",
          text: "Vehicle Engine Size",
          path: "vehicleenginesizes",
          active: false
        },
        {
          value: "DIS",
          text: "Discrepancy",
          path: "Discrepancies",
          active: true
        }
      ]
    };
  }

  componentDidMount() {
    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    localStorage.removeItem("lId");
    localStorage.removeItem("sId");

    if (localStorage.getItem("lookUpPath")) {
      this.setState(
        {
          isLookUpModalOpen: false,
          lookUpValue: localStorage.getItem("lookUpValue"),
          lookUpPath: localStorage.getItem("lookUpPath"),
          lookUpName: localStorage.getItem("lookUpName")
        },
        () => {
          this.props.showLookUpMainPageLoader();
          this.props.fetchLookUp({
            pageNumber: 1,
            pageSize: 10
          });
        }
      );
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
  }

  componentDidUpdate() {
    if (this.props.dlLupSc) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/masterdata-management/lookups/pending");
      } else {
        NotificationManager.success("LookUp has been deleted!");
      }
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideLookUpMessage();
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
        this.props.hideLookUpMainPageMessage();
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

  handleChange = e => {
    let lup = e.target.value.split("-");
    this.setState(
      {
        isLookUpModalOpen: false,
        lookUpValue: e.target.value,
        lookUpPath: lup[1],
        lookUpName: e.nativeEvent.target.innerText
          ? e.nativeEvent.target.innerText.replace(" Listing", "")
          : ""
      },
      () => {
        localStorage.setItem("lookUpValue", e.target.value);
        localStorage.setItem("lookUpPath", lup[1]);
        localStorage.setItem("lookUpName", this.state.lookUpName);

        this.props.showLookUpMainPageLoader();
        this.props.fetchLookUp({
          pageNumber: 1,
          pageSize: 10
        });
      }
    );
  };

  handleChangePage = (event, page) => {
    this.props.showLookUpMainPageLoader();
    this.props.fetchLookUp({
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage
    });
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.showLookUpMainPageLoader();
    this.props.fetchLookUp({
      pageNumber: 1,
      pageSize: event.target.value
    });
    this.setState({ rowsPerPage: event.target.value });
  };

  onHandleClick = (mode, id) => {
    this.props.showLookUpLoader();
    this.props.history.push(
      `/app/masterdata-management/lookups/approved/${mode}/${id}`
    );
  };

  deleteLookUp = lId => {
    if (
      !window.confirm(
        `Are you sure you want to DELETE this ${this.state.lookUpName}?`
      )
    )
      return;
    this.props.showLookUpDeleteLoader();
    this.props.deleteLookUp({
      id: lId,
      pageNumber: 1,
      pageSize: 10
    });
  };

  onClickFilter = () => {
    this.setState({ isModalOpen: true });
  };

  onClickReset = () => {
    this.props.showLookUpLoader();
    this.setState({
      name: null,
      code: null
    });
    this.props.fetchLookUp({
      pageNumber: 1,
      pageSize: 10
    });
  };

  onCloseModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  onSaveFilter = (name, code) => {
    this.setState({ name, code });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { showMessage, alertMessage, loader } = this.props;

    return (
      <Paper>
        <Toolbar>
          <div className="title">
            {this.state.lookUpValue ? (
              <TextField
                name="lookUpValue"
                id="initLookUp"
                select
                value={this.state.lookUpValue}
                onChange={this.handleChange}
                margin="normal"
              >
                {this.state.lookUpTypes.map(lut => {
                  return lut.active ? (
                    <MenuItem
                      key={lut.value}
                      value={`${lut.value}-${lut.path}`}
                    >
                      <Typography type="title">{lut.text} Listing</Typography>
                    </MenuItem>
                  ) : (
                    false
                  );
                })}
              </TextField>
            ) : (
              <Typography type="title">Lookup Listing</Typography>
            )}
          </div>
          <div className="actions">
            {this.state.name || this.state.code ? (
              <div className="filterParams">
                {this.state.name ? (
                  <div className="filterItem">
                    <strong>Name: </strong>
                    {this.state.name}
                  </div>
                ) : null}
                {this.state.code ? (
                  <div className="filterItem">
                    <strong>Code: </strong>
                    {this.state.code}
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
              name="AddNewLookUp"
              aria-label="Add New LookUp"
              onClick={() =>
                this.props.history.push(
                  "/app/masterdata-management/lookups/approved/add"
                )
              }
            >
              <Tooltip title={`Add New ${this.state.lookUpName}`}>
                <LookUpAdd />
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
            {this.state.lookUpValue && !this.state.isLookUpModalOpen ? (
              !this.props.loader && this.props.lookUpsList ? (
                <Table className="">
                  <DataTableHead
                    columns={this.state.columnData}
                    data={this.props.lookUpsList}
                  />
                  <TableBody>
                    {this.props.lookUpsList.map(n => {
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
                                  this.deleteLookUp(n.id);
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
              )
            ) : null}
            {loader && <Loader />}
            {showMessage && NotificationManager.error(alertMessage)}
          </div>
        </div>
        {this.state.isModalOpen ? (
          <Search
            onSaveFilter={this.onSaveFilter}
            onCloseModal={this.onCloseModal}
            name={this.state.name}
            code={this.state.code}
          />
        ) : null}
        {this.state.isLookUpModalOpen ? (
          <Dialog
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            maxWidth="sm"
          >
            <DialogTitle>Lookup Type</DialogTitle>
            <DialogContent>
              <form className="row">
                <div className="col-sm-12 col-12">
                  <TextField
                    name="lookUpValue"
                    id="popupLookUp"
                    select
                    label="LookUp type"
                    value={this.state.lookUpValue}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                  >
                    {this.state.lookUpTypes.map(lut => {
                      return lut.active ? (
                        <MenuItem
                          key={lut.value}
                          value={`${lut.value}-${lut.path}`}
                        >
                          {lut.text}
                        </MenuItem>
                      ) : (
                        false
                      );
                    })}
                  </TextField>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    lookUpsList: state.lookUpsData.lookupsList
      ? state.lookUpsData.lookupsList.data.items
      : "",
    dlLupSc: state.lookUpsData.deleteLookUpSuccess,
    paging: state.lookUpsData.lookupsList
      ? state.lookUpsData.lookupsList.data.paging
      : "",
    showMessage: state.lookUpsData.showMessage,
    alertMessage: state.lookUpsData.alertMessage,
    loader: state.lookUpsData.loader,
    showMainPageMessage: state.lookUpsData.showMainPageMessage,
    alertMainPageMessage: state.lookUpsData.alertMainPageMessage,
    allLookUps: state.lookUpsData.allLookUps,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : ""
  };
}

export default connect(
  mapStateToProps,
  {
    ...luAc,
    ...acAc,
    ...mdAc
  }
)(DataTable);
