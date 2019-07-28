import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  showHierarchyLoader,
  fetchIndividualHierarchy,
  showHierarchyDeleteLoader,
  deleteHierarchyFromViewPage,
  removeIndividualHierarchyData,
  hideHierarchyMessage,
} from "actions/Hierarchy";
import Button from "@material-ui/core/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import permissions from "../../../../../../../../../config/permissions";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationManager
} from "react-notifications";
import compose from "recompose/compose";
import { Badge } from "reactstrap";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}
function SelectWrapped(props) {
  const { classes, ...other } = props;
  return (
    <Select name=""
      optionComponent={Option}
      noResultsText={<Typography>{"No results found"}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 100,
    justifyItems: "center",
    width: "90%"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  "@global": {
    ".Select-control": {
      display: "flex",
      alignItems: "center",
      border: 0,
      height: "auto",
      background: "transparent",
      "&:hover": {
        boxShadow: "none"
      }
    },
    ".Select-multi-value-wrapper": {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap"
    },
    ".Select--multi .Select-input": {
      margin: 0
    },
    ".Select.has-value.is-clearable.Select--single > .Select-control .Select-value": {
      padding: 0
    },
    ".Select-noresults": {
      padding: theme.spacing.unit * 2
    },
    ".Select-input": {
      display: "inline-flex !important",
      padding: 0,
      height: "auto"
    },
    ".Select-input input": {
      background: "transparent",
      border: 0,
      padding: 0,
      cursor: "default",
      display: "inline-block",
      fontFamily: "inherit",
      fontSize: "inherit",
      margin: 0,
      outline: 0
    },
    ".Select-placeholder, .Select--single .Select-value": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0
    },
    ".Select-placeholder": {
      opacity: 0.42,
      color: theme.palette.common.black
    },
    ".Select-menu-outer": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: "absolute",
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: "100%",
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5
    },
    ".Select.is-focused:not(.is-open) > .Select-control": {
      boxShadow: "none"
    },
    ".Select-menu": {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: "auto"
    },
    ".Select-menu div": {
      boxSizing: "content-box"
    },
    ".Select-arrow-zone, .Select-clear-zone": {
      color: theme.palette.action.active,
      cursor: "pointer",
      height: 21,
      width: 21,
      zIndex: 1
    },
    // Only for screen readers. We can't use display none.
    ".Select-aria-only": {
      position: "absolute",
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      height: 1,
      width: 1,
      margin: -1
    }
  }
});


class View extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      name: "",
      email: "",
      status: "",
      salary: "",
      description: null,
      image: "",
      acronym: "",
      groupId: "",
      hierarchyTypeId: "",
      parentHierarchyTypeId: "",
      parentId: "",
      IsEditFromView: false,
      isMakerCheckerEnabled: true,
      update: false,
      delete: false,
      hierarchyTypesOptions: [],
    };
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    this.props.showHierarchyDeleteLoader();
    this.props.deleteHierarchyFromViewPage(id);
    this.setState({
      warning: false
    });
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  componentWillUnmount() {
    if (!this.state.IsEditFromView) {
      this.props.removeIndividualHierarchyData();
    }
  }
  componentWillMount() {
    if (this.props.getIndividualRecord) {
      var str = this.props.getIndividualRecord.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        hierarchyTypeId: this.props.getIndividualRecord.hierarchyTypeId,
        parentHierarchyTypeId: this.props.getIndividualRecord.parentHierarchyTypeId,
        parentId: this.props.getIndividualRecord.parentId,
        code: this.props.getIndividualRecord.code,
        secondaryCode: this.props.getIndividualRecord.secondaryCode,
        name: this.props.getIndividualRecord.name,
        email: this.props.getIndividualRecord.emailAddress,
        contactNumber: this.props.getIndividualRecord.contactNumber,
        status: this.props.getIndividualRecord.status,
        description: this.props.getIndividualRecord.description,
        image: this.props.getIndividualRecord.image,
        acronym: acronym
      });
    }
    //Permission on Button For Enabling / Disabling 

    if (this.props.permissions) {
      this.props.permissions.map((data) => {
        if (data.actionId === permissions.Update) {
          data.isSelected ? this.setState({ update: true }) : this.setState({ update: false })
        }
        else if (data.actionId === permissions.Delete) {
          data.isSelected ? this.setState({ delete: true }) : this.setState({ delete: false })
        }
      })
    }
  }
  componentDidUpdate() {
    if (this.props.getIndividualRecord.page === 'edit') {
      this.props.data.history.push('/app/masterdata-management/hierarchies/approved/edit/' + this.props.getIndividualRecord.id);
    }
    if (this.props.deleteHierarchySuccess) {
      if (this.state.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been deleted as draft!')
        this.props.data.history.push('/app/masterdata-management/hierarchies/pending');
      }
      else {
        NotificationManager.success('Hierarchy has been deleted!')
        this.props.data.history.push('/app/masterdata-management/hierarchies/approved');
      }
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideHierarchyMessage();
      }, 100);
    }
  }

  render() {
    const { acronym, image, hierarchyTypeId, parentHierarchyTypeId, parentId, code, secondaryCode, name, email, contactNumber, description, status, warning } = this.state;
    const { classes, showMessage, alertMessage, loader, hierarchyTypesName, getHierarchyTypes } = this.props;
    return (
      <div>
        <Card className="shadow border-0">
          <CardHeader>
            {image ? (
              <Avatar
                style={{ display: "inline-table" }}
                alt="Avatar"
                src={image}
              />
            ) : (
                <Avatar className="bg-warning" style={{ display: "inline-flex" }}>
                  <h3 className="m-0 text-white">{acronym.toUpperCase()}</h3>
                </Avatar>
              )}
            &nbsp;&nbsp;
            {<IntlMessages id="sidebar.master.hierarchy.view" />}
          </CardHeader>
          <CardBody>
            <div className="row">
            <div className="col-md-4 col-12" style={{ marginTop: "30px" }}>
                <Input name=""
                  fullWidth
                  disabled
                  inputComponent={SelectWrapped}
                  inputProps={{
                    classes,
                    value: hierarchyTypeId,
                    placeholder: "Select Hierarchy Type",
                    instanceId: "react-select-single",
                    id: "react-select-single",
                    name: "react-select-single",
                    simpleValue: true,
                    options: getHierarchyTypes
                    ? getHierarchyTypes.map(suggestion => ({
                      value: suggestion.id,
                      label: suggestion.name
                    }))
                    : []
                  }}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Code"
                  fullWidth
                  value={code}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Secondary Code"
                  fullWidth
                  value={secondaryCode}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  label="Name"
                  type="text"
                  value={name}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  helperText="jsmith@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  disabled
                  value={email}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  margin="normal"
                  helperText="923XZYYYYYYY"
                  label="Contact Number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  disabled
                  value={contactNumber}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Description"
                  fullWidth
                  disabled
                  defaultValue={description ? description : "Not Found"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Status"
                  defaultValue={status === 0 ? "Active" : "InActive"}
                  fullWidth
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <br />
              <br />
              <br />
              <div className="col-md-12 col-12">
                <br />
                <Badge color="info">Parent Information</Badge>
                <Divider />
                <Divider />
                <Divider />
                <br />
              </div>
              <div className="col-md-6 col-12" style={{ marginTop: "30px" }}>
                <Input name=""
                  fullWidth
                  disabled
                  inputComponent={SelectWrapped}
                  inputProps={{
                    classes,
                    value: parentHierarchyTypeId,
                    placeholder: "Select Parent Hierarchy Type",
                    instanceId: "react-select-single",
                    id: "react-select-single",
                    name: "react-select-single",
                    simpleValue: true,
                    options: getHierarchyTypes
                    ? getHierarchyTypes.map(suggestion => ({
                      value: suggestion.id,
                      label: suggestion.name
                    }))
                    : []
                  }}
                />
              </div>
              <div className="col-md-6 col-12" style={{ marginTop: "30px" }}>
                <Input name=""
                  fullWidth
                  disabled
                  inputComponent={SelectWrapped}
                  inputProps={{
                    classes,
                    value: parentId,
                    placeholder: "Select Parent Hierarchy Name",
                    instanceId: "react-select-single", 
                    id: "react-select-single",
                    name: "react-select-single",
                    simpleValue: true,
                    options: hierarchyTypesName
                      ? hierarchyTypesName.map(suggestion => ({
                        value: suggestion.id,
                        label: suggestion.name
                      }))
                      : []
                  }}
                />
              </div>
              <div
                className="col-md-12 col-12"
                style={{ textAlign: "right", marginTop: "15px" }}
              >
                <div className="jr-btn-group">
                  <Button name=""
                    variant="contained"
                    color="primary"
                    className="jr-btn bg-cyan text-white"
                    disabled={this.state.update ? (this.props.getIndividualRecord.status === 1 ? true : false) : true}
                    onClick={() => {
                      localStorage.setItem('hId', this.props.getIndividualRecord.id);
                      this.props.showHierarchyLoader();
                      this.setState({ IsEditFromView: true })
                      this.props.fetchIndividualHierarchy({
                        id: this.props.getIndividualRecord.id,
                        page: "edit"
                      });
                    }}
                  >
                    <i className="zmdi zmdi-edit" />
                    <span>Edit</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-red text-white"
                    disabled={this.state.delete ? false : true}
                    onClick={() => this.setState({ warning: true })}
                  >
                    <i className="zmdi zmdi-delete" />
                    <span>Delete</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn"
                    onClick={() => this.props.data.history.goBack()}
                  >
                    <i className="zmdi zmdi-arrow-left" />
                    <span>Back</span>
                  </Button>
                </div>
              </div>
            </div>
            <SweetAlert
              show={warning}
              warning
              showCancel
              confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt" />}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={<IntlMessages id="sweetAlerts.areYouSure" />}
              onConfirm={
                () => this.deleteFile(this.props.getIndividualRecord.id)
              }
              onCancel={this.onCancelDelete}
            >
              {this.props.isLoad && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
              <IntlMessages id="sweetAlerts.youWillNotAble" />
            </SweetAlert>
          </CardBody>
        </Card>
        {loader && <Loader />}
        {showMessage && NotificationManager.error(alertMessage)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getHierarchyTypes: state.hierarchiesData.getHierarchyTypes ? state.hierarchiesData.getHierarchyTypes.data : "",
    hierarchyTypesName: state.hierarchiesData.getHierarchyTypesName ? state.hierarchiesData.getHierarchyTypesName.data.items : [],
    getIndividualRecord: state.hierarchiesData.individualHierarchyData ? state.hierarchiesData.individualHierarchyData.data : "",
    isSuccess: state.hierarchiesData.userDetailSuccess,
    isLoad: state.hierarchiesData.deleteHierarchyLoader,
    alertMessage: state.hierarchiesData.alertMessage,
    loader: state.hierarchiesData.loader,
    deleteHierarchySuccess: state.hierarchiesData.deleteHierarchySuccess,
    permissions: state.actions.actionsData ? state.actions.actionsData.actions : []
  };
}
export default compose(withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {
    showHierarchyDeleteLoader,
    deleteHierarchyFromViewPage,
    showHierarchyLoader,
    fetchIndividualHierarchy,
    removeIndividualHierarchyData,
    hideHierarchyMessage,
  }))(View);


