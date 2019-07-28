import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { Redirect, Route, Switch } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import { Card, CardBody, CardHeader } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Badge } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";

// Configs
import permissions from "config/permissions.js";
import scrutinizerActions from "config/scrutinizerActions";

// Actions
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as pdAc from "actions/Product";
import * as mdAc from "actions/Module";

// Icons
import CHK from "@material-ui/icons/CheckCircle";

// Stages
import ApplicationForm from "./stages/ApplicationForm";

// Components
import Navigation from "./innerNavigation.js";
import Loader from "components/loader/loader.js";

let isMessageShow = false;
var wh = Math.floor(window.innerHeight / 1.3);

class AddEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: null,
      sId: null,
      mode: "add",
      as: "step1",
      ag: "initialize",
      loading: false,
      progress: 0,
      progessPercentage: 0,
      render: 1,
      isConfirmation: false,
      isCompareModalOpen: false,
      request: "",
      comments: "",
      action: null,
      maker: false,
      checker: false,
      sStatus: null,
      sUserId: null,
      product: null,
      filteredFields: []
    };
  }

  componentDidMount() {
    this.props.resetProductSuccessIndicators();
    let location = window.location.href;
    let mode =
      location.split("/").reverse()[2] === "add"
        ? "add"
        : location.split("/").reverse()[3];
    let as =
      mode === "add"
        ? location.split("/").reverse()[1]
        : location.split("/").reverse()[2];
    let ag =
      mode === "add"
        ? location.split("/").reverse()[0]
        : location.split("/").reverse()[1];
    let pId = mode === "add" ? null : location.split("/").reverse()[0];

    if (location.split("/").reverse()[3] === "pending") {
      this.setState({
        isPending: true
      });
    }

    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    this.setState({
      pId: pId ? pId : localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      mode: mode,
      as: as,
      ag: ag
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.product !== nextProps.proL[0]) {
      this.setState(
        {
          product: nextProps.proL[0]
        },
        this.filterStagesFields
      );
    }
  }

  componentDidUpdate() {
    if (this.props.dlScuSc) {
      NotificationManager.success("Product has been deleted!");
      this.props.history.push("/app/product-management/products/pending");
    }
    if (this.props.dlProSc) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.state.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/product-management/products/pending");
      } else {
        NotificationManager.success("Product has been deleted!");
      }
    }
    if (this.props.prRqSc) {
      this.props.history.push("/app/product-management/products/pending");
    }
    if (this.props.shPrRqMsg) {
      setTimeout(() => {
        this.props.hideProcessRequestMessage();
      }, 100);
    }
    if (this.props.shMsg) {
      setTimeout(() => {
        this.props.hideScrutinizerMessage();
      }, 100);
    }
  }

  filterStagesFields = () => {
    var stage = this.state.as ? Number(this.state.as.replace("step", "")) : 1;
    var group = this.state.ag
      ? this.state.ag.replace("-", " ")
      : "initialize application";
    var stagesList = this.state.product ? this.state.product.stages : "";
    var cStage = stagesList ? stagesList[stage - 1] : "";
    var fieldsList = cStage ? cStage.fields : "";
    var filteredFields = [];

    if (fieldsList) {
      for (var fld = 0; fld < fieldsList.length; fld++) {
        if (
          group === String(fieldsList[fld].group).toLowerCase() ||
          group === String(fieldsList[fld].subgroup).toLowerCase()
        ) {
          filteredFields.push(fieldsList[fld]);
        }
      }

      this.setState({
        filteredFields: filteredFields
      });
    } else {
      this.setState({
        filteredFields: []
      });
    }
  };

  getStepContent = () => {
    var stage = this.state.as;
    switch (stage) {
      case stage === "step1":
        return (
          <ApplicationForm
            fields={this.state.filteredFields}
            as={this.state.as}
            ag={this.state.ag}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      default:
        return (
          <ApplicationForm
            fields={this.state.filteredFields}
            as={this.state.as}
            ag={this.state.ag}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="inner-nav-container" style={{ minHeight: `${wh}px` }}>
          <Card className="inner-nav p-0">
            <CardHeader className="bg-white text-black">Stages</CardHeader>
            <CardBody className="p-0">
              <Navigation mode={this.state.mode} />
            </CardBody>
          </Card>
          <Card className="inner-content">
            <CardHeader className="bg-white text-black">
              {this.state.mode === "add"
                ? `Add`
                : this.state.mode === "edit"
                ? `Edit`
                : `View`}
              &nbsp;Application &nbsp;&nbsp;
              {/* &nbsp;Application ({this.state.ag}) &nbsp;&nbsp; */}
              {this.state.product ? (
                <span>
                  {this.state.sStatus === null ? (
                    this.state.product.scrutinizerStatus === 0 ? (
                      <Badge color="info">Draft</Badge>
                    ) : null
                  ) : this.state.sStatus === 0 ? (
                    <Badge color="info">Draft</Badge>
                  ) : this.state.sStatus === 1 ? (
                    <Badge color="primary">Send For Authorization</Badge>
                  ) : this.state.sStatus === 2 ? (
                    <Badge color="success">Approved</Badge>
                  ) : (
                    <Badge color="danger">Rejected</Badge>
                  )}
                </span>
              ) : null}
              <div className="productProgress">
                <div>
                  Application Progress&nbsp;
                  <span>| {this.state.progress} % Completed</span>
                </div>
                <div>
                  <LinearProgress
                    variant="determinate"
                    value={Number(this.state.progessPercentage)}
                    className={
                      this.state.progessPercentage === 100
                        ? "pro-state-04"
                        : this.state.progessPercentage >= 50 &&
                          this.state.progessPercentage < 100
                        ? "pro-state-03"
                        : this.state.progessPercentage >= 30 &&
                          this.state.progessPercentage < 50
                        ? "pro-state-02"
                        : this.state.progessPercentage >= 1 &&
                          this.state.progessPercentage < 30
                        ? "pro-state-01"
                        : "pro-state-00"
                    }
                  />
                </div>
                <label>{this.state.progessPercentage}%</label>
              </div>
            </CardHeader>
            <CardBody>
              {this.getStepContent()}
              {this.props.loader && <Loader />}
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    moduleData: state.modules.moduleData,
    isModules: state.modules.moduleData.data,
    adProSc: state.productsData.addProductSuccess,
    edProSc: state.productsData.editProductSuccess,
    dlScuSc: state.scrutinizers.deleteScrutinizerSuccess,
    prRqSc: state.scrutinizers.processRequest,
    dlProSc: state.productsData.deleteProductSuccess,
    shMsg: state.productsData.showMessage,
    altMsg: state.productsData.alertMessage,
    proL: state.productsData.productsList
      ? state.productsData.productsList.data.items
      : "",
    shPrRqMsg: state.scrutinizers.showProcessRequestMessage,
    loader: state.scrutinizers.loader
      ? state.scrutinizers.loader
      : state.productsData.loader
  };
}

export default compose(
  connect(
    mapStateToProps,
    {
      ...scAc,
      ...acAc,
      ...pdAc,
      ...mdAc
    }
  )
)(AddEditView);
