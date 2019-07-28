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
import { saveProperty } from "../../../../../../actions/PersonalInformation";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

let counter = 0;

function createData(resPhone, email, officePhone, extension, mobilePhoneNo) {
  counter += 1;
  return {
    id: counter,
    resPhone,
    email,
    officePhone,
    extension,
    mobilePhoneNo
  };
}

const columnData = [
  {
    id: "propertyType",
    align: false,
    disablePadding: false,
    label: "Property Type"
  },
  {
    id: "propertyAddress",
    align: false,
    disablePadding: false,
    label: "Property Address"
  },
  { id: "purchaseValue", numeric: true, disablePadding: false, label: "Purchase Value" },
  {
    id: "currentValue",
    numeric: true,
    disablePadding: false,
    label: "Current Value"
  },
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
            onClick={this.updateState.bind(this)}
            disabled={this.props.isEnable ? false : true}
          >
            <i className="zmdi zmdi-plus-square" />
            <span>{<IntlMessages id="forms.button.addProperty" />}</span>
          </Button>
        </div>
      </Toolbar>
    );
  }
}

class PropertyGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      totalArea: "",
      coveredArea: "",
      currentValue: "",
      purchaseValue: "",
      propertyAddress: "",
      propertyType: "",
      id: 0,
      email: "",
      mobilePhoneNo: "",
      extension: "",
      officePhone: "",
      resPhone: "",
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
  onContactClose = () => {
    this.setState({ open: false });
  };
  onSaveContact = () => {
    const data = {
      id: this.state.id,
      propertyType: this.state.propertyType,
      propertyAddress: this.state.propertyAddress,
      purchaseValue: this.state.purchaseValue,
      currentValue: this.state.currentValue,
      totalArea: this.state.totalArea,
      coveredArea: this.state.coveredArea
    };
    this.props.saveProperty(data);
    this.setState({
      id: ++this.state.id
    });
  };
  openAddressBar() {
    this.setState({
      open: true
    });
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
        ? this.props.property.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.property.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

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
      [name]: event.target.value
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
      propertyType,
      currentValue,
      purchaseValue,
      totalArea,
      coveredArea
    } = this.state;
    return (
      <Paper>
        <DataTableToolbar open={this.openAddressBar.bind(this)} isEnable={this.props.isEnable}/>
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table className="">
              <DataTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.props.property.length}
              />
              <TableBody>
                {this.props.property
                  ? this.props.property
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((n, index) => {
                        return (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell>{n.propertyType}</TableCell>
                            <TableCell>{n.propertyAddress}</TableCell>
                            <TableCell numeric>{n.purchaseValue}</TableCell>
                            <TableCell numeric>{n.currentValue}</TableCell>
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
                    count={this.props.property.length}
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
            toggle={this.onContactClose}
            isOpen={this.state.open}
          >
            <ModalHeader className="modal-box-header bg-primary">
              <IntlMessages id="personalInformation.addProperty" />
              <IconButton name="" className="text-white" onClick={this.onContactClose}>
                <CloseIcon />
              </IconButton>
            </ModalHeader>

            <div className="modal-box-content">
              <div className="row">
                <div className="col-md-6 col-12">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="age-simple">Property Type</InputLabel>
                    <Select name=""
                      value={propertyType}
                      onChange={this.handleChange("propertyType")}
                      input={<Input name="" id="age-simple" />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"land"}>Land</MenuItem>
                      <MenuItem value={"building"}>Building</MenuItem>
                      <MenuItem value={"shop"}>Shop</MenuItem>
                      <MenuItem value={"house"}>House</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    id="required"
                    label={<IntlMessages id="property.completeAddress" />}
                    onChange={this.handleChange("propertyAddress")}
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="purchaseValue">
                      Purchase Value
                    </InputLabel>
                    <Input name=""
                      type="number"
                      id="purchaseValue"
                      value={purchaseValue}
                      onChange={this.handleChange("purchaseValue")}
                      startAdornment={
                        <InputAdornment position="start">Rs</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-md-6 col-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="currentValue">
                      Current Value
                    </InputLabel>
                    <Input name=""
                      type="number"
                      id="currentValue"
                      value={currentValue}
                      onChange={this.handleChange("currentValue")}
                      startAdornment={
                        <InputAdornment position="start">Rs</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-md-6 col-12">
                  <FormControl className="my-3" fullWidth>
                  <InputLabel htmlFor="totalArea">
                      Total Area
                    </InputLabel>
                    <Input name=""
                      type="number"
                      id="totalArea"
                      value={totalArea}
                      onChange={this.handleChange("totalArea")}
                      endAdornment={
                        <InputAdornment position="end">Yards</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-md-6 col-12">
                  <FormControl className="my-3" fullWidth>
                  <InputLabel htmlFor="coveredArea">
                      Covered Area
                    </InputLabel>
                    <Input name=""
                      type="number"
                      id="coveredarea"
                      value={coveredArea}
                      onChange={this.handleChange("coveredArea")}
                      endAdornment={
                        <InputAdornment position="end">Yards</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="modal-box-footer d-flex flex-row">
              <Button name=""
                disabled={propertyType === ""}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    id: this.state.id
                  });
                  this.onSaveContact();
                  this.setState({
                    propertyType: "",
                    propertyAddress: "",
                    purchaseValue: "",
                    currentValue: "",
                    totalArea: "",
                    coveredArea: ""
                  });
                  this.onContactClose();
                }}
              >
                <IntlMessages id="personalInformation.saveProperty" />
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
    property: state.personalInformation ? state.personalInformation.property : []
  };
}
export default connect(
  mapStateToProps,
  {
    saveProperty
  }
)(PropertyGrid);
