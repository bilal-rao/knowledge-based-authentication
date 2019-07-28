import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  showScrutinizerDeleteLoader,
  deleteScrutinizerFromViewPage,
  showScrutinizerLoader,
  fetchIndividualScrutinizer,
  removeIndividualScrutinizerData,
  hideScrutinizerMessage,
  hideProcessRequestMessage,
  showProcessRequestLoader,
  scrutinizerProcessRequest
} from "actions/Scrutinizer";
import {
  showRoleLoader,
  fetchAllModules
} from 'actions/Role';
import Button from "@material-ui/core/Button";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  CardBody
} from "reactstrap";
import { Tree } from "antd";
import "antd/dist/antd.css";
import permissions from "../../../../../../../../../config/permissions";
import scrutinizerActions from "../../../../../../../../../config/scrutinizerActions";
import { Badge } from "reactstrap";

const TreeNode = Tree.TreeNode;

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      name: "",
      description: '',
      status: "",
      requestedStatus: "",
      action: "",
      salary: "",
      roles: null,
      image: "",
      acronym: "",
      roleId: "",
      permissions: "",
      isMakerCheckerEnabled: true,
      IsEditFromView: false,
      update: false,
      delete: false,
      view: false,
      maker: false,
      checker: false,
      warning: false,
      warningMaker: false,
      warningApprove: false,
      warningReject: false,
      isComment: false,
      comment: ""
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
              disabled
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
            disabled
            {...item}
            title={item.name}
            key={item.moduleActionId.toString()}
            dataRef={item}
          />
        );
      });
    }
  };
  onConfirm = () => {
    this.setState({
      warning: false
    });
  };
  deleteFile(id) {
    const obj = {
      id: id,
      moduleCode: 'PR'
    };
    this.props.showScrutinizerDeleteLoader();
    this.props.deleteScrutinizerFromViewPage(obj);
  }
  sfa(id, comment) {
    const obj = {
      id: id,
      moduleCode: 'PR',
      pageNumber: 1,
      pageSize: 5,
      action: 1,
      comment: comment,
      request: 'sfa'
    }
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  }
  approve(id, comment) {
    const obj = {
      id: id,
      moduleCode: 'PR',
      pageNumber: 1,
      pageSize: 5,
      action: 2,
      comment: comment,
      request: 'approve'
    }
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  }
  reject(id, comment) {
    const obj = {
      id: id,
      moduleCode: 'PR',
      pageNumber: 1,
      pageSize: 5,
      action: 3,
      comment: comment,
      request: 'reject'
    }
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  }
  onCancelDelete = () => {
    this.setState({
      warning: false
    });
  };

  onCancelMakerWarning = () => {
    this.setState({
      warningMaker: false
    });
  };
  onCancelApproveWarning = () => {
    this.setState({
      warningApprove: false
    });
  };
  onCancelRejectWarning = () => {
    this.setState({
      warningReject: false
    });
  };
  WarningMakerTrue = () => {
    this.setState({
      warningMaker: true
    });
  };
  warningApproveTrue = () => {
    this.setState({
      warningApprove: true
    });
  };
  warningRejectTrue = () => {
    this.setState({
      warningReject: true
    });
  };
  componentWillMount() {
    if (this.props.getIndividualRecord) {
      var data = JSON.parse(this.props.getIndividualRecord.payload);
      var str = data.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        name: data.name,
        description: data.description,
        status: data.status,
        requestedStatus: this.props.getIndividualRecord.status,
        action: this.props.getIndividualRecord.action,
        roles: data.roles,
        image: data.image,
        acronym: acronym,
        checkedKeys: data.moduleActionId.map(String)
      });
      if (this.props.getIndividualRecord.comments) {
        this.setState({
          isComment: true,
          comment: this.props.getIndividualRecord.comments
        })
      }
      else {
        this.setState({
          isComment: false,
          comment: ""
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
        else if (data.actionId === permissions.View) {
          data.isSelected ? this.setState({ view: true }) : this.setState({ view: false })
        }
        else if (data.actionId === permissions.Maker) {
          data.isSelected ? this.setState({ maker: true }) : this.setState({ maker: false })
        }
        else if (data.actionId === permissions.Checker) {
          data.isSelected ? this.setState({ checker: true }) : this.setState({ checker: false })
        }
      })
    }
  }
  componentDidUpdate() {
    if (this.props.getIndividualRecord.page === 'edit') {
      this.props.data.history.push('/app/identity-management/roles/pending/edit/' + this.props.getIndividualRecord.id);
    }
    if (this.props.deleteRoleSuccess) {
      NotificationManager.success('Role has been deleted!')
      this.props.data.history.push('/app/identity-management/roles/pending');
    }
    if (this.props.processRequestSucess) {
      this.props.data.history.push('/app/identity-management/roles/pending');
    }
    if (this.props.showProcessRequestMessage) {
      setTimeout(() => {
        this.props.hideProcessRequestMessage();
      }, 100);
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideScrutinizerMessage();
      }, 100);
    }
  }
  componentWillReceiveProps() {
    if (this.props.deleteGroupSuccess || this.props.showMessage) {
      this.setState({ warning: false })
    }
    if (this.props.processRequestSucess || this.props.showProcessRequestMessage) {
      this.setState({ warningMaker: false, warningApprove: false, warningReject: false })
    }
  }
  componentWillUnmount() {
    if (!this.state.IsEditFromView) {
      this.props.removeIndividualScrutinizerData();
    }
  }
  render() {
    const { warning, warningMaker, warningApprove, warningReject } = this.state;
    const { showMessage, alertMessage, loader, showProcessRequestMessage, alertProcessRequestMessage, isModules } = this.props;
    return (
      <div>
        <Card className="shadow border-0">
          <div className="card-header clearfix">
            <span className="title float-left">
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
            </span>
            {this.state.action === 0 ? <Badge style={{ margin: '4px' }} className="float-right" color="primary">
              Added
                              </Badge> : this.state.action === 1 ? (<Badge style={{ margin: '4px' }} className="float-right" color="info">
                Edited
                              </Badge>) :
                <Badge style={{ margin: '4px' }} className="float-right" color="danger">
                  Deleted
                              </Badge>
            }
            {this.state.requestedStatus === 0 ? <Badge style={{ margin: '4px' }} className="float-right" color="info" pill>
              Draft
                              </Badge> : this.state.requestedStatus === 1 ? (<Badge style={{ margin: '4px' }} className="float-right" color="primary" pill>
                Send For Authorization
                              </Badge>) : this.state.requestedStatus === 2 ? <Badge style={{ margin: '4px' }} className="float-right" color="success" pill>
                  Approved
                              </Badge> :
                  <Badge style={{ margin: '4px' }} className="float-right" color="danger" pill>
                    Rejected
                              </Badge>
            }
          </div>
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
                  {this.renderTreeNodes(this.props.getAllModules)}
                </Tree>
              </div>
              {this.state.isComment ?
                <div className="col-md-4 col-12">
                  <TextField name=""
                    label="Comment"
                    defaultValue={this.state.comment}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </div>
                :
                ""
              }
              <div
                className="col-md-12 col-12"
                style={{ textAlign: "right", marginTop: "15px" }}
              >
                <div className="jr-btn-group">
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-lime text-white"
                    disabled={this.state.maker ? (((this.props.getIndividualRecord.status === 0) && (isModules.userId === this.props.getIndividualRecord.userId)) ? false : true) : (this.props.getIndividualRecord.status === 1 ? true : false)}
                    onClick={this.WarningMakerTrue}
                  >
                    <i className="zmdi zmdi-rotate-cw"></i>
                    <span>Sent For Approval</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-teal text-white"
                    disabled={this.state.checker ? (((this.props.getIndividualRecord.status === 1) && (isModules.userId !== this.props.getIndividualRecord.userId)) ? false : true) : true}
                    onClick={this.warningApproveTrue}
                  >
                    <i className="zmdi zmdi-check"></i>
                    <span>Approve</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-blue-grey text-white"
                    disabled={this.state.checker ? (((this.props.getIndividualRecord.status === 1) && (isModules.userId !== this.props.getIndividualRecord.userId)) ? false : true) : true}
                    onClick={this.warningRejectTrue}
                  >
                    <i className="zmdi zmdi-tag-close"></i>
                    <span>Reject</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-cyan text-white"
                    disabled={this.state.update ? (this.props.getIndividualRecord.status === 1 ? true : false) : true}
                    onClick={() => {
                      localStorage.setItem('rId', this.props.getIndividualRecord.id);
                      this.props.showScrutinizerLoader();
                      this.setState({ IsEditFromView: true })
                      this.props.fetchIndividualScrutinizer({
                        id: this.props.getIndividualRecord.id,
                        page: "edit",
                        moduleCode: 'PR'
                      });
                      this.props.showRoleLoader();
                      this.props.fetchAllModules();
                    }}
                  >
                    <i className="zmdi zmdi-edit" />
                    <span>Edit</span>
                  </Button>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-red text-white"
                    disabled={this.state.delete ? (((this.props.getIndividualRecord.status === 0) || (this.props.getIndividualRecord.status === 3 && this.props.getIndividualRecord.action === scrutinizerActions.Added)) ? false : true) : false}
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
                this.deleteFile(this.props.getIndividualRecord.id)
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
            <SweetAlert
              show={warningMaker}
              input
              required={false}
              showCancel
              confirmBtnText="Yes"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={<IntlMessages id="sweetAlerts.sentForApproval" />}
              inputPlaceHolder={<IntlMessages id="sweetAlerts.anInput" />}
              onConfirm={(input) => this.sfa(this.props.getIndividualRecord.id, input)}
              onCancel={this.onCancelMakerWarning}
            >
              {this.props.isLoadingProcessDelete && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
              <IntlMessages id="sweetAlerts.comments" />
            </SweetAlert>
            <SweetAlert
              show={warningApprove}
              input
              required={false}
              showCancel
              confirmBtnText="Yes"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={<IntlMessages id="sweetAlerts.approve" />}
              inputPlaceHolder={<IntlMessages id="sweetAlerts.anInput" />}
              onConfirm={(input) => this.approve(this.props.getIndividualRecord.id, input)}
              onCancel={this.onCancelApproveWarning}
            >
              {this.props.isLoadingProcessDelete && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
              <IntlMessages id="sweetAlerts.comments" />
            </SweetAlert>
            <SweetAlert
              show={warningReject}
              required
              input
              showCancel
              confirmBtnText="Yes"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={<IntlMessages id="sweetAlerts.reject" />}
              inputPlaceHolder={<IntlMessages id="sweetAlerts.anInput" />}
              onConfirm={(input) => this.reject(this.props.getIndividualRecord.id, input)}
              onCancel={this.onCancelRejectWarning}
            >
              {this.props.isLoadingProcessDelete && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
              <IntlMessages id="sweetAlerts.comments" />
            </SweetAlert>
          </CardBody>
        </Card>
        {loader && <Loader />}
        {showMessage && NotificationManager.error(alertMessage)}
        {showProcessRequestMessage && NotificationManager.error(alertProcessRequestMessage)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    usersList: state.scrutinizers.scrutinizersList
      ? state.scrutinizers.scrutinizersList.data.items
      : "",
    getIndividualRecord: state.scrutinizers
      ? state.scrutinizers.individualScrutinizerData.data
      : [],
    permissions: state.scrutinizers.individualScrutinizerData.data ? state.scrutinizers.individualScrutinizerData.data.permissions : '',
    isLoad: state.scrutinizers.deleteScrutinizerLoader,
    showMessage: state.scrutinizers.showMessage,
    alertMessage: state.scrutinizers.alertMessage,
    loader: state.scrutinizers.loader,
    deleteRoleSuccess: state.scrutinizers.deleteScrutinizerSuccess,
    getAllModules: state.rolesData.fetchAllModules ? state.rolesData.fetchAllModules.data : '',
    isLoadingProcessDelete: state.scrutinizers.processRequestLoader,
    showProcessRequestMessage: state.scrutinizers.showProcessRequestMessage,
    alertProcessRequestMessage: state.scrutinizers.alertProcessRequestMessage,
    processRequestSucess: state.scrutinizers.processRequest,
    permissions: state.actions.actionsData ? state.actions.actionsData.actions : []
  };
}
export default connect(
  mapStateToProps,
  {
    showScrutinizerDeleteLoader,
    deleteScrutinizerFromViewPage,
    showScrutinizerLoader,
    fetchIndividualScrutinizer,
    showRoleLoader,
    fetchAllModules,
    removeIndividualScrutinizerData,
    hideScrutinizerMessage,
    hideProcessRequestMessage,
    showProcessRequestLoader,
    scrutinizerProcessRequest
  }
)(View);
