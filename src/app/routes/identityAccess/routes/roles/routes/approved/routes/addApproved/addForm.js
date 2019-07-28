import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import { showRoleLoader, addRole, hideRoleMessage, fetchAllModules } from "actions/Role";
import { fetchModule, showModuleLoader } from "actions/Module";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText
} from "reactstrap";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Loader from '../../../../../../../../../components/loader/loader.js';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      emailAddress: "",
      mobileNumber: "",
      salary: "",
      RolesIds: [],
      errorText: {
        mobileNumber: "",
        email: ""
      },
      selectedDate: moment().format("YYYY-MM-DD"),
      error: {
        mobileNumber: false,
        email: false
      },
      files: null,
    };
  }
  state = {
    confirmDirty: false,
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }
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
  renderTreeNodes = (data) => {
    if (data) {
      return data.map((item, index) => {
        if (item.modules) {
          return (
              <TreeNode data-node-name={'0-' + item.moduleCode.toString()} title={item.name} key={'0-' + item.moduleCode.toString()}  dataRef={item}>
              {
                this.renderTreeNodes(item.modules)
              }
            </TreeNode>
          );
        }
        return <TreeNode data-node-name={item.moduleActionId.toString()} {...item} title={item.name} key={item.moduleActionId.toString()} dataRef={item} />
      });
    }
  }

  componentDidMount() {
    this.props.showRoleLoader();
    this.props.fetchAllModules();
    if (this.props.isModules === undefined) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }
  }
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideRoleMessage();
      }, 100);
    }
    if (this.props.addRoleSuccess !== null) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been Added as draft');
        this.props.data.history.push("/app/identity-management/roles/pending");
      }
      else {
        NotificationManager.success('Role has been Added');
        this.props.data.history.push("/app/identity-management/roles/approved");
      }
    }
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
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.checkedKeys) {
      //Algo start for seprating actionIds against with moduleIds:::
      let withParentIds = this.state.checkedKeys;
      let withOutParentIds = withParentIds.filter(function (i) {
        if (i.indexOf('0-') === -1) return true;
        return false;
      })
      var moduleActionIds = withOutParentIds.map(function (item) {
        return parseInt(item)
      });
      var moduleArray = moduleActionIds.filter( value => !Number.isNaN(value) );
      //Algo End:::
    }
    if (this.state.error.email) {
      NotificationManager.error(
        <IntlMessages id="notification.errorMessage" />,
        <IntlMessages id="notification.emailError" />
      );
    } else if (this.state.error.mobileNumber) {
      NotificationManager.error(
        <IntlMessages id="notification.errorMessage" />,
        <IntlMessages id="notification.mobileNumber" />
      );
    } else {
      const obj = {
        name: this.state.name,
        moduleActionId: moduleArray,
        description: this.state.description,
      };
      this.props.showRoleLoader();
      this.props.addRole(obj);
    }
  };
  roleKey = keys => {
    this.setState({ RolesIds: keys })
  }
  render() {
    const { showMessage, alertMessage } = this.props;
    return (
      <Card>
        <CardHeader className="bg-white text-black">
          {<IntlMessages id="component.addRole" />}
        </CardHeader>
        <CardBody>
          <form className="row" autoComplete="on" onSubmit={this.handleSubmit}>
            <div className="col-md-4 col-12">
              <TextField name="Role"
                required
                id="required"
                label="Name"
                type="text"
                margin="normal"
                onChange={this.formName.bind(this)}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12">
              <TextField name="Desc"
                type="text"
                margin="normal"
                label="Description"
                onChange={this.description.bind(this)}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12" style={{ paddingTop: '20px' }}>
              <label>Modules:</label>
              <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
              >
                {this.renderTreeNodes(this.props.getAllModules)}
              </Tree>
            </div>
            {this.props.isLoading && (
              <div className="loader-view">
                <Loader />
              </div>
            )}
            <div
              className="col-md-12 col-12"
              style={{ textAlign: "right", paddingTop: "20px" }}
            >
              <Button name="save"
                type="submit"
                variant="contained"
                color="primary"
                className="jr-btn"
              >
                <i className="zmdi zmdi-floppy" />
                <span>Save</span>
              </Button>
              <Button name=""
                variant="contained"
                className="jr-btn bg-cyan text-white"
                onClick={() => this.props.data.history.push('/app/identity-management/roles/approved')}
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
    isModules: state.modules.moduleData.data,
    isLoading: state.rolesData.loader,
    getAllModules: state.rolesData.fetchAllModules ? state.rolesData.fetchAllModules.data : '',
    addRoleSuccess: state.rolesData.addRole,
    showMessage: state.rolesData.showMessage,
    alertMessage: state.rolesData.alertMessage,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : ''
  };
}
export default connect(
  mapStateToProps,
  {
    showRoleLoader,
    addRole,
    hideRoleMessage,
    fetchAllModules,
    showModuleLoader,
    fetchModule,
  }
)(AddForm);

