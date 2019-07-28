import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import { getHierarchyTypes, getHierarchyTypesName, addHierarchy, showHierarchyLoader, hideHierarchyMessage, removeIndividualHierarchyData } from "actions/Hierarchy";
import { fetchModule, showModuleLoader } from "actions/Module";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import FileBase64 from "react-file-base64";
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from "@material-ui/core/Divider";
import { Badge } from "reactstrap";
import compose from 'recompose/compose';
import Loader from '../../../../../../../../../components/loader/loader.js';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';




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
          fontWeight: isSelected ? 500 : 400,
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
      noResultsText={<Typography>{'No results found'}</Typography>}
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
    justifyItems: 'center',
    width: '90%',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      secondaryCode: "",
      name: "",
      emailAddress: "",
      contactNumber: "",
      description: "",
      errorText: {
        contactNumber: "",
        email: ""
      },
      error: {
        contactNumber: false,
        email: false
      },
      image: null,
      acronym: "",
      hierarchyType: null,
      parentHierarchyTypeId: null,
      nameOfParentHierarchyType: null,
      isParentHierarchy: true
    };
  }
  componentWillUnmount() {
    this.props.removeIndividualHierarchyData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.hierarchyTypesName.length) {
      this.setState({ isParentHierarchy: false })
    }
  }
  componentDidMount() {
    if (this.props.isModules === undefined) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }
    if (!this.props.hierarchyTypes) {
      this.props.getHierarchyTypes();
    }
  }
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideHierarchyMessage();
      }, 100);
    }
    if (this.props.addHierarchySuccess !== null) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been Added as draft');
        this.props.data.history.push("/app/masterdata-management/hierarchies/pending");
      }
      else {
        NotificationManager.success('Hierarchy has been Added');
        this.props.data.history.push("/app/masterdata-management/hierarchies/approved");
      }
    }
  }

  handleChange = name => (event, value) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value
    })
  }
  getFiles(file) {
    let base64 = file.base64;
    this.setState({
      image: base64.substr(base64.indexOf(",") + 1)
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    let current = this.state;
    if (this.state.error.email) {
      this.setState({
        error: {
          email: true
        },
        current: current,
        errorText: {
          email: "invalid email address"
        }
      })
    } else if (this.state.error.contactNumber) {
      this.setState({
        error: {
          contactNumber: true
        },
        current: current,
        errorText: {
          contactNumber: "invalid contact number"
        }
      });
    } else {
      const obj = {
        code: this.state.code,
        contactNumber: this.state.contactNumber,
        description: this.state.description,
        emailAddress: this.state.emailAddress,
        image: this.state.image,
        name: this.state.name,
        parentId: this.state.nameOfParentHierarchyType,
        secondaryCode: this.state.secondaryCode,
        hierarchyTypeId: this.state.hierarchyType,
      };
      this.props.showHierarchyLoader();
      this.props.addHierarchy(obj);
    }
  };
  validateEmail = ev => {
    let current = this.state;
    if (
      ev.target.name === "email" &&
      ev.target.value.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ) {
      current.error[ev.target.name] = false;
      this.setState({
        current: current,
        errorText: {
          email: ""
        }
      });
    }
    else if (ev.target.value === "") {
      current.error[ev.target.name] = false;
      this.setState({
        current: current,
        errorText: {
          email: ""
        }
      });
    }
    else {
      current.error[ev.target.name] = true;
      this.setState({
        current: current,
        errorText: {
          email: "invalid email address"
        }
      });
    }
  };
  validateContactNumber = ev => {
    let current = this.state;
    if (
      ev.target.name === "contactNumber" &&
      ev.target.value.match(/(92)[0-9]{10}/g)
    ) {
      current.error[ev.target.name] = false;
      this.setState({
        current: current,
        errorText: {
          contactNumber: ""
        }
      });
    }
    else if (ev.target.value === "") {
      current.error[ev.target.name] = false;
      this.setState({
        current: current,
        errorText: {
          contactNumber: ""
        }
      });
    }
    else {
      current.error[ev.target.name] = true;
      this.setState({
        current: current,
        errorText: {
          contactNumber: "invalid contact number"
        }
      });
    }
  };

  handleParentHierarchyType = parentHierarchyTypeId => {
    if (parentHierarchyTypeId) {
      this.props.getHierarchyTypesName(parentHierarchyTypeId);
    }
    this.setState({
      parentHierarchyTypeId: parentHierarchyTypeId
    });
  };

  handleHierarchyType = hierarchyType => {
    this.setState({
      hierarchyType: hierarchyType
    });
  };
  handleParentHierarchyTypesName = nameOfParentHierarchyType => {
    if (nameOfParentHierarchyType) {
      this.setState({
        nameOfParentHierarchyType,
      });
    }
    else {
      this.setState({
        isParentHierarchy: true,
        nameOfParentHierarchyType: null
      })
    }
  };
  render() {
    const { classes } = this.props;
    const { errorText, type, nameOfParentHierarchyType, hierarchyType } = this.state;
    const { showMessage, alertMessage } = this.props;
    return (
      <Card>
        <CardHeader className="bg-white text-black">
          {<IntlMessages id="sidebar.master.hierarchy.add" />}
        </CardHeader>
        <CardBody>
          <form className="row" autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="col-md-4 col-12" style={{ marginTop: '9px' }}>
              <InputLabel htmlFor="react-select-single" shrink={true}>Hierarchy Type</InputLabel>
              <Input name=""
                required
                fullWidth
                inputComponent={SelectWrapped}
                inputProps={{
                  classes,
                  value: this.state.hierarchyType,
                  onChange: this.handleHierarchyType,
                  placeholder: 'Select Hierarchy Type',
                  instanceId: 'react-select-single',
                  id: 'react-select-single',
                  name: 'react-select-single',
                  simpleValue: true,
                  options: this.props.hierarchyTypes ? this.props.hierarchyTypes.map(suggestion => ({
                    value: suggestion.id,
                    label: suggestion.name
                  })) : []
                }}
              />
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                id="number"
                label="Code"
                required
                margin="normal"
                onChange={this.handleChange('code')}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                id="number"
                label="Secondary Code"
                margin="normal"
                onChange={this.handleChange('secondaryCode')}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                required
                label="Name"
                type="text"
                margin="normal"
                onChange={this.handleChange('name')}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                helperText="jsmith@example.com"
                type="email"
                name="email"
                onBlur={ev => this.validateEmail(ev)}
                error={this.state.error.email}
                label="Email Address"
                margin="normal"
                onChange={this.handleChange('emailAddress')}
                fullWidth
              />
              <div style={{ color: "red" }}>{errorText["email"]}</div>
              {this.props.isLoading && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                helperText="923XZYYYYYYY"
                error={this.state.error.contactNumber}
                onBlur={ev => this.validateContactNumber(ev)}
                type="number"
                name="contactNumber"
                label="Contact Number"
                margin="normal"
                onChange={this.handleChange('contactNumber')}
                fullWidth
              />
              <div style={{ color: "red" }}>{errorText["contactNumber"]}</div>
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                type="text"
                label="Description"
                onChange={this.handleChange('description')}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12" style={{ marginTop: '20px' }}>
              <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
            </div>
            <br /><br /><br />
            <div className={classes.root} className="col-md-12 col-12">
              <br />
              <Badge color="info">Parent Information</Badge>
              <Divider />
              <Divider />
              <Divider />
              <br />
            </div>
            <div className="col-md-6 col-12" style={{ marginTop: '30px' }}>
              <Input name=""
                fullWidth
                inputComponent={SelectWrapped}
                inputProps={{
                  classes,
                  value: this.state.parentHierarchyTypeId,
                  onChange: this.handleParentHierarchyType,
                  placeholder: 'Select Type',
                  instanceId: 'react-select-single',
                  id: 'react-select-single',
                  name: 'react-select-single',
                  simpleValue: true,
                  options: this.props.hierarchyTypes ? this.props.hierarchyTypes.map(suggestion => ({
                    value: suggestion.id,
                    label: suggestion.name
                  })) : []
                }}
              />
            </div>
            <div className="col-md-6 col-12" style={{ marginTop: '30px' }}>
              <Input name=""
                fullWidth
                disabled={this.state.isParentHierarchy}
                inputComponent={SelectWrapped}
                inputProps={{
                  classes,
                  value: nameOfParentHierarchyType,
                  onChange: this.handleParentHierarchyTypesName,
                  placeholder: 'Select Name',
                  instanceId: 'react-select-single',
                  id: 'react-select-single',
                  name: 'react-select-single',
                  simpleValue: true,
                  options: this.props.hierarchyTypesName ?
                    this.props.hierarchyTypesName.map(suggestion => ({
                      value: suggestion.id,
                      label: suggestion.name
                    }))
                    :
                    []
                }}
              />
            </div>
            <div
              className="col-md-12 col-12"
              style={{ textAlign: "right", paddingTop: "20px" }}
            >
              <Button name=""
                type="submit"
                variant="contained"
                className="jr-btn bg-success text-white"
              >
                <i className="zmdi zmdi-floppy" />
                <span>Save</span>
              </Button>
              <Button name=""
                variant="contained"
                className="jr-btn bg-grey text-white"
                onClick={() => this.props.data.history.goBack()}
              >
                <i className="zmdi zmdi-close-circle-o" />
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </CardBody>
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    addHierarchyNotification: state.hierarchiesData.addHierarchySuccess,
    isLoading: state.hierarchiesData.loader,
    hierarchyTypes: state.hierarchiesData.getHierarchyTypes
      ? state.hierarchiesData.getHierarchyTypes.data
      : "",
    hierarchyTypesName: state.hierarchiesData.getHierarchyTypesName
      ? state.hierarchiesData.getHierarchyTypesName.data.items
      : [],
    addHierarchySuccess: state.hierarchiesData.addHierarchy,
    showMessage: state.hierarchiesData.showMessage,
    alertMessage: state.hierarchiesData.alertMessage,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : ''
  };
}
export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {
    getHierarchyTypes,
    getHierarchyTypesName,
    showHierarchyLoader,
    addHierarchy,
    hideHierarchyMessage,
    removeIndividualHierarchyData,
    showModuleLoader,
    fetchModule,
  })
)(AddForm);
