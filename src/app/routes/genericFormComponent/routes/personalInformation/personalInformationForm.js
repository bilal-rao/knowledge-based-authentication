import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText
} from "reactstrap";
import BranchSelect from "./reactSelect/branch";
import IdentitySelect from "./reactSelect/identityType";
import TitleSelect from "./reactSelect/title";
import { DatePicker } from "material-ui-pickers";
import moment from "moment";
import Input from "@material-ui/core/Input";
import MaskedInput from "react-text-mask";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddressGrid from "./addressInformation";
import Divider from "@material-ui/core/Divider";
import ContactGrid from "./contactInformation";
import IdentityGrid from "./identityInformation";
import PropertyGrid from "./propertyInformation";
import MotorAssetsGrid from "./motorAssetsInformation";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Badge } from "reactstrap";

class NicMask extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[
          /[1-9]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/
        ]}
        // placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}
class PassportMask extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[
          /[A-Z]/,
          /[A-Z]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
        //   placeholderChar={"\u2000"}
        showMask
      />
    );
  }
}
class PersonalInformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      rentedAmount: "",
      startingDateOfResident: "",
      residentialStatus: "",
      nationality: "",
      maritalStatus: "",
      gender: "",
      getMonths: "",
      getYears: "",
      familyName: "",
      guardianName: "",
      personName: "",
      title: "",
      newCnicMask: "     -       - ",
      oldCnicMask: "     -       - ",
      passportCnicMask: "         ",
      branchName: "",
      identityName: "",
      name: "",
      emailAddress: "",
      mobileNumber: "",
      salary: "",
      errorText: {
        mobileNumber: "",
        email: ""
      },
      readOnlyDate: moment(),
      selectedDate: '',
      error: {
        mobileNumber: false,
        email: false
      },
      files: null
    };
    const branches = [{ label: "Hbl" }, { label: "Askari" }].map(
      suggestion => ({
        value: suggestion.label,
        label: suggestion.label
      })
    );
    localStorage.setItem("branch", JSON.stringify(branches));
    const identityType = [
      { label: "CNIC" },
      { label: "Old CNIC" },
      { label: "Passport" }
    ].map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label
    }));
    localStorage.setItem("identityType", JSON.stringify(identityType));
    const titles = [
      { label: "Mr" },
      { label: "Mrs" },
      { label: "Mst" },
      { label: "Miss" },
      { label: "Ms" }
    ].map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label
    }));
    localStorage.setItem("title", JSON.stringify(titles));
  }

  branchCallback = dataFromChild => {
    this.setState({
      branchName: dataFromChild
    });
  };
  identityCallback = dataFromChild => {
    this.setState({
      identityName: dataFromChild
    });
  };
  onBlurIdentityCallback = dataFromChild => {
    if (this.state.identityName === null) {
      this.setState({
        isEnable: false
      })
    }
  };

  titleCallback = dataFromChild => {
    this.setState({
      title: dataFromChild
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleDOB(date) {
    var today = new Date();
    var selectedDate = new Date(date);
    this.setState({
      getYears: today.getFullYear() - selectedDate.getFullYear(),
      getMonths: today.getMonth() - selectedDate.getMonth(),
      selectedDate: date.format("YYYY-MM-DD")
    });
  }

  handleDOR(since) {
    this.setState({
      startingDateOfResident: since
    });
  }
  
  checkData() {
    this.setState({
      isEnable: true
    });
    if (this.state.newCnicMask === '42401-2218885-1') {
      this.setState({
        rentedAmount: "",
        startingDateOfResident: "",
        residentialStatus: "own",
        nationality: "pakistani",
        maritalStatus: "single",
        gender: "male",
        familyName: "Rao",
        guardianName: "Muhammad Saleem",
        personName: "Bilal",
        title: "Mr",
        branchName: "Hbl",
      })
    }
    else {
      this.setState({
        rentedAmount: "",
        startingDateOfResident: "",
        residentialStatus: "",
        nationality: "",
        maritalStatus: "",
        gender: "",
        familyName: "",
        guardianName: "",
        personName: "",
        title: "",
        branchName: "",
      })
    }
  }

  render() {
    const {
      isEnable,
      residentialStatus,
      selectedDate,
      readOnlyDate,
      getYears,
      gender,
      personName,
      guardianName,
      familyName,
      maritalStatus,
      resdentialStatus,
      startingDateOfResident,
      nationality
    } = this.state;
    return (
      <Card className="row">
        <CardHeader
        // className="bg-grey text-black"
        >
          {<IntlMessages id="component.forms.personalInformation" />}
        </CardHeader>
        <CardBody>
          <form className="row" autoComplete="on" onSubmit={this.handleSubmit}>
            <div className="col-md-3 col-12" style={{ paddingTop: "35px" }}>
              <BranchSelect
                options={JSON.parse(localStorage.getItem("branch"))}
                branch={this.branchCallback}
              />
            </div>
            <div className="col-md-3 col-12" style={{ marginTop: "20px" }}>
            <DatePicker
                keyboard
                disabled
                format="DD/MM/YYYY"
                fullWidth
                label="Date"
                value={readOnlyDate}
                placeholder="dd/mm/yyyy"
                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                onChange={this.handleChange('readOnlyDate')}
                leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                disableOpenOnEnter     
                animateYearScrolling={false}
              />
            </div>
            <div className="col-md-3 col-12" style={{ paddingTop: "35px" }}>
              <IdentitySelect
                options={JSON.parse(localStorage.getItem("identityType"))}
                identity={this.identityCallback}
                onBlur={this.onBlurIdentityCallback}
              />
            </div>
            {this.state.identityName === "CNIC" ? (
              <div className="col-md-3 col-12" style={{ paddingTop: "20px" }}>
                <FormControl className="mb-3" fullWidth>
                  <InputLabel>CNIC Number</InputLabel>
                  <Input name=""
                    onBlur={this.checkData.bind(this)}
                    value={this.state.newCnicMask}
                    inputComponent={NicMask}
                    onChange={this.handleChange("newCnicMask")}
                  />
                </FormControl>
              </div>
            ) : this.state.identityName === "Old CNIC" ? (
              <div className="col-md-3 col-12" style={{ paddingTop: "20px" }}>
                <FormControl className="mb-3" fullWidth>
                  <InputLabel>Old CNIC Number</InputLabel>
                  <Input name=""
                    onBlur={this.checkData.bind(this)}
                    value={this.state.oldCnicMask}
                    inputComponent={NicMask}
                    onChange={this.handleChange("oldCnicMask")}
                  />
                </FormControl>
              </div>
            ) : this.state.identityName === "Passport" ? (
              <div className="col-md-3 col-12" style={{ paddingTop: "20px" }}>
                <FormControl className="mb-3" fullWidth>
                  <InputLabel>Passport Number</InputLabel>
                  <Input name=""
                    onBlur={this.checkData.bind(this)}
                    value={this.state.passportCnicMask}
                    inputComponent={PassportMask}
                    onChange={this.handleChange("passportCnicMask")}
                  />
                </FormControl>
              </div>
            ) : (
                    <div className="col-md-3 col-12" style={{ paddingTop: "35px" }}>
                      <Input name=""
                        placeholder="Identity Number"
                        disabled
                        //   value={this.state.passportCnicMask}
                        //   inputComponent={PassportMask}
                        //   onChange={this.handleChange("passportCnicMask")}
                        className="w-100 mb-3"
                      />
                    </div>
                  )}
            <div className="col-md-3 col-12" style={{ paddingTop: "30px" }}>
              <TitleSelect
                isEnable={isEnable}
                options={JSON.parse(localStorage.getItem("title"))}
                title={this.titleCallback}
              />
            </div>
            <div className="col-md-3 col-12">
              <TextField name=""
                disabled={isEnable ? false : true}
                value={personName}
                required
                id="required"
                label="Name"
                type="text"
                margin="normal"
                onChange={this.handleChange("personName")}
                fullWidth
              />
            </div>
            <div className="col-md-3 col-12">
              <TextField name=""
                disabled={isEnable ? false : true}
                value={guardianName}
                required
                id="required"
                label="Guardian Name"
                type="text"
                margin="normal"
                onChange={this.handleChange("guardianName")}
                fullWidth
              />
            </div>
            <div className="col-md-3 col-12">
              <TextField name=""
                disabled={isEnable ? false : true}
                value={familyName}
                required
                id="required"
                label="Family Name"
                type="text"
                margin="normal"
                onChange={this.handleChange("familyName")}
                fullWidth
              />
            </div>
            <div className="col-md-3 col-12" style={{ marginTop: "15px" }}>
              <DatePicker
                keyboard
                disabled={isEnable ? false : true}
                format="DD/MM/YYYY"
                fullWidth
                label="Date Of Bith"
                value={selectedDate}
                placeholder="dd/mm/yyyy"
                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                onChange={this.handleDOB.bind(this)}
                leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                disableOpenOnEnter     
                animateYearScrolling={false}
              />
              <span style={{ color: "blue" }}>
                {getYears ? getYears + " years" : ""}
              </span>
            </div>
            <div
              className="col-md-3 col-sm-6 col-12"
              style={{ paddingTop: "15px" }}
            >
              <FormControl className="w-100 mb-2">
                <InputLabel htmlFor="gender-simple">Gender</InputLabel>
                <Select name=""
                  disabled={isEnable ? false : true}
                  value={gender}
                  onChange={this.handleChange("gender")}
                  input={<Input name="" id="gender-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"transgender"}>Transgender</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="col-md-3 col-sm-6 col-12"
              style={{ paddingTop: "15px" }}
            >
              <FormControl className="w-100 mb-2">
                <InputLabel htmlFor="age-simple">Marital Status</InputLabel>
                <Select name=""
                  disabled={isEnable ? false : true}
                  required={true}
                  value={maritalStatus}
                  onChange={this.handleChange("maritalStatus")}
                  input={<Input name="" id="age-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"single"}>Single</MenuItem>
                  <MenuItem value={"married"}>Married</MenuItem>
                  <MenuItem value={"widowed"}>Widowed</MenuItem>
                  <MenuItem value={"divorced"}>Divorced</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 col-12">
              <TextField name=""
                disabled={isEnable ? false : true}
                value={nationality}
                required
                id="required"
                label="Nationality"
                type="text"
                margin="normal"
                onChange={this.handleChange("nationality")}
                fullWidth
              />
            </div>
            <div
              className="col-md-3 col-sm-6 col-12"
              style={{ paddingTop: "15px" }}
            >
              <FormControl className="w-100 mb-2">
                <InputLabel htmlFor="age-simple">Residential Status</InputLabel>
                <Select name=""
                  disabled={isEnable ? false : true}
                  value={residentialStatus}
                  onChange={this.handleChange("residentialStatus")}
                  input={<Input name="" id="age-simple" />}
                >
                  <MenuItem value={"own"}>Owned</MenuItem>
                  <MenuItem value={"rented"}>Rented</MenuItem>
                  <MenuItem value={"shared"}>Shared</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 col-12" style={{ marginTop: "15px" }}>
              <DatePicker
                keyboard
                disabled={isEnable ? false : true}
                fullWidth
                format="DD/MM/YYYY"
                value={startingDateOfResident}
                placeholder="dd/mm/yyyy"
                label="Since"
                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                onChange={this.handleDOR.bind(this)}
                animateYearScrolling={false}
                leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                disableOpenOnEnter     
              />
            </div>
            {residentialStatus === "rented" ? (
              <div className="col-md-3 col-12" style={{ paddingTop: "15px" }}>
                <FormControl className="mb-3" fullWidth>
                  <InputLabel htmlFor="rentedAmount">Monthly Rent</InputLabel>
                  <Input name=""
                    disabled={isEnable ? false : true}
                    type="number"
                    id="rentedAmount"
                    value={this.state.rentedAmount}
                    onChange={this.handleChange("rentedAmount")}
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            ) : (
                <div className="col-md-3 col-12" style={{ paddingTop: "15px" }}>
                  <FormControl className="mb-3" fullWidth>
                    <InputLabel htmlFor="rentedAmount">Monthly Rent</InputLabel>
                    <Input name=""
                      disabled
                      id="rentedAmount"
                      value={this.state.rentedAmount}
                      onChange={this.handleChange("rentedAmount")}
                      startAdornment={
                        <InputAdornment position="start">Rs</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              )}
            <div className="col-md-12 col-12">
              <br />
              <Badge color="info">Address Information</Badge>
              <Divider />
              <Divider />
              <Divider />
              <br />
              <AddressGrid isEnable={isEnable} />
            </div>
            <div className="col-md-12 col-12">
              <br />
              <Badge color="info">Contact Information</Badge>
              <Divider />
              <Divider />
              <Divider />
              <br />
              <ContactGrid isEnable={isEnable} />
            </div>
            <div className="col-md-12 col-12">
              <br />
              <Badge color="info">Identity Information</Badge>
              <Divider />
              <Divider />
              <Divider />
              <br />
              <IdentityGrid isEnable={isEnable} />
            </div>
            <div className="col-md-12 col-12">
              <br />
              <Badge color="info">Property Information</Badge>
              <Divider />
              <Divider />
              <Divider />
              <br />
              <PropertyGrid isEnable={isEnable} />
            </div>
            <div className="col-md-12 col-12">
              <br />
              <Badge color="info">Motor's Assets Information</Badge>
              <Divider />
              <Divider />
              <Divider />
              <br />
              <MotorAssetsGrid isEnable={isEnable} />
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }
}

export default PersonalInformationForm;
