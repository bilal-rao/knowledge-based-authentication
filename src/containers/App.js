import React, { Component } from "react";
import { Query, Builder, Preview, Utils } from "react-awesome-query-builder";
import { Widgets, Operators } from "react-awesome-query-builder";
import "antd/dist/antd.css";
import "assets/vendors/style";
import "react-big-calendar/lib/less/styles.less";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
//when uncomment this file styles behave madly
import "styles/bootstrap.scss";
import "styles/app.scss";
import "styles/custom.scss";
import "styles/app-rtl.scss";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import indigoTheme from "./themes/indigoTheme";
import cyanTheme from "./themes/cyanTheme";
import orangeTheme from "./themes/orangeTheme";
import amberTheme from "./themes/amberTheme";
import pinkTheme from "./themes/pinkTheme";
import blueTheme from "./themes/blueTheme";
import purpleTheme from "./themes/purpleTheme";
import greenTheme from "./themes/greenTheme";
import darkTheme from "./themes/darkTheme";
import AppLocale from "../lngProvider";
import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK
} from "constants/ThemeColors";

import { setInitUrl } from "../actions/Auth";
import RTL from "util/RTL";
import asyncComponent from "util/asyncComponent";
import IdleTimer from "react-idle-timer";
import { userSignOut } from "actions/Auth";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

// Components
import MainApp from "app/index";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";

// // Start ----  AntDesign modules for isolate styling

const {
  TextWidget,
  SliderWidget,
  RangeWidget,
  NumberWidget,
  SelectWidget,
  MultiSelectWidget,
  DateWidget,
  BooleanWidget,
  TimeWidget,
  DateTimeWidget,
  ValueFieldWidget
} = Widgets;
const { ProximityOperator } = Operators;
const { queryBuilderFormat, queryString, mongodbFormat } = Utils;

export {
  TextWidget,
  SliderWidget,
  RangeWidget,
  NumberWidget,
  SelectWidget,
  MultiSelectWidget,
  DateWidget,
  BooleanWidget,
  TimeWidget,
  DateTimeWidget,
  ValueFieldWidget,
  ProximityOperator,
  queryBuilderFormat,
  queryString,
  mongodbFormat,
  Query,
  Builder,
  Preview
};
// //End ---- AntDesign modules for isolate styling

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }

  _onAction(e) {
    // console.log('user did something', e)
  }

  _onActive(e) {
    // console.log('user is active', e)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    if (this.props.location.pathname !== "/signin") {
      NotificationManager.warning("You will be logged out soon...");
      setTimeout(() => {
        if (this.idleTimer.getRemainingTime() === 0) {
          this.props.userSignOut();
        }
      }, 5000);
    }
    // console.log('user is idle', e)
    // console.log('last active', this.idleTimer.getLastActiveTime())
  }

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  getColorTheme(themeColor, applyTheme) {
    switch (themeColor) {
      case INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      case DARK_INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case DARK_CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case DARK_AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DARK_DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case DARK_PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case DARK_BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DARK_DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case DARK_GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      default:
        createMuiTheme(indigoTheme);
    }
    return applyTheme;
  }

  render() {
    const {
      match,
      location,
      themeColor,
      isDarkTheme,
      locale,
      authUser,
      initURL,
      isDirectionRTL
    } = this.props;
    let applyTheme = createMuiTheme(indigoTheme);
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      applyTheme = createMuiTheme(darkTheme);
    } else {
      applyTheme = this.getColorTheme(themeColor, applyTheme);
    }
    if (location.pathname === "/") {
      if (authUser === null) {
        return <Redirect to={"/signin"} />;
      } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
        return <Redirect to={"/app/dashboard/crypto"} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }
    if (isDirectionRTL) {
      applyTheme.direction = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
      applyTheme.direction = "ltr";
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <IdleTimer
        ref={ref => {
          this.idleTimer = ref;
        }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        onAction={this.onAction}
        debounce={250}
        timeout={1000 * 60 * 30}
      >
        <MuiThemeProvider theme={applyTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <RTL>
                <div className="app-main" style={{overflowY: 'auto'}}>
                  <Switch>
                    <RestrictedRoute
                      path={`${match.url}app`}
                      authUser={authUser}
                      component={MainApp}
                    />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/forgot-password" component={SignIn} />
                    <Route path="/change-password" component={ResetPassword} />
                    <Route
                      path="/activation/:institutionId/:code"
                      component={ResetPassword}
                    />
                    <Route
                      path="/reset-password/:institutionId/:code"
                      component={ResetPassword}
                    />
                    <Route path="/forgot-password" component={ResetPassword} />
                    <Route
                      component={asyncComponent(() =>
                        import("app/routes/extraPages/routes/404")
                      )}
                    />
                  </Switch>
                </div>
              </RTL>
            </IntlProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
        <NotificationContainer />
      </IdleTimer>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const {
    themeColor,
    sideNavColor,
    darkTheme,
    locale,
    isDirectionRTL
  } = settings;
  const { authUser, initURL } = auth;
  return {
    themeColor,
    sideNavColor,
    isDarkTheme: darkTheme,
    locale,
    isDirectionRTL,
    authUser,
    initURL
  };
};

export default connect(
  mapStateToProps,
  { setInitUrl, userSignOut }
)(App);
