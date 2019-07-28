import React from "react";
import { connect } from "react-redux";

import InputTextField from "./textField";
import InputNumberField from "./numberField";
import DropdownSelect from "./dropDownField";
import Button from "@material-ui/core/Button";
import Loader from "../../loader/loader.js";

// Actions
import * as flds from "actions/Fields";

class DynamicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appFlds: [],
      fields: [],
      markupFields: [],
      prpsFlds: []
    };
  }

  componentDidMount() {
    this.props.showFieldLoader();
    this.props.fetchAllField();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.appFlds !== nextProps.fields) {
      this.setState(
        {
          appFlds: nextProps.fields
        },
        this.filterFieldsForGroups
      );
    }

    if (nextProps.fld && nextProps.fld !== this.props.fld) {
      this.setState(
        {
          prpsFlds: nextProps.fld
        },
        this.filterFieldsForGroups
      );
    }

    if (
      nextProps.indFld.data &&
      nextProps.indFld.data !== this.props.indFld.data
    ) {
      var joined = this.state.markupFields.concat(nextProps.indFld.data);
      this.setState({ markupFields: joined });
    }
  }

  filterFieldsForGroups = () => {
    if (this.state.appFlds.length !== 0 && this.state.prpsFlds.length !== 0) {
      this.state.appFlds.filter((dataApp, index) => {
        this.state.prpsFlds.filter((dataFld, index) => {
          if (dataApp.fieldId == dataFld.id) {
            this.props.showFieldLoader();
            this.props.fetchIndividualField({
              Id: dataFld.id,
              page: this.props.mode
            });
          }
        });
      });

      this.setState({
        fields: this.state.prpsFlds
      });
    }
  };

  submitForm = event => {
    const { fields, ...inputFields } = this.state;
    console.log(inputFields);

    event.preventDefault();
  };

  _handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  _handleDropDown(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({ [field]: value });
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.appFlds === this.state.appFlds) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { fields, markupFields } = this.state;
    const { loader } = this.props;
    return (
      <form className="row" onSubmit={this.submitForm}>
        {markupFields
          ? markupFields.map((form, index) => {
              if (form.dataType === 0) {
                return (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <InputNumberField
                        mode={this.props.mode}
                        name={form.name}
                        placeholder={form.name}
                        required={form.required}
                        _handleChange={this._handleChange}
                      />
                    </div>
                  </div>
                );
              }
              if (form.dataType === 1) {
                if (form.type === "text") {
                  return (
                    <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <InputTextField
                          mode={this.props.mode}
                          name={form.name}
                          placeholder={form.name}
                          required={form.required}
                          _handleChange={this._handleChange}
                        />
                      </div>
                    </div>
                  );
                }
                if (form.type === "number") {
                  return (
                    <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <InputNumberField
                          mode={this.props.mode}
                          name={form.name}
                          placeholder={form.name}
                          required={form.required}
                          _handleChange={this._handleChange}
                        />
                      </div>
                    </div>
                  );
                }
              }
              if (form.dataType === 2) {
                return (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <DropdownSelect
                        mode={this.props.mode}
                        id={form.id}
                        name={form.name}
                        required={form.required}
                        _handleChange={this._handleDropDown.bind(this)}
                        options={form.predefinedFields}
                      />
                    </div>
                  </div>
                );
              }
            })
          : ""}
        <div className="col-lg-12 col-md-12 col-sm-12 text-right">
          <Button
            variant="contained"
            color="primary"
            className="jr-btn text-uppercase"
            type="submit"
          >
            Save
          </Button>
        </div>
        {loader && <Loader />}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    fld: state.fieldsData.allFields
      ? state.fieldsData.allFields.data.items
      : "",
    indFld: state.fieldsData.individualFieldData
      ? state.fieldsData.individualFieldData
      : "",
    isModules: state.modules.moduleData.data,
    shMsg: state.fieldsData.showMessage,
    altMsg: state.fieldsData.alertMessage,
    loader: state.fieldsData.loader
  };
}

export default connect(
  mapStateToProps,
  {
    ...flds
  }
)(DynamicForm);
