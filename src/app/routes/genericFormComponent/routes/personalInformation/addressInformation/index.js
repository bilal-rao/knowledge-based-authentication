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
import CloseIcon from "@material-ui/icons/Close";
import { Modal, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { address } from "ip";
import { saveAddress } from "../../../../../../actions/PersonalInformation";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { Badge } from "reactstrap";
import CountrySelect from "../reactSelect/countryList";

let counter = 0;

function createData(houseNo, streetNo, area, city, country, type) {
  counter += 1;
  return { id: counter, houseNo, streetNo, area, city, city, country, type };
}

const columnData = [
  {
    id: "addresstype",
    align: false,
    disablePadding: false,
    label: "Address Type"
  },
  {
    id: "houseNo",
    align: false,
    disablePadding: false,
    label: "House #"
  },
  {
    id: "streetNo",
    align: false,
    disablePadding: false,
    label: "Street #"
  },
  { id: "area", align: false, disablePadding: false, label: "Area" },
  { id: "city", align: false, disablePadding: false, label: "City" },
  { id: "country", align: false, disablePadding: false, label: "Country" },
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
            <span>{<IntlMessages id="forms.button.addAddress" />}</span>
          </Button>
        </div>
      </Toolbar>
    );
  }
}

class AddressGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: 0,
      postalCode: "",
      provinceCode: "",
      nearestLandMark: "",
      country: "",
      city: "",
      area: "",
      streetNo: "",
      houseNo: "",
      addressType: "",
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
  onAddressClose = () => {
    this.setState({ open: false });
  };
  onSaveAddress = () => {
    const data = {
      id: this.state.id,
      addressType: this.state.addressType,
      houseNo: this.state.houseNo,
      city: this.state.city,
      area: this.state.area,
      streetNo: this.state.streetNo,
      country: this.state.country,
      nearestLandMark: this.state.nearestLandMark,
      provinceCode: this.state.provinceCode,
      postalCode: this.state.postalCode
    };
    this.props.saveAddress(data);
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
        ? this.props.address.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.address.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

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
  countryCallback = dataFromChild => {
    this.setState({
      country: dataFromChild
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
      addressType
    } = this.state;
    return (
      <Paper>
        <DataTableToolbar open={this.openAddressBar.bind(this)} isEnable={this.props.isEnable} />
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table className="">
              <DataTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.props.address.length}
              />
              <TableBody>
                {this.props.address
                  ? this.props.address
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((n, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          {n.addressType === 'home' ?
                            <TableCell> <Badge color="primary">Home</Badge></TableCell> :
                            <TableCell> <Badge color="danger">Office</Badge></TableCell>
                          }
                          <TableCell>{n.houseNo}</TableCell>
                          <TableCell>{n.streetNo}</TableCell>
                          <TableCell>{n.area}</TableCell>
                          <TableCell>{n.city}</TableCell>
                          <TableCell>{n.country}</TableCell>
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
                    count={this.props.address.length}
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
            toggle={this.openAddressBar.bind(this)}
            isOpen={this.state.open}
          >
            <ModalHeader className="modal-box-header bg-primary">
              <IntlMessages id="personalInformation.addAddress" />
              <IconButton name="" className="text-white" onClick={this.onAddressClose}>
                <CloseIcon />
              </IconButton>
            </ModalHeader>

            <div className="modal-box-content">
              <div className="row">
                <div className="col-md-6 col-12" style={{paddingTop: '16px'}}>
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="address-simple">Address Type</InputLabel>
                    <Select name=""
                      value={addressType}
                      onChange={this.handleChange("addressType")}
                      input={<Input name="" id="address-simple" />}
                    >
                      <MenuItem value={"office"}>Office</MenuItem>
                      <MenuItem value={"home"}>Home</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 col-12" style={{ paddingTop: "30px" }}>
                  <CountrySelect
                    country={this.countryCallback}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label={<IntlMessages id="address.houseNo" />}
                    onChange={this.handleChange("houseNo")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    id="required"
                    label={<IntlMessages id="address.city" />}
                    onChange={this.handleChange("city")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    id="required"
                    label={<IntlMessages id="address.area" />}
                    onChange={this.handleChange("area")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    id="required"
                    label={<IntlMessages id="address.streetNo" />}
                    onChange={this.handleChange("streetNo")}
                    type="number"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label={<IntlMessages id="address.nearestLandMark" />}
                    onChange={this.handleChange("nearestLandMark")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label={<IntlMessages id="address.provinceCode" />}
                    onChange={this.handleChange("provinceCode")}
                    type="number"
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label={<IntlMessages id="address.postalCode" />}
                    onChange={this.handleChange("postalCode")}
                    type="number"
                    margin="normal"
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="modal-box-footer d-flex flex-row">
              <Button name=""
                disabled={this.state.houseNo === ""}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    id: this.state.id
                  });
                  this.onSaveAddress();
                  this.setState({
                    houseNo: "",
                    city: "",
                    area: "",
                    streetNo: "",
                    country: "",
                    nearestLandMark: "",
                    provinceCode: "",
                    postalCode: ""
                  });
                  this.onAddressClose();
                }}
              >
                <IntlMessages id="personalInformation.saveAddress" />
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
    address: state.personalInformation ? state.personalInformation.address : []
  };
}
export default connect(
  mapStateToProps,
  {
    saveAddress
  }
)(AddressGrid);
