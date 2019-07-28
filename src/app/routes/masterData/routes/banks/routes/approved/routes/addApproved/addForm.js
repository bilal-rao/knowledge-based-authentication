import React from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import { showBankLoader, addBank, hideBankMessage} from "actions/Bank";
import { fetchAllRoles } from "actions/Role";
import { fetchModule, showModuleLoader } from "actions/Module";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText
} from "reactstrap";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Loader from '../../../../../../../../../components/loader/loader.js';
class AddForm extends React.Component {
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
  componentDidMount() {
    this.props.fetchAllRoles();
    if (this.props.isModules === undefined) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }
  }
  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideBankMessage();
      }, 100);
    }
    if (this.props.addBankSuccess !== null) {
      if(this.props.isMakerCheckerEnabled){
      NotificationManager.success('Your changes has been Added as draft');
        this.props.data.history.push("/app/masterdata-management/bank/pendingbank");
      }
      else{
        NotificationManager.success('Bank has been Added');
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
          code: this.state.code,
          description: this.state.description,
          image: this.state.image
      };
      this.props.showBankLoader();
      this.props.addBank(obj);
  };
  render() {
    const { selectedDate, errorText } = this.state;
    return (
      <Card>
        <CardHeader className="bg-white text-black">
          {<IntlMessages id="component.masterdata.bank.bank.add" />}
        </CardHeader>
        <CardBody>
          <form className="row" autoComplete="on" onSubmit={this.handleSubmit}>
            <div className="col-md-4 col-12">
              <TextField name=""
                required
                id="required"
                label="Name"
                type="text"
                margin="normal"
                onChange={this.formName.bind(this)}
                fullWidth
              />
            </div>
            <div className="col-md-4 col-12">
            <TextField name=""
                required
                id="required"
                label="Code"
                type="text"
                margin="normal"
                onChange={this.formCode.bind(this)}
                fullWidth
              />
              {this.props.isLoading && (
                <div className="loader-view">
                  <Loader />
                </div>
              )}
            </div>
            <div className="col-md-4 col-12">
              <TextField name=""
                required
                label="Description"
                type="text"
                margin="normal"
                onChange={this.formDescription.bind(this)}
                fullWidth
              />
            </div>
            <div
              className="col-md-12 col-12"
              style={{ textAlign: "right", paddingTop: "20px" }}
            >
              <Button name=""
                type="submit"
                variant="contained" 
                color="primary" 
                className="jr-btn"
              >
                <i className="zmdi zmdi-floppy" />
                <span>Save</span>
              </Button>
              <Button name=""
                variant="contained"
                className="jr-btn bg-cyan text-white"
                onClick={() => this.props.data.history.goBack()}
              >
                <i className="zmdi zmdi-close-circle-o" />
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </CardBody>
        <NotificationContainer />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    isLoading: state.banksData.loader,
    addBankSuccess: state.banksData.addBank,
    showMessage: state.banksData.showMessage,
    alertMessage: state.banksData.alertMessage,
    isMakerCheckerEnabled: state.actions.actionsData ? state.actions.actionsData.isMakerCheckerEnabled : ''
  };
}
export default connect(
  mapStateToProps,
  {
    showBankLoader,
    addBank,
    hideBankMessage,
    fetchAllRoles,
    showModuleLoader,
    fetchModule,
  }
)(AddForm);
