import React from 'react';
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Badge } from "reactstrap";
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider';
import { Modal, ModalHeader } from "reactstrap";
import IntlMessages from "util/IntlMessages";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import QueryBuilder from '../../../../../../../../../../components/customComponents/queryBuilder/demo';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


let counter = 0;

function createData(condition, fromDate, toDate, value) {
    counter += 1;
    return { id: counter, condition, fromDate, toDate, value };
}

const columnData = [
    { id: 'condition', align: false, disablePadding: true, label: 'Conditions' },
    { id: 'fromDate', align: false, disablePadding: false, label: 'From' },
    { id: 'toDate', align: false, disablePadding: false, label: 'To' },
    { id: 'value', align: false, disablePadding: false, label: 'Value' }
];

class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
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


let EnhancedTableToolbar = props => {
    const { numSelected, label, open } = props;

    return (
        <Toolbar
            className={classNames("table-header", {
                ["highlight-light"]: numSelected > 0,
            })}
        >
            <div className="title">
                {numSelected > 0 ? (
                    <Typography type="subheading">{numSelected} selected</Typography>
                ) : (
                        <Typography type="title">{label + ' List'}</Typography>
                    )}
            </div>
            <div className="spacer" />
            <div className="actions">
                <Button name="" variant="contained" color="primary" className="jr-btn"
                    onClick={() => open()}>
                    <i className="zmdi zmdi-account-add" />
                    <span>Add</span>
                </Button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


class StaticComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'fromDate',
            selected: [],
            data: [
                createData('age > 18', '17-01-2019', '20-01-2019', 67, 4.3),
                createData('location karachi', '17-01-2019', '20-01-2019', 51, 4.9)
            ].sort((a, b) => (a.fromDate < b.fromDate ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
            stagesParameters: [
                'Oliver Hansen',
                'Van Henry',
                'April Tucker',
                'Ralph Hubbard',
                'Omar Alexander',
                'Carlos Abbott',
                'Miriam Wagner',
                'Bradley Wilkerson',
                'Virginia Andrews',
                'Kelly Snyder',
            ],
            stages: [],
            expression: "",
            typeParameters: [
                { 'id': 1, 'value': 'error' },
                { 'id': 2, 'value': 'warning' }
            ],
            type: [],
            toDate: moment(),
            fromDate: moment(),
            open: false,
        }
    }
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

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
        if (keycode(event) === 'space') {
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
                selected.slice(selectedIndex + 1),
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


    handleChange = name => (event, value) => {
        event.preventDefault();
        let obj = {};
        let name = event.target.name;
        obj[name] = event.target.value;
        this.setState({
            [name]: event.target.value,
        })
    }
    handleFromDate = (date) => {
        this.setState({ fromDate: date });
    };
    handleToDate = (date) => {
        this.setState({ toDate: date });
    };
    openModal() {
        this.setState({
            open: true
        });
    }
    closeModal = () => {
        this.setState({ open: false });
    };
    onChange = (exp) => {
        this.setState({
            expression: exp
        })
    }
    render() {
        const { classes, item } = this.props;
        const { typeParameters, fromDate, toDate, data, order, orderBy, selected, rowsPerPage, page } = this.state;
        return (
            <div className="row">
                <div style={{ padding: '20px 0px 20px 0px'}} className="app-wrapper">
                    <div className="col-md-12 col-12">
                        <div className="row">
                            <div className={classes.root}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>
                                            <Badge color="primary">{item.value.charAt(0).toUpperCase() + item.value.slice(1)}</Badge>
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <div className="app-wrapper">
                                        <div className="row">
                                            <div className="col-md-3 col-12">
                                                <TextField name=""
                                                    label="Value"
                                                    required
                                                    name={`${item.id}-value`}
                                                    onChange={this.handleChange()}
                                                    fullWidth
                                                />
                                            </div>
                                            <div className="col-md-3 col-12">
                                                <FormControl className="w-100">
                                                    <InputLabel htmlFor="name-multiple">Stages</InputLabel>
                                                    <Select name=""
                                                        multiple
                                                        value={this.state[`${item.id}-stage`] ? this.state[`${item.id}-stage`] : []}
                                                        name={`${item.id}-stage`}
                                                        onChange={this.handleChange()}
                                                        input={<Input name="" id="name-multiple" />}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                                                    width: 200,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {this.state.stagesParameters.map(name => (
                                                            <MenuItem
                                                                key={name}
                                                                value={name}
                                                                style={{
                                                                    fontWeight: this.state.stages.indexOf(name) !== -1 ? '500' : '400',
                                                                }}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-md-3 col-12">
                                                <FormControl className="w-100 mb-2">
                                                    <InputLabel htmlFor="type">Type</InputLabel>
                                                    <Select name=""
                                                        value={this.state[`${item.id}-type`] ? this.state[`${item.id}-type`] : ''}
                                                        onChange={this.handleChange()}
                                                        input={<Input name="" id="type" />}
                                                        name={`${item.id}-type`}
                                                    >
                                                        {typeParameters ?
                                                            typeParameters.map((data, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={data.value}>{data.value}</MenuItem>
                                                                )
                                                            }) : ""
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-md-3 col-12">
                                                <div key="basic_day" className="picker">
                                                    <DatePicker
                                                        label="From"
                                                        format="DD/MM/YYYY"
                                                        fullWidth
                                                        value={fromDate}
                                                        onChange={this.handleFromDate}
                                                        animateYearScrolling={false}
                                                        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-12">
                                                <div key="basic_day" className="picker">
                                                    <DatePicker
                                                        label="To"
                                                        format="DD/MM/YYYY"
                                                        fullWidth
                                                        value={toDate}
                                                        onChange={this.handleToDate}
                                                        animateYearScrolling={false}
                                                        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <EnhancedTableToolbar open={this.openModal.bind(this)} numSelected={selected.length} label={item.value.charAt(0).toUpperCase() + item.value.slice(1)} />
                                        <div className="flex-auto">
                                            <div className="table-responsive-material">
                                                <Table>
                                                    <EnhancedTableHead
                                                        numSelected={selected.length}
                                                        order={order}
                                                        orderBy={orderBy}
                                                        onSelectAllClick={this.handleSelectAllClick}
                                                        onRequestSort={this.handleRequestSort}
                                                        rowCount={data.length}
                                                    />
                                                    <TableBody>
                                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                                            const isSelected = this.isSelected(n.id);
                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    onClick={event => this.handleClick(event, n.id)}
                                                                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                                                                    role="checkbox"
                                                                    aria-checked={isSelected}
                                                                    tabIndex={-1}
                                                                    key={n.id}
                                                                    selected={isSelected}
                                                                >
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox color="primary" checked={isSelected} />
                                                                    </TableCell>
                                                                    <TableCell padding="none">{n.condition}</TableCell>
                                                                    <TableCell>{n.fromDate}</TableCell>
                                                                    <TableCell>{n.toDate}</TableCell>
                                                                    <TableCell>{n.value}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TablePagination
                                                                count={data.length}
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
                                    </div>
                                </ExpansionPanel>
                            </div>
                        </div>
                        <Modal
                            className="modal-box"
                            toggle={this.openModal.bind(this)}
                            isOpen={this.state.open}
                        >
                            <ModalHeader className="modal-box-header bg-primary">
                                Add {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                                <IconButton name="" className="text-white" onClick={this.closeModal}>
                                    <CloseIcon />
                                </IconButton>
                            </ModalHeader>

                            <div className="modal-box-content">
                                <div className="row">
                                    <div className="col-md-12 col-12">
                                        <QueryBuilder onChange={this.onChange}/>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div key="basic_day" className="picker">
                                            <DatePicker
                                                label="From"
                                                format="DD/MM/YYYY"
                                                fullWidth
                                                value={fromDate}
                                                onChange={this.handleFromDate}
                                                animateYearScrolling={false}
                                                leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div key="basic_day" className="picker">
                                            <DatePicker
                                                label="To"
                                                format="DD/MM/YYYY"
                                                fullWidth
                                                value={toDate}
                                                onChange={this.handleToDate}
                                                animateYearScrolling={false}
                                                leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <TextField name=""
                                            label="Value"
                                            onChange={this.handleChange()}
                                            type="text"
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
                                        this.closeModal();
                                    }}
                                >
                                    Save {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                                </Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}




StaticComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StaticComponent);
