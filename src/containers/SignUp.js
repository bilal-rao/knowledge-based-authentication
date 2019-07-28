

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
import SignUp from './Dominos/signUp/index'
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
      dominosUpdated: [],
      passwordData: [],
      confirmPasswordData: [],
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

    if (nextProps.addDominos !== this.props.addDominos) {
      this.setState({
        dominosUpdated: nextProps.addDominos
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
      passwordData: [
        {
          "id": "",
          "position": 0,
          "color": "green",
          "topLeft": "r",
          "topRight": "2",
          "bottomLeft": "*",
          "bottomRight": "{",
          "middleLeft": "q",
          "middleRight": "\b"
        },
        {
          "id": "",
          "position": 1,
          "color": "blue",
          "topLeft": "i",
          "topRight": "^",
          "bottomLeft": "x",
          "bottomRight": "h",
          "middleLeft": "y",
          "middleRight": "1"
        },
        {
          "id": "",
          "position": 2,
          "color": "red",
          "topLeft": "%",
          "topRight": "c",
          "bottomLeft": "7",
          "bottomRight": "j",
          "middleLeft": "-",
          "middleRight": "6"
        },
        {
          "id": "",
          "position": 3,
          "color": "black",
          "topLeft": "$",
          "topRight": "w",
          "bottomLeft": "!",
          "bottomRight": "?",
          "middleLeft": "}",
          "middleRight": "s"
        }
      ]
    }, () => {
      if (this.state.passwordData.length < 5) {
        localStorage.setItem('passwordData', JSON.stringify(
          [
            {
              "id": "",
              "position": 0,
              "color": "green",
              "topLeft": "r",
              "topRight": "2",
              "bottomLeft": "*",
              "bottomRight": "{",
              "middleLeft": "q",
              "middleRight": "\b"
            },
            {
              "id": "",
              "position": 1,
              "color": "blue",
              "topLeft": "i",
              "topRight": "^",
              "bottomLeft": "x",
              "bottomRight": "h",
              "middleLeft": "y",
              "middleRight": "1"
            },
            {
              "id": "",
              "position": 2,
              "color": "red",
              "topLeft": "%",
              "topRight": "c",
              "bottomLeft": "7",
              "bottomRight": "j",
              "middleLeft": "-",
              "middleRight": "6"
            },
            {
              "id": "",
              "position": 3,
              "color": "black",
              "topLeft": "$",
              "topRight": "w",
              "bottomLeft": "!",
              "bottomRight": "?",
              "middleLeft": "}",
              "middleRight": "s"
            }
          ]
        ))
      }
      else {
        window.alert('A/c to password policy Password length should be equal to 4 ')
      }
    })
  }

  handleComfirmPassCode = (ev) => {

    var tempArr = this.state.confirmPasswordData.concat(ev);
    this.setState({
      confirmPasswordData: [
        {
          "id": "",
          "position": 0,
          "color": "green",
          "topLeft": "r",
          "topRight": "2",
          "bottomLeft": "*",
          "bottomRight": "{",
          "middleLeft": "q",
          "middleRight": "\b"
        },
        {
          "id": "",
          "position": 1,
          "color": "blue",
          "topLeft": "i",
          "topRight": "^",
          "bottomLeft": "x",
          "bottomRight": "h",
          "middleLeft": "y",
          "middleRight": "1"
        },
        {
          "id": "",
          "position": 2,
          "color": "red",
          "topLeft": "%",
          "topRight": "c",
          "bottomLeft": "7",
          "bottomRight": "j",
          "middleLeft": "-",
          "middleRight": "6"
        },
        {
          "id": "",
          "position": 3,
          "color": "black",
          "topLeft": "$",
          "topRight": "w",
          "bottomLeft": "!",
          "bottomRight": "?",
          "middleLeft": "}",
          "middleRight": "s"
        }
      ]
    }, () => {
      if (this.state.confirmPasswordData.length < 5) {
        localStorage.setItem('confirmPasswordData', JSON.stringify([
          {
            "id": "",
            "position": 0,
            "color": "green",
            "topLeft": "r",
            "topRight": "2",
            "bottomLeft": "*",
            "bottomRight": "{",
            "middleLeft": "q",
            "middleRight": "\b"
          },
          {
            "id": "",
            "position": 1,
            "color": "blue",
            "topLeft": "i",
            "topRight": "^",
            "bottomLeft": "x",
            "bottomRight": "h",
            "middleLeft": "y",
            "middleRight": "1"
          },
          {
            "id": "",
            "position": 2,
            "color": "red",
            "topLeft": "%",
            "topRight": "c",
            "bottomLeft": "7",
            "bottomRight": "j",
            "middleLeft": "-",
            "middleRight": "6"
          },
          {
            "id": "",
            "position": 3,
            "color": "black",
            "topLeft": "$",
            "topRight": "w",
            "bottomLeft": "!",
            "bottomRight": "?",
            "middleLeft": "}",
            "middleRight": "s"
          }
        ]
        ))
      }
      else {
        window.alert('A/c to password policy Comfirm Password length should be equal to 4 ')
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
            <SignUp passwordCharacter={this.state.passwordData} confirmPasswordCharacter={this.state.confirmPasswordData} />
          </CardBox>
          <CardBox>
            <div className="col-12">
              <div className="row">
                {this.state.dominosUpdated.length ?
                  this.state.dominosUpdated.map((data, index) => {
                    if (10 === index + 1) {
                      return (
                        <div key={index} className="col-12">
                          <center>
                            <Domino passCode={this.state.component === 'password' ? this.handlePassCode : this.handleComfirmPassCode} data={data} index={index} id={data.id} />
                          </center>
                        </div>
                      )
                    }
                    else {
                      return (
                        <div key={index} className="col-4">
                          <Domino passCode={this.state.component === 'password' ? this.handlePassCode : this.handleComfirmPassCode} data={data} index={index} id={data.id} />
                        </div>
                      )
                    }
                  }) :
                  this.state.dominos.map((data, index) => {
                    if (10 === index + 1) {
                      return (
                        <div key={index} className="col-12">
                          <center>
                            <Domino passCode={this.state.component === 'password' ? this.handlePassCode : this.handleComfirmPassCode} data={data} index={index} id={data.id} />
                          </center>
                        </div>
                      )
                    }
                    else {
                      return (
                        <div key={index} className="col-4">
                          <Domino passCode={this.state.component === 'password' ? this.handlePassCode : this.handleComfirmPassCode} data={data} index={index} id={data.id} />
                        </div>
                      )
                    }
                  })}
              </div>
            </div>
          </CardBox>
        </div>
        {this.props.loader && <Loader />}
        {
          this.props.showMessage && NotificationManager.success("Successfully Registered!")
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
    addDominos: state.dominosData.addDominos ? state.dominosData.addDominos.data : [],
    addDominosSuccess: state.dominosData.addDominosSuccess
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
