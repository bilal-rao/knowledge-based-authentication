import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { FormHelperText } from "@material-ui/core";

// Actions
import * as auAc from "actions/Auth";
import * as usAc from "actions/Employee";

// Icons
import IconButton from "@material-ui/core/IconButton";
import RST from "@material-ui/icons/HowToReg";
import SRT from "@material-ui/icons/Security";
import VION from "@material-ui/icons/Visibility";
import VIOF from "@material-ui/icons/VisibilityOff";

// Components
import Loader from "components/loader/loader.js";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      insId: "",
      cpTyp: "",
      code: "",
      shp1: false,
      shp2: false,
      password: "",
      cpassword: "",
      policies: {},
      error: false
    };
  }

  componentDidMount() {
    // localStorage.clear();

    let locArr = window.location.href.split("/").reverse();
    let token = locArr[0];
    let insId = locArr[1];
    let cpTyp = locArr[2];

    if (
      cpTyp.toLowerCase() === "activation" ||
      cpTyp.toLowerCase() === "reset-password"
    ) {
      this.props.resetUserSuccessIndicators();
      this.setState(
        {
          token: token,
          insId: insId,
          cpTyp: cpTyp
        },
        () => {
          this.props.showAuthLoader();
          this.props.fetchActivationInfo({
            code: this.state.token,
            institutionId: this.state.insId
          });
        }
      );
    } else if (token.toLowerCase() === "change-password") {
      this.props.resetAuthSuccessIndicators();
      this.props.resetUserSuccessIndicators();
      this.setState({
        cpTyp: token,
        code: true
      });
    } else {
      NotificationManager.error("Invalid URL");
      this.props.history.push("/signin");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activationInfo !== this.props.activationInfo)
      this.setState(
        {
          policies: nextProps.activationInfo.passwordPolicy,
          code: nextProps.activationInfo.code
        },
        this.validatePassword
      );
  }

  componentDidUpdate() {
    if (this.props.cpWLScc && this.state.code) {
      NotificationManager.success(
        `${
          this.state.cpTyp === "activation"
            ? "You've successfully activate your account,"
            : "You've successfully reset your password"
        } , now you can login with your new credentials.`
      );
      this.props.history.push("/signin");
    }
    if (this.props.cpScc && this.state.code) {
      NotificationManager.success(
        "Your password has been changed successfully."
      );
      this.props.history.push("/app/dashboard/crypto");
    }
    if (this.props.shMsg) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
  }

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]:
        e.nativeEvent.data === " "
          ? e.target.value.replace(/ /g, "")
          : e.target.value
    });
  };

  showHidePassword = elm => {
    if (elm === "password") {
      this.setState({ shp1: !this.state.shp1 });
    } else {
      this.setState({ shp2: !this.state.shp2 });
    }
  };

  validatePassword = () => {
    if (this.state.password && this.state.cpassword) {
      if (this.state.password !== this.state.cpassword) {
        this.setState({
          error: {
            password: "",
            cpassword: "Password mismatched"
          }
        });
      } else if (
        this.state.password.length < this.state.policies.minimumLength
      ) {
        this.setState({
          error: {
            password: `Password must be greater than or equal to ${
              this.state.policies.minimumLength
            }`,
            cpassword: ""
          }
        });
      } else if (
        this.state.cpassword.length < this.state.policies.minimumLength
      ) {
        this.setState({
          error: {
            password: "",
            cpassword: `Password must be greater than or equal to ${
              this.state.policies.minimumLength
            }`
          }
        });
      } else if (
        this.state.password.length > this.state.policies.maximumLength
      ) {
        this.setState({
          error: {
            password: `Password must be less than or equal to ${
              this.state.policies.maximumLength
            }`,
            cpassword: ""
          }
        });
      } else if (
        this.state.cpassword.length > this.state.policies.maximumLength
      ) {
        this.setState({
          error: {
            password: "",
            cpassword: `Password must be less than or equal to ${
              this.state.policies.maximumLength
            }`
          }
        });
      } else {
        this.setState({
          error: false
        });
      }
    } else {
      this.setState({
        error: false
      });
    }
  };

  resetPassword = () => {
    if (this.state.cpTyp === "change-password") {
      this.props.showUserLoader();
      this.props.changePassword({
        id: localStorage.getItem("user_id"),
        password: this.state.password
      });
    } else {
      this.props.showAuthLoader();
      this.props.changePasswordWL({
        code: this.state.code,
        password: this.state.password
      });
    }
  };

  render() {
    const { shMsg, loader, altMsg } = this.props;
    return (
      <React.Fragment>
        <div className="bg-image" />
        <div className="bg-overlay" />
        <div className="app-wrapper reset-password h-100">
          <div className="login-container d-flex justify-content-center align-items-center slideInUpTiny">
            <div className="login-content">
              {this.state.cpTyp === "activation" ? (
                <div className="login-header m-b-15">
                  <div className="iconBox bg-primary">
                    <RST fontSize="large" />
                  </div>
                  <h3>Activation</h3>
                </div>
              ) : this.state.cpTyp === "reset-password" ? (
                <div className="login-header m-b-15">
                  <div className="iconBox bg-primary">
                    <SRT fontSize="large" />
                  </div>
                  <h3>Reset Password</h3>
                </div>
              ) : (
                <div className="login-header m-b-15">
                  <div className="iconBox bg-primary">
                    <SRT fontSize="large" />
                  </div>
                  <h3>Change Password</h3>
                </div>
              )}
              <div className="login-form">
                <fieldset>
                  <FormControl className="passCon" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type={this.state.shp1 ? "text" : "password"}
                      value={this.state.password}
                      onBlur={this.validatePassword}
                      onChange={this.handleChange}
                      autoComplete="off"
                      disabled={!this.state.code}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            name=""
                            disabled={!this.state.password || !this.state.code}
                            onClick={() => {
                              this.showHidePassword("password");
                            }}
                          >
                            {this.state.shp1 ? <VION /> : <VIOF />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {this.state.error.password ? (
                      <FormHelperText className="text-red">
                        {this.state.error.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl className="passCon" fullWidth>
                    <InputLabel htmlFor="cpassword">
                      Confirm Password
                    </InputLabel>
                    <Input
                      name="cpassword"
                      type={this.state.shp2 ? "text" : "password"}
                      value={this.state.cpassword}
                      onBlur={this.validatePassword}
                      onChange={this.handleChange}
                      autoComplete="off"
                      disabled={!this.state.code}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            name=""
                            disabled={!this.state.cpassword || !this.state.code}
                            onClick={() => {
                              this.showHidePassword("cpassword");
                            }}
                          >
                            {this.state.shp2 ? <VION /> : <VIOF />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {this.state.error.cpassword ? (
                      <FormHelperText className="text-red">
                        {this.state.error.cpassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <div className="m-t-10">
                    <Button
                      name="submit"
                      color="primary"
                      variant="contained"
                      style={{
                        float: "right"
                      }}
                      onClick={() => {
                        this.resetPassword();
                      }}
                      disabled={
                        !this.state.code ||
                        !this.state.password ||
                        !this.state.cpassword ||
                        Boolean(this.state.error)
                      }
                      className="text-white right"
                    >
                      {this.state.cpTyp === "activation"
                        ? "Activate"
                        : "Submit"}
                    </Button>
                    <Button
                      name="cancel"
                      variant="contained"
                      className="bg-white text-black"
                      style={{
                        float: "right",
                        marginRight: "10px"
                      }}
                      onClick={() => {
                        this.props.resetAuthSuccessIndicators();
                        this.props.history.push("/signin");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </fieldset>
              </div>
            </div>
            {shMsg && NotificationManager.error(altMsg)}
            <NotificationContainer />
          </div>
        </div>
        {loader && <Loader />}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.auth.authUser,
    activationInfo: state.auth.activationInfo
      ? state.auth.activationInfo.data
      : "",
    loader: state.auth.loader ? state.auth.loader : state.usersData.loader,
    altMsg: state.auth.alertMessage,
    shMsg: state.auth.showMessage,
    acInScc: state.auth.activationInfoSuccess,
    cpWLScc: state.auth.changePasswordWLSuccess,
    cpScc: state.usersData.changePasswordSuccess
  };
}

export default connect(
  mapStateToProps,
  {
    ...auAc,
    ...usAc
  }
)(SignIn);
