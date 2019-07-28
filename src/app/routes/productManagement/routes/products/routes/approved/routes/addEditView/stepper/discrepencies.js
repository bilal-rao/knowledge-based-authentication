import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  showMdmDiscrepencyLoader,
  fetchAllMdmDiscrepencies
} from "actions/MdmDiscrepencies";
import {
  editProduct,
  editDraftProduct,
  showProductLoader
} from "actions/Product";
import { showRoleLoader, fetchAllRoles } from "actions/Role";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CardBox from "components/CardBox/index";
import SelectComponent from "../../../../../../../../../../components/customComponents/selectComponent/select.js";
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

class Discrepencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      code: "",
      name: "",
      description: "",
      discrepancyId: "",
      ActorRoleIds: [],
      CheckerRoleIds: [],
      stages: [],
      stageId: "",
      deferredUntilStageId: "",
      deferValidation: false,
      hasError: {
        code: false,
        name: false
      },
      isAddButton: false,
      isForm: false,
      isTable: false,
      discrepancies: [],
      dId: null
    };
  }

  componentDidMount() {
    //Roles Get for actor and checker
    const obj = {
      method: "post",
      pId: this.state.pId
    };
    this.props.showRoleLoader();
    this.props.fetchAllRoles(obj);

    //Get All mdm Discrepencies
    this.props.showMdmDiscrepencyLoader();
    this.props.fetchAllMdmDiscrepencies();

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
  }

  mapDataFromPropsToState = (npE, pE, npI, pI) => {
    if (npE !== pE) this.fetchDiscrepancies();

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

      if (npI && this.state.discrepancies.length === 0) {
        this.setState(
          {
            discrepancies: npI.discrepancies ? npI.discrepancies : [],
            isAddButton: false,
            isForm: false,
            isTable: true
          },
          () => {
            if (this.state.discrepancies.length === 0) {
              this.setState({
                isAddButton: true,
                isForm: false,
                isTable: false,
                discrepancies: []
              });
            }
          }
        );
      }
    }
  };

  fetchDiscrepancies = () => {
    this.setState(
      {
        isTable: true,
        isForm: false,
        discrepancies: []
      },
      () => {
        this.props.ups(5);
        this.props.fp();
      }
    );
  };

  handleChange = name => (event, value) => {
    this.setState({
      [name]: event.target.value
    });
  };

  addDiscrepancies = () => {
    let fs = this.state.discrepancies;
    if (this.state.dId) {
      if (!window.confirm("Are you sure you want to UPDATE this Discrepancy?"))
        return;
      fs = this.state.discrepancies.filter(stage => {
        return stage.id !== this.state.dId;
      });
    }

    this.setState(
      {
        discrepancies: [
          ...fs,
          {
            discrepancyId: this.state.discrepancyId,
            stageId: this.state.stageId,
            deferValidation: this.state.deferredUntilStageId ? true : false,
            deferredUntilStageId: this.state.deferredUntilStageId,
            ActorRoleIds: this.state.ActorRoleIds,
            CheckerRoleIds: this.state.CheckerRoleIds
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
            discrepancies: this.state.discrepancies
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            discrepancies: this.state.discrepancies
          });
        }
      }
    );
  };

  addNewDiscrepancy = () => {
    this.setState({
      dId: null,
      productStep: "",
      discrepancyId: "",
      stageId: "",
      deferValidation: false,
      deferredUntilStageId: "",
      ActorRoleIds: [],
      CheckerRoleIds: [],
      isForm: true,
      isAddButton: false,
      isTable: false
    });
  };

  editDiscrepancy = dId => {
    let fs = this.state.discrepancies.filter(discrepancy => {
      return discrepancy.id === dId;
    });
    fs = fs[0];
    this.setState({
      dId,
      discrepancyId: fs.discrepancyId,
      stageId: fs.stageId,
      deferValidation: fs.deferValidation,
      deferredUntilStageId: fs.deferredUntilStageId,
      ActorRoleIds: fs.actorRoleIds,
      CheckerRoleIds: fs.checkerRoleIds,
      isForm: true,
      isAddButton: false,
      isTable: false
    });
  };

  handleChangeDiscrepancyStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this discrepency?"))
      return;
    let discrepancies = this.state.discrepancies.slice(0).filter(dis => {
      if (dis.id === e.target.name) dis["status"] = Number(!e.target.checked);
      return dis;
    });
    this.setState({ discrepancies }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          discrepancies
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          discrepancies
        });
      }
    });
  };

  filterRolesParams = rids => {
    let fr = [];
    rids.forEach(id => {
      this.props.getAllRoles.forEach(role => {
        if (role.roleId === id) fr.push(role.name);
      });
    });
    return fr.length > 0 ? String(fr) : "N/A";
  };

  filterStagesParams = sid => {
    let tempStages = this.state.stages;
    let fs = tempStages.filter(stage => {
      return stage.id === sid;
    });
    return fs.length > 0 ? fs[0]["name"] : "N/A";
  };

  filterDiscrepancyParams = dId => {
    let tempDiscrepanies = this.props.getAllMdmDiscrepencies;
    let fs = tempDiscrepanies.filter(discrepancy => {
      return Number(discrepancy.id ) === Number(dId);
    });
    return fs.length > 0 ? fs[0]["name"] : "N/A";
  };
  
  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ discrepancies }) => ({
        discrepancies: arrayMove(discrepancies, oldIndex, newIndex)
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
            discrepancies: this.state.discrepancies
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            discrepancies: this.state.discrepancies
          });
        }
      }
    );
  };

  render() {
    const {
      discrepancyId,
      stageId,
      hasError,
      isView,
      ActorRoleIds,
      CheckerRoleIds,
      isSubmit,
      discrepancies
    } = this.state;
    const { getAllMdmDiscrepencies, getAllRoles } = this.props;
    return (
      <div className="row">
        <div className="col-md-12 col-12 col-12">
          {this.state.isAddButton && (
            <div className="row" style={{ textAlign: "center" }}>
              <div className="col-md-12 col-12 col-12">
                <Button
                  disabled={this.props.mode === "view"}
                  name="AddNewDiscrepancy"
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  onClick={this.addNewDiscrepancy}
                >
                  Add New Discrepancy
                </Button>
              </div>
            </div>
          )}
          {this.state.isForm && (
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-sm-12 p-t-15"
                style={{ paddingTop: "8px" }}
              >
                <SelectComponent
                  onChange={ev => this.setState({ discrepancyId: ev })}
                  items={
                    this.props.getAllMdmDiscrepencies
                      ? this.props.getAllMdmDiscrepencies
                      : []
                  }
                  single={this.state.discrepancyId}
                  type={"single"}
                  label={"Select Discrepency"}
                  placeholder="Discrepencies"
                  mode={this.props.mode}
                />
              </div>
              <div
                className="col-lg-4 col-md-4 col-sm-12 p-t-15"
                style={{ paddingTop: "8px" }}
              >
                <SelectComponent
                  onChange={ev => this.setState({ stageId: ev })}
                  items={this.state.stages ? this.state.stages : []}
                  single={this.state.stageId}
                  type={"single"}
                  label={"Select Stage"}
                  placeholder="Stages"
                  mode={this.props.mode}
                />
              </div>
              <div
                className="col-lg-4 col-md-4 col-sm-12"
                style={{ paddingTop: "16px" }}
              >
                <div className="form-group">
                  <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="ActorRoleIds">Actor Roles</InputLabel>
                    <Select
                      multiple
                      name="ActorRoleIds"
                      value={ActorRoleIds}
                      onChange={this.handleChange("ActorRoleIds")}
                      input={<Input name="" id="ActorRoleIds" />}
                      disabled={this.props.mode === "view"}
                    >
                      {getAllRoles ? (
                        getAllRoles.map((data, index) => (
                          <MenuItem key={data.roleId} value={data.roleId}>
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
                    <InputLabel htmlFor="CheckerRoleIds">
                      Checker Roles
                    </InputLabel>
                    <Select
                      multiple
                      name="CheckerRoleIds"
                      value={CheckerRoleIds}
                      onChange={this.handleChange("CheckerRoleIds")}
                      input={<Input name="" id="CheckerRoleIds" />}
                      disabled={this.props.mode === "view"}
                    >
                      {getAllRoles ? (
                        getAllRoles.map((data, index) => (
                          <MenuItem key={data.roleId} value={data.roleId}>
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
              <div style={{ textAlign: "right" }} className="col-md-12">
                <br />
                <Button
                  name="cancel"
                  variant="contained"
                  className="jr-btn bg-white text-black"
                  onClick={() => {
                    discrepancies.length !== 0
                      ? this.setState({
                        isForm: false,
                        isAddButton: false,
                        isTable: true
                      })
                      : this.setState({
                        isForm: false,
                        isAddButton: true,
                        isTable: false
                      });
                  }}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  disabled={this.props.mode === "view"}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  onClick={this.addDiscrepancies}
                >
                  <span>Save</span>
                </Button>
              </div>
            </div>
          )}
          {this.state.isTable && (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <div className="actions">
                  <h3>Discrepancies</h3>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="AddNewDiscrepancies"
                    aria-label="Add New Discrepancy"
                    onClick={this.addNewDiscrepancy}
                  >
                    <Tooltip title="Add New Discrepancy">
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
                        <TableCell>Discrepency</TableCell>
                        <TableCell>Stage</TableCell>
                        <TableCell>Actor Roles</TableCell>
                        <TableCell>Checker Roles</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {discrepancies
                        ? discrepancies.map((n, i) => {
                          return (
                            <SortableItem
                              key={n.id}
                              index={i}
                              value={
                                <React.Fragment>
                                  <TableCell>
                                    {this.filterDiscrepancyParams(n.discrepancyId)}
                                  </TableCell>
                                  <TableCell>
                                    {this.filterStagesParams(n.stageId)}
                                  </TableCell>
                                  <TableCell>
                                    {this.filterRolesParams(
                                      n.actorRoleIds ? n.actorRoleIds : []
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {this.filterRolesParams(
                                      n.checkerRoleIds ? n.checkerRoleIds : []
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
                                            n.status === 0
                                              ? "Active"
                                              : "In-Active"
                                          }
                                          disabled={
                                            this.props.mode === "view"
                                          }
                                          name={n.id}
                                          checked={n.status === 0}
                                          onChange={
                                            this.handleChangeDiscrepancyStatus
                                          }
                                        />
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <div style={{ display: "inline-flex" }}>
                                      {this.props.mode === "view" ? (
                                        <IconButton
                                          name="view"
                                          aria-label="View"
                                          onClick={() => {
                                            this.editDiscrepancy(n.id);
                                          }}
                                        >
                                          <Tooltip title="View">
                                            <i class="zmdi zmdi-eye" />
                                          </Tooltip>
                                        </IconButton>
                                      ) : (
                                          <IconButton
                                            name="edit"
                                            aria-label="Edit"
                                            onClick={() => {
                                              this.editDiscrepancy(n.id);
                                            }}
                                          >
                                            <Tooltip title="Edit">
                                              <EditIcon />
                                            </Tooltip>
                                          </IconButton>
                                        )}
                                    </div>
                                  </TableCell>
                                </React.Fragment>
                              }
                            />
                          );
                        })
                        : []}
                    </SortableContainer>
                  </Table>
                </div>
              </CardBox>
            </div>
          )}
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
    getAllMdmDiscrepencies: state.mdmDiscrepenciesData.allMdmDiscrepencies
      ? state.mdmDiscrepenciesData.allMdmDiscrepencies.data.items
      : "",
    getAllRoles: state.rolesData.allRoles
      ? state.rolesData.allRoles.data.items
      : [],
    editProductData: state.productsData.editProduct
      ? state.productsData.editProduct
      : null,
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
    showMdmDiscrepencyLoader,
    fetchAllMdmDiscrepencies,
    showProductLoader,
    editProduct,
    editDraftProduct,
    showRoleLoader,
    fetchAllRoles
  }
)(Discrepencies);
