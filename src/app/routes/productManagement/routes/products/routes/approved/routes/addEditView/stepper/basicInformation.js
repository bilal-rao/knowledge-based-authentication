import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  addProduct,
  editProduct,
  editDraftProduct,
  showProductLoader,
  fetchAllProducts
} from "actions/Product";
import {
  showBuilderLoader,
  fetchAllFields,
  fetchAllFieldSet,
  fetchIndividualFieldSet
} from "actions/QueryBuilder";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Loader from "components/loader/loader";
import SelectComponent from "components/customComponents/selectComponent/select.js";

class BasicInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      code: "",
      name: "",
      description: "",
      parentId: 0,
      allowMultipleApplications: false,
      hasError: {
        code: false,
        name: false
      }
    };
  }

  componentDidMount() {
    this.props.fetchAllProducts();

    setTimeout(() => {
      this.props.fp();
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.addProductSuccess &&
      nextProps.addProductSuccess !== this.props.addProductSuccess
    ) {
      if (this.props.isMakerCheckerEnabled) {
        if (!localStorage.getItem("sId")) {
          this.setState({
            pId: nextProps.addProductSuccess.data.id,
            sId: nextProps.addProductSuccess.data.scrutinizerId
          });
          localStorage.setItem("pId", nextProps.addProductSuccess.data.id);
          localStorage.setItem(
            "sId",
            nextProps.addProductSuccess.data.scrutinizerId
          );
          this.props.ups(1, "change");
        }
      } else {
        if (!localStorage.getItem("pId")) {
          this.setState({ pId: nextProps.addProductSuccess.data.id });
          localStorage.setItem("pId", nextProps.addProductSuccess.data.id);
          this.props.ups(1, "change");
        }
      }
    }

    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.props.isPending
    ) {
      this.mapDataFromPropsToState(
        nextProps.individualScrutinizerData.data
          ? nextProps.individualScrutinizerData.data.payload
          : "",
        this.props.individualScrutinizerData.data
          ? this.props.individualScrutinizerData.data.payload
          : ""
      );
    } else {
      this.mapDataFromPropsToState(
        nextProps.individualProductData.data
          ? nextProps.individualProductData.data
          : "",
        this.props.individualProductData.data
          ? this.props.individualProductData.data
          : ""
      );
    }
  }

  mapDataFromPropsToState = (npI, pI) => {
    if (npI && npI !== pI) {
      this.setState({
        product: npI,
        sId:
          npI.scrutinizerId && npI.scrutinizerStatus === 0
            ? npI.scrutinizerId
            : this.state.sId,
        parentId: npI.parentId ? npI.parentId : 0,
        name: npI.name ? npI.name : "",
        code: npI.code ? npI.code : "",
        description: npI.description ? npI.description : "",
        allowMultipleApplications: npI.allowMultipleApplications
          ? npI.allowMultipleApplications
          : false
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.name === "allowMultipleApplications"
          ? e.target.checked
          : e.target.name === "code" && e.nativeEvent.data === " "
          ? e.target.value.replace(/ /g, "")
          : e.target.value
    });
  };

  createProduct = () => {
    this.props.showProductLoader();
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.props.isPending
    ) {
      this.props.editDraftProduct({
        ...this.state.product,
        sId: this.state.sId,
        id: this.state.pId,
        parentId: this.state.parentId,
        code: this.state.code,
        name: this.state.name,
        description: this.state.description,
        allowMultipleApplications: this.state.allowMultipleApplications
      });
    } else if (!this.props.isMakerCheckerEnabled && this.state.pId) {
      this.props.editProduct({
        ...this.state.product,
        pId: this.state.pId,
        parentId: this.state.parentId,
        code: this.state.code,
        name: this.state.name,
        description: this.state.description,
        allowMultipleApplications: this.state.allowMultipleApplications
      });
    } else {
      this.props.addProduct({
        parentId: this.state.parentId,
        code: this.state.code,
        name: this.state.name,
        description: this.state.description,
        allowMultipleApplications: this.state.allowMultipleApplications
      });
    }
  };

  render() {
    const { getAllProducts } = this.props;
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            <div
              className="col-lg-4 col-md-4 col-sm-12 p-t-15"
              style={{ paddingTop: "8px" }}
            >
              <SelectComponent
                onChange={ev => this.setState({ parentId: ev })}
                items={getAllProducts}
                single={this.state.parentId}
                type={"single"}
                label={"Select Parent"}
                placeholder="Select Parent Product"
                mode={this.props.mode}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <TextField
                  label="Product Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                  disabled={this.props.mode === "view"}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <TextField
                  label="Code"
                  name="code"
                  value={this.state.code}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                  helperText={
                    this.props.mode === "add"
                      ? "Space not allowed in code field"
                      : ""
                  }
                  disabled={this.props.mode !== "add"}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <TextField
                  label="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                  disabled={this.props.mode === "view"}
                />
              </div>
            </div>
            <div
              className="col-lg-4 col-md-4 col-sm-12"
              style={{ paddingTop: "13px" }}
            >
              <FormControlLabel
                label="Allow Multiple Applications"
                className="p-t-20"
                control={
                  <Switch
                    classes={{
                      checked: "text-primary",
                      bar: "bg-primary"
                    }}
                    name="allowMultipleApplications"
                    checked={this.state.allowMultipleApplications}
                    onChange={this.handleChange}
                    aria-label="allowMultipleApplications"
                    disabled={this.props.mode === "view"}
                  />
                }
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 text-right">
              <Button
                variant="contained"
                color="primary"
                className="jr-btn text-uppercase"
                onClick={this.createProduct}
                disabled={
                  !this.state.code ||
                  !this.state.name ||
                  this.props.mode === "view"
                }
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    addProductSuccess: state.productsData.addProduct,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : "",
    getAllProducts: state.productsData.allProducts
      ? state.productsData.allProducts.data.items
      : [],
    individualProductData: state.productsData.individualProductData
      ? state.productsData.individualProductData
      : "",
    individualScrutinizerData: state.scrutinizers.individualScrutinizerData
      ? state.scrutinizers.individualScrutinizerData
      : ""
  };
}

export default connect(
  mapStateToProps,
  {
    showProductLoader,
    addProduct,
    editProduct,
    editDraftProduct,
    fetchAllProducts,
    showBuilderLoader,
    fetchAllFields,
    fetchAllFieldSet,
    fetchIndividualFieldSet
  }
)(BasicInformation);
