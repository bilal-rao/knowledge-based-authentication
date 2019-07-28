import React from "react";
import IntlMessages from "util/IntlMessages";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import {
  editProduct,
  editDraftProduct,
  showProductLoader
} from "actions/Product";
import { fetchAllFields } from "actions/QueryBuilder";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import CardBox from "components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import { Badge } from "reactstrap";
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

class Deduping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pId: localStorage.getItem("pId"),
      sId: localStorage.getItem("sId"),
      product: {},
      stages: [],
      dedupings: [],
      fieldList: [],
      field: "",
      fieldIds: "",
      stageId: null,
      isaddNewDeduping: false,
      addEditViewDeduping: false,
      showDedupingList: false,
      isFieldModalOpen: false
    };
  }

  componentDidMount() {
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

    if (this.state.fieldList.length === 0 && nextProps.fieldList.length !== 0)
      this.setState({ fieldList: nextProps.fieldList });
  }

  mapDataFromPropsToState = (npE, pE, npI, pI) => {
    if (npE !== pE) this.fetchDeduping();
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

      if (npI && this.state.dedupings.length === 0) {
        this.setState(
          {
            dedupings: npI.dedupings ? npI.dedupings : [],
            addEditViewDeduping: false,
            showDedupingList: true
          },
          () => {
            if (this.state.dedupings.length === 0)
              this.setState({
                showDedupingList: false,
                isaddNewDeduping: true
              });
          }
        );
      }
    }
  };

  addNewDeduping = () => {
    this.setState({
      stageId: "",
      fieldIds: [],
      addEditViewDeduping: true,
      showDedupingList: false
    });
  };

  fetchDeduping = () => {
    this.setState(
      {
        showDedupingList: true,
        addEditViewDeduping: false,
        dedupings: []
      },
      () => {
        this.props.ups(3);
        this.props.fp();
      }
    );
  };

  createDeduping = () => {
    let fd = this.state.dedupings;
    if (this.state.dedupingId) {
      if (!window.confirm("Are you sure you want to UPDATE this deduping?"))
        return;
      fd = this.state.dedupings.filter(dd => {
        return dd.id !== this.state.dedupingId;
      });
    }

    this.setState(
      {
        dedupings: [
          ...fd,
          {
            id: this.state.dedupingId,
            fieldIds: this.state.fieldIds,
            stageId: this.state.stageId,
            status: this.state.status
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
            dedupings: this.state.dedupings
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            dedupings: this.state.dedupings
          });
        }
      }
    );
  };

  editDeduping = dedupingId => {
    let fd = this.state.dedupings.filter(dd => {
      return dd.id === dedupingId;
    });
    fd = fd[0];

    this.setState({
      dedupingId,
      stageId: fd.stageId,
      status: fd.status,
      fieldIds: fd.fieldIds ? fd.fieldIds : [],
      addEditViewDeduping: true,
      showDedupingList: false
    });
  };

  filterStagesParams = sid => {
    let tempStages = this.state.stages;
    let fs = tempStages.filter(stage => {
      return stage.id === sid;
    });
    return fs.length > 0 ? fs[0]["name"] : "N/A";
  };

  filterFieldsPrams = fieldId => {
    let tempFields = this.state.fieldList;
    let ff = tempFields.filter(field => {
      return field.id === Number(fieldId);
    });
    return ff.length > 0 ? ff[0]["name"] : "N/A";
  };

  handleChangeDedupingStatus = e => {
    if (!window.confirm("Are you sure you want to UPDATE this deduping?"))
      return;
    let dedupings = this.state.dedupings.slice(0).filter(dd => {
      if (dd.id === e.target.name) dd["status"] = Number(!e.target.checked);
      return dd;
    });
    this.setState({ dedupings }, () => {
      this.props.showProductLoader();
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        this.props.editDraftProduct({
          ...this.state.product,
          sId: this.state.sId,
          pId: this.state.pId,
          dedupings
        });
      } else {
        this.props.editProduct({
          ...this.state.product,
          pId: this.state.pId,
          dedupings
        });
      }
    });
  };

  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ dedupings }) => ({
        dedupings: arrayMove(dedupings, oldIndex, newIndex)
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
            dedupings: this.state.dedupings
          });
        } else {
          this.props.editProduct({
            ...this.state.product,
            pId: this.state.pId,
            dedupings: this.state.dedupings
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
          {this.state.addEditViewDeduping ? (
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <SelectComponent
                  onChange={ev => this.setState({ fieldIds: ev })}
                  items={this.state.fieldList ? this.state.fieldList : []}
                  single={this.state.fieldIds}
                  type={"multi"}
                  label={"Select Fields"}
                  placeholder="Fields"
                  mode={this.props.mode}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <SelectComponent
                  onChange={ev => this.setState({ stageId: ev })}
                  items={this.state.stages ? this.state.stages : []}
                  single={this.state.stageId}
                  type={"single"}
                  label={"Select Stage"}
                  placeholder="Stage"
                  mode={this.props.mode}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <br />
                {this.state.dedupings.length > 0 ? (
                  <Button
                    name="cancel"
                    variant="contained"
                    className="jr-btn bg-white text-black"
                    onClick={this.fetchDeduping}
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  disabled={
                    !this.state.stageId || this.state.fieldIds.length === 0
                  }
                  disabled={this.props.mode === "view"}
                  onClick={this.createDeduping}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : this.state.showDedupingList ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                <div className="actions">
                  <h3>Dedupings</h3>
                  <IconButton
                    disabled={this.props.mode === "view"}
                    name="AddNewDeduping"
                    aria-label="Add New Deduping"
                    onClick={this.addNewDeduping}
                  >
                    <Tooltip title="Add New Deduping">
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
                        <TableCell>Fields</TableCell>
                        <TableCell>Stage</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <SortableContainer
                      onSortEnd={this.onSortEndMain}
                      useDragHandle
                    >
                      {this.state.dedupings.map((dd, i) => {
                        return (
                          <SortableItem
                            key={dd.id}
                            index={i}
                            value={
                              <React.Fragment>
                                <TableCell>
                                  {dd.fieldIds
                                    ? dd.fieldIds.map((field, index) => {
                                        return (
                                          <Badge
                                            key={index}
                                            href="javascript:void(0)"
                                            color="primary"
                                          >
                                            {this.filterFieldsPrams(field)}
                                          </Badge>
                                        );
                                      })
                                    : "N/A"}
                                </TableCell>
                                <TableCell>
                                  {this.filterStagesParams(dd.stageId)}
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
                                          dd.status === 0
                                            ? "Active"
                                            : "In-Active"
                                        }
                                        disabled={this.props.mode === "view"}
                                        name={dd.id}
                                        checked={dd.status === 0}
                                        onChange={
                                          this.handleChangeDedupingStatus
                                        }
                                      />
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  {this.props.mode === "view" ? (
                                    <IconButton
                                      aria-label="View"
                                      onClick={() => this.editDeduping(dd.id)}
                                    >
                                      <Tooltip title="View">
                                        <i className="zmdi zmdi-eye" />
                                      </Tooltip>
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      aria-label="Edit"
                                      onClick={() => this.editDeduping(dd.id)}
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
          ) : this.state.isaddNewDeduping ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <Button
                  disabled={this.props.mode === "view"}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-uppercase"
                  onClick={this.addNewDeduping}
                >
                  Add New Deduping
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
    fetchAllFields
  }
)(Deduping);
