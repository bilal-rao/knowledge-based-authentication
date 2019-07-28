import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {
  editProduct,
  editDraftProduct,
  showProductLoader
} from "actions/Product";
import { showDeviationLoader, fetchAllDeviation } from "actions/Deviation";
import {
  showBuilderLoader,
  fetchAllFields,
  scoreCardField
} from "actions/QueryBuilder";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import CardBox from "components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import { Badge } from "reactstrap";
import { FormHelperText } from "@material-ui/core";
import DragIcon from "@material-ui/icons/DragHandle";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
const DragHandle = sortableHandle(() => <DragIcon />);
const SortableItem = sortableElement(({ value }) => (
  <TableRow>
    <TableCell padding={"none"}>
      <IconButton aria-label="ReArrange Order">
        <Tooltip title="ReArrange Order">
          <DragHandle />
        </Tooltip>
      </IconButton>
    </TableCell>
    {value}
  </TableRow>
));
const SortableContainer = sortableContainer(({ children }) => {
  return <TableBody>{children}</TableBody>;
});

let fr = 100;
let cv = 0;
class ScoringWeightages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      data: [],
      scoringWeightageId: null,
      isAddButton: false,
      isForm: false,
      scoringWeightageList: false,
      fieldId: "",
      docRequirements: [],
      weightage: "",
      outOf: "",
      scoringWeightages: [],
      remaining: 100,
      error: {
        remaining: false
      },
      errorText: {
        remaining: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchAllDeviation();

    const docObj = {
      pId: localStorage.getItem("pId")
    };
    this.props.showBuilderLoader();
    this.props.fetchAllFields(docObj);

    setTimeout(() => {
      this.props.fp();
    }, 100);
  }

  componentDidUpdate() {
    if (this.state.error.remaining) {
      setTimeout(() => {
        this.setState({
          error: {
            remaining: false
          }
        })
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.props.isPending
    ) {
      this.mapDataFromPropsToState(
        nextProps.editProductData,
        this.props.editProductData,
        nextProps.individualScrutinizerData.data
          ? nextProps.individualScrutinizerData.data.payload
          : [],
        this.props.individualScrutinizerData.data
          ? this.props.individualScrutinizerData.data.payload
          : []
      );
    } else {
      this.mapDataFromPropsToState(
        nextProps.editProductData,
        this.props.editProductData,
        nextProps.individualProductData.data
          ? nextProps.individualProductData.data
          : [],
        this.props.individualProductData.data
          ? this.props.individualProductData.data
          : []
      );
    }
  }

  mapDataFromPropsToState = (npE, pE, npI, pI) => {
    if (npE !== pE) this.fetchScoringWeightage();
    if (npI && npI !== pI) {
      this.setState({
        product: npI,
        sId:
          npI.scrutinizerId && npI.scrutinizerStatus === 0
            ? npI.scrutinizerId
            : this.state.sId
      });

      if (npI && this.state.scoringWeightages.length === 0) {
        this.setState(
          {
            scoringWeightages: npI.scoringWeightages
              ? npI.scoringWeightages
              : [],
            isForm: false,
            scoringWeightageList: true
          },
          () => {
            if (this.state.scoringWeightages.length === 0) {
              this.setState({
                scoringWeightageList: false,
                isAddButton: true
              });
            } else {
              let temp = this.state.scoringWeightages.map(
                data => data.weightage
              );
              const sum = temp.reduce(add);
              function add(accumulator, a) {
                return accumulator + a;
              }
              fr = 100 - sum;
              this.setState({ remaining: fr });
            }
          }
        );
      }
    }
  };

  handleChange = name => (event, value) => {
    this.setState({
      [name]: event.target.value
    });
  };

  addScoringWeightages = () => {
    cv = 0;
    this.setState({
      scoringWeightageId: null,
      fieldId: "",
      weightage: "",
      outOf: "",
      data: [],
      isForm: true,
      scoringWeightageList: false
    });
  };

  fetchScoringWeightage = () => {
    this.setState(
      {
        scoringWeightageList: true,
        isForm: false,
        scoringWeightages: []
      },
      () => {
        this.props.ups(7);
        this.props.fp();
      }
    );
  };

  ceateScoringWeightage = () => {
    if (this.state.remaining < 0) {
      this.setState({
        error: {
          remaining: true
        },
        errorText: {
          remaining: `Please enter weightage less than or equal to ${
            this.state.remaining
            }%`
        }
      });
    } else {
      let fs = this.state.scoringWeightages;
      if (this.state.scoringWeightageId) {
        if (
          !window.confirm(
            "Are you sure you want to UPDATE this scoring wightage?"
          )
        )
          return;
        fs = this.state.scoringWeightages.filter(documentRequirement => {
          return documentRequirement.id !== this.state.scoringWeightageId;
        });
      }

      this.setState(
        {
          scoringWeightages: [
            ...fs,
            {
              fieldId: this.state.fieldId,
              weightage: this.state.weightage,
              outOf: Number(this.state.outOf)
            }
          ]
        },
        () => {
          this.props.showProductLoader();
          if (
            (this.props.isMakerCheckerEnabled && this.state.sId) ||
            this.props.isPending
          ) {
            this.props.editDraftProduct({
              ...this.state.product,
              sId: this.state.sId,
              pId: this.state.pId,
              scoringWeightages: this.state.scoringWeightages
            });
          } else {
            this.props.editProduct({
              ...this.state.product,
              pId: this.state.pId,
              scoringWeightages: this.state.scoringWeightages
            });
          }
        }
      );
    }
  };

  editScoringWeightage = scoringWeightageId => {
    let fs = this.state.scoringWeightages.filter(filter => {
      return filter.id === scoringWeightageId;
    });
    fs = fs[0];
    cv = fs.weightage;

    this.setState({
      scoringWeightageId,
      fieldId: fs.fieldId,
      weightage: fs.weightage,
      outOf: fs.outOf,
      isForm: true,
      scoringWeightageList: false
    });
  };

  handleChangeScoringWeightagesStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this scoring weight?"))
      return;
    let scoringWeightages = this.state.scoringWeightages.slice(0).filter(sw => {
      if (sw.id === e.target.name) sw["status"] = Number(!e.target.checked);
      return sw;
    });
    this.setState({ scoringWeightages }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          scoringWeightages
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          scoringWeightages
        });
      }
    });
  };

  checkFieldExistence = fieldId => {
    return this.state.scoringWeightages.length > 0
      ? this.state.scoringWeightages.find(weightage => {
        return String(weightage.fieldId) === String(fieldId);
      })
      : false;
  };

  componentWillUnmount() {
    let obj = {
      scoreCardField: this.state.scoringWeightages
    };
    this.props.scoreCardField(obj);
  }

  updateRemaining = () => {
    this.setState({
      remaining: fr + cv - this.state.weightage,
      error: { remaining: fr + cv - this.state.weightage < 0 },
      errorText: {
        remaining: `Please enter weightage less than or equal to ${fr}%`
      }
    });
  };

  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ scoringWeightages }) => ({
        scoringWeightages: arrayMove(scoringWeightages, oldIndex, newIndex)
      }),
      () => {
        this.props.showProductLoader();
        if (
          (this.props.isMakerCheckerEnabled && this.state.sId) ||
          this.props.isPending
        ) {
          this.props.editDraftProduct({
            ...this.state.product,
            sId: this.state.sId,
            pId: this.state.pId,
            scoringWeightages: this.state.scoringWeightages
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            scoringWeightages: this.state.scoringWeightages
          });
        }
      }
    );
  };

  render() {
    const { getAllFields } = this.props;
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          {this.state.isForm ? (
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="fieldId">Select Field</InputLabel>
                    <Select
                      disabled={this.props.mode === "view"}
                      name="fieldId"
                      value={this.state.fieldId}
                      onChange={this.handleChange("fieldId")}
                      input={<Input name="" id="fieldId" />}
                    >
                      {getAllFields ? (
                        getAllFields.map((data, index) => (
                          <MenuItem
                            key={data.id}
                            value={String(data.id)}
                            disabled={
                              this.checkFieldExistence(data.id) ? true : false
                            }
                          >
                            {data.name}
                          </MenuItem>
                        ))
                      ) : (
                          <MenuItem>Not found</MenuItem>
                        )}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControl fullWidth>
                  <InputLabel htmlFor="weightage">Weightage</InputLabel>
                  <Input
                    disabled={this.props.mode === "view"}
                    name="weightage"
                    id="weightage"
                    type="number"
                    value={this.state.weightage}
                    onChange={this.handleChange("weightage")}
                    onKeyUp={this.updateRemaining}
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                  />
                </FormControl>
                <FormHelperText
                  className={this.state.error.remaining ? "text-red" : ""}
                >
                  {this.state.error.remaining
                    ? this.state.errorText.remaining
                    : `Remaining Weigthage: ${this.state.remaining}%`}
                </FormHelperText>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  disabled={this.props.mode === "view"}
                  name="outOf"
                  label="Out of"
                  value={this.state.outOf}
                  type="number"
                  onChange={this.handleChange("outOf")}
                  fullWidth
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <br />
                {this.state.scoringWeightages.length > 0 ? (
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={this.fetchScoringWeightage}
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  disabled={
                    !this.state.fieldId ||
                    !this.state.weightage ||
                    !this.state.outOf ||
                    this.state.error.remaining ||
                    this.props.mode === "view"
                  }
                  onClick={this.ceateScoringWeightage}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : this.state.scoringWeightageList ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <div className="actions">
                  <h3>Scoring Weightages</h3>
                  <Badge href="javascript:void(0)" color="primary">
                    Remaining: <b>{this.state.remaining}%</b>
                  </Badge>
                  <IconButton
                    name="AddNewScoringWeightage"
                    aria-label="Add New Scoring Weightage"
                    disabled={
                      this.state.remaining === 0 || this.props.mode === "view"
                    }
                    onClick={this.addScoringWeightages}
                  >
                    <Tooltip title="Add New Scoring Weightage">
                      <AddIcon />
                    </Tooltip>
                  </IconButton>
                </div>
              </div>
              <CardBox
                styleName="col-lg-12 col-md-12 col-sm-12"
                cardStyle="p-0"
              >
                <div className="table-responsive-material">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding={"none"} />
                        <TableCell>Field</TableCell>
                        <TableCell>Weightage (%)</TableCell>
                        <TableCell>Out of</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {this.state.scoringWeightages.map((data, i) => {
                        return (
                          <SortableItem
                            key={data.id}
                            index={i}
                            value={
                              <React.Fragment>
                                <TableCell>
                                  {" "}
                                  {getAllFields
                                    ? getAllFields
                                      .filter(type => {
                                        if (Number(type.id) === Number(data.fieldId)) {
                                          return type.name;
                                        }
                                      })
                                      .map(data => data.name)
                                    : "N/A"}{" "}
                                </TableCell>
                                <TableCell>
                                  {data.weightage ? data.weightage : "N/A"}
                                </TableCell>
                                <TableCell>
                                  {data.outOf ? data.outOf : "N/A"}
                                </TableCell>
                                <TableCell>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        classes={{
                                          checked: "text-primary",
                                          bar: "bg-primary"
                                        }}
                                        title={
                                          data.status === 0
                                            ? "Active"
                                            : "In-Active"
                                        }
                                        disabled={this.props.mode === "view"}
                                        name={data.id}
                                        checked={data.status === 0}
                                        onChange={
                                          this
                                            .handleChangeScoringWeightagesStatus
                                        }
                                      />
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  {this.props.mode === "view" ? (
                                    <IconButton
                                      aria-label="View"
                                      onClick={() =>
                                        this.editScoringWeightage(data.id)
                                      }
                                    >
                                      <Tooltip title="View">
                                        <i className="zmdi zmdi-eye" />
                                      </Tooltip>
                                    </IconButton>
                                  ) : (
                                      <IconButton
                                        aria-label="Edit"
                                        onClick={() =>
                                          this.editScoringWeightage(data.id)
                                        }
                                      >
                                        <Tooltip title="Edit">
                                          <EditIcon />
                                        </Tooltip>
                                      </IconButton>
                                    )}
                                </TableCell>
                              </React.Fragment>
                            }
                          />
                        );
                      })}
                    </SortableContainer>
                  </Table>
                </div>
              </CardBox>
            </div>
          ) : this.state.isAddButton ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <Button
                  disabled={this.props.mode === "view"}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  onClick={this.addScoringWeightages}
                >
                  Add New Scoring Weightage
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : false,
    getAllFields: state.QueryBuilderData.fieldList
      ? state.QueryBuilderData.fieldList.items
      : "",
    individualProductData: state.productsData.individualProductData
      ? state.productsData.individualProductData
      : "",
    editProductData: state.productsData.editProduct
      ? state.productsData.editProduct
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
    editProduct,
    editDraftProduct,
    showDeviationLoader,
    fetchAllDeviation,
    showBuilderLoader,
    fetchAllFields,
    scoreCardField
  }
)(ScoringWeightages);
