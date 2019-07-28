import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import { Card, CardBody } from "reactstrap";
import Slider from "react-slick";
import Typography from "@material-ui/core/Typography";
import { Badge } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Actions
import * as usAc from "actions/Employee";
import * as scAc from "actions/Scrutinizer";
import * as acAc from "actions/Action";
import * as mdAc from "actions/Module";

// Icons
import ARW from "@material-ui/icons/ArrowForwardIos";

// Helper Components
import Loader from "./../../../components/loader/loader";

const options = {
  dots: true,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  marginRight: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};

class Trail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sId: null,
      users: "",
      cData: {},
      trail: "",
      maker: false,
      checker: false,
      isModalOpen: false,
      expanded: false,
      status: [
        {
          icon: "zmdi-edit",
          color: "bg-blue",
          title: "Draft",
          code: 0
        },
        {
          icon: "zmdi-rotate-ccw",
          color: "bg-indigo",
          title: "Sent For Approval",
          code: 1
        },
        {
          icon: "zmdi-check",
          color: "bg-success",
          title: "Approve",
          code: 2
        },
        {
          icon: "zmdi-close",
          color: "bg-deep-orange",
          title: "Reject",
          code: 3
        },
        {
          icon: "zmdi-search",
          color: "bg-teal",
          title: "Sent For Review",
          code: 5
        }
      ]
    };
  }

  componentDidMount() {
    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    this.props.showUserMainPageLoader();
    this.props.fetchUser({
      pageNumber: 1,
      pageSize: 10
    });

    this.setState(
      {
        sId: localStorage.getItem("sId")
      },
      () => {
        this.props.showScrutinizerLoader();
        this.props.fetchIndividualScrutinizer({ id: this.state.sId });
      }
    );
  }

  componentDidUpdate() {
    if (this.props.shMsg) {
      setTimeout(() => {
        this.props.hideScrutinizerMessage();
      }, 100);
    } else if (this.props.showMainPageMessage) {
      if (
        this.props.alertMainPageMessage ===
        "Request failed with status code 404"
      ) {
        this.props.history.push("/app/extra-pages/error-400");
      } else {
        this.props.history.push("/app/extra-pages/error-500");
      }
      setTimeout(() => {
        this.props.hideScrutinizerMainPageMessage();
      }, 100);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isd.data && nextProps.isd.data !== this.props.isd.data) {
      this.setState({
        trail: nextProps.isd.data.trail,
        cData: nextProps.isd.data.payload,
        operation: nextProps.isd.data.action
      });
    }
    if (nextProps.usr.data && nextProps.usr.data !== this.props.usr.data) {
      this.setState({
        users: nextProps.usr.data.items
      });
    }
  }

  onClickCompare = () => {};

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  filterUsername = id => {
    let user = this.state.users.find(usr => usr.userId === id);
    return user.name;
  };

  filterStatus = (action, param) => {
    let status = this.state.status.find(st => st.code === action);
    return status[param];
  };

  render() {
    const { shMsg, altMsg, loader, isModules } = this.props;
    return (
      <Paper className="trail-container">
        <ExpansionPanel
          expanded={this.state.expanded}
          onChange={() => {
            this.setState({ expanded: !this.state.expanded });
          }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className="title">
              <Typography type="title">
                Trail &nbsp;&nbsp;
                {this.state.operation === 0 ? (
                  <Badge color="primary">Add Operation</Badge>
                ) : this.state.operation === 1 ? (
                  <Badge color="info">Edit Operation</Badge>
                ) : this.state.operation === 2 ? (
                  <Badge color="danger">Delete Operation</Badge>
                ) : (
                  <Badge color="light">Loading...</Badge>
                )}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Card className="m-0">
              <CardBody>
                <Slider
                  className="slick-app-frame"
                  {...options}
                >
                  {this.state.users && this.state.trail
                    ? this.state.trail.map((tr, i) => {
                        return (
                          <div key={i} className="slick-slide-item trail-box">
                            <div className="jr-card p-15">
                              <div className="media">
                                <div className="media-body">
                                  <span
                                    className={`badge ${this.filterStatus(
                                      tr.activity,
                                      "color"
                                    )} text-white`}
                                  >
                                    {this.filterStatus(tr.activity, "title")}
                                  </span>
                                  <p className="mb-0">
                                    <i className="zmdi zmdi-account-o" />{" "}
                                    {this.filterUsername(
                                      tr.authorization
                                        ? tr.authorization.userId
                                        : tr.ownership
                                    )}
                                  </p>
                                  <span className="meta-date meta-date-light">
                                    <i className="zmdi zmdi-calendar-alt" />{" "}
                                    {moment(tr.creationDateTime).format(
                                      "DD MM YYYY hh:mm:ss A"
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="comments-box">
                                <h4>Comments</h4>
                                <p>{tr.comments ? tr.comments : "N/A"}</p>
                              </div>
                            </div>
                            {this.state.trail.length !== i + 1 ? (
                              <div className="arrow-box">
                                <ARW />
                              </div>
                            ) : null}
                          </div>
                        );
                      })
                    : null}
                </Slider>
              </CardBody>
              {loader && <Loader />}
              {shMsg && NotificationManager.error(altMsg)}
              {altMsg && NotificationManager.error(altMsg)}
            </Card>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    usr: state.usersData.usersList ? state.usersData.usersList : "",
    isd: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : "",
    isModules: state.modules.moduleData.data,
    shMsg: state.scrutinizers.showMessage,
    altMsg: state.scrutinizers.alertMessage,
    loader: state.scrutinizers.loader
      ? state.scrutinizers.loader
      : state.usersData.loader
  };
}

export default connect(
  mapStateToProps,
  {
    ...usAc,
    ...scAc,
    ...acAc,
    ...mdAc
  }
)(Trail);
