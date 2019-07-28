import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { showDepartmentLoader, searchDepartment, fetchDepartment } from "actions/Department";

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
      code: this.props.code
    });
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    this.props.onCloseModal();
    this.props.showDepartmentLoader();
    this.props.onSaveFilter(this.state.name, this.state.code);
    this.props.searchDepartment({
      name: this.state.name,
      code: this.state.code
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
        <DialogTitle>Search Department</DialogTitle>
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
                label="Code"
                type="code"
                margin="normal"
                name="code"
                autoComplete="off"
                placeholder="Search by code"
                defaultValue={this.state.code}
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
            disabled={!this.state.name && !this.state.code}
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
    showDepartmentLoader,
    searchDepartment,
    fetchDepartment
  }
)(Search);
