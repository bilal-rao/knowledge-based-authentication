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
import { showBuilderLoader, fetchAllFields } from "actions/QueryBuilder";
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

class ScoringCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      scoringCardId: null,
      isAddButton: false,
      isForm: false,
      scoringCardList: false,
      fieldId: "",
      docRequirements: [],
      score: "",
      minimumValue: "",
      maximumValue: "",
      staticValue: "",
      scoringCard: [],
      fieldType: "",
      stageIds: [],
      stages: [],
      outOf: "",
      fields: [],
      error: {
        outOf: false
      },
      errorText: {
        outOf: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchAllDeviation();

    if (localStorage.getItem("pId")) {
      //Get all Documents
      const docObj = {
        pId: localStorage.getItem("pId")
      };
      this.props.showBuilderLoader();
      this.props.fetchAllFields(docObj);
    }

    setTimeout(() => {
      this.props.fp();
    }, 100);
  }

  componentDidUpdate() {
    if (this.state.error.outOf) {
      setTimeout(() => {
        this.setState({
        error: {
          outOf: false
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
    if (npE !== pE) this.fetchScoringCard();
    if (npI && npI !== pI) {
      this.setState({
        product: npI,
        sId:
          npI.scrutinizerId && npI.scrutinizerStatus === 0
            ? npI.scrutinizerId
            : this.state.sId
      });

      if (npI && this.state.stages.length === 0) {
        this.setState({
          stages: npI.stages ? npI.stages : []
        });
      }

      if (npI && this.state.scoringCard.length === 0) {
        this.setState(
          {
            scoringCard: npI.scoringCard ? npI.scoringCard : [],
            isForm: false,
            scoringCardList: true
          },
          () => {
            if (this.state.scoringCard.length === 0)
              this.setState({
                scoringCardList: false,
                isAddButton: true
              });
          }
        );
      }

      if (npI && this.state.fields.length === 0) {
        this.filterFieldsParams(
          npI.scoringWeightages ? npI.scoringWeightages : []
        );
      }
    }
  };

  filterFieldsParams = sFields => {
    let tempFields = this.props.getAllFields;
    let fields = [];
    tempFields &&
      tempFields.map(field => {
        sFields.forEach(fObj => {
          if (String(fObj.fieldId) === String(field.id)) {
            fields.push({
              ...fObj,
              ...field
            });
          }
        });
      });
    this.setState({
      fields: fields
    });
  };

  handleChange = name => (event, value) => {
    if (event.target.name === "fieldId") {
      let tempFieldTypes = this.state.fields;
      let ft = tempFieldTypes.filter(type => {
        return type.id === Number(event.target.value);
      });
      this.setState({
        fieldType: ft.length > 0 ? ft[0]["dataType"] : "N/A",
        outOf: ft.length > 0 ? ft[0]["outOf"] : "N/A"
      });
    } else if (event.target.name === "score") {
      if (Number(this.state.outOf) - Number(event.target.value) < 0) {
        this.setState({
          error: {
            outOf: true
          },
          errorText: {
            outOf: `Please enter score less than or equal to ${
              this.state.outOf
            }`
          }
        });
      } else {
        this.setState({
          error: {
            outOf: false
          },
          errorText: {
            outOf: ""
          }
        });
      }
    }
    this.setState({
      [name]: event.target.value
    });
  };

  addScoringCard = () => {
    this.setState({
      scoringCardId: null,
      stageIds: [],
      fieldId: "",
      fieldType: "",
      score: "",
      minimumValue: "",
      maximumValue: "",
      staticValue: "",
      isForm: true,
      scoringCardList: false,
      outOf: ""
    });
  };

  fetchScoringCard = () => {
    this.setState(
      {
        scoringCardList: true,
        isForm: false,
        scoringCard: []
      },
      () => {
        this.props.ups(8);
        this.props.fp();
      }
    );
  };

  ceateScoringCard = () => {
    if (this.state.outOf - Number(this.state.score) < 0) {
      this.setState({
        error: {
          outOf: true
        },
        errorText: {
          outOf: `Please enter score less than or equal to ${this.state.outOf}`
        }
      });
    } else {
      let fs = this.state.scoringCard;
      if (this.state.scoringCardId) {
        if (
          !window.confirm(
            "Are you sure you want to UPDATE this scoring wightage?"
          )
        )
          return;
        fs = this.state.scoringCard.filter(documentRequirement => {
          return documentRequirement.id !== this.state.scoringCardId;
        });
      }
      this.setState(
        {
          scoringCard: [
            ...fs,
            {
              fieldId: this.state.fieldId,
              stageIds: this.state.stageIds,
              score: this.state.score,
              minimumValue: Number(this.state.minimumValue),
              maximumValue: Number(this.state.maximumValue),
              staticValue: Number(this.state.staticValue)
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
              scoringCard: this.state.scoringCard
            });
          } else {
            this.props.editProduct({
              ...this.state.product,
              pId: this.state.pId,
              scoringCard: this.state.scoringCard
            });
          }
        }
      );
    }
  };

  editScoringCard = scoringCardId => {
    let fs = this.state.scoringCard.filter(filter => {
      return filter.id === scoringCardId;
    });
    fs = fs[0];
    let tempFieldTypes = this.state.fields;
    let ft =
      tempFieldTypes &&
      tempFieldTypes.filter(type => {
        return type.id === Number(fs.fieldId);
      });
    this.setState({
      outOf: ft.length > 0 ? ft[0]["outOf"] : "N/A"
    });
    this.setState({
      scoringCardId,
      fieldId: fs.fieldId,
      fieldType: this.filterFieldTypesParams(Number(fs.fieldId), "dataType"),
      stageIds: fs.stageIds,
      score: fs.score,
      minimumValue: fs.minimumValue,
      maximumValue: fs.maximumValue,
      staticValue: fs.staticValue,
      isForm: true,
      scoringCardList: false
    });
  };

  filterFieldTypesParams = (fieldId, reqField) => {
    let tempFields = this.state.fields;
    let ff =
      tempFields &&
      tempFields.filter(field => {
        return Number(field.id) === Number(fieldId);
      });
    return ff.length > 0 ? ff[0][reqField] : "N/A";
  };

  handleChangeScoreCardStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this score card?"))
      return;
    let scoringCard = this.state.scoringCard.slice(0).filter(sc => {
      if (sc.id === e.target.name) sc["status"] = Number(!e.target.checked);
      return sc;
    });
    this.setState({ scoringCard }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          scoringCard
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          scoringCard
        });
      }
    });
  };

  filterStagesParams = sids => {
    let fs = [];
    sids.forEach(id => {
      this.state.stages.forEach(stage => {
        if (stage.id === id) fs.push(stage.name);
      });
    });
    return fs.length > 0 ? String(fs) : "N/A";
  };

  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ scoringCard }) => ({
        scoringCard: arrayMove(scoringCard, oldIndex, newIndex)
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
            scoringCard: this.state.scoringCard
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            scoringCard: this.state.scoringCard
          });
        }
      }
    );
  };

  render() {
    const { getAllFields } = this.props;
    const { fields } = this.state;
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
                      {fields ? (
                        fields.map((data, index) => (
                          <MenuItem key={data.id} value={String(data.id)}>
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
              <div
                className="col-lg-4 col-md-4 col-sm-12"
                style={{ marginTop: "-15px" }}
              >
                <div className="form-group">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="stageIds">Stages</InputLabel>
                    <Select
                      disabled={this.props.mode === "view"}
                      multiple
                      name="stageIds"
                      value={this.state.stageIds}
                      onChange={this.handleChange("stageIds")}
                    >
                      {this.state.stages
                        ? this.state.stages.map(stage => (
                            <MenuItem key={stage.id} value={stage.id}>
                              {stage.name}
                            </MenuItem>
                          ))
                        : []}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {this.state.fieldType === 0 ? (
                <React.Fragment>
                  <div
                    className="col-lg-2 col-md-2 col-sm-6"
                    style={{ marginTop: "-15px" }}
                  >
                    <TextField
                      disabled={this.props.mode === "view"}
                      label="Min"
                      name="minimumValue"
                      type="number"
                      value={this.state.minimumValue}
                      onChange={this.handleChange("minimumValue")}
                      margin="normal"
                      autoComplete="off"
                      fullWidth
                    />
                  </div>
                  <div
                    className="col-lg-2 col-md-2 col-sm-6"
                    style={{ marginTop: "-15px" }}
                  >
                    <TextField
                      disabled={this.props.mode === "view"}
                      label="Max"
                      name="maximumValue"
                      type="number"
                      value={this.state.maximumValue}
                      onChange={this.handleChange("maximumValue")}
                      margin="normal"
                      autoComplete="off"
                      fullWidth
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div
                  className="col-lg-4 col-md-4 col-sm-12"
                  style={{ marginTop: "-15px" }}
                >
                  <TextField
                    disabled={this.props.mode === "view"}
                    label="Value"
                    name="staticValue"
                    value={this.state.staticValue}
                    onChange={this.handleChange("staticValue")}
                    margin="normal"
                    autoComplete="off"
                    fullWidth
                  />
                </div>
              )}
              <div
                className="col-lg-4 col-md-4 col-sm-12"
                style={{ marginTop: "-15px" }}
              >
                <FormControl className="my-3" fullWidth>
                  <InputLabel htmlFor="score">Score</InputLabel>
                  <Input
                    disabled={this.props.mode === "view"}
                    name="score"
                    id="score"
                    type="number"
                    value={this.state.score}
                    onChange={this.handleChange("score")}
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">
                        {this.state.outOf ? `/${this.state.outOf}` : ""}
                      </InputAdornment>
                    }
                  />
                  {this.state.outOf ? (
                    <FormHelperText
                      className={this.state.error.outOf ? "text-red" : ""}
                    >
                      {this.state.error.outOf
                        ? this.state.errorText.outOf
                        : `Max Score: ${this.state.outOf}`}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <br />
                {this.state.scoringCard.length > 0 ? (
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={this.fetchScoringCard}
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
                    !this.state.stageIds ||
                    !this.state.score ||
                    this.state.score > this.state.outOf ||
                    this.props.mode === "view"
                  }
                  onClick={this.ceateScoringCard}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : this.state.scoringCardList ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <div className="actions">
                  <h3>Score Cards</h3>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="AddNewScoringCard"
                    aria-label="Add New Score Card"
                    onClick={this.addScoringCard}
                  >
                    <Tooltip title="Add New Score Card">
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
                        <TableCell>Stages</TableCell>
                        <TableCell>Value Or Min/Max</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {this.state.scoringCard.map((data, i) => {
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
                                  {this.filterStagesParams(
                                    data.stageIds ? data.stageIds : []
                                  )}
                                </TableCell>
                                <TableCell>
                                  {data.staticValue
                                    ? data.staticValue
                                    : `${
                                        data.minimumValue
                                          ? data.minimumValue
                                          : 0
                                      } (Min) : ${
                                        data.maximumValue
                                          ? data.maximumValue
                                          : 0
                                      } (Max)`}
                                </TableCell>
                                <TableCell>
                                  {data.score ? data.score : "N/A"}
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
                                          this.handleChangeScoreCardStatus
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
                                        this.editScoringCard(data.id)
                                      }
                                    >
                                      <Tooltip title="View">
                                        <i class="zmdi zmdi-eye" />
                                      </Tooltip>
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      aria-label="Edit"
                                      onClick={() =>
                                        this.editScoringCard(data.id)
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
                  onClick={this.addScoringCard}
                >
                  Add New Score Card
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
    // scoreCardField: state.QueryBuilderData.scoreFields ? state.QueryBuilderData.scoreFields.scoreCardField : "",
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
    fetchAllFields
  }
)(ScoringCard);
