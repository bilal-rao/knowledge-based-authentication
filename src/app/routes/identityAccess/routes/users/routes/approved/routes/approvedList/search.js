import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { showUserLoader, searchUser, fetchUser } from "actions/Employee";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      code: null
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email
    });
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    this.props.onCloseModal();
    this.props.showUserLoader();
    this.props.onSaveFilter(this.state.name, this.state.email);
    this.props.searchUser({
      name: this.state.name,
      email: this.state.email
    });
  };

  render() {
    return (
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={true}
        maxWidth="md"
      >
        <DialogTitle>Search User</DialogTitle>
        <DialogContent>
          <form className="row">
            <div className="col-md-6 col-12">
              <TextField
                label="Name"
                type="text"
                margin="normal"
                name="name"
                autoComplete="off"
                placeholder="Search by name"
                defaultValue={this.state.name}
                onChange={this.onChangeHandler}
                fullWidth
              />
            </div>
            <div className="col-md-6 col-12">
              <TextField
                label="Email"
                type="email"
                margin="normal"
                name="email"
                autoComplete="off"
                placeholder="Search by email"
                defaultValue={this.state.email}
                onChange={this.onChangeHandler}
                fullWidth
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            name="onCloseModal"
            onClick={this.props.onCloseModal}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            name="onSubmit"
            disabled={!this.state.name && !this.state.email}
            onClick={this.onSubmit}
            color="primary"
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  {
    showUserLoader,
    searchUser,
    fetchUser
  }
)(Search);
