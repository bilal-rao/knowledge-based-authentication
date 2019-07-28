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
import SelectComponent from "components/customComponents/selectComponent/select.js";
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

class ProcessingFees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      processingFees: {},
      stages: [],
      stageIds: [],
      deviations: [],
      deviationId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      type: "",
      data: [],
      isProcessingFeesEdit: false,
      minP: 0,
      maxP: 0,
      minF: 0,
      maxF: 0,
      defP: 0,
      defF: 0,
      expression: "",
      expressionTree: "",
      typeOverride: "",
      percentageValueOverride: "",
      fixedValueOverride: "",
      statusOverride: false,
      stageIdsOverride: [],
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
    if (npE !== pE) this.fetchProcessingFees();
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

      if (npI.processingFees && !this.state.isProcessingFeesEdit) {
        this.setState({
          isProcessingFeesEdit: true,
          type: npI.processingFees.type,
          minP: npI.processingFees.minimumPercentage
            ? npI.processingFees.minimumPercentage
            : 0,
          maxP: npI.processingFees.maximumPercentage
            ? npI.processingFees.maximumPercentage
            : 0,
          minF: npI.processingFees.minimumFixed
            ? npI.processingFees.minimumFixed
            : 0,
          maxF: npI.processingFees.maximumFixed
            ? npI.processingFees.maximumFixed
            : 0,
          defP: npI.processingFees.defaultPercentage
            ? npI.processingFees.defaultPercentage
            : 0,
          defF: npI.processingFees.defaultFixed
            ? npI.processingFees.defaultFixed
            : 0,
          deviationId: npI.processingFees.deviationId,
          deferredUntilStageId: npI.processingFees.deferredUntilStageId,
          deferValidation: npI.processingFees.deferredUntilStageId ? true : false,
          stageIds: npI.processingFees.stageIds
            ? npI.processingFees.stageIds
            : [],
          data: npI.processingFees.overrides ? npI.processingFees.overrides : []
        });
      }
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchProcessingFees = () => {
    this.setState(
      {
        isProcessingFeesEdit: false
      },
      () => {
        this.props.ups(0);
        this.props.fp();
      }
    );
  };

  openOverrideModal = () => {
    this.setState({
      typeOverride: this.state.type,
      fixedValueOverride: "",
      percentageValueOverride: "",
      expression: "",
      expressionTree: "",
      isOverrideModalOpen: true,
      isOverrideEdit: false
    });
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
            type: this.state.typeOverride,
            percentageValue: this.state.percentageValueOverride,
            fixedValue: this.state.fixedValueOverride,
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
            type: this.state.typeOverride,
            percentageValue: this.state.percentageValueOverride,
            stageIds: this.state.stageIdsOverride,
            status: this.state.statusOverride
          }
        ],
        isOverrideModalOpen: false
      });
    }
  };

  editOverride = index => {
    let fo = this.state.data[index];
    this.setState({
      overrideId: fo.id,
      stageIdsOverride:
        fo.stageIds && fo.stageIds.length > 0 ? fo.stageIds : [],
      typeOverride: fo.type,
      percentageValueOverride: fo.percentageValue,
      expression: fo.expression,
      expressionTree: fo.expressionTree,
      statusOverride: fo.status,
      isOverrideModalOpen: true,
      isOverrideEdit: true
    });
  };

  deleteField = obj => {
    let newArr = this.state.data;
    newArr = newArr.filter(arr => {
      return arr !== obj;
    });
    this.setState({
      data: newArr
    });
  };

  createProcessingFees = () => {
    if (this.state.isProcessingFeesEdit)
      if (
        !window.confirm("Are you sure you want to UPDATE this Processing Fees?")
      )
        return;
    let processingFees = {
      type: this.state.type,
      minimumPercentage: Number(this.state.minP),
      maximumPercentage: Number(this.state.maxP),
      minimumFixed: Number(this.state.minF),
      maximumFixed: Number(this.state.maxF),
      defaultPercentage: Number(this.state.defP),
      defaultFixed: Number(this.state.defF),
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
        processingFees
      });
    } else {
      this.props.editProduct({
        ...this.state.product,
        pId: this.state.pId,
        processingFees
      });
    }
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

  checkControl = type => {
    let cond = false;
    if (type == "0") {
      cond =
        !Number(this.state.minP) ||
        !Number(this.state.maxP) ||
        !Number(this.state.defP) ||
        Number(this.state.minP) > Number(this.state.maxP) ||
        (Number(this.state.defP) < Number(this.state.minP) ||
          Number(this.state.defP) > Number(this.state.maxP)) ||
        this.state.stageIds.length === 0 ||
        !this.state.deviationId;
    } else if (type == "1") {
      cond =
        !Number(this.state.minF) ||
        !Number(this.state.maxF) ||
        !Number(this.state.defF) ||
        Number(this.state.minF) > Number(this.state.maxF) ||
        (Number(this.state.defF) < Number(this.state.minF) ||
          Number(this.state.defF) > Number(this.state.maxF)) ||
        this.state.stageIds.length === 0 ||
        !this.state.deviationId;
    } else {
      cond =
        !Number(this.state.minP) ||
        !Number(this.state.maxP) ||
        !Number(this.state.defP) ||
        Number(this.state.minP) > Number(this.state.maxP) ||
        (Number(this.state.defP) < Number(this.state.minP) ||
          Number(this.state.defP) > Number(this.state.maxP)) ||
        this.state.stageIds.length === 0 ||
        !this.state.deviationId ||
        !Number(this.state.minF) ||
        !Number(this.state.maxF) ||
        !Number(this.state.defF) ||
        Number(this.state.minF) > Number(this.state.maxF) ||
        (Number(this.state.defF) < Number(this.state.minF) ||
          Number(this.state.defF) > Number(this.state.maxF));
    }
    return cond;
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
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select
              disabled={this.props.mode === "view"}
              name="type"
              onChange={this.handleChange}
              value={String(this.state.type)}
            >
              <MenuItem value={"0"}>Percentage</MenuItem>
              <MenuItem value={"1"}>Fixed</MenuItem>
              <MenuItem value={"2"}>Both (Percentage & Fixed)</MenuItem>
            </Select>
          </FormControl>
        </div>
        {this.state.type == "0" ? (
          <React.Fragment>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControl className="my-3" fullWidth>
                <InputLabel htmlFor="minP">Min (%)</InputLabel>
                <Input
                  disabled={this.props.mode === "view"}
                  name="minP"
                  id="minP"
                  type="number"
                  value={this.state.minP}
                  onChange={this.handleChange}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
                <FormHelperText className="text-red">
                  {Number(this.state.minP) &&
                    Number(this.state.maxP) &&
                    Number(this.state.minP) > Number(this.state.maxP)
                    ? "MAX must be greater than MIN"
                    : null}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControl className="my-3" fullWidth>
                <InputLabel htmlFor="maxP">Max (%)</InputLabel>
                <Input
                  disabled={this.props.mode === "view"}
                  name="maxP"
                  id="maxP"
                  type="number"
                  value={this.state.maxP}
                  onChange={this.handleChange}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControl className="my-3" fullWidth>
                <InputLabel htmlFor="defP">Default (%)</InputLabel>
                <Input
                  disabled={this.props.mode === "view"}
                  name="defP"
                  id="defP"
                  type="number"
                  value={this.state.defP}
                  onChange={this.handleChange}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
                <FormHelperText className="text-red">
                  {Number(this.state.minP) &&
                    Number(this.state.maxP) &&
                    Number(this.state.defP) &&
                    (Number(this.state.defP) < Number(this.state.minP) ||
                      Number(this.state.defP) > Number(this.state.maxP))
                    ? "Default value must be in between MIN & MAX value"
                    : null}
                </FormHelperText>
              </FormControl>
            </div>
          </React.Fragment>
        ) : this.state.type == "1" ? (
          <React.Fragment>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControl className="my-3" fullWidth>
                <InputLabel htmlFor="minF">Min (PKR)</InputLabel>
                <Input
                  disabled={this.props.mode === "view"}
                  name="minF"
                  id="minF"
                  type="number"
                  value={this.state.minF}
                  onChange={this.handleChange}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">PKR</InputAdornment>
                  }
                />
                <FormHelperText className="text-red">
                  {Number(this.state.minF) &&
                    Number(this.state.maxF) &&
                    Number(this.state.minF) > Number(this.state.maxF)
                    ? "MAX must be greater than MIN"
                    : null}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControl className="my-3" fullWidth>
                <InputLabel htmlFor="maxF">Max (PKR)</InputLabel>
                <Input
                  disabled={this.props.mode === "view"}
                  name="maxF"
                  id="maxF"
                  type="number"
                  value={this.state.maxF}
                  onChange={this.handleChange}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">PKR</InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControl className="my-3" fullWidth>
                <InputLabel htmlFor="defF">Default (PKR)</InputLabel>
                <Input
                  disabled={this.props.mode === "view"}
                  name="defF"
                  id="defF"
                  type="number"
                  value={this.state.defF}
                  onChange={this.handleChange}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">PKR</InputAdornment>
                  }
                />
                <FormHelperText className="text-red">
                  {Number(this.state.minF) &&
                    Number(this.state.maxF) &&
                    Number(this.state.defF) &&
                    (Number(this.state.defF) < Number(this.state.minF) ||
                      Number(this.state.defF) > Number(this.state.maxF))
                    ? "Default value must be in between MIN & MAX value"
                    : null}
                </FormHelperText>
              </FormControl>
            </div>
          </React.Fragment>
        ) : (
              <React.Fragment>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="minP">Min (%)</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="minP"
                      id="minP"
                      type="number"
                      value={this.state.minP}
                      onChange={this.handleChange}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                    <FormHelperText className="text-red">
                      {Number(this.state.minP) &&
                        Number(this.state.maxP) &&
                        Number(this.state.minP) > Number(this.state.maxP)
                        ? "MAX must be greater than MIN"
                        : null}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="maxP">Max (%)</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="maxP"
                      id="maxP"
                      type="number"
                      value={this.state.maxP}
                      onChange={this.handleChange}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="minF">Min (PKR)</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="minF"
                      id="minF"
                      type="number"
                      value={this.state.minF}
                      onChange={this.handleChange}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">PKR</InputAdornment>
                      }
                    />
                    <FormHelperText className="text-red">
                      {Number(this.state.minF) &&
                        Number(this.state.maxF) &&
                        Number(this.state.minF) > Number(this.state.maxF)
                        ? "MAX must be greater than MIN"
                        : null}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="maxF">Max (PKR)</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="maxF"
                      id="maxF"
                      type="number"
                      value={this.state.maxF}
                      onChange={this.handleChange}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">PKR</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="defP">Default (%)</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="defP"
                      id="defP"
                      type="number"
                      value={this.state.defP}
                      onChange={this.handleChange}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                    <FormHelperText className="text-red">
                      {Number(this.state.minP) &&
                        Number(this.state.maxP) &&
                        Number(this.state.defP) &&
                        (Number(this.state.defP) < Number(this.state.minP) ||
                          Number(this.state.defP) > Number(this.state.maxP))
                        ? "Default value must be in between MIN & MAX value"
                        : null}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="defF">Default (PKR)</InputLabel>
                    <Input
                      disabled={this.props.mode === "view"}
                      name="defF"
                      id="defF"
                      type="number"
                      value={this.state.defF}
                      onChange={this.handleChange}
                      autoComplete="off"
                    />
                    <FormHelperText className="text-red">
                      {Number(this.state.minF) &&
                        Number(this.state.maxF) &&
                        Number(this.state.defF) &&
                        (Number(this.state.defF) < Number(this.state.minF) ||
                          Number(this.state.defF) > Number(this.state.maxF))
                        ? "Default value must be in between MIN & MAX value"
                        : null}
                    </FormHelperText>
                  </FormControl>
                </div>
              </React.Fragment>
            )}

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
                !Number(this.state.minP) ||
                !Number(this.state.maxP) ||
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
          {this.state.isProcessingFeesEdit ? (
            <Button
              name="cancel"
              variant="contained"
              className="jr-btn bg-white text-black"
              onClick={this.fetchProcessingFees}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            className="jr-btn text-uppercase"
            disabled={
              this.checkControl(this.state.type) || this.props.mode === "view"
            }
            onClick={this.createProcessingFees}
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
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="typeOverride">Type</InputLabel>
                    <Select
                      disabled={this.props.mode === "view"}
                      name="typeOverride"
                      onChange={this.handleChange}
                      value={String(this.state.typeOverride)}
                    >
                      <MenuItem value={"0"}>Percentage</MenuItem>
                      <MenuItem value={"1"}>Fixed</MenuItem>
                      <MenuItem value={"2"}>Mixed</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {this.state.typeOverride === "0" ? (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="percentageValueOverride">
                        Percentage Value
                      </InputLabel>
                      <Input
                        disabled={this.props.mode === "view"}
                        name="percentageValueOverride"
                        id="percentageValueOverride"
                        type="number"
                        value={this.state.percentageValueOverride}
                        onChange={this.handleChange}
                        autoComplete="off"
                        endAdornment={
                          <InputAdornment position="end">%</InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                ) : this.state.typeOverride === "1" ? (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <FormControl className="my-3" fullWidth>
                      <InputLabel htmlFor="fixedValueOverride">
                        Fixed Value
                      </InputLabel>
                      <Input
                        disabled={this.props.mode === "view"}
                        name="fixedValueOverride"
                        id="fixedValueOverride"
                        type="number"
                        value={this.state.fixedValueOverride}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                    </FormControl>
                  </div>
                ) : (
                      <React.Fragment>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <FormControl className="my-3" fullWidth>
                            <InputLabel htmlFor="percentageValueOverride">
                              Percentage Value
                        </InputLabel>
                            <Input
                              disabled={this.props.mode === "view"}
                              name="percentageValueOverride"
                              id="percentageValueOverride"
                              type="number"
                              value={this.state.percentageValueOverride}
                              onChange={this.handleChange}
                              autoComplete="off"
                              endAdornment={
                                <InputAdornment position="end">%</InputAdornment>
                              }
                            />
                          </FormControl>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <FormControl className="my-3" fullWidth>
                            <InputLabel htmlFor="fixedValueOverride">
                              Fixed Value
                        </InputLabel>
                            <Input
                              disabled={this.props.mode === "view"}
                              name="fixedValueOverride"
                              id="fixedValueOverride"
                              type="number"
                              value={this.state.fixedValueOverride}
                              onChange={this.handleChange}
                              autoComplete="off"
                            />
                          </FormControl>
                        </div>
                      </React.Fragment>
                    )}
                <div className="col-lg-4 col-md-6 col-sm-12">
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
                disabled={this.props.mode === "view" || !this.state.expression}
                name="process"
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
)(ProcessingFees);
