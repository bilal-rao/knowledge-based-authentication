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
import { fetchAllFields } from "actions/QueryBuilder";
import QueryBuilder from "../../../../../../../../../../components/customComponents/queryBuilder/demo";
import { showDeviationLoader, fetchAllDeviation } from "actions/Deviation";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CardBox from "components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreateOverride from "@material-ui/icons/LibraryAdd";
import EditIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormHelperText } from "@material-ui/core";
import DragIcon from "@material-ui/icons/DragHandle";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import SelectComponent from "components/customComponents/selectComponent/select.js";
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

class Spread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      spread: {},
      stages: [],
      stageIds: [],
      deviations: [],
      deviationId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      data: [],
      isSpreadEdit: false,
      min: "",
      max: "",
      default: "",
      expression: "",
      expressionTree: "",
      minOverride: "",
      maxOverride: "",
      valueOverride: "",
      stageIdsOverride: [],
      statusOverride: false,
      isOverrideModalOpen: false,
      isOverrideEdit: false
    };
  }

  componentDidMount() {
    this.props.fetchAllDeviation();
    this.props.fetchAllFields();

    setTimeout(() => {
      this.props.fp();
    }, 100);
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

    if (this.state.deviations.length === 0 && nextProps.deviations.length !== 0)
      this.setState({ deviations: nextProps.deviations });
  }

  mapDataFromPropsToState = (npE, pE, npI, pI) => {
    if (npE !== pE) this.fetchSpread();
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

      if (npI.spread && !this.state.isSpreadEdit) {
        this.setState({
          isSpreadEdit: true,
          min: npI.spread.min ? npI.spread.min : "",
          max: npI.spread.max ? npI.spread.max : "",
          default: npI.spread.default ? npI.spread.default : "",
          deviationId: npI.spread.deviationId ? npI.spread.deviationId : "",
          deferredUntilStageId: npI.spread.deferredUntilStageId ? npI.spread.deferredUntilStageId : "",
          deferValidation: npI.spread.deferredUntilStageId ? true : false,
          stageIds: npI.spread.stageIds ? npI.spread.stageIds : [],
          data: npI.spread.overrides ? npI.spread.overrides : []
        });
      }
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchSpread = () => {
    this.setState(
      {
        isSpreadEdit: false
      },
      () => {
        this.props.ups(9);
        this.props.fp();
      }
    );
  };

  openOverrideModal = () => {
    this.setState({
      minOverride: "",
      maxOverride: "",
      valueOverride: "",
      expression: "",
      expressionTree: "",
      isOverrideModalOpen: true,
      isOverrideEdit: false
    });
  };

  overrideCreationHandler = () => {
    if (this.state.isOverrideEdit) {
      let fo = this.state.data.filter(override => {
        return override.id !== this.state.overrideId;
      });
      this.setState({
        data: [
          ...fo,
          {
            id: this.state.overrideId,
            expression: this.state.expression,
            expressionTree: this.state.expressionTree,
            value: this.state.valueOverride,
            stageIds: this.state.stageIdsOverride,
            status: this.state.statusOverride
          }
        ],
        isOverrideModalOpen: false
      });
    } else {
      this.setState({
        data: [
          ...this.state.data,
          {
            expression: this.state.expression,
            expressionTree: this.state.expressionTree,
            value: this.state.valueOverride,
            stageIds: this.state.stageIdsOverride,
            status: this.state.statusOverride
          }
        ],
        isOverrideModalOpen: false
      });
    }
  };

  createSpread = () => {
    if (this.state.isSpreadEdit)
      if (!window.confirm("Are you sure you want to UPDATE this spread?"))
        return;
    let spread = {
      min: Number(this.state.min),
      max: Number(this.state.max),
      default: Number(this.state.default),
      stageIds: this.state.stageIds,
      deviationId: this.state.deviationId,
      deferredUntilStageId: this.state.deferredUntilStageId,
      deferValidation: this.state.deferredUntilStageId ? true : false,
      overrides: this.state.data
    };
    this.props.showProductLoader();
    if (
      (this.props.isMakerCheckerEnabled && this.state.sId) ||
      this.props.isPending
    ) {
      this.props.editDraftProduct({
        ...this.state.product,
        sId: this.state.sId,
        pId: this.state.pId,
        spread
      });
    } else {
      this.props.editProduct({
        ...this.state.product,
        pId: this.state.pId,
        spread
      });
    }
  };

  handleChangeOverrideStatus = e => {
    let count = 0;
    let data = this.state.data.slice(0).filter(dt => {
      if (String(count) === e.target.name)
        dt["status"] = Number(!e.target.checked); // Temporary condition because currently override has no 'id' parameter
      count++;
      return dt;
    });
    this.setState({ data });
  };

  editOverride = index => {
    let fo = this.state.data[index];

    this.setState({
      overrideId: fo.id,
      stageIdsOverride:
        fo.stageIds && fo.stageIds.length > 0 ? fo.stageIds : [],
      valueOverride: fo.value,
      expression: fo.expression,
      expressionTree: fo.expressionTree,
      statusOverride: fo.status,
      isOverrideModalOpen: true,
      isOverrideEdit: true
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

  onChangeExpression = exp => {
    this.setState({ expression: exp.expression, expressionTree: exp.expressionTree });
  };

  onSortEndOverride = ({ oldIndex, newIndex }) => {
    this.setState(({ data }) => ({
      data: arrayMove(data, oldIndex, newIndex)
    }));
  };

  render() {
    const { data } = this.state;
    return (
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <FormControl className="my-3" fullWidth>
            <InputLabel htmlFor="min">Min</InputLabel>
            <Input
              disabled={this.props.mode === "view"}
              name="min"
              id="min"
              type="number"
              value={this.state.min}
              onChange={this.handleChange}
              autoComplete="off"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <FormHelperText className="text-red">
              {Number(this.state.min) &&
                Number(this.state.max) &&
                Number(this.state.min) > Number(this.state.max)
                ? "MAX must be greater than MIN"
                : null}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <FormControl className="my-3" fullWidth>
            <InputLabel htmlFor="max">Max</InputLabel>
            <Input
              disabled={this.props.mode === "view"}
              name="max"
              id="max"
              type="number"
              value={this.state.max}
              onChange={this.handleChange}
              autoComplete="off"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </FormControl>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <FormControl className="my-3" fullWidth>
            <InputLabel htmlFor="default">Default</InputLabel>
            <Input
              disabled={this.props.mode === "view"}
              name="default"
              id="default"
              type="number"
              value={this.state.default}
              onChange={this.handleChange}
              autoComplete="off"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <FormHelperText className="text-red">
              {Number(this.state.min) &&
                Number(this.state.max) &&
                Number(this.state.default) &&
                (Number(this.state.default) < Number(this.state.min) ||
                  Number(this.state.default) > Number(this.state.max))
                ? "Default value must be in between MIN & MAX value"
                : null}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="form-group">
            <FormControl className="my-3" fullWidth>
              <InputLabel htmlFor="stageIds">Stages</InputLabel>
              <Select
                disabled={this.props.mode === "view"}
                multiple
                name="stageIds"
                value={this.state.stageIds}
                onChange={this.handleChange}
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
        <div className="col-lg-4 col-md-4 col-sm-12">
          <FormControl className="my-3" fullWidth>
            <InputLabel htmlFor="deviationId">Deviation</InputLabel>
            <Select
              disabled={this.props.mode === "view"}
              name="deviationId"
              onChange={this.handleChange}
              value={this.state.deviationId}
            >
              {this.state.deviations
                ? this.state.deviations.map((data, index) => (
                  <MenuItem key={index} value={String(data.id)}>
                    {data.name}
                  </MenuItem>
                ))
                : []}
            </Select>
          </FormControl>
        </div>
        <div
          className="col-lg-4 col-md-4 col-sm-12 p-t-15"
          style={{ paddingTop: "8px" }}
        >
          <SelectComponent
            onChange={ev => this.setState({ deferredUntilStageId: ev })}
            items={this.state.stages ? this.state.stages : []}
            single={this.state.deferredUntilStageId}
            type={"single"}
            label={"Select Defer Stage"}
            placeholder="Defer Stages"
            mode={this.props.mode}
          />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <br />
          <div className="actions">
            <h3>Overrides</h3>
            <IconButton
              name="CreateOverride"
              aria-label="Create Override"
              disabled={
                !Number(this.state.min) ||
                !Number(this.state.max) ||
                this.state.stageIds.length === 0 ||
                !this.state.deviationId ||
                this.props.mode === "view"
              }
              onClick={this.openOverrideModal}
            >
              <Tooltip title="Create Override">
                <CreateOverride />
              </Tooltip>
            </IconButton>
          </div>
        </div>
        <CardBox styleName="col-lg-12 col-md-12 col-sm-12" cardStyle="p-0">
          <div className="table-responsive-material">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding={"none"} />
                  <TableCell>Condition</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Stages</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <SortableContainer
                onSortEnd={this.onSortEndOverride}
                useDragHandle
              >
                {data &&
                  data.map((n, i) => {
                    return (
                      <SortableItem
                        key={n.id}
                        index={i}
                        value={
                          <React.Fragment>
                            <TableCell>{n.expression}</TableCell>
                            <TableCell>
                              {n.value ? `${n.value}%` : "0%"}
                            </TableCell>
                            <TableCell>
                              {this.filterStagesParams(
                                n.stageIds ? n.stageIds : []
                              )}
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
                                      n.status === 0 ? "Active" : "In-Active"
                                    }
                                    disabled={this.props.mode === "view"}
                                    name={String(i)}
                                    checked={n.status === 0}
                                    onChange={this.handleChangeOverrideStatus}
                                  />
                                }
                              />
                            </TableCell>
                            <TableCell>
                              {this.props.mode === "view" ? (
                                <IconButton
                                  aria-label="View"
                                  onClick={() => this.editOverride(i)}
                                >
                                  <Tooltip title="View">
                                    <i class="zmdi zmdi-eye" />
                                  </Tooltip>
                                </IconButton>
                              ) : (
                                  <IconButton
                                    aria-label="Edit"
                                    onClick={() => this.editOverride(i)}
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
        <div className="col-lg-12 col-md-12 col-sm-12 text-right">
          <br />
          {this.state.isSpreadEdit ? (
            <Button
              name="cancel"
              variant="contained"
              className="jr-btn bg-white text-black"
              onClick={this.fetchSpread}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            className="jr-btn text-uppercase"
            disabled={
              !Number(this.state.min) ||
              !Number(this.state.max) ||
              Number(this.state.min) > Number(this.state.max) ||
              (Number(this.state.default) &&
                (Number(this.state.default) < Number(this.state.min) ||
                  Number(this.state.default) > Number(this.state.max))) ||
              this.state.stageIds.length === 0 ||
              !this.state.deviationId ||
              this.props.mode === "view"
            }
            onClick={this.createSpread}
          >
            Save
          </Button>
        </div>
        {this.state.isOverrideModalOpen ? (
          <Dialog
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            maxWidth="md"
          >
            <DialogTitle>
              {this.state.isOverrideEdit ? "Edit" : "Create"} Override
            </DialogTitle>
            <DialogContent>
              <form className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <QueryBuilder
                    expression={this.state.expression}
                    expressionTree={this.state.expressionTree}
                    onChange={this.onChangeExpression}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="valueOverride">Value</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="valueOverride"
                      id="valueOverride"
                      type="number"
                      value={this.state.valueOverride}
                      onChange={this.handleChange}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="stageIdsOverride">Stages</InputLabel>
                      <Select
                        disabled={this.props.mode === "view"}
                        multiple
                        name="stageIdsOverride"
                        value={this.state.stageIdsOverride}
                        onChange={this.handleChange}
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
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                name=""
                onClick={() => {
                  this.setState({ isOverrideModalOpen: false });
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                name=""
                disabled={!this.state.expression || !this.state.valueOverride}
                onClick={this.overrideCreationHandler}
                color="primary"
              >
                Process
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : false,
    deviations: state.deviationData.allDeviations
      ? state.deviationData.allDeviations.data.items
      : [],
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
    fetchAllFields
  }
)(Spread);
