import React from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";

// Actions
import {
  editProduct,
  editDraftProduct,
  showProductLoader
} from "actions/Product";
import {
  fetchAllFields,
  fetchAllFieldSet,
  fetchIndividualFieldSet
} from "actions/QueryBuilder";
import { fetchAllSources } from "actions/Source";
import { showDeviationLoader, fetchAllDeviation } from "actions/Deviation";

// Icons
import IconButton from "@material-ui/core/IconButton";
import FetchFieldSet from "@material-ui/icons/GetApp";
import AddField from "@material-ui/icons/PlaylistAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import DragIcon from "@material-ui/icons/DragHandle";

// Components
import CardBox from "components/CardBox/index";

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

class Stages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      stages: [],
      sources: [],
      deviations: [],
      fieldId: "",
      sourceId: "",
      deviationId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      data: [],
      stageId: null,
      stageName: "",
      code: "",
      group: "",
      turnAroundTime: "",
      isCheckingRequired: false,
      isAddNewStage: false,
      addEditViewStage: false,
      showStagesList: false,
      isFieldModalOpen: false,
      modalType: null,
      fieldSetList: [],
      fieldList: [],
      fieldSet: "",
      field: ""
    };
  }

  componentDidMount() {
    this.props.fetchAllSources();
    this.props.fetchAllDeviation();
    this.props.fetchAllFields();
    this.props.fetchAllFieldSet();

    setTimeout(() => {
      this.props.fp();
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.individualFieldSetData !== this.props.individualFieldSetData
    ) {
      let data = [];
      let tempFields = nextProps.individualFieldSetData.fields
        ? nextProps.individualFieldSetData.fields
        : [];
      for (let fl = 0; fl < tempFields.length; fl++) {
        data.push({
          name: tempFields[fl].name,
          fieldId: tempFields[fl].id,
          sourceId: tempFields[fl].source,
          deviationId: tempFields[fl].deviation,
          deferredUntilStageId: tempFields[fl].deferredUntilStageId,
          deferValidation: tempFields[fl].deferredUntilStageId ? true : false,
          isRequired: tempFields[fl].isRequired
        });
      }
      this.setState({ data });
    }

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

    if (this.state.sources.length === 0 && nextProps.sources.length !== 0)
      this.setState({ sources: nextProps.sources });
    if (this.state.deviations.length === 0 && nextProps.deviations.length !== 0)
      this.setState({ deviations: nextProps.deviations });

    if (
      this.state.fieldSetList.length === 0 &&
      nextProps.fieldSetList.length !== 0
    )
      this.setState({ fieldSetList: nextProps.fieldSetList });
    if (nextProps.fieldList && this.state.fieldList.length === 0 && nextProps.fieldList.length !== 0)
      this.setState({ fieldList: nextProps.fieldList });
  }

  mapDataFromPropsToState = (npE, pE, npI, pI) => {
    if (npE !== pE) this.fetchStages();

    if (npI && npI !== pI) {
      this.setState({
        product: npI,
        sId:
          npI.scrutinizerId && npI.scrutinizerStatus === 0
            ? npI.scrutinizerId
            : this.state.sId
      });

      if (npI && this.state.stages.length === 0) {
        this.setState(
          {
            stages: npI.stages ? npI.stages : [],
            addEditViewStage: false,
            showStagesList: true
          },
          () => {
            if (this.state.stages.length === 0)
              this.setState({ showStagesList: false, isAddNewStage: true });
          }
        );
      }
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.name === "isCheckingRequired"
          ? e.target.checked
          : e.target.name === "code" && e.nativeEvent.data === " "
          ? e.target.value.replace(/ /g, "")
          : e.target.value
    });
  };

  addNewStage = () => {
    this.setState({
      stageId: null,
      stageName: "",
      code: "",
      group: "",
      turnAroundTime: "",
      isCheckingRequired: false,
      source: "",
      deviation: "",
      data: [],
      addEditViewStage: true,
      showStagesList: false
    });
  };

  fetchStages = () => {
    this.setState(
      {
        showStagesList: true,
        addEditViewStage: false,
        stages: []
      },
      () => {
        this.props.ups(2);
        this.props.fp();
      }
    );
  };

  openFieldModal = modalType => {
    this.setState({
      fieldSet: "",
      field: "",
      modalType,
      isFieldModalOpen: true
    });
  };

  fieldCreationHandler = () => {
    if (this.state.modalType === "set") {
      this.props.fetchIndividualFieldSet({
        id: this.state.fieldSet,
        page: "add"
      });

      this.setState({
        fieldSetList: this.state.fieldSetList.filter(data => {
          return data.id !== this.state.fieldSet;
        })
      });
    } else {
      this.state.fieldList.find(data => {
        if (data.id === this.state.field) {
          this.setState({
            data: [...this.state.data, { name: data.name, fieldId: data.id }]
          });
        }
      });
    }
    this.setState({ isFieldModalOpen: false });
  };

  handleFieldGrid = (field, index) => {
    let newArr = this.state.data;
    newArr[index] = field;
    this.setState({
      data: newArr
    });
  };

  deleteField = fieldId => {
    let newArr = this.state.data;
    newArr = newArr.filter(arr => {
      return arr.fieldId !== fieldId;
    });
    this.setState({
      data: newArr
    });
  };

  createStage = () => {
    console.log('this.state ==== ', this.state)
    let fs = this.state.stages;
    if (this.state.stageId) {
      if (!window.confirm("Are you sure you want to UPDATE this stage?"))
        return;
      fs = this.state.stages.filter(stage => {
        return stage.id !== this.state.stageId;
      });
    }

    this.setState(
      {
        stages: [
          ...fs,
          {
            name: this.state.stageName,
            group: this.state.group,
            code: this.state.code,
            turnAroundTime: this.state.turnAroundTime,
            isCheckingRequired: this.state.isCheckingRequired,
            fields: this.state.data
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
            stages: this.state.stages
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            stages: this.state.stages
          });
        }
      }
    );
  };

  editStage = stageId => {
    let fs = this.state.stages.filter(stage => {
      return stage.id === stageId;
    });
    fs = fs[0];

    this.setState({
      stageId,
      stageName: fs.name,
      code: fs.code,
      group: fs.group,
      turnAroundTime: fs.turnAroundTime,
      isCheckingRequired: fs.isCheckingRequired,
      data: fs.fields ? fs.fields : [],
      addEditViewStage: true,
      showStagesList: false
    });
  };

  handleChangeStageStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this stage?")) return;
    let stages = this.state.stages.slice(0).filter(stg => {
      if (stg.id === e.target.name) stg["status"] = Number(!e.target.checked);
      return stg;
    });
    this.setState({ stages }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          stages
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          stages
        });
      }
    });
  };

  checkFieldExistence = fieldId => {
    return this.state.data.length > 0
      ? this.state.data.find(field => {
          return String(field.fieldId) === String(fieldId);
        })
      : false;
  };

  filterFieldsPrams = (fieldId, reqField) => {
    let tempFields = this.state.fieldList;
    let ff = tempFields.filter(field => {
      return field.id === Number(fieldId);
    });
    return ff.length > 0 ? ff[0][reqField] : "N/A";
  };

  onSortEndFields = ({ oldIndex, newIndex }) => {
    this.setState(({ data }) => ({
      data: arrayMove(data, oldIndex, newIndex)
    }));
  };

  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ stages }) => ({
        stages: arrayMove(stages, oldIndex, newIndex)
      }),
      stages => {
        this.props.showProductLoader();
        if (
          (this.props.isMakerCheckerEnabled && this.state.sId) ||
          this.props.isPending
        ) {
          this.props.editDraftProduct({
            ...this.state.product,
            sId: this.state.sId,
            pId: this.state.pId,
            stages: this.state.stages
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            stages
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
          {this.state.addEditViewStage ? (
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  disabled={this.props.mode === "view"}
                  label="Name"
                  name="stageName"
                  value={this.state.stageName}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  disabled={this.props.mode === "view"}
                  label="Group"
                  name="group"
                  value={this.state.group}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  disabled={this.props.mode === "view"}
                  label="Code"
                  name="code"
                  helperText={
                    this.props.mode === "add"
                      ? "Space not allowed in code field"
                      : ""
                  }
                  value={this.state.code}
                  onChange={this.handleChange}
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControl className="my-3" fullWidth>
                  <InputLabel htmlFor="turnAroundTime">
                    Turn around time
                  </InputLabel>
                  <Input
                    disabled={this.props.mode === "view"}
                    name="turnAroundTime"
                    id="turnAroundTime"
                    type="number"
                    value={this.state.turnAroundTime}
                    onChange={this.handleChange}
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">Hours</InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControlLabel
                  label="Maker/Checker"
                  className="p-t-20"
                  control={
                    <Switch
                      classes={{
                        checked: "text-primary",
                        bar: "bg-primary"
                      }}
                      disabled={this.props.mode === "view"}
                      name="isCheckingRequired"
                      checked={this.state.isCheckingRequired}
                      onChange={this.handleChange}
                      aria-label="isCheckingRequired"
                    />
                  }
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <br />
                <div className="actions">
                  <h3>Fields</h3>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="FieldSet"
                    aria-label="Field Set"
                    onClick={() => this.openFieldModal("set")}
                  >
                    <Tooltip title="Field Set">
                      <FetchFieldSet />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="AddField"
                    aria-label="Add Field"
                    onClick={() => this.openFieldModal("indivitual")}
                  >
                    <Tooltip title="Add Field">
                      <AddField />
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
                        <TableCell>Fields</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Deviation</TableCell>
                        <TableCell>Defer Stage</TableCell>
                        <TableCell>Group</TableCell>
                        <TableCell>Subgroup</TableCell>
                        <TableCell>Mandatory</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndFields}
                      useDragHandle
                    >
                      {data &&
                        data.map((n, i) => {
                          return (
                            <SortableItem
                              key={n.fieldId}
                              index={i}
                              value={
                                <React.Fragment>
                                  <TableCell>
                                    {n.name
                                      ? n.name
                                      : this.filterFieldsPrams(
                                          n.fieldId,
                                          "name"
                                        )}
                                  </TableCell>

                                  <TableCell>
                                    <FormControl style={{ minWidth: "100px" }}>
                                      <InputLabel htmlFor="sourceId">
                                        Source
                                      </InputLabel>
                                      <Select
                                        disabled={this.props.mode === "view"}
                                        name="sourceId"
                                        onChange={event => {
                                          this.handleFieldGrid(
                                            {
                                              ...n,
                                              sourceId: event.target.value
                                            },
                                            i
                                          );
                                        }}
                                        value={n.sourceId ? n.sourceId : ""}
                                      >
                                        {this.state.sources
                                          ? this.state.sources.map(
                                              (data, index) => (
                                                <MenuItem
                                                  key={data.id}
                                                  value={String(data.id)}
                                                >
                                                  {data.name}
                                                </MenuItem>
                                              )
                                            )
                                          : []}
                                        <MenuItem value="">None</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>

                                  <TableCell>
                                    <FormControl style={{ minWidth: "100px" }}>
                                      <InputLabel htmlFor="deviationId">
                                        Deviation
                                      </InputLabel>
                                      <Select
                                        disabled={this.props.mode === "view"}
                                        name="deviationId"
                                        onChange={event => {
                                          this.handleFieldGrid(
                                            {
                                              ...n,
                                              deviationId: event.target.value
                                            },
                                            i
                                          );
                                        }}
                                        value={
                                          n.deviationId ? n.deviationId : ""
                                        }
                                      >
                                        {this.state.deviations
                                          ? this.state.deviations.map(
                                              (data, index) => (
                                                <MenuItem
                                                  key={data.id}
                                                  value={String(data.id)}
                                                >
                                                  {data.name}
                                                </MenuItem>
                                              )
                                            )
                                          : []}
                                        <MenuItem value="">None</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>


                                  <TableCell>
                                    <FormControl style={{ minWidth: "100px" }}>
                                      <InputLabel htmlFor="deferredUntilStageId">
                                        Defer Stage
                                      </InputLabel>
                                      <Select
                                        disabled={this.props.mode === "view"}
                                        name="deferredUntilStageId"
                                        onChange={event => {
                                          this.handleFieldGrid(
                                            {
                                              ...n,
                                              deferredUntilStageId: event.target.value,
                                              deferValidation: event.target.value ? true : false
                                            },
                                            i
                                          );
                                        }}
                                        value={
                                          n.deferredUntilStageId ? n.deferredUntilStageId : ""
                                        }
                                      >
                                        {this.state.stages
                                          ? this.state.stages.map(
                                              (data, index) => (
                                                <MenuItem
                                                  key={data.id}
                                                  value={data.id}
                                                >
                                                  {data.name}
                                                </MenuItem>
                                              )
                                            )
                                          : []}
                                        <MenuItem value="">None</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>

                                  <TableCell>
                                    <FormControl style={{ minWidth: "100px" }}>
                                      <TextField
                                        disabled={this.props.mode === "view"}
                                        label="Group"
                                        name="group"
                                        value={n.group}
                                        onChange={event => {
                                          this.handleFieldGrid(
                                            {
                                              ...n,
                                              group: event.target.value
                                            },
                                            i
                                          );
                                        }}
                                        margin="normal"
                                        autoComplete="off"
                                        fullWidth
                                      />
                                    </FormControl>
                                  </TableCell>

                                  <TableCell>
                                    <FormControl style={{ minWidth: "100px" }}>
                                      <TextField
                                        disabled={this.props.mode === "view"}
                                        label="Subgroup"
                                        name="subgroup"
                                        value={n.subgroup}
                                        onChange={event => {
                                          this.handleFieldGrid(
                                            {
                                              ...n,
                                              subgroup: event.target.value
                                            },
                                            i
                                          );
                                        }}
                                        margin="normal"
                                        autoComplete="off"
                                        fullWidth
                                      />
                                    </FormControl>
                                  </TableCell>

                                  <TableCell>
                                    <Switch
                                      classes={{
                                        checked: "text-primary",
                                        bar: "bg-primary"
                                      }}
                                      disabled={this.props.mode === "view"}
                                      checked={
                                        n.isRequired === "False"
                                          ? false
                                          : n.isRequired === "True"
                                          ? true
                                          : n.isRequired
                                      }
                                      onChange={event => {
                                        this.handleFieldGrid(
                                          {
                                            ...n,
                                            isRequired: event.target.checked
                                          },
                                          i
                                        );
                                      }}
                                    />
                                  </TableCell>
                                  
                                  <TableCell>
                                    <IconButton
                                      disabled={this.props.mode === "view"}
                                      aria-label="Delete"
                                      onClick={() =>
                                        this.deleteField(n.fieldId)
                                      }
                                    >
                                      <Tooltip title="Delete">
                                        <DeleteIcon />
                                      </Tooltip>
                                    </IconButton>
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
                {this.state.stages.length > 0 ? (
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={this.fetchStages}
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  disabled={
                    !this.state.stageName ||
                    !this.state.group ||
                    !this.state.code ||
                    !this.state.turnAroundTime ||
                    this.props.mode === "view"
                  }
                  onClick={this.createStage}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : this.state.showStagesList ? (
            <div className="row">
              {this.props.mode !== "view" && (
                <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                  <div className="actions">
                    <h3>Stages</h3>
                    <IconButton
                      name="AddNewStage"
                      aria-label="Add New Stage"
                      onClick={this.addNewStage}
                    >
                      <Tooltip title="Add New Stage">
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
                        <TableCell>Name</TableCell>
                        <TableCell>Group</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Turn Around Time (Hours)</TableCell>
                        <TableCell>No. of Fields</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {this.state.stages.map((stage, i) => {
                        return (
                          <SortableItem
                            key={stage.id}
                            index={i}
                            value={
                              <React.Fragment>
                                <TableCell>{stage.name}</TableCell>
                                <TableCell>{stage.group}</TableCell>
                                <TableCell>{stage.code}</TableCell>
                                <TableCell>{stage.turnAroundTime}</TableCell>
                                <TableCell>
                                  {stage.fields ? stage.fields.length : 0}
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
                                          stage.status === 0
                                            ? "Active"
                                            : "In-Active"
                                        }
                                        disabled={this.props.mode === "view"}
                                        name={stage.id}
                                        checked={stage.status === 0}
                                        onChange={this.handleChangeStageStatus}
                                      />
                                    }
                                  />
                                </TableCell>
                                {this.props.mode === "view" ? (
                                  <TableCell>
                                    <IconButton
                                      aria-label="View"
                                      onClick={() => this.editStage(stage.id)}
                                    >
                                      <Tooltip title="View">
                                        <i className="zmdi zmdi-eye" />
                                      </Tooltip>
                                    </IconButton>
                                  </TableCell>
                                ) : (
                                  <TableCell>
                                    <IconButton
                                      aria-label="Edit"
                                      onClick={() => this.editStage(stage.id)}
                                    >
                                      <Tooltip title="Edit">
                                        <EditIcon />
                                      </Tooltip>
                                    </IconButton>
                                  </TableCell>
                                )}
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
          ) : this.state.isAddNewStage ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <Button
                  disabled={this.props.mode === "view"}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  onClick={this.addNewStage}
                >
                  Add New Stage
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.isFieldModalOpen ? (
          <Dialog
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
          >
            <DialogTitle>
              {this.state.modalType === "set"
                ? "Fetch From Set"
                : "Field Creation"}
            </DialogTitle>
            <DialogContent>
              <form className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  {this.state.modalType === "set" ? (
                    <Select
                      name="fieldSet"
                      style={{ width: "inherit" }}
                      onChange={this.handleChange}
                      value={this.state.fieldSet}
                    >
                      {this.state.fieldSetList
                        ? this.state.fieldSetList.map((data, index) => (
                            <MenuItem key={index} value={data.id}>
                              {data.name}
                            </MenuItem>
                          ))
                        : []}
                    </Select>
                  ) : (
                    <Select
                      name="field"
                      style={{ width: "inherit" }}
                      onChange={this.handleChange}
                      value={this.state.field}
                    >
                      {this.state.fieldList
                        ? this.state.fieldList.map((data, index) => (
                            <MenuItem
                              key={index}
                              value={data.id}
                              disabled={
                                this.checkFieldExistence(data.id) ? true : false
                              }
                            >
                              {data.name}
                            </MenuItem>
                          ))
                        : []}
                    </Select>
                  )}
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                name=""
                onClick={() => {
                  this.setState({ isFieldModalOpen: false });
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                name=""
                disabled={!this.state.fieldSet && !this.state.field}
                onClick={this.fieldCreationHandler}
                color="primary"
              >
                Fetch
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
    sources: state.sourceData.allSources
      ? state.sourceData.allSources.data.items
      : [],
    deviations: state.deviationData.allDeviations
      ? state.deviationData.allDeviations.data.items
      : [],
    fieldList: state.QueryBuilderData.fieldList
      ? state.QueryBuilderData.fieldList.items
      : [],
    fieldSetList: state.QueryBuilderData.fieldSetList
      ? state.QueryBuilderData.fieldSetList.items
      : [],
    individualFieldSetData: state.QueryBuilderData.individualFieldSetData
      ? state.QueryBuilderData.individualFieldSetData.data
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
    fetchAllSources,
    showDeviationLoader,
    fetchAllDeviation,
    fetchAllFields,
    fetchAllFieldSet,
    fetchIndividualFieldSet
  }
)(Stages);
