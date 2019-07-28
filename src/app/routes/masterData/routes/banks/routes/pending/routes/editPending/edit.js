import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import {
  showBankLoader,
  editBank,
  hideBankMessage,
  removeIndividualBankData,
} from "actions/Bank";
import {
  showRoleLoader,
  fetchAllRoles
} from "actions/Role";
import Button from "@material-ui/core/Button";
import Loader from '../../../../../../../../../components/loader/loader.js';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardHeader,
  CardText,
  CardFooter
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      status: "",
      description: "",
      code: "",
      files: null,
      image: "",
      acronym: "",
    };
  }
  componentWillUnmount() {
    this.props.removeIndividualBankData();
  }

  componentWillMount() {
    this.props.showRoleLoader();
    this.props.fetchAllRoles();
    if (this.props.getIndividualRecord && this.props.getIndividualRecord.name) {
      this.toDataURL(this.props.getIndividualRecord.image, dataUrl => {
        this.setState({
          files: dataUrl.substr(dataUrl.indexOf(",") + 1)
        });
      });
      var str = this.props.getIndividualRecord.name;
      var acronym = /\s/g.test(str)
        ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
        : str.charAt(0);
      this.setState({
        name: this.props.getIndividualRecord.name,
        email: this.props.getIndividualRecord.emailAddress,
        status: this.props.getIndividualRecord.status,
        description: this.props.getIndividualRecord.description,
        code: this.props.getIndividualRecord.code,
        image: this.props.getIndividualRecord.image,
        acronym: acronym
      });
    }
  }
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideBankMessage();
      }, 100);
    }
    if (this.props.editBankSuccess !== null) {
      if (this.props.isMakerCheckerEnabled) {
        NotificationManager.success('You changes has been Edited as draft')
        this.props.data.history.push("/app/masterdata-management/bank/pendingbank");
      }
      else {
        NotificationManager.success('Bank has been Edited')
        this.props.data.history.push("/app/masterdata-management/bank/bank");
      }
    }
  }
  formName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  formCode(e) {
    e.preventDefault();
    this.setState({
      code: e.target.value
    });
  }
  formDescription(e) {
    e.preventDefault();
    this.setState({
      description: e.target.value
    });
  }
  toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw===";
      img.src = src;
    }
  }

  setStatus(e) {
    e.preventDefault();
    this.setState({
      status: e.target.value
    })
  }
  getFiles(files) {
    let base64 = files.base64;
    this.setState({
      files: base64.substr(base64.indexOf(",") + 1)
    });
  }
  handleSubmit = e => {
    e.preventDefault(); 
      const obj = {
        name: this.state.name,
        id: parseInt(localStorage.getItem("bId")),
        status: this.state.status,
        description: this.state.description,
        code: this.state.code,
        image: this.state.image
      };
      this.props.showBankLoader();
      this.props.editBank(obj);
  };
  render() {
    const { showMessage, alertMessage } = this.props;
    return (
      <div>
        {this.props.isSuccess ? (
          <Card className="shadow border-0">
            <CardHeader>
              {this.state.image ? (
                <Avatar
                  style={{ display: "inline-table" }}
                  alt="Avatar"
                  src={this.state.image}
                />
              ) : (
                  <Avatar
                    className="bg-warning"
                    style={{ display: "inline-flex" }}
                  >
                    <h3 className="m-0 text-white">
                      {this.state.acronym.toUpperCase()}
                    </h3>
                  </Avatar>
                )}
              &nbsp;&nbsp;
              {<IntlMessages id="sidebar.components.editBank" />}
            </CardHeader>
            <CardBody>
              <form
                className="row"
                autoComplete="on"
                onSubmit={this.handleSubmit}
              >
                <div className="col-md-4 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label="Name"
                    type="text"
                    defaultValue={this.state.name}
                    onChange={this.formName.bind(this)}
                    margin="normal"
                    fullWidth
                  />
                </div>
                {this.props.isLoading && (
                  <div className="loader-view">
                    <Loader />
                  </div>
                )}
                <div className="col-md-4 col-12" style={{ paddingTop: '14px' }}>
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select name=""
                      value={this.state.status}
                      onChange={this.setStatus.bind(this)}
                      input={<Input name="" id="status" />}
                    >
                      <MenuItem value={0}>Active</MenuItem>
                      <MenuItem value={1}>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    required
                    id="required"
                    label="Code"
                    defaultValue={this.state.code}
                    onChange={this.formCode.bind(this)}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-4 col-12">
                  <TextField name=""
                    required
                    label="Description"
                    defaultValue={this.state.description}
                    onChange={this.formDescription.bind(this)}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div
                  className="col-md-12 col-12"
                  style={{ textAlign: "right", marginTop: "15px" }}
                >
                  <div className="jr-btn-bank">
                    <Button name=""
                      type="submit"
                      variant="contained"
                      className="jr-btn"
                      color="primary"
                    >
                      <i className="zmdi zmdi-floppy" />
                      <span>Save</span>
                    </Button>
                    <Button name=""
                      variant="contained"
                      className="jr-btn bg-cyan text-white"
                      onClick={() => this.props.data.history.push("/app/masterdata-management/bank/bank")}
                    >
                      <i className="zmdi zmdi-close-circle-o" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        ) : (
            <div className="loader-view">
              <Loader />
            </div>
          )}
        {showMessage && alertMessage && NotificationManager.error(alertMessage)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getIndividualRecord: state.banksData.individualBankData.data,
    isSuccess: state.banksData.bankDetailSuccess,
    isLoading: state.banksData.loader,
    showMessage: state.banksData.showMessage,
    alertMessage: state.banksData.alertMessage,
    editBankSuccess: state.banksData.editBank,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : ''
  };
}
export default connect(
  mapStateToProps,
  {
    showBankLoader,
    editBank,
    hideBankMessage,
    removeIndividualBankData,
    showRoleLoader,
    fetchAllRoles
  }
)(Edit);
