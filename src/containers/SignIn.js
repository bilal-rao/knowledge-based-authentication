

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import IntlMessages from "util/IntlMessages";

// Actions
import * as auAc from "actions/Auth";

// Icons
import LCK from "@material-ui/icons/Lock";

// Components


import Domino from './Dominos/index'
import CardBox from 'components/CardBox';
import SignInComponent from './Dominos/login/index'
import { showDominosLoader, fetchAllDominos, hideDominosMessage } from 'actions/Dominos';
import Loader from "../components/loader/loader";


let isMessageShow = false;


class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      pType: "signin",
      institutionId: 1,
      email: "",
      password: "",
      dominos: [],
      passwordData: [],
      component: 'password'
    };
  }


  componentDidMount() {
    localStorage.clear();
    //Hackhathon
    this.props.showDominosLoader();
    this.props.fetchAllDominos();
  }

  componentDidUpdate() {
    if (this.props.fpScc) {
      NotificationManager.success(
        `We've sent password reset link to your (${
        this.state.email
        }) email address.`
      );
      this.props.history.push("/signin");
    }

    if (this.props.authUser) {
      this.props.history.push(
        !this.props.authUser.force_password_change // temporary (!) condition for change password redirection issue
          ? "change-password"
          : "/app/dashboard/crypto"
      );
    }

    if (this.props.shMsg) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }

    let locArr = window.location.href.split("/").reverse();
    let pType = locArr[0].toLowerCase() === "forgot-password" ? "fp" : "si";
    if (pType !== this.state.pType) {
      this.props.resetAuthSuccessIndicators();
      this.setState({
        pType: pType
      });
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.dominosList !== this.props.dominosList) {
      this.setState({
        dominos: nextProps.dominosList
      })
    }
    if (nextProps.addDominosSuccess !== this.props.addDominosSuccess) {
      this.setState({
        component: nextProps.addDominosSuccess ? 'changePassword' : 'password'
      })
    }
  }

  handlePassCode = (ev) => {
    var tempArr = this.state.passwordData.concat(ev);
    this.setState({
      passwordData: tempArr
    }, () => {
      if (this.state.passwordData.length < 5) {
        localStorage.setItem('passwordData', JSON.stringify(this.state.passwordData))
      }
      else {
        window.alert('A/c to password policy Password length should be equal to 4 ')
      }
    })
  }


  render() {
    const { email, password } = this.state;
    const { shMsg, loader, altMsg } = this.props;
    return (
      <center>
        <div
          className="app-wrapper animated slideInUpTiny animation-duration-3">
          <CardBox>
            <SignInComponent passwordCharacter={this.state.passwordData} />
          </CardBox>
          <CardBox>
            <div className="col-12">
              <div className="row">
                {this.state.dominos.map((data, index) => {
                  if (10 === index + 1) {
                    return (
                      <div key={index} className="col-12">
                        <center>
                          <Domino passCode={this.handlePassCode} data={data} index={index} />
                        </center>
                      </div>
                    )
                  }
                  else {
                    return (
                      <div key={index} className="col-4">
                        <Domino passCode={this.handlePassCode} data={data} index={index} />
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </CardBox>
        </div>
        {this.props.loader && <Loader />}
        {this.props.addDominosLogInSuccess &&  NotificationManager.success("You have Successfully Login!") }
        {
          this.props.showMessage && NotificationManager.error("Un Authorized")
        }
      </center>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.auth.authUser ? state.auth.authUser.data : "",
    loader: state.dominosData.loader,
    alertMessage: state.dominosData.alertMessage,
    showMessage: state.dominosData.showMessage,
    dominosList: state.dominosData.dominosList ? state.dominosData.dominosList.data : [],
    addDominosSuccess: state.dominosData.addDominosSuccess,
    addDominosLogInSuccess: state.dominosData.addDominosLogInSuccess
  };
}

export default connect(
  mapStateToProps,
  {
    ...auAc,
    showDominosLoader,
    fetchAllDominos,
    hideDominosMessage
  }
)(SignIn);
