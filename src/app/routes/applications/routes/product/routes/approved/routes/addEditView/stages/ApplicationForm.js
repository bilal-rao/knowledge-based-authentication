import React from "react";
import { connect } from "react-redux";

// Actions
import * as acAc from "actions/Action";
import * as mdAc from "actions/Module";

// Components
import SelectComponent from "components/customComponents/selectComponent/select.js";
import Loader from "components/loader/loader.js";
import DynamicForm from "components/customComponents/DynamicForm/index.js";

class BasicInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
  }

  // componentDidMount() {
  //   console.log(this.props.ag)
  //   console.log(this.props.as)
  // }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.ag)
    // console.log(nextProps.as)
    // console.log(nextProps.fields)
    if(this.state.fields !== nextProps.fields){
      this.setState({
        fields: nextProps.fields
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { getAllProducts } = this.props;
    return <DynamicForm mode={this.props.mode} fields={this.state.fields} />;
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : ""
  };
}

export default connect(
  mapStateToProps,
  {
    ...acAc,
    ...mdAc
  }
)(BasicInformation);
