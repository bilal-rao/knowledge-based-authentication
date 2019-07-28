import React from "react";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import { Card, CardBody, CardHeader } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import compose from "recompose/compose";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Badge } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";

// Configs
import scrutinizerActions from "../../../../../../../../../config/scrutinizerActions";
import permissions from "../../../../../../../../../config/permissions";

// Actions
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as pdAc from "actions/Product";
import * as mdAc from "actions/Module";

// Icons
import CHK from "@material-ui/icons/CheckCircle";

// Steps
import BasicInformation from "./stepper/basicInformation";
import Stages from "./stepper/stages";
import Deduping from "./stepper/deduping";
import ConditionPolicies from "./stepper/conditionPolicies";
import Discrepencies from "./stepper/discrepencies";
import DocumentRequirements from "./stepper/documentRequirements";
import ScoringWeightages from "./stepper/scoringWeightages";
import ScoringCard from "./stepper/scoringCard";
import Spread from "./stepper/spread";
import ProcessingFees from "./stepper/processingFees";

// Components
import Loader from "../../../../../../../../../components/loader/loader";
import Trail from "./../../../../../../../../../components/customComponents/trail/index";
import Comparison from "./../../../../../../../../../components/customComponents/trail/comparison";
import Actions from "./../../../../../../../../../components/customComponents/makerCheckerActions/index";
import MCConfirmation from "./../../../../../../../../../components/customComponents/makerCheckerConfirmation/index";

let isMessageShow = false;

class AddEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: null,
      sId: null,
      mode: "add",
      isPending: false,
      steps: [
        // status: 0 (InComplete), status: 1 (Complete)
        {
          id: "code",
          displayName: "Basic Information",
          status: 0
        },
        {
          id: "stages",
          displayName: "Stages",
          status: 0
        },
        {
          id: "dedupings",
          displayName: "Dedupings",
          status: 0
        },
        {
          id: "policies",
          displayName: "Condtion / Policies",
          status: 0
        },
        {
          id: "discrepancies",
          displayName: "Discrepancies",
          status: 0
        },
        {
          id: "documentRequirements",
          displayName: "Documents",
          status: 0
        },
        {
          id: "scoringWeightages",
          displayName: "Scoring Weightages",
          status: 0
        },
        {
          id: "scoringCard",
          displayName: "Score Cards",
          status: 0
        },
        {
          id: "spread",
          displayName: "Spread",
          status: 0
        },
        {
          id: "processingFees",
          displayName: "Processing Fees",
          status: 0
        }
      ],
      activeStep: localStorage.getItem("maxStep")
        ? Number(localStorage.getItem("maxStep"))
        : 0,
      maxStep: localStorage.getItem("maxStep")
        ? Number(localStorage.getItem("maxStep"))
        : 0,
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
      ts: 0
    };
  }

  componentDidMount() {
    this.props.resetProductSuccessIndicators();
    let location = window.location.href;
    let mode =
      location.split("/").reverse()[0] === "add"
        ? "add"
        : location.split("/").reverse()[1];
    let pId = mode === "add" ? null : location.split("/").reverse()[0];

    if (location.split("/").reverse()[2] === "pending") {
      this.setState({
        isPending: true
      });
    }

    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    this.setState(
      {
        pId: pId ? pId : localStorage.getItem("pId"),
        sId: localStorage.getItem("sId"),
        mode: mode
      },
      () => {
        if (this.state.mode !== "add") {
          localStorage.setItem("maxStep", 9);
          this.setState({
            activeStep: 0,
            maxStep: 9
          });

          setTimeout(() => {
            document
              .getElementsByClassName("customTabs")[0]
              .getElementsByTagName("button")[0]
              .click();
          }, 1000);
        }
      }
    );
  }

  parent = element => {
    element.modules.map(el => {
      if (el.modules.length) {
        this.parent(el);
      } else {
        this.children(el);
      }
    });
  };

  children = element => {
    if (
      element.route +
        "/" +
        this.state.mode +
        (this.state.mode !== "add"
          ? this.state.isPending
            ? "/" + this.state.sId
            : "/" + this.state.pId
          : "") ===
      this.props.history.location.pathname
    ) {
      this.props.fetchAction(element);
      this.setState({
        permissions: element
      });
      if (element.actions) {
        element.actions.map(data => {
          if (data.actionId === permissions.Add) {
            data.isSelected
              ? this.setState({ add: true })
              : this.setState({ add: false });
          } else if (data.actionId === permissions.Update) {
            data.isSelected
              ? this.setState({ update: true })
              : this.setState({ update: false });
          } else if (data.actionId === permissions.Delete) {
            data.isSelected
              ? this.setState({ delete: true })
              : this.setState({ delete: false });
          } else if (data.actionId === permissions.View) {
            data.isSelected
              ? this.setState({ view: true })
              : this.setState({ view: false });
          } else if (data.actionId === permissions.Maker) {
            data.isSelected
              ? this.setState({ maker: true })
              : this.setState({ maker: false });
          } else if (data.actionId === permissions.Checker) {
            data.isSelected
              ? this.setState({ checker: true })
              : this.setState({ checker: false });
          }
        });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isModules) {
      nextProps.isModules.modules.map(element => {
        if (element.modules.length) {
          this.parent(element);
        } else {
          this.children(element);
        }
      });
    }

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      if (nextProps.isd.data && nextProps.isd.data !== this.props.isd.data) {
        this.setState({
          sStatus: nextProps.isd.data.status,
          sAction: nextProps.isd.data.action,
          sUserId: nextProps.isd.data.userId
        });
      }
      this.mapDataFromPropsToState(
        nextProps.isd.data ? nextProps.isd.data.payload : "",
        this.props.isd.data ? this.props.isd.data.payload : ""
      );
    } else {
      this.mapDataFromPropsToState(
        nextProps.ipd.data ? nextProps.ipd.data : "",
        this.props.ipd.data ? this.props.ipd.data : ""
      );
    }

    if (nextProps.shMsg && !isMessageShow) {
      isMessageShow = true;
      if (nextProps.adProSc)
        NotificationManager.success("Product added successfully.");
      if (nextProps.edProSc)
        NotificationManager.success("Product updated successfully.");
      if (!nextProps.adProSc && !nextProps.adProSc && nextProps.altMsg)
        NotificationManager.error(nextProps.altMsg);
      setTimeout(() => {
        this.props.hideProductMessage();
        isMessageShow = false;
      }, 1000);
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

  mapDataFromPropsToState = (npI, pI) => {
    if ((this.state.sId || this.state.pId) && !npI)
      setTimeout(() => {
        this.fetchProduct();
      }, 125);
    if (npI && npI !== pI) {
      this.setState(
        {
          product: npI
        },
        () => {
          this.updateTabStatus();
        }
      );
    }
  };

  fetchProduct = () => {
    if (this.props.isMakerCheckerEnabled === "") return;
    if (
      Number(moment().format("YYYYMMDDHHmmss")) - this.state.ts < 1 &&
      this.state.ts !== 0
    )
      return;
    this.setState({
      ts: Number(moment().format("YYYYMMDDHHmmss"))
    });

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      this.props.showScrutinizerLoader();
      this.props.fetchIndividualScrutinizer({ id: this.state.sId });
    } else {
      if (this.state.pId) {
        this.props.showProductLoader();
        this.props.fetchIndividualProduct({ productId: this.state.pId });
      }
    }
  };

  updateTabStatus = () => {
    let progress = 0;
    this.state.steps.forEach(step => {
      if (
        !this.state.product[step.id] ||
        this.state.product[step.id].length === 0
      ) {
        step.status = 0;
      } else {
        progress++;
        step.status = 1;
      }
    });
    this.setState({ progress }, () => {
      this.setState({
        progessPercentage: ((this.state.progress / 10) * 100).toFixed(0),
        render: this.state.render + 1
      });
    });
  };

  updateProductState = (tab, action) => {
    if (tab === 1) {
      this.setState({
        pId: localStorage.getItem("pId"),
        sId: localStorage.getItem("sId")
      });
    } else {
      this.fetchProduct();
    }

    if (this.state.maxStep === 9) {
      this.setState({
        render: this.state.render + 1,
        activeStep: action === "change" ? tab : this.state.activeStep
      });
    } else {
      localStorage.setItem("maxStep", tab);
      this.setState({
        render: this.state.render + 1,
        activeStep: action === "change" ? tab : this.state.activeStep,
        maxStep: tab
      });
    }
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <BasicInformation
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 1:
        return (
          <Stages
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 2:
        return (
          <Deduping
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 3:
        return (
          <ConditionPolicies
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 4:
        return (
          <Discrepencies
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 5:
        return (
          <DocumentRequirements
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 6:
        return (
          <ScoringWeightages
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 7:
        return (
          <ScoringCard
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 8:
        return (
          <Spread
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      case 9:
        return (
          <ProcessingFees
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
      default:
        return (
          <BasicInformation
            ups={this.updateProductState}
            fp={this.fetchProduct}
            isPending={this.state.isPending}
            mode={this.state.mode}
          />
        );
    }
  };

  onChangeTab = (e, v) => {
    this.setState({ activeStep: v });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRequest = () => {
    const obj = {
      id: this.state.sId,
      moduleCode: "PPRD",
      pageNumber: 1,
      pageSize: 10,
      action: this.state.action,
      comments: this.state.comments,
      request: this.state.request
    };
    this.props.showProcessRequestLoader();
    this.props.scrutinizerProcessRequest(obj);
  };

  onDeleteRequest = () => {
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.state.isPending
    ) {
      if (!window.confirm("Are you sure you want to DELETE this request?"))
        return;
      this.props.showScrutinizerDeleteLoader();
      this.props.deleteScrutinizer({
        id: this.state.sId,
        pageNumber: 1,
        pageSize: 10,
        moduleCode: "PPRD"
      });
    } else {
      if (!window.confirm("Are you sure you want to DELETE this product?"))
        return;
      this.props.showProductDeleteLoader();
      this.props.deleteProduct({
        id: this.state.pId,
        pageNumber: 1,
        pageSize: 10
      });
    }
  };

  onMCActions = type => {
    if (type === "com") {
      this.setState({
        isCompareModalOpen: true
      });
    } else if (type === "sfa") {
      this.setState({
        isConfirmation: true,
        action: 1,
        request: "sfa"
      });
    } else if (type === "review") {
      this.setState({
        isConfirmation: true,
        action: 5,
        request: "review"
      });
    } else if (type === "approve") {
      this.setState({
        isConfirmation: true,
        action: 2,
        request: "approve"
      });
    } else if (type === "reject") {
      this.setState({
        isConfirmation: true,
        action: 3,
        request: "reject"
      });
    } else if (type === "delete") {
      this.onDeleteRequest();
    }
  };

  onCloseModal = () => {
    this.setState({
      isCompareModalOpen: false
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isPending ? (
          this.props.isTrail ? (
            <React.Fragment>
              <Trail />
              <br />
            </React.Fragment>
          ) : null
        ) : null}
        <Card>
          <CardHeader className="bg-white text-black">
            {
              <IntlMessages
                id={
                  this.state.mode === "add"
                    ? "sidebar.product.add"
                    : this.state.mode === "edit"
                    ? "sidebar.product.edit"
                    : "sidebar.product.view"
                }
              />
            }
            &nbsp;&nbsp;
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
                Product Progress{" "}
                <span>| {this.state.progress} Steps Completed</span>
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
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.activeStep}
                onChange={this.onChangeTab}
                className="customTabs"
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
              >
                {this.state.render
                  ? this.state.steps.map((step, index) => {
                      return (
                        <Tab
                          key={step.id}
                          label={step.displayName}
                          icon={<CHK />}
                          className={
                            (index === 9 &&
                              this.state.maxStep === 9 &&
                              index !== this.state.activeStep &&
                              step.status === 1) ||
                            (index < this.state.maxStep &&
                              index !== this.state.activeStep &&
                              step.status === 1)
                              ? "text-green"
                              : ""
                          }
                          disabled={index > this.state.maxStep}
                        />
                      );
                    })
                  : null}
              </Tabs>
            </AppBar>
            <Paper className="m-t-20 p-20">
              {this.getStepContent(this.state.activeStep)}
              {this.props.loader && <Loader />}
            </Paper>
          </CardBody>
        </Card>

        {this.state.mode !== "add" ? (
          <Actions
            onClk={this.onMCActions}
            sId={this.state.sId}
            eId={this.state.pId}
            mode={this.state.mode}
            history={this.props.history}
            path={`product-management/products`}
            maker={this.state.maker}
            checker={this.state.checker}
            status={this.state.status}
            sStatus={this.state.sStatus}
            sUserId={this.state.sUserId}
            isModules={this.props.isModules}
            isPending={this.state.isPending}
            isTrail={this.props.isTrail}
            sAction={this.state.sAction}
            sAdded={scrutinizerActions.Added}
          />
        ) : null}

        {this.state.isConfirmation ? (
          <MCConfirmation
            request={this.state.request}
            comments={this.state.comments}
            action={this.state.action}
            request={this.state.request}
            hc={this.handleChange}
            hr={this.handleRequest}
            cl={() => {
              this.setState({
                isConfirmation: false,
                request: ""
              });
            }}
          />
        ) : null}

        {this.state.isCompareModalOpen ? (
          <Comparison
            data={this.props.isd ? this.props.isd.data : {}}
            onCloseModal={this.onCloseModal}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : "",
    getAllProducts: state.productsData.allProducts
      ? state.productsData.allProducts.data.items
      : "",
    ipd: state.productsData.individualProductData
      ? state.productsData.individualProductData
      : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    isTrail: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData.data.trail
        ? state.scrutinizers.individualScrutinizerData.data.trail.length > 0
        : false
      : false,
    adProSc: state.productsData.addProductSuccess,
    edProSc: state.productsData.editProductSuccess,
    dlScuSc: state.scrutinizers.deleteScrutinizerSuccess,
    prRqSc: state.scrutinizers.processRequest,
    dlProSc: state.productsData.deleteProductSuccess,
    shMsg: state.productsData.showMessage,
    altMsg: state.productsData.alertMessage,
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
