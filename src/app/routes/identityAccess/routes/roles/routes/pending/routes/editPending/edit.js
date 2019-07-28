import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  showScrutinizerLoader,
  editScrutinizer,
  hideScrutinizerMessage,
  removeIndividualScrutinizerData
} from "actions/Scrutinizer";
import Button from "@material-ui/core/Button";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { Tree } from "antd";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "antd/dist/antd.css";

const TreeNode = Tree.TreeNode;

// import base64Img from 'base64-img';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      email: "",
      mobileNumber: "",
      salary: "",
      payDay: "",
      status: "",
      roles: null,
      errorText: {
        email: ""
      },
      error: {
        email: false
      },
      files: null,
      image: null,
      acronym: "",
      moduleActionId: [],
      isMakerCheckerEnabled: true
    };
  }
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    selectedKeys: [],
    checkedKeys: [],
  };
  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  }
  renderTreeNodes = data => {
    if (data) {
      return data.map((item, index) => {
        if (item.modules) {
          return (
            <TreeNode
              data-node-name={'0-' + item.moduleCode.toString()}
              key={'0-' + item.moduleCode.toString()}
              title={item.name}
              dataRef={item}
            >
              {this.renderTreeNodes(item.modules)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            data-node-name={item.moduleActionId.toString()}
            {...item}
            title={item.name}
            key={item.moduleActionId.toString()}
            dataRef={item}
          />
        );
      });
    }
  };
  componentWillMount() {
    if (this.props.getIndividualRecord) {
      var data = JSON.parse(this.props.getIndividualRecord.payload);
      this.toDataURL(data.image, dataUrl => {
        this.setState({
          files: dataUrl.substr(dataUrl.indexOf(",") + 1)
        });
      });
      var str = data.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        name: data.name,
        description: data.description,
        status: data.status,
        acronym: acronym,
        checkedKeys: data.moduleActionId.map(String)
      });
    }
  }
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideScrutinizerMessage();
      }, 100);
    }
    if (this.props.editRoleSuccess !== null) {
      NotificationManager.success('Role has been Edited')
      this.props.data.history.push("/app/identity-management/roles/pending");
    }
  }
  componentWillUnmount() {
    this.props.removeIndividualScrutinizerData();
  }
  formName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  description(e) {
    e.preventDefault();
    this.setState({
      description: e.target.value
    });
  }
  formEmail(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }
  setStatus(e) {
    e.preventDefault();
    this.setState({
      status: e.target.value
    })
  }
  formMobile(e) {
    e.preventDefault();
    this.setState({
      mobileNumber: e.target.value
    });
  }
  formSalary(e) {
    e.preventDefault();
    this.setState({
      salary: e.target.value
    });
  }
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
  getFiles(files) {
    let base64 = files.base64;
    this.setState({
      files: base64.substr(base64.indexOf(",") + 1)
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.checkedKeys) {
      //Algo start for seprating moduleActionIds against with moduleIds:::
      let withZeroValue = this.state.checkedKeys;
      let withOutZeroValue = withZeroValue.filter(function (i) {
        if (i.indexOf('0-') === -1) return true;
        return false;
      })
      var moduleActionIds = withOutZeroValue.map(function (item) {
        return parseInt(item)
      });
      var moduleArray = moduleActionIds.filter(value => !Number.isNaN(value));

      //Algo End:::
    }
    if (this.state.error.email) {
      NotificationManager.error(
        <IntlMessages id="notification.errorMessage" />,
        <IntlMessages id="notification.emailError" />
      );
    } else {
      const json = {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
        moduleActionId: moduleArray,
      };
      var payload = JSON.stringify(json);
      const obj = {
        id: localStorage.getItem("rId"),
        moduleCode: 'PR',
        payload: payload
      }
      this.props.showScrutinizerLoader();
      this.props.editScrutinizer(obj);
    }
  };
  roleKeys = keys => {
    this.setState({ roles: keys });
  };
  render() {
    const { showMessage, alertMessage } = this.props;
    return (
      <div>
        {this.props.isSuccess ? (
          <Card className="shadow border-0">
            <CardHeader>
              {this.state.image ? (
                <Avatar
                  style={{ display: "inline-table" }}
                  alt="Avatar"
                  src={this.state.image}
                />
              ) : (
                  <Avatar
                    className="bg-warning"
                    style={{ display: "inline-flex" }}
                  >
                    <h3 className="m-0 text-white">
                      {this.state.acronym.toUpperCase()}
                    </h3>
                  </Avatar>
                )}
              &nbsp;&nbsp;
              {<IntlMessages id="sidebar.components.editRole" />}
            </CardHeader>
            <CardBody>
              <form
                className="row"
                autoComplete="on"
                onSubmit={this.handleSubmit}
              >
                <div className="col-md-4 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label="Name"
                    type="text"
                    defaultValue={this.state.name}
                    onChange={this.formName.bind(this)}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    type="text"
                    margin="normal"
                    label="Description"
                    onChange={this.description.bind(this)}
                    defaultValue={this.state.description ? this.state.description : 'Not Found'}
                    fullWidth
                  />
                </div>
                {this.props.isLoading && (
                  <div className="loader-view">
                    <Loader />
                  </div>
                )}
                <div className="col-md-4 col-12" style={{ paddingTop: '17px' }}>
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select name=""
                      value={this.state.status}
                      onChange={this.setStatus.bind(this)}
                      input={<Input name="" id="status" />}
                    >
                      <MenuItem value={0}>Active</MenuItem>
                      <MenuItem value={1}>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-4 col-12">
                  <label>Modules:</label>
                  <Tree
                    showLine={true}
                    defaultExpandAll={true}
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                    checkedKeys={this.state.checkedKeys}
                  >
                    {this.renderTreeNodes(this.props.getAllModules)}
                  </Tree>
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
                      onClick={() => this.props.data.history.push("/app/identity-management/roles/pending")}
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
    getIndividualRecord: state.scrutinizers.individualScrutinizerData.data,
    isSuccess: state.scrutinizers.scrutinizerDetailSuccess,
    isLoading: state.scrutinizers.loader,
    showMessage: state.scrutinizers.showMessage,
    alertMessage: state.scrutinizers.alertMessage,
    editRoleSuccess: state.scrutinizers.editScrutinizer,
    getAllModules: state.rolesData.fetchAllModules ? state.rolesData.fetchAllModules.data : '',
  };
}
export default connect(
  mapStateToProps,
  {
    showScrutinizerLoader,
    editScrutinizer,
    hideScrutinizerMessage,
    removeIndividualScrutinizerData
  }
)(Edit);


