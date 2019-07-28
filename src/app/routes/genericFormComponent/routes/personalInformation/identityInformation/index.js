import React from "react";
import classNames from "classnames";
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
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Actions from "./gridActions";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import { Modal, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { address } from "ip";
import { saveIdentity } from "../../../../../../actions/PersonalInformation";
import { connect } from "react-redux";
import IdentitySelect from "../reactSelect/identityType";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MaskedInput from "react-text-mask";
import moment from "moment";
import { DatePicker } from "material-ui-pickers";

class NicMask extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[
          /[1-9]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/
        ]}
        // placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}
class PassportMask extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[
          /[A-Z]/,
          /[A-Z]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        //   placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}

let counter = 0;

function createData(identityType, identityNumber, issuanceDate, expiryDate) {
  counter += 1;
  return {
    id: counter,
    identityType,
    identityNumber,
    issuanceDate,
    expiryDate
  };
}

const columnData = [
  {
    id: "identityType",
    align: false,
    disablePadding: false,
    label: "Identity Type"
  },
  {
    id: "identityNumber",
    align: false,
    disablePadding: false,
    label: "Identity Number"
  },
  {
    id: "issuanceDate",
    numeric: true,
    disablePadding: false,
    label: "Issuance Date"
  },
  { id: "expiryDate", numeric: true, disablePadding: false, label: "Expiry Date" },
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
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
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

class DataTableToolbar extends React.Component {
  updateState() {
    this.props.open();
  }
  render() {
    return (
      <Toolbar>
        <div className="title" />
        <div className="spacer" />
        <div className="actions">
          <Button name=""
            variant="contained"
            color="primary"
            className="jr-btn"
            disabled={this.props.isEnable ? false : true}
            onClick={this.updateState.bind(this)}
          >
            <i className="zmdi zmdi-plus-square" />
            <span>{<IntlMessages id="forms.button.addIdentity" />}</span>
          </Button>
        </div>
      </Toolbar>
    );
  }
}

class IdentityGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      issuanceDate: moment().format("YYYY-MM-DD"),
      expiryDate: moment().format("YYYY-MM-DD"),
      newCnicMask: "     -       - ",
      oldCnicMask: "     -       - ",
      passportCnicMask: "         ",
      id: 0,
      identityNumber: "",
      mobilePhoneNo: "",
      // expiryDate: "",
      // issuanceDate: "",
      identityType: "",
      addressForm: [],
      addAddressState: true,
      open: false,
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
      rowsPerPage: 5
    };
  }
  onIdentityClose = () => {
    this.setState({ open: false });
  };
  onSaveIdentity = () => {
    const data = {
      id: this.state.id,
      identityType: this.state.identityType,
      identityNumber: this.state.identityNumber,
      issuanceDate: this.state.issuanceDate,
      expiryDate: this.state.expiryDate
    };
    this.props.saveIdentity(data);
    this.setState({
      id: ++this.state.id
    });
  };
  openIdentityBar() {
    this.setState({
      open: true
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.props.identity.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.identity.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

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
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      identityNumber: event.target.value
    });
  };
  identityCallback = dataFromChild => {
    this.setState({
      identityType: dataFromChild
    });
  };
  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      addContactState,
      newCnicMask,
      oldCnicMask,
      passportCnicMask,
      issuanceDate,
      expiryDate
    } = this.state;
    return (
      <Paper>
        <DataTableToolbar open={this.openIdentityBar.bind(this)} isEnable={this.props.isEnable} />
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table className="">
              <DataTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.props.identity.length}
              />
              <TableBody>
                {this.props.identity
                  ? this.props.identity
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((n, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          {n.identityType === 'CNIC' ?
                            <TableCell><Badge color="secondary">CNIC</Badge></TableCell>
                            :
                            n.identityType === 'Old CNIC' ?
                              <TableCell><Badge color="primary">Old CNIC</Badge></TableCell> :
                              <TableCell><Badge color="warning">Passport</Badge></TableCell>
                          }
                          <TableCell>{n.identityNumber}</TableCell>
                          <TableCell numeric>{n.issuanceDate}</TableCell>
                          <TableCell numeric>{n.expiryDate}</TableCell>
                          <TableCell>
                            <Actions data={n} id={n.id} />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={this.props.identity.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <div>
          <Modal
            className="modal-box"
            toggle={this.openIdentityBar.bind(this)}
            // toggle={this.onIdentityClose}
            isOpen={this.state.open}
          >
            <ModalHeader className="modal-box-header bg-primary">
              <IntlMessages id="personalInformation.addIdentity" />
              <IconButton name="" className="text-white" onClick={this.onIdentityClose}>
                <CloseIcon />
              </IconButton>
            </ModalHeader>

            <div className="modal-box-content">
              <div className="row">
                <div className="col-md-6 col-12" style={{ paddingTop: "15px" }}>
                  <IdentitySelect
                    options={JSON.parse(localStorage.getItem("identityType"))}
                    identity={this.identityCallback}
                  />
                </div>
                {this.state.identityType === "CNIC" ? (
                  <div className="col-md-6 col-12">
                    <FormControl className="mb-3" fullWidth>
                      <InputLabel>CNIC Number</InputLabel>
                      <Input name=""
                        value={newCnicMask}
                        inputComponent={NicMask}
                        onChange={this.handleChange("newCnicMask")}
                      />
                    </FormControl>
                  </div>
                ) : this.state.identityType === "Old CNIC" ? (
                  <div className="col-md-6 col-12">
                    <FormControl className="mb-3" fullWidth>
                      <InputLabel>Old CNIC Number</InputLabel>
                      <Input name=""
                        placeholder="Old CNIC Number"
                        value={oldCnicMask}
                        inputComponent={NicMask}
                        onChange={this.handleChange("oldCnicMask")}
                      />
                    </FormControl>
                  </div>
                ) : this.state.identityType === "Passport" ? (
                  <div className="col-md-6 col-12">
                    <FormControl className="mb-3" fullWidth>
                      <InputLabel>Passport Number</InputLabel>
                      <Input name=""
                        value={passportCnicMask}
                        inputComponent={PassportMask}
                        onChange={this.handleChange("passportCnicMask")}
                      />
                    </FormControl>
                  </div>
                ) : (
                        <div
                          className="col-md-6 col-12"
                          style={{ marginTop: "15px" }}
                        >
                          <Input name="" placeholder="Identity Number" disabled fullWidth />
                        </div>
                      )}
                <div className="col-md-6 col-12" style={{ marginTop: "15px" }}>
                  <DatePicker
                    fullWidth
                    value={issuanceDate}
                    label="Issuance Date"
                    onChange={date =>
                      this.setState({
                        issuanceDate: date.format("YYYY-MM-DD")
                      })
                    }
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  />
                </div>
                <div className="col-md-6 col-12" style={{ marginTop: "15px" }}>
                  <DatePicker
                    fullWidth
                    value={expiryDate}
                    label="Expiry Date"
                    onChange={date =>
                      this.setState({
                        expiryDate: date.format("YYYY-MM-DD")
                      })
                    }
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  />
                </div>
              </div>
            </div>
            <div className="modal-box-footer d-flex flex-row">
              <Button name=""
                disabled={
                  newCnicMask && oldCnicMask && passportCnicMask === ""
                    ? true
                    : false
                }
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    id: this.state.id
                  });
                  this.onSaveIdentity();
                  this.setState({
                    newCnicMask: "",
                    oldCnicMask: "",
                    passportCnicMask: ""
                  });
                  this.onIdentityClose();
                }}
              >
                <IntlMessages id="personalInformation.saveIdentity" />
              </Button>
            </div>
          </Modal>
        </div>
      </Paper>
    );
  }
}
function mapStateToProps(state) {
  return {
    identity: state.personalInformation ? state.personalInformation.identity : []
  };
}
export default connect(
  mapStateToProps,
  {
    saveIdentity
  }
)(IdentityGrid);
