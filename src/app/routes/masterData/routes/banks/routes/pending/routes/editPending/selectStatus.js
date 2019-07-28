import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

class Status extends React.Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.setStatus(event.target.value);
  };
  state = {
    byType: String(this.props.value),
  };
  render() {
    return (
      <div className="col-md-4 col-12" style={{ paddingTop: '14px' }}>
        <FormControl className="w-100 mb-2">
          <InputLabel htmlFor="type">Status</InputLabel>
          <Select name=""
            value={this.state.byType || ""}
            onChange={this.handleChange("byType")}
            input={<Input name="" id="byType" />}
          >
            <MenuItem value="0">Active</MenuItem>
            <MenuItem value="1">InActive</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default Status;
