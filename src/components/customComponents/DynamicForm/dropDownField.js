import React from "react";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loader from '../../overlayLoader/spinner.js';


class DropdownSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    handleChange = (ev) => {
        this.props._handleChange(ev.target.name, ev.target.value);
        this.setState({
            value: ev.target.value
        })
    }
    render() {
        const { mode, name, options, required } = this.props;
        return (
            <FormControl
                required={required}
                className="w-100 mb-2">
                <InputLabel htmlFor="age-simple">{name}</InputLabel>
                <Select
                    name={name}
                    value={this.state.value}
                    disabled={mode === "view"}
                    onChange={this.handleChange}
                    input={<Input id="dropdown" />}
                >
                    {false ? <MenuItem><Loader /> </MenuItem> : options ? options.map((values, index) => <MenuItem value={values.id} key={values.id}> {values.name} </MenuItem>) : ''}
                </Select>
            </FormControl>
        );
    }
}

export default DropdownSelect;