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
  showDocumentTypeLoader,
  fetchAllDocumentTypes
} from "actions/DocumentTypes";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CardBox from "components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import QueryBuilder from "../../../../../../../../../../components/customComponents/queryBuilder/demo";
import CreateOverride from "@material-ui/icons/LibraryAdd";
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

class DocumentRequirements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      documentRequirements: [],
      deviations: [],
      data: [],
      stages: [],
      docRequirementId: null,
      isAddButton: false,
      isForm: false,
      documentRequirementList: false,
      isOverrideModal: false,
      documentId: "",
      deviationId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      docRequirements: [],
      validationType: false,
      remarks: "",
      count: "",
      stageIds: [],
      overrideRemarks: "",
      overrideCount: "",
      overrideValidationType: false,
      expression: "",
      expressionTree: "",
      overrideStatus: false,
      isOverrideEdit: false
    };
  }

  componentDidMount() {
    this.props.showDeviationLoader();
    this.props.fetchAllDeviation();

    const docObj = {
      pId: localStorage.getItem("pId")
    };
    this.props.showDocumentTypeLoader();
    this.props.fetchAllDocumentTypes(docObj);

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
    if (npE !== pE) this.fetchDocRequirements();
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

      if (npI && this.state.documentRequirements.length === 0) {
        this.setState(
          {
            documentRequirements: npI.documentRequirements
              ? npI.documentRequirements
              : [],
            isForm: false,
            documentRequirementList: true
          },
          () => {
            if (this.state.documentRequirements.length === 0)
              this.setState({
                documentRequirementList: false,
                isAddButton: true
              });
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

  handleSwitch = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  addNewDocRequirment = () => {
    this.setState({
      docRequirementId: null,
      documentId: "",
      deviationId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      stageIds: [],
      remarks: "",
      count: "",
      validationType: false,
      data: [],
      isForm: true,
      documentRequirementList: false
    });
  };

  fetchDocRequirements = () => {
    this.setState(
      {
        documentRequirementList: true,
        isForm: false,
        documentRequirements: []
      },
      () => {
        this.props.ups(6);
        this.props.fp();
      }
    );
  };

  openOverrideModal = () => {
    this.setState({
      overrideRemarks: "",
      overrideCount: "",
      overrideValidationType: false,
      expression: "",
      expressionTree: "",
      isOverrideModal: true,
      isOverrideEdit: false
    });
  };

  overRideHandler = () => {
    if (this.state.isOverrideEdit) {
      let fo = this.state.data.filter(override => {
        return override.id !== this.state.overrideId;
      });
      this.setState({
        data: [
          ...fo,
          {
            id: this.state.overrideId,
            documentId: this.state.documentId,
            validationType: this.state.overrideValidationType,
            remarks: this.state.overrideRemarks,
            count: this.state.overrideCount,
            expression: this.state.expression,
            expressionTree: this.state.expressionTree
          }
        ],
        isOverrideModal: false
      });
    } else {
      this.setState({
        data: [
          ...this.state.data,
          {
            documentId: this.state.documentId,
            validationType: this.state.overrideValidationType,
            remarks: this.state.overrideRemarks,
            count: this.state.overrideCount,
            expression: this.state.expression,
            expressionTree: this.state.expressionTree
          }
        ],
        isOverrideModal: false
      });
    }
  };

  createDocRequirement = () => {
    let fs = this.state.documentRequirements;
    if (this.state.docRequirementId) {
      if (
        !window.confirm(
          "Are you sure you want to UPDATE this document requirement?"
        )
      )
        return;
      fs = this.state.documentRequirements.filter(documentRequirement => {
        return documentRequirement.id !== this.state.docRequirementId;
      });
    }

    this.setState(
      {
        documentRequirements: [
          ...fs,
          {
            documentId: this.state.documentId,
            validationType: this.state.validationType,
            remarks: this.state.remarks,
            count: this.state.count,
            deviationId: this.state.deviationId,
            deferredUntilStageId: this.state.deferredUntilStageId,
            deferValidation: this.state.deferredUntilStageId ? true : false,
            stageIds: this.state.stageIds,
            documentOverrides: this.state.data
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
            documentRequirements: this.state.documentRequirements
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            documentRequirements: this.state.documentRequirements
          });
        }
      }
    );
  };

  editOverride = index => {
    let fo = this.state.data[index];

    this.setState({
      overrideId: fo.id,
      overrideRemarks: fo.remarks,
      overrideCount: fo.count,
      overrideValidationType: fo.validationType,
      overrideStatus: fo.status,
      expression: fo.expression,
      expressionTree: fo.expressionTree,
      isOverrideModal: true,
      isOverrideEdit: true
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

  editDocRequirement = docRequirementId => {
    let fs = this.state.documentRequirements.filter(filter => {
      return filter.id === docRequirementId;
    });
    fs = fs[0];

    this.setState({
      docRequirementId,
      documentId: fs.documentId,
      validationType: fs.validationType,
      remarks: fs.remarks,
      count: fs.count,
      deviationId: fs.deviationId,
      deferredUntilStageId: fs.deferredUntilStageId,
      deferValidation: fs.deferredUntilStageId ? true : false,
      stageIds: fs.stageIds ? fs.stageIds : [],
      data: fs.documentOverrides ? fs.documentOverrides : [],
      isForm: true,
      documentRequirementList: false
    });
  };

  handleChangeDocumentStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this document?"))
      return;
    let documentRequirements = this.state.documentRequirements
      .slice(0)
      .filter(dr => {
        if (dr.id === e.target.name) dr["status"] = Number(!e.target.checked);
        return dr;
      });
    this.setState({ documentRequirements }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          documentRequirements
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          documentRequirements
        });
      }
    });
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
      ({ documentRequirements }) => ({
        documentRequirements: arrayMove(
          documentRequirements,
          oldIndex,
          newIndex
        )
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
            documentRequirements: this.state.documentRequirements
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            documentRequirements: this.state.documentRequirements
          });
        }
      }
    );
  };

  render() {
    const { getAllDocumentTypes, getAllDeviations } = this.props;
    const { data } = this.state;
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          {this.state.isForm ? (
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-sm-12"
                style={{ paddingTop: "16px" }}
              >
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="documentId">
                      Select Document
                    </InputLabel>
                    <Select
                      disabled={this.props.mode === "view"}
                      name="documentId"
                      value={this.state.documentId}
                      onChange={this.handleChange("documentId")}
                      input={<Input name="" id="documentId" />}
                    >
                      {getAllDocumentTypes ? (
                        getAllDocumentTypes.map((data, index) => (
                          <MenuItem key={data.id} value={data.id}>
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
                style={{ paddingTop: "16px" }}
              >
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="deviationId">
                      Select Deviation
                    </InputLabel>
                    <Select
                      disabled={this.props.mode === "view"}
                      name="deviationId"
                      value={this.state.deviationId}
                      onChange={this.handleChange("deviationId")}
                      input={<Input name="" id="deviationId" />}
                    >
                      {getAllDeviations ? (
                        getAllDeviations.map((data, index) => (
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
              <div
                className="col-lg-4 col-md-4 col-sm-12"
                style={{ paddingTop: "16px" }}
              >
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="stageIds">Select Stages</InputLabel>
                    <Select
                      disabled={this.props.mode === "view"}
                      multiple
                      name="stageIds"
                      value={this.state.stageIds}
                      onChange={this.handleChange("stageIds")}
                      input={<Input name="" id="stageIds" />}
                    >
                      {this.state.stages ? (
                        this.state.stages.map((data, index) => (
                          <MenuItem key={data.id} value={data.id}>
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
                <TextField
                  disabled={this.props.mode === "view"}
                  name="remarks"
                  label="Remarks"
                  value={this.state.remarks}
                  onChange={this.handleChange("remarks")}
                  autoComplete="off"
                  fullWidth
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <TextField
                  disabled={this.props.mode === "view"}
                  name="count"
                  label="Count"
                  value={this.state.count}
                  type="number"
                  onChange={this.handleChange("count")}
                  autoComplete="off"
                  fullWidth
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <FormControlLabel
                  label="Mandatory"
                  control={
                    <Switch
                      classes={{
                        checked: "text-primary",
                        bar: "bg-primary"
                      }}
                      disabled={this.props.mode === "view"}
                      name="validationType"
                      checked={this.state.validationType}
                      onChange={this.handleSwitch("validationType")}
                      aria-label="validationType"
                    />
                  }
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <br />
                <div className="actions">
                  <h3>Overrides</h3>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="CreateOverride"
                    aria-label="Create Override"
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
                        <TableCell>Remarks</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>Mandatory</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
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
                                  <TableCell>
                                    {n.expression ? n.expression : "N/A"}
                                  </TableCell>

                                  <TableCell>
                                    {n.remarks ? n.remarks : "N/A"}
                                  </TableCell>
                                  <TableCell>
                                    {n.count ? n.count : "N/A"}
                                  </TableCell>

                                  <TableCell>
                                    {n.validationType ? "Yes" : "No"}
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
                {this.state.documentRequirements.length > 0 ? (
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={this.fetchDocRequirements}
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  disabled={
                    !this.state.documentId ||
                    !this.state.deviationId ||
                    !this.state.stageIds ||
                    !this.state.remarks ||
                    this.props.mode === "view"
                  }
                  onClick={this.createDocRequirement}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : this.state.documentRequirementList ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <div className="actions">
                  <h3>Documents</h3>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="AddNewDocumentRequirement"
                    aria-label="Add New Document"
                    onClick={this.addNewDocRequirment}
                  >
                    <Tooltip title="Add New Document">
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
                        <TableCell>Document Type</TableCell>
                        <TableCell>Deviation</TableCell>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>No. of Overrides</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {this.state.documentRequirements.map((data, i) => {
                        return (
                          <SortableItem
                            key={data.id}
                            index={i}
                            value={
                              <React.Fragment>
                                <TableCell>
                                  {getAllDocumentTypes
                                    ? getAllDocumentTypes
                                      .filter(type => {
                                        if (type.id === data.documentId) {
                                          return type.name;
                                        }
                                      })
                                      .map(data => data.name)
                                    : "not found"}
                                </TableCell>
                                <TableCell>
                                  {getAllDeviations
                                    ? getAllDeviations
                                      .filter(dev => {
                                        if (Number(dev.id) === Number(data.deviationId)) {
                                          return dev.name;
                                        }
                                      })
                                      .map(data => data.name)
                                    : "not found"}
                                </TableCell>
                                <TableCell>{data.remarks}</TableCell>
                                <TableCell>{data.count}</TableCell>
                                <TableCell>
                                  {data.documentOverrides
                                    ? data.documentOverrides.length
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
                                          data.status === 0
                                            ? "Active"
                                            : "In-Active"
                                        }
                                        disabled={this.props.mode === "view"}
                                        name={data.id}
                                        checked={data.status === 0}
                                        onChange={
                                          this.handleChangeDocumentStatus
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
                                        this.editDocRequirement(data.id)
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
                                          this.editDocRequirement(data.id)
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
                  onClick={this.addNewDocRequirment}
                >
                  Add New Document
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.isOverrideModal ? (
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
                  <TextField
                    disabled={this.props.mode === "view"}
                    name="overrideRemarks"
                    label="Remarks"
                    value={this.state.overrideRemarks}
                    onChange={this.handleChange("overrideRemarks")}
                    autoComplete="off"
                    fullWidth
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <TextField
                    disabled={this.props.mode === "view"}
                    name="overrideCount"
                    label="Count"
                    value={this.state.overrideCount}
                    type="number"
                    onChange={this.handleChange("overrideCount")}
                    autoComplete="off"
                    fullWidth
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormControlLabel
                    label="Mandatory"
                    className="p-t-10"
                    control={
                      <Switch
                        classes={{
                          checked: "text-primary",
                          bar: "bg-primary"
                        }}
                        disabled={this.props.mode === "view"}
                        name="overrideValidationType"
                        checked={this.state.overrideValidationType}
                        onChange={this.handleSwitch("overrideValidationType")}
                        aria-label="overrideValidationType"
                      />
                    }
                  />
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                name=""
                onClick={() => {
                  this.setState({ isOverrideModal: false });
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                name=""
                disabled={
                  (!this.state.overrideRemarks && !this.state.overrideCount) ||
                  this.props.mode === "view"
                }
                onClick={this.overRideHandler}
                color="primary"
              >
                Create
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
    getAllDocumentTypes: state.documentTypesData.allDocumentTypes
      ? state.documentTypesData.allDocumentTypes.data
      : "",
    getAllDeviations: state.deviationData.allDeviations
      ? state.deviationData.allDeviations.data.items
      : "",
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
    showDocumentTypeLoader,
    fetchAllDocumentTypes
  }
)(DocumentRequirements);
