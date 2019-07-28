import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  showRoleDeleteLoader,
  deleteRoleFromViewPage,
  showRoleLoader,
  fetchIndividualRole,
  removeIndividualRoleData
} from "actions/Role";
import Button from "@material-ui/core/Button";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardHeader,
  CardText,
  CardFooter
} from "reactstrap";
import Chip from "@material-ui/core/Chip";
import { Badge } from "reactstrap";
import { Tree } from "antd";
import "antd/dist/antd.css";
import permissions from "../../../../../../../../../config/permissions";

const TreeNode = Tree.TreeNode;

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      name: "",
      description: '',
      status: "",
      salary: "",
      roles: null,
      image: "",
      acronym: "",
      roleId: "",
      permissions: "",
      IsEditFromView: false,
      update: false,
      delete: false
    };
  }
  state = {
    expandedKeys: [],
    autoExpandParent: true
  };

  renderTreeNodes = data => {
    if (data) {
      return data.map((item, index) => {
        if (item.modules) {
          return (
            <TreeNode
              data-node-name={'0-' + item.moduleCode.toString()}
              defaultExpandedKeys={'0-' + item.moduleCode.toString()}
              title={item.name}
              key={item.moduleCode.toString()}
              dataRef={item}
            >
              {this.renderTreeNodes(item.modules)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            data-node-name={item.moduleActionId.toString()}
            defaultExpandedKeys={item.moduleActionId.toString()}
            {...item}
            title={item.name}
            key={item.moduleActionId.toString()}
            dataRef={item}
          />
        );
      });
    }
  };
  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = () => {
    alert("you can't update roles in view mode..")
  }
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    this.props.showRoleDeleteLoader();
    this.props.deleteRoleFromViewPage(id);
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };
  componentWillMount() {
    if (this.props.getIndividualRecord) {
      var str = this.props.getIndividualRecord.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        name: this.props.getIndividualRecord.name,
        description: this.props.getIndividualRecord.description,
        status: this.props.getIndividualRecord.status,
        roles: this.props.getIndividualRecord.roles,
        image: this.props.getIndividualRecord.image,
        acronym: acronym
      });
      if (this.props.getIndividualRecord.permissions) {
        let checkedKeys = [];
        function a(el) {
          if (el.actions) {
            el.actions.forEach((e) => {
              if (e.isSelected) {
                checkedKeys.push(String(e.moduleActionId));
              }
              if (el.modules) {
                el.modules.push(e);
              }
              else {
                el.modules = [];
                el.modules.push(e);
              }
            });
          }
        }

        function b(children) {
          if (children.modules) {
            children.modules.forEach((grChild) => {
              b(grChild);

            })
          }
          a(children);
        }

        this.props.getIndividualRecord.permissions.forEach(element => {
          b(element);
        });
        this.setState({
          permissions: this.props.getIndividualRecord.permissions,
          checkedKeys
        })
      }
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
      this.props.data.history.push('/app/identity-management/roles/approved/edit/' + this.props.getIndividualRecord.roleId);
    }
    if (this.props.deleteRoleSuccess) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('Your changes has been deleted as draft!')
        this.props.data.history.push('/app/identity-management/roles/pending');
      }
      else {
        NotificationManager.success('Role has been deleted!')
        this.props.data.history.push('/app/identity-management/roles/approved');
      }
    }
  }
  componentWillUnmount() {
    if (!this.state.IsEditFromView) {
      this.props.removeIndividualRoleData();
    }
  }
  render() {
    const { warning } = this.state;
    const { showMessage, alertMessage, loader } = this.props;
    return (
      <div>
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
              {<IntlMessages id=" sidebar.component.viewRole" />}
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Name"
                  defaultValue={this.state.name}
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  type="text"
                  margin="normal"
                  label="Description"
                  defaultValue={this.state.description ? this.state.description : 'Not Found'}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  label="Status"
                  defaultValue={
                    this.state.status === 0 ? "Active" : "InActive"
                  }
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-4 col-12">
                <label>Modules:</label>
                <Tree
                  showLine={true}
                  defaultExpandAll={true}
                  checkedKeys={this.state.checkedKeys}
                  checkable
                  onExpand={this.onExpand}
                  expandedKeys={this.state.expandedKeys}
                  autoExpandParent={this.state.autoExpandParent}
                  onCheck={this.onCheck}
                  onSelect={this.onSelect}
                  selectedKeys={this.state.selectedKeys}
                >
                  {this.renderTreeNodes(this.state.permissions)}
                </Tree>
              </div>
              <div
                className="col-md-12 col-12"
                style={{ textAlign: "right", marginTop: "15px" }}
              >
                <div className="jr-btn-group">
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-cyan text-white"
                    disabled={this.state.update ? (this.props.getIndividualRecord.status === 1 ? true : false) : true}
                    onClick={() => {
                      localStorage.setItem('rId', this.props.getIndividualRecord.roleId);
                      this.props.showRoleLoader();
                      this.setState({ IsEditFromView: true })
                      this.props.fetchIndividualRole({
                        roleId: this.props.getIndividualRecord.roleId,
                        page: "edit"
                      })
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
              onConfirm={() =>
                this.deleteFile(this.props.getIndividualRecord.roleId)
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
    getIndividualRecord: state.rolesData
      ? state.rolesData.individualRoleData.data
      : [],
    isLoad: state.rolesData.deleteRoleLoader,
    showMessage: state.rolesData.showMessage,
    alertMessage: state.rolesData.alertMessage,
    loader: state.rolesData.loader,
    deleteRoleSuccess: state.rolesData.deleteRoleSuccess,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : '',
    permissions: state.actions.actionsData ? state.actions.actionsData.actions : []
  };
}
export default connect(
  mapStateToProps,
  {
    showRoleDeleteLoader,
    deleteRoleFromViewPage,
    showRoleLoader,
    fetchIndividualRole,
    removeIndividualRoleData
  }
)(View);
