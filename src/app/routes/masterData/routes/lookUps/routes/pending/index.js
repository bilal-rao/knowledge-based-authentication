import React from "react";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PendingList from "./../../../../../../../components/customComponents/pendingList/index";

class Pending extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLookUpModalOpen: true,
      lookUpValue: "",
      lookUpTypes: [
        {
          value: "DESIG",
          text: "Designation",
          path: "designations",
          active: false
        },
        {
          value: "ET",
          text: "Education",
          path: "educationtypes",
          active: true
        },
        {
          value: "IH",
          text: "Income Head",
          path: "incomeheads",
          active: true
        },
        {
          value: "IS",
          text: "Income Source",
          path: "incomesources",
          active: true
        },
        {
          value: "AT",
          text: "Agency Type",
          path: "agencytypes",
          active: false
        },
        {
          value: "Reason",
          text: "Reasons",
          path: "reasons",
          active: true
        },
        {
          value: "AC",
          text: "Aquisition Channels",
          path: "acquisitionchannels",
          active: true
        },
        {
          value: "BBC",
          text: "Business Borrower Code",
          path: "businessborrowercodes",
          active: true
        },
        {
          value: "VT",
          text: "Vehicle Type",
          path: "vehicletypes",
          active: true
        },
        {
          value: "LT",
          text: "Liability Type",
          path: "liabilitytypes",
          active: true
        },
        {
          value: "P",
          text: "Profession",
          path: "professions",
          active: true
        },
        {
          value: "EMPS",
          text: "Employment Status",
          path: "employmentsstatus",
          active: true
        },
        {
          value: "BT",
          text: "Business Type",
          path: "businesstypes",
          active: true
        },
        {
          value: "EMP",
          text: "Employer",
          path: "employers",
          active: false
        },
        {
          value: "VM",
          text: "Vehicle Make",
          path: "vehiclemakes",
          active: false
        },
        {
          value: "VC",
          text: "Vehicle Color",
          path: "vehiclecolors",
          active: false
        },
        {
          value: "VES",
          text: "Vehicle Engine Size",
          path: "vehicleenginesizes",
          active: false
        },
        {
          value: "DIS",
          text: "Discrepancy",
          path: "Discrepancies",
          active: true
        }
      ]
    };
  }

  componentDidMount() {
    if (localStorage.getItem("lookUpPath")) {
      this.setState({
        isLookUpModalOpen: false
      });
    }
  }

  handleChange = e => {
    localStorage.setItem("lookUpValue", e.target.value);
    localStorage.setItem("lookUpPath", e.target.value.split("-")[1]);
    localStorage.setItem(
      "lookUpName",
      e.nativeEvent.target.innerText
        ? e.nativeEvent.target.innerText.replace(" Listing", "")
        : ""
    );
    this.setState({
      isLookUpModalOpen: false
    });
  };

  render() {
    const params = {
      history: this.props.history,
      head: localStorage.getItem("lookUpName"),
      mud: "lookup",
      mc: localStorage.getItem("lookUpPath") ? `P${localStorage.getItem("lookUpValue").split("-")[0]}` : 'P',
      mId: "lId",
      mainMud: "masterdata"
    };
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}/view`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            path={`${this.props.match.url}/edit`}
            component={asyncComponent(() => import("./routes/addEditView"))}
          />
          <Route
            exact
            path={`${this.props.match.url}/`}
            render={() => (
              <div className="app-wrapper">
                <ContainerHeader
                  title={
                    <IntlMessages id="components.masterdata.lookup.pendinglookup" />
                  }
                  match={this.props.match}
                />
                <div className="row animated slideInUpTiny animation-duration-3">
                  <div className="col-lg-12 col-md-12 col-sm-s12">
                    {this.state.isLookUpModalOpen ? (
                      <Dialog
                        fullWidth
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={true}
                        maxWidth="sm"
                      >
                        <DialogTitle>Lookup Type</DialogTitle>
                        <DialogContent>
                          <form className="row">
                            <div className="col-sm-12 col-12">
                              <TextField
                                name="lookUpValue"
                                id="popupLookUp"
                                select
                                label="LookUp type"
                                value={this.state.lookUpValue}
                                onChange={this.handleChange}
                                margin="normal"
                                fullWidth
                              >
                                {this.state.lookUpTypes.map(lut => {
                                  return lut.active ? (
                                    <MenuItem
                                      key={lut.value}
                                      value={`${lut.value}-${lut.path}`}
                                    >
                                      {lut.text}
                                    </MenuItem>
                                  ) : (
                                    false
                                  );
                                })}
                              </TextField>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <PendingList {...params} />
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Pending;
