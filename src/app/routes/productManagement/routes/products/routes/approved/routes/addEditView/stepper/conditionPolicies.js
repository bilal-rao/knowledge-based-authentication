import React from "react";
import moment from "moment";
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
import QueryBuilder from "components/customComponents/queryBuilder/demo";
import { showDeviationLoader, fetchAllDeviation } from "actions/Deviation";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardBox from "components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreateOverride from "@material-ui/icons/LibraryAdd";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormHelperText } from "@material-ui/core";
import SelectComponent from "components/customComponents/selectComponent/select.js";
import CustomDateRange from "components/customComponents/DateRange/index";
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

class ConditionPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      policies: [],
      fieldList: [],
      stages: [],
      stageIds: [],
      fieldTypes: [{ id: 1, name: "Error" }, { id: 2, name: "Warning" }],
      deviations: [],
      fieldId: "",
      deviationId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      data: [],
      policyId: null,
      fieldCriteria: "",
      staticValue: "",
      minimumValue: "",
      maximumValue: "",
      fieldType: "",
      dateRange: "",
      minDate: "",
      fromDate: "",
      toDate: "",
      code: "",
      message: "",
      isHidden: false,
      overrideId: null,
      expression: "",
      expressionTree: "",
      minOverride: "",
      maxOverride: "",
      staticValueOverride: "",
      dateRangeOverride: "",
      fromDateOverride: "",
      toDateOverride: "",
      stageIdsOverride: [],
      isEnable: false,
      fieldTypeOverride: "",
      codeOverride: "",
      messageOverride: "",
      isHiddenOverride: false,
      statusOverride: null,
      isCalenderOpen: false,
      isaddNewPolicy: false,
      addEditViewPolicy: false,
      showPoliciesList: false,
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
    if (this.state.fieldList.length === 0 && nextProps.fieldList.length !== 0)
      this.setState({ fieldList: nextProps.fieldList });
  }

  mapDataFromPropsToState = (npE, pE, npI, pI) => {
    if (npE !== pE) this.fetchPolicies();
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

      if (npI && this.state.policies.length === 0) {
        this.setState(
          {
            policies: npI.policies ? npI.policies : [],
            addEditViewPolicy: false,
            showPoliciesList: true
          },
          () => {
            if (this.state.policies.length === 0)
              this.setState({
                showPoliciesList: false,
                isaddNewPolicy: true
              });
          }
        );
      }
    }
  };

  handleChange = e => {
    e.persist();
    this.setState(
      {
        [e.target.name]:
          e.target.name === "isHidden" || e.target.name === "isHiddenOverride"
            ? e.target.checked
            : (e.target.name === "code" || e.target.name === "codeOverride") &&
              e.nativeEvent.data === " "
              ? e.target.value.replace(/ /g, "")
              : e.target.value
      },
      () => {
        if (e.target.name && e.target.name === "fieldId")
          this.setState({
            fieldCriteria: this.filterFieldsParams(e.target.value, "dataType")
          });
      }
    );
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

  handleChangePolicyStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this policy?")) return;
    let policies = this.state.policies.slice(0).filter(pol => {
      if (pol.id === e.target.name) pol["status"] = Number(!e.target.checked);
      return pol;
    });
    this.setState({ policies }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          policies
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          policies
        });
      }
    });
  };

  addNewPolicy = () => {
    this.setState({
      policyId: null,
      fieldId: "",
      staticValue: "",
      minimumValue: "",
      maximumValue: "",
      stageIds: [],
      fieldType: "",
      dateRange: "",
      fromDate: "",
      toDate: "",
      code: "",
      message: "",
      isHidden: false,
      data: [],
      addEditViewPolicy: true,
      showPoliciesList: false
    });
  };

  fetchPolicies = () => {
    this.setState(
      {
        showPoliciesList: true,
        addEditViewPolicy: false,
        isCalenderOpen: false,
        policies: []
      },
      () => {
        this.props.ups(4);
        this.props.fp();
      }
    );
  };

  openOverrideModal = () => {
    this.setState({
      overrideId: "",
      stageIdsOverride: [],
      minimumValueOverride: "",
      maximumValueOverride: "",
      staticValueOverride: "",
      fieldTypeOverride: "",
      dateRangeOverride: "",
      fromDateOverride: "",
      toDateOverride: "",
      codeOverride: "",
      messageOverride: "",
      isHiddenOverride: false,
      expression: "",
      expressionTree: "",
      statusOverride: null,
      isOverrideModalOpen: true,
      isOverrideEdit: false
    });
  };

  editOverride = index => {
    let fo = this.state.data[index];

    this.setState({
      overrideId: fo.id,
      stageIdsOverride:
        fo.set.stageIds && fo.set.stageIds.length > 0 ? fo.set.stageIds : [],
      minimumValueOverride: Number(fo.set.minimumValue),
      maximumValueOverride: Number(fo.set.maximumValue),
      staticValueOverride: fo.set.staticValue,
      fieldTypeOverride: fo.set.fieldType,
      fromDateOverride: fo.set.fromDate,
      toDateOverride: fo.set.toDate,
      dateRangeOverride:
        fo.set.fromDate && fo.set.toDate
          ? `${moment(fo.set.fromDate, "YYYYMMDDHHmmss").format(
            "MM/DD/YYYY"
          )} - ${moment(fo.set.toDate, "YYYYMMDDHHmmss").format(
            "MM/DD/YYYY"
          )}`
          : fo.set.fromDate && !fo.set.toDate
            ? `${moment(fo.set.fromDate, "YYYYMMDDHHmmss").format(
              "MM/DD/YYYY"
            )} - Infinite`
            : "",
      codeOverride: fo.set.code,
      messageOverride: fo.set.message,
      isHiddenOverride: fo.set.isHidden,
      expression: fo.expression,
      expressionTree: fo.expressionTree ? fo.expressionTree : "",
      statusOverride: fo.status,
      isOverrideModalOpen: true,
      isOverrideEdit: true
    });
  };

  overrideCreationHandler = () => {
    let set = {
      staticValue: this.state.staticValueOverride,
      minimumValue: Number(this.state.minimumValueOverride),
      maximumValue: Number(this.state.maximumValueOverride),
      fieldType: this.state.fieldTypeOverride,
      dateRange: this.state.dateRangeOverride,
      fromDate: this.state.fromDateOverride,
      toDate: this.state.toDateOverride,
      code: this.state.codeOverride,
      stageIds: this.state.stageIdsOverride,
      message: this.state.messageOverride,
      isHidden: this.state.isHiddenOverride
    };

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
            status: this.state.statusOverride,
            fieldId: this.state.fieldId,
            set
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
            fieldId: this.state.fieldId,
            status: 1,
            set
          }
        ],
        isOverrideModalOpen: false
      });
    }
  };

  handleFieldGrid = (field, index) => {
    let newArr = this.state.data;
    newArr[index] = field;
    this.setState({
      data: newArr
    });
  };

  createPolicy = () => {
    let fs = this.state.policies;
    if (this.state.policyId) {
      if (!window.confirm("Are you sure you want to UPDATE this policy?"))
        return;
      fs = this.state.policies.filter(policy => {
        return policy.id !== this.state.policyId;
      });
    }
    let set = {
      fieldType: this.state.fieldType,
      minimumValue: Number(this.state.minimumValue),
      maximumValue: Number(this.state.maximumValue),
      staticValue: this.state.staticValue,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      code: this.state.code,
      message: this.state.message,
      isHidden: this.state.isHidden,
      stageIds: this.state.stageIds
    };
    this.setState(
      {
        policies: [
          ...fs,
          {
            id: this.state.policyId,
            fieldId: this.state.fieldId,
            deviationId: this.state.deviationId,
            deferredUntilStageId: this.state.deferredUntilStageId,
            deferValidation: this.state.deferredUntilStageId ? true : false,
            set,
            overrides: this.state.data
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
            policies: this.state.policies
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            policies: this.state.policies
          });
        }
      }
    );
  };

  editPolicy = policyId => {
    let fp = this.state.policies.filter(policy => {
      return policy.id === policyId;
    });
    fp = fp[0];
    this.setState({
      policyId: fp.id,
      fieldId: Number(fp.fieldId),
      deviationId: fp.deviationId,
      deferredUntilStageId: fp.deferredUntilStageId,
      deferValidation: fp.deferredUntilStageId ? true : false,
      fieldType: fp.set.fieldType,
      minimumValue: Number(fp.set.minimumValue),
      maximumValue: Number(fp.set.maximumValue),
      staticValue: fp.set.staticValue,
      fieldCriteria: this.filterFieldsParams(Number(fp.fieldId), "dataType"),
      minDate: fp.set.fromDate ? fp.set.fromDate : moment(),
      fromDate: fp.set.fromDate,
      toDate: fp.set.toDate,
      dateRange:
        fp.set.fromDate && fp.set.toDate
          ? `${moment(fp.set.fromDate, "YYYYMMDDHHmmss").format(
            "MM/DD/YYYY"
          )} - ${moment(fp.set.toDate, "YYYYMMDDHHmmss").format(
            "MM/DD/YYYY"
          )}`
          : fp.set.fromDate && !fp.set.toDate
            ? `${moment(fp.set.fromDate, "YYYYMMDDHHmmss").format(
              "MM/DD/YYYY"
            )} - Infinite`
            : "",
      code: fp.set.code,
      message: fp.set.message,
      isHidden: fp.set.isHidden,
      stageIds: fp.set.stageIds,
      data: fp.overrides ? fp.overrides : [],
      addEditViewPolicy: true,
      showPoliciesList: false
    });
  };

  checkMenuItemExistense = () => {
    let res =
      this.state.policies.length > 0
        ? this.state.policies.map(policy => {
          return policy.fieldId;
        })
        : [];
    return res;
  };

  filterFieldsParams = (fieldId, reqField) => {
    let tempFields = this.state.fieldList;
    let ff = tempFields.filter(field => {
      return Number(field.id) === Number(fieldId);
    });
    return ff.length > 0 ? ff[0][reqField] : "N/A";
  };

  filterDeviationsParams = (deviationId, reqField) => {
    let tempDeviations = this.state.deviations;
    let fd = tempDeviations.filter(deviation => {
      return deviation.id === Number(deviationId);
    });
    return fd.length > 0 ? fd[0][reqField] : "N/A";
  };

  filterFieldTypeParams = typeId => {
    let tempFieldTypes = this.state.fieldTypes;
    let ft = tempFieldTypes.filter(type => {
      return type.id === Number(typeId);
    });
    return ft.length > 0 ? ft[0]["name"] : "N/A";
  };

  onDateRangeClick = () => {
    this.setState({ isCalenderOpen: true });
  };

  onChangeDateRange = date => {
    if (this.state.isOverrideModalOpen) {
      this.setState({
        dateRangeOverride: `${date.startDate.format("MM/DD/YYYY")} - ${
          date.startDate.format("YYYYMMDD") !== date.endDate.format("YYYYMMDD")
            ? date.endDate.format("MM/DD/YYYY")
            : "Infinite"
          } `,
        fromDateOverride: date.startDate.format("YYYYMMDDHHmmss"),
        toDateOverride:
          date.startDate.format("YYYYMMDD") !== date.endDate.format("YYYYMMDD")
            ? date.endDate.format("YYYYMMDDHHmmss")
            : ""
      });
    } else {
      this.setState({
        dateRange: `${date.startDate.format("MM/DD/YYYY")} - ${
          date.startDate.format("YYYYMMDD") !== date.endDate.format("YYYYMMDD")
            ? date.endDate.format("MM/DD/YYYY")
            : "Infinite"
          }`,
        fromDate: date.startDate.format("YYYYMMDDHHmmss"),
        toDate:
          date.startDate.format("YYYYMMDD") !== date.endDate.format("YYYYMMDD")
            ? date.endDate.format("YYYYMMDDHHmmss")
            : ""
      });
    }
  };

  onSaveDateRange = () => {
    this.setState({ isCalenderOpen: false });
  };

  onClearDateRange = () => {
    if (this.state.isOverrideModalOpen) {
      this.setState({
        dateRangeOverride: "",
        fromDateOverride: "",
        toDateOverride: "",
        isCalenderOpen: false
      });
    } else {
      this.setState({
        dateRange: "",
        fromDate: "",
        toDate: "",
        isCalenderOpen: false
      });
    }
  };

  onChangeExpression = exp => {
    this.setState({ expression: exp.expression, expressionTree: exp.expressionTree });
  };

  onSortEndOverride = ({ oldIndex, newIndex }) => {
    this.setState(({ data }) => ({
      data: arrayMove(data, oldIndex, newIndex)
    }));
  };

  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ policies }) => ({
        policies: arrayMove(policies, oldIndex, newIndex)
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
            policies: this.state.policies
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            policies: this.state.policies
          });
        }
      }
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          {this.state.addEditViewPolicy ? (
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-sm-12 p-t-15"
                style={{ paddingTop: "8px" }}
              >
                <SelectComponent
                  onChange={ev =>
                    this.setState({
                      fieldId: ev,
                      fieldCriteria: this.filterFieldsParams(ev, "dataType")
                    })
                  }
                  items={this.state.fieldList ? this.state.fieldList : []}
                  single={this.state.fieldId}
                  type={"single"}
                  label={"Select Field"}
                  placeholder="Fields"
                  dv={this.checkMenuItemExistense()}
                  mode={this.props.mode}
                />
              </div>
              <div
                className="col-lg-4 col-md-4 col-sm-12 p-t-15"
                style={{ paddingTop: "8px" }}
              >
                <SelectComponent
                  onChange={ev => this.setState({ deviationId: ev })}
                  items={this.state.deviations ? this.state.deviations : []}
                  single={this.state.deviationId}
                  type={"single"}
                  label={"Select Deviation"}
                  placeholder="Deviations"
                  mode={this.props.mode}
                />
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
              {this.state.fieldCriteria === 0 ? (
                <React.Fragment>
                  <div className="col-lg-2 col-md-2 col-sm-6">
                    <TextField
                      label="Min"
                      name="minimumValue"
                      type="number"
                      value={Number(this.state.minimumValue)}
                      onChange={this.handleChange}
                      margin="normal"
                      autoComplete="off"
                      fullWidth
                      disabled={this.props.mode === "view"}
                    />
                    <FormHelperText
                      className={
                        Number(this.state.minimumValue) >
                          Number(this.state.maximumValue)
                          ? "text-red"
                          : ""
                      }
                    >
                      {Number(this.state.minimumValue) &&
                        Number(this.state.maximumValue) &&
                        Number(this.state.minimumValue) >
                        Number(this.state.maximumValue)
                        ? "MAX must be greater than MIN"
                        : null}
                    </FormHelperText>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-6">
                    <TextField
                      label="Max"
                      name="maximumValue"
                      type="number"
                      value={Number(this.state.maximumValue)}
                      onChange={this.handleChange}
                      margin="normal"
                      autoComplete="off"
                      fullWidth
                      disabled={this.props.mode === "view"}
                    />
                  </div>
                </React.Fragment>
              ) : (
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <TextField
                      label="Value"
                      name="staticValue"
                      value={this.state.staticValue}
                      onChange={this.handleChange}
                      margin="normal"
                      autoComplete="off"
                      fullWidth
                      disabled={this.props.mode === "view"}
                    />
                  </div>
                )}
              <div
                className="col-lg-4 col-md-4 col-sm-12 p-t-15"
                style={{ paddingTop: "8px" }}
              >
                <SelectComponent
                  onChange={ev => this.setState({ stageIds: ev })}
                  items={this.state.stages ? this.state.stages : []}
                  single={this.state.stageIds}
                  type={"multi"}
                  label={"Select Stage"}
                  placeholder="Stages"
                  mode={this.props.mode}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControl className="my-3" fullWidth>
                  <InputLabel htmlFor="type">Type</InputLabel>
                  <Select
                    name="fieldType"
                    id="type"
                    style={{ width: "inherit" }}
                    onChange={this.handleChange}
                    value={this.state.fieldType}
                    disabled={this.props.mode === "view"}
                  >
                    {this.state.fieldTypes.map(type => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  label="Date Range (From-To Date)"
                  name="dateRange"
                  value={this.state.dateRange}
                  onClick={this.onDateRangeClick}
                  disabled={this.props.mode === "view"}
                  readOnly={true}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
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
                  disabled={this.props.mode === "view"}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  label="Message"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                  disabled={this.props.mode === "view"}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControlLabel
                  label="Hidden Policy"
                  className="p-t-20"
                  control={
                    <Switch
                      classes={{
                        checked: "text-primary",
                        bar: "bg-primary"
                      }}
                      disabled={this.props.mode === "view"}
                      name="isHidden"
                      checked={this.state.isHidden}
                      onChange={this.handleChange}
                      aria-label="isHidden"
                    />
                  }
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <br />
                <div className="actions">
                  <h3>Overrides</h3>
                  <IconButton
                    name="CreateOverride"
                    aria-label="Create Override"
                    disabled={!this.state.fieldId || this.props.mode === "view"}
                    onClick={this.openOverrideModal}
                  >
                    <Tooltip title="Create Override">
                      <CreateOverride />
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
                        <TableCell>Condition</TableCell>
                        <TableCell>Value Or Min/Max</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>From-To Date</TableCell>
                        <TableCell>Hidden</TableCell>
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
                              key={`item-${i}`}
                              index={i}
                              value={
                                <React.Fragment>
                                  <TableCell>{n.expression}</TableCell>
                                  <TableCell>
                                    {this.state.fieldCriteria === 0
                                      ? `${
                                      n.set.minimumValue
                                        ? n.set.minimumValue
                                        : 0
                                      } (Min) : ${
                                      n.set.maximumValue
                                        ? n.set.maximumValue
                                        : 0
                                      } (Max)`
                                      : n.set.staticValue}
                                  </TableCell>
                                  <TableCell>
                                    {this.filterFieldTypeParams(
                                      n.set.fieldType
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {n.set.fromDate && n.set.toDate
                                      ? `${moment(
                                        n.set.fromDate,
                                        "YYYYMMDDHHmmss"
                                      ).format("MM/DD/YYYY")} - ${moment(
                                        n.set.toDate,
                                        "YYYYMMDDHHmmss"
                                      ).format("MM/DD/YYYY")}`
                                      : n.set.fromDate && !n.set.toDate
                                        ? `${moment(
                                          n.set.fromDate,
                                          "YYYYMMDDHHmmss"
                                        ).format("MM/DD/YYYY")} - Infinite`
                                        : "N/A"}
                                  </TableCell>
                                  <TableCell>
                                    {n.set.isHidden ? "Yes" : "No"}
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
                                            n.status === 0
                                              ? "Active"
                                              : "In-Active"
                                          }
                                          disabled={this.props.mode === "view"}
                                          name={String(i)}
                                          checked={n.status === 0}
                                          onChange={
                                            this.handleChangeOverrideStatus
                                          }
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
                                          <i className="zmdi zmdi-eye" />
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
                {this.state.policies.length > 0 ? (
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={this.fetchPolicies}
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
                    (this.state.fieldCriteria === 0
                      ? !Number(this.state.minimumValue) ||
                      !Number(this.state.maximumValue) ||
                      Number(this.state.minimumValue) >
                      Number(this.state.maximumValue)
                      : !this.state.staticValue) ||
                    !this.state.stageIds.length === 0 ||
                    !this.state.fieldType ||
                    !this.state.code ||
                    this.props.mode === "view"
                  }
                  onClick={this.createPolicy}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : this.state.showPoliciesList ? (
            <div className="row">
              {this.props.mode !== "view" && (
                <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                  <div className="actions">
                    <h3>Condtion / Policies</h3>
                    <IconButton
                      name="addNewPolicy"
                      aria-label="Add New Policy"
                      onClick={this.addNewPolicy}
                    >
                      <Tooltip title="Add New Policy">
                        <AddIcon />
                      </Tooltip>
                    </IconButton>
                  </div>
                </div>
              )}
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
                        <TableCell>Deviation</TableCell>
                        <TableCell>Value Or Min/Max</TableCell>
                        <TableCell>Hidden</TableCell>
                        <TableCell>No. of Override(s)</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {this.state.policies.map((policy, i) => {
                        return (
                          <SortableItem
                            key={policy.id}
                            index={i}
                            value={
                              <React.Fragment>
                                <TableCell>
                                  {this.filterFieldsParams(
                                    policy.fieldId,
                                    "name"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {this.filterDeviationsParams(
                                    policy.deviationId,
                                    "name"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {this.filterFieldsParams(
                                    Number(policy.fieldId),
                                    "dataType"
                                  ) === 0
                                    ? `${
                                    policy.set.minimumValue
                                      ? policy.set.minimumValue
                                      : 0
                                    } (Min) : ${
                                    policy.set.maximumValue
                                      ? policy.set.maximumValue
                                      : 0
                                    } (Max)`
                                    : policy.set.staticValue}
                                </TableCell>
                                <TableCell>
                                  {policy.set.isHidden ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>
                                  {policy.overrides
                                    ? policy.overrides.length
                                    : 0}
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
                                          policy.status === 0
                                            ? "Active"
                                            : "In-Active"
                                        }
                                        disabled={this.props.mode === "view"}
                                        name={policy.id}
                                        checked={policy.status === 0}
                                        onChange={this.handleChangePolicyStatus}
                                      />
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  {this.props.mode === "view" ? (
                                    <IconButton
                                      aria-label="View"
                                      onClick={() => this.editPolicy(policy.id)}
                                    >
                                      <Tooltip title="View">
                                        <i className="zmdi zmdi-eye" />
                                      </Tooltip>
                                    </IconButton>
                                  ) : (
                                      <IconButton
                                        aria-label="Edit"
                                        onClick={() => this.editPolicy(policy.id)}
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
          ) : this.state.isaddNewPolicy ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <Button
                  disabled={this.props.mode === "view"}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  onClick={this.addNewPolicy}
                >
                  Add New Policy
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.isOverrideModalOpen ? (
          <Dialog
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            maxWidth="md"
            disabled={this.props.mode === "view"}
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
                {this.state.fieldCriteria === 0 ? (
                  <React.Fragment>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      <TextField
                        disabled={this.props.mode === "view"}
                        label="Min"
                        name="minimumValueOverride"
                        type="number"
                        value={Number(this.state.minimumValueOverride)}
                        onChange={this.handleChange}
                        margin="normal"
                        autoComplete="off"
                        fullWidth
                      />
                      <FormHelperText className="text-red">
                        {Number(this.state.minimumValueOverride) &&
                          Number(this.state.maximumValueOverride) &&
                          Number(this.state.minimumValueOverride) >
                          Number(this.state.maximumValueOverride)
                          ? "MAX must be greater than MIN"
                          : null}
                      </FormHelperText>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      <TextField
                        label="Max"
                        name="maximumValueOverride"
                        type="number"
                        value={Number(this.state.maximumValueOverride)}
                        onChange={this.handleChange}
                        margin="normal"
                        autoComplete="off"
                        fullWidth
                        disabled={this.props.mode === "view"}
                      />
                    </div>
                  </React.Fragment>
                ) : (
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <TextField
                        label="Value"
                        name="staticValueOverride"
                        value={this.state.staticValueOverride}
                        onChange={this.handleChange}
                        margin="normal"
                        autoComplete="off"
                        fullWidth
                        disabled={this.props.mode === "view"}
                      />
                    </div>
                  )}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <TextField
                    label="Date Range (From-To Date)"
                    name="dateRangeOverride"
                    value={this.state.dateRangeOverride}
                    readOnly={true}
                    onClick={this.onDateRangeClick}
                    margin="normal"
                    autoComplete="off"
                    fullWidth
                    disabled={this.props.mode === "view"}
                  />
                </div>
                <div
                  className="col-lg-6 col-md-6 col-sm-12"
                  style={{ paddingTop: "8px" }}
                >
                  <SelectComponent
                    onChange={ev => this.setState({ stageIdsOverride: ev })}
                    items={this.state.stages ? this.state.stages : []}
                    single={this.state.stageIdsOverride}
                    type={"multi"}
                    label={"Select Stage"}
                    placeholder="Stages"
                    mode={this.props.mode}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormControl className="my-3" fullWidth>
                    <InputLabel htmlFor="typeOverride">Type</InputLabel>
                    <Select
                      name="fieldTypeOverride"
                      id="typeOverride"
                      style={{ width: "inherit" }}
                      onChange={this.handleChange}
                      value={this.state.fieldTypeOverride}
                      disabled={this.props.mode === "view"}
                    >
                      {this.state.fieldTypes.map(type => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <TextField
                    label="Code"
                    name="codeOverride"
                    value={this.state.codeOverride}
                    onChange={this.handleChange}
                    margin="normal"
                    autoComplete="off"
                    fullWidth
                    helperText={
                      this.props.mode === "add"
                        ? "Space not allowed in code field"
                        : ""
                    }
                    disabled={this.props.mode === "view"}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <TextField
                    label="Message"
                    name="messageOverride"
                    value={this.state.messageOverride}
                    onChange={this.handleChange}
                    margin="normal"
                    autoComplete="off"
                    fullWidth
                    disabled={this.props.mode === "view"}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormControlLabel
                    label="Hidden Policy"
                    className="p-t-20"
                    control={
                      <Switch
                        classes={{
                          checked: "text-primary",
                          bar: "bg-primary"
                        }}
                        disabled={this.props.mode === "view"}
                        name="isHiddenOverride"
                        checked={this.state.isHiddenOverride}
                        onChange={this.handleChange}
                        aria-label="isHidden"
                      />
                    }
                  />
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  this.setState({ isOverrideModalOpen: false });
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                disabled={this.props.mode === "view"}
                disabled={
                  (this.state.fieldCriteria === 0
                    ? !Number(this.state.minimumValueOverride) ||
                    !Number(this.state.maximumValueOverride) ||
                    Number(this.state.minimumValueOverride) >
                    Number(this.state.maximumValueOverride)
                    : !this.state.staticValueOverride) ||
                  !this.state.stageIdsOverride.length === 0 ||
                  !this.state.fieldTypeOverride ||
                  !this.state.codeOverride ||
                  !this.state.expression ||
                  this.props.mode === "view"
                }
                onClick={this.overrideCreationHandler}
                color="primary"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        {this.state.isCalenderOpen ? (
          <CustomDateRange
            minDate={this.state.minDate}
            fromDate={
              this.state.isOverrideModalOpen
                ? this.state.fromDateOverride
                : this.state.fromDate
            }
            toDate={
              this.state.isOverrideModalOpen
                ? this.state.toDateOverride
                : this.state.toDate
            }
            mode={this.state.mode}
            onChangeDR={this.onChangeDateRange}
            onClearDR={this.onClearDateRange}
            onSaveDR={this.onSaveDateRange}
            onCloseDR={this.onSaveDateRange}
          />
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
    fieldList: state.QueryBuilderData.fieldList
      ? state.QueryBuilderData.fieldList.items
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
)(ConditionPolicies);
