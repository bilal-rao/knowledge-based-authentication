import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import IntlMessages from 'util/IntlMessages';
import { Button } from '@material-ui/core';
import compose from "recompose/compose";
import { connect } from "react-redux";
import { showDominosLoader, addDominos, addDominosSignUp } from 'actions/Dominos'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class SignUP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isDomino: false,
      dominos: [],
      passwordCharacter: "",
      confirmPasswordCharacter: ""
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.showDominosLoader();
    this.props.addDominosSignUp({
      email: this.state.email,
      password: JSON.parse(localStorage.getItem("passwordData") || "[]"),
      confirmPassword: JSON.parse(localStorage.getItem("confirmPasswordData") || "[]")
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.dominosList !== this.props.dominosList) {
      this.setState({
        dominos: nextProps.dominosList
      })
    }

    if (nextProps.passwordCharacter !== this.props.passwordCharacter) {
      var arr = String(nextProps.passwordCharacter.map(data => data.position)).split(',');
      this.setState({
        passwordCharacter: `${this.state.passwordCharacter !== "" ? this.state.passwordCharacter : ""}${arr[arr.length - 1]}`
      })
    }

    if (nextProps.confirmPasswordCharacter !== this.props.confirmPasswordCharacter) {
      var arr = String(nextProps.confirmPasswordCharacter.map(data => data.position)).split(',');
      this.setState({
        confirmPasswordCharacter: `${this.state.confirmPasswordCharacter !== "" ? this.state.confirmPasswordCharacter : ""}${arr[arr.length - 1]}`
      })
    }
  }
  sendAllDominos = () => {
    this.props.showDominosLoader();
    this.props.addDominos({
      email: this.state.email,
      password: this.state.dominos
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className="login-header">
          <Link className="app-logo" to="/" title="Domino">
            <img src={require("./dominoLogo.PNG")} alt="domino" title="domino" />
          </Link>
        </div>
        <form method="post" action="/" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input name="email" onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })} type="text" placeholder="Email"
              className="form-control form-control-lg" />
          </div>
          <div className="form-group">
            <input name="password"
              // onFocus={() => {
              //   this.props.showDominosLoader();
              //   this.props.fetchAllDominos();
              // }} 
              value={this.state.passwordCharacter}
              onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })} onBlur={this.sendAllDominos} type="password" placeholder="Password"
              className="form-control form-control-lg" />
          </div>
          <div className="form-group">
            <input
              value={this.state.confirmPasswordCharacter}
              name="confirmPassword" onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })} type="password" placeholder="Comfirm Password"
              className="form-control form-control-lg" />
          </div>
          <div className="mt-4 mb-2">
            <Button name="submit"
              type="submit"
              variant="contained"
              className="btn btn-primary jr-btn-rounded"
              color="primary"
            >
              <span>Register</span>
            </Button>
          </div>
          <p>
            <IntlMessages id="appModule.hvAccount" />
            <Link to="/app/app-module/login-1" className="ml-1">
              <IntlMessages id="appModule.signIn" />
            </Link>
          </p>
        </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    dominosList: state.dominosData.dominosList ? state.dominosData.dominosList.data : [],
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    {
      showDominosLoader,
      addDominos,
      addDominosSignUp
    }

  )
)(SignUP);