import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { showFieldLoader, searchField, fetchField } from "actions/Fields";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      type: "",
      allTypes: [{ 'name': 'text' }, { 'name': 'number' }],
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name ? this.props.name : "",
      type: this.props.type ? this.props.type : ""
    });
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    this.props.onCloseModal();
    this.props.showFieldLoader();
    this.props.onSaveFilter(this.state.name, this.state.type);
    this.props.searchField({
      byName: this.state.name,
      byType: this.state.type
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
        <DialogTitle>Search Field</DialogTitle>
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
            <div className="col-md-6 col-12" style={{paddingTop: '16px'}}>
                <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="allTypes">Select Type</InputLabel>
                  <Select
                    value={this.state.type}
                    name="type"
                    disabled={this.state.mode === "view"}
                    onChange={this.onChangeHandler}
                  >
                    {this.state.allTypes
                      ? this.state.allTypes.map((data, index) => (
                        <MenuItem key={index} value={data.name}>
                          {data.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                </FormControl>
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
            disabled={!this.state.name && !this.state.type}
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
    showFieldLoader,
    searchField,
    fetchField
  }
)(Search);
