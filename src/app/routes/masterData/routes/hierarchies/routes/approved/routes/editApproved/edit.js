import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  editHierarchy,
  getHierarchyTypesName,
  showHierarchyLoader,
  hideHierarchyMessage,
  removeIndividualHierarchyData
} from "actions/Hierarchy";
import Button from "@material-ui/core/Button";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardHeader,
  CardText,
  CardFooter
} from "reactstrap";
import FileBase64 from "react-file-base64";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import Status from "./selectStatus";
import Divider from "@material-ui/core/Divider";
import { Badge } from "reactstrap";
import compose from "recompose/compose";
import FormControl from "@material-ui/core/FormControl";
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
class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contactNumber: "",
      hierarchyId: "",
      code: "",
      status: "",
      secondaryCode: "",
      type: "",
      description: null,
      errorText: {
        contactNumber: "",
        email: ""
      },
      error: {
        contactNumber: false,
        email: false
      },
      files: null,
      image: null,
      acronym: "",
      hierarchyTypesOptions: [],
      hierarchyTypeId: null,
      parentHierarchyTypeId: null,
      parentId: null,
      isParentHierarchy: true
    };
  }

  componentWillUnmount() {
    this.props.removeIndividualHierarchyData();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.hierarchyTypesName.length){
      this.setState({isParentHierarchy: false}) 
    }
}
  componentWillMount() {
    if (this.props.getIndividualRecord && this.props.getIndividualRecord.name) {
      this.toDataURL(this.props.getIndividualRecord.image, dataUrl => {
        this.setState({
          files: dataUrl.substr(dataUrl.indexOf(",") + 1)
        });
      });
      if (this.props.getIndividualRecord.parentId) {
        this.setState({
          isParentHierarchy: false
        })
      }
      var str = this.props.getIndividualRecord.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        hierarchyTypeId: this.props.getIndividualRecord.hierarchyTypeId,
        parentHierarchyTypeId: this.props.getIndividualRecord.parentHierarchyTypeId,
        parentId: this.props.getIndividualRecord.parentId,
        name: this.props.getIndividualRecord.name,
        email: this.props.getIndividualRecord.emailAddress,
        status: this.props.getIndividualRecord.status,
        image: this.props.getIndividualRecord.image,
        code: this.props.getIndividualRecord.code,
        secondaryCode: this.props.getIndividualRecord.secondaryCode,
        contactNumber: this.props.getIndividualRecord.contactNumber,
        description: this.props.getIndividualRecord.description,
        acronym: acronym
      });
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideHierarchyMessage();
      }, 100);
    }
    if (this.props.editHierarchySuccess !== null) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('You changes has been Edited as draft')
        this.props.data.history.push("/app/masterdata-management/hierarchies/pending");
      }
      else {
        NotificationManager.success('Hierarchy has been Edited')
        this.props.data.history.push("/app/masterdata-management/hierarchies/approved");
      }
    }
  }
  handleChange = name => (event, value) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value
    });
  };
  toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw===";
      img.src = src;
    }
  }

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
    } else {
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

  getFiles(files) {
    let base64 = files.base64;
    this.setState({
      files: base64.substr(base64.indexOf(",") + 1)
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
      });
    }
    else if (this.state.error.contactNumber) {
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
        id: localStorage.getItem("hId"),
        hierarchyTypeId: this.state.hierarchyTypeId,
        code: this.state.code,
        secondaryCode: this.state.secondaryCode,
        name: this.state.name,
        emailAddress: this.state.email,
        contactNumber: this.state.contactNumber,
        description: this.state.description,
        status: this.state.status,
        parentId: this.state.parentId
      };
      this.props.showHierarchyLoader();
      this.props.editHierarchy(obj);
    }
  };

  handleParentHierarchyTypesName = parentId => {
    if (parentId) {
      this.setState({
        parentId: parentId
      });
    }
    else {
      this.setState({
        isParentHierarchy: true,
        parentId: null
      })
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


  handleHierarchyType = hierarchyTypeId => {
    this.setState({
      hierarchyTypeId: hierarchyTypeId
    });
  };

  setStatus = (status) => {
    this.setState({
      status: status
    })
  }
  render() {
    const { classes } = this.props;
    const {
      errorText,
      acronym,
      name,
      email,
      contactNumber,
      description,
      image,
      code,
      secondaryCode,
      status,
      parentId,
      hierarchyTypeId
    } = this.state;
    const { showMessage, alertMessage, getHierarchyTypes, hierarchyTypesName } = this.props;
    return (
      <div>
        {this.props.isSuccess ? (
          <Card className="shadow border-0">
            <CardHeader>
              {image ? (
                <Avatar
                  style={{ display: "inline-table" }}
                  alt="Avatar"
                  src={image}
                />
              ) : (
                  <Avatar
                    className="bg-warning"
                    style={{ display: "inline-flex" }}
                  >
                    <h3 className="m-0 text-white">{acronym.toUpperCase()}</h3>
                  </Avatar>
                )}
              &nbsp;&nbsp;
              {<IntlMessages id="sidebar.master.hierarchy.edit" />}
            </CardHeader>
            <CardBody>
              <form
                className="row"
                autoComplete="on"
                onSubmit={this.handleSubmit}
              >
                <div className="col-md-4 col-12" style={{ marginTop: "30px" }}>
                  <Input name=""
                    required
                    fullWidth
                    disabled={false}
                    inputComponent={SelectWrapped}
                    inputProps={{
                      classes,
                      value: hierarchyTypeId,
                      onChange: this.handleHierarchyType,
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
                    id="number"
                    defaultValue={code ? code : "Not Found"}
                    label="Code"
                    required
                    margin="normal"
                    onChange={this.handleChange("code")}
                    fullWidth
                  />
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    id="number"
                    defaultValue={secondaryCode ? secondaryCode : "Not Found"}
                    label="Secondary Code"
                    margin="normal"
                    onChange={this.handleChange("secondaryCode")}
                    fullWidth
                  />
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    required
                    id="required"
                    defaultValue={name ? name : 'Not Found'}
                    label="Name"
                    type="text"
                    margin="normal"
                    onChange={this.handleChange("name")}
                    fullWidth
                  />
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    helperText="jsmith@example.com"
                    type="email"
                    name="email"
                    defaultValue={email ? email : 'Not Found'}
                    onBlur={ev => this.validateEmail(ev)}
                    error={this.state.error.email}
                    label="Email Address"
                    margin="normal"
                    onChange={this.handleChange("email")}
                    fullWidth
                  />
                  <div style={{ color: "red" }}>{errorText["email"]}</div>
                  {this.props.isLoading && (
                    <div className="loader-view">
                      <Loader />
                    </div>
                  )}
                </div>
                <Status value={status} setStatus={this.setStatus} />
                <div className="col-md-4 col-12">
                  <TextField name=""
                    helperText="923XZYYYYYYY"
                    id="required"
                    error={this.state.error.contactNumber}
                    onBlur={ev => this.validateContactNumber(ev)}
                    type="number"
                    name="contactNumber"
                    defaultValue={contactNumber ? contactNumber : 'Not Found'}
                    label="Contact Number"
                    // margin="normal"
                    onChange={this.handleChange("contactNumber")}
                    fullWidth
                  />
                  <div style={{ color: "red" }}>
                    {errorText["contactNumber"]}
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    type="text"
                    label="Description"
                    defaultValue={description ? description : 'Not Found'}
                    onChange={this.handleChange("description")}
                    fullWidth
                  />
                </div>
                <div className="col-md-4 col-12" style={{ marginTop: "20px" }}>
                  <FileBase64
                    multiple={false}
                    onDone={this.getFiles.bind(this)}
                  />
                </div>
                <br />
                <br />
                <br />
                <div className={classes.root} className="col-md-12 col-12">
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
                    disabled={false}
                    inputComponent={SelectWrapped}
                    inputProps={{
                      classes,
                      value: this.state.parentHierarchyTypeId,
                      onChange: this.handleParentHierarchyType,
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
                    disabled={this.state.isParentHierarchy}
                    inputComponent={SelectWrapped}
                    inputProps={{
                      classes,
                      value: parentId,
                      onChange: this.handleParentHierarchyTypesName,
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
                      type="submit"
                      variant="contained"
                      className="jr-btn"
                      color="primary"
                    >
                      <i className="zmdi zmdi-floppy" />
                      <span>Save</span>
                    </Button>
                    <Button name=""
                      variant="contained"
                      className="jr-btn bg-cyan text-white"
                      onClick={() => this.props.data.history.push('/app/masterdata-management/hierarchies/approved')}
                    >
                      <i className="zmdi zmdi-close-circle-o" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        ) : (
            <div className="loader-view">
              <Loader />
            </div>
          )}
        {showMessage && alertMessage && NotificationManager.error(alertMessage)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getHierarchyTypes: state.hierarchiesData.getHierarchyTypes ? state.hierarchiesData.getHierarchyTypes.data : "",
    hierarchyTypesName: state.hierarchiesData.getHierarchyTypesName ? state.hierarchiesData.getHierarchyTypesName.data.items : [],
    getIndividualRecord: state.hierarchiesData.individualHierarchyData ? state.hierarchiesData.individualHierarchyData.data : [],
    isSuccess: state.hierarchiesData.hierarchyDetailSuccess,
    isLoading: state.hierarchiesData.loader,
    showMessage: state.hierarchiesData.showMessage,
    alertMessage: state.hierarchiesData.alertMessage,
    editHierarchySuccess: state.hierarchiesData.editHierarchy,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : ''
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    {
      showHierarchyLoader,
      editHierarchy,
      getHierarchyTypesName,
      hideHierarchyMessage,
      removeIndividualHierarchyData
    }
  )
)(Edit);
