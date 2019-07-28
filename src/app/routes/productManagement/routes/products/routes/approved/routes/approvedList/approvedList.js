import React from "react";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { NotificationManager } from "react-notifications";
import { Badge } from "reactstrap";

// Configs
import permissions from "config/permissions";

// Actions
import {
  showProductMainPageLoader,
  fetchProduct,
  hideProductMessage,
  hideProductMainPageMessage,
  showProductDeleteLoader,
  deleteProduct,
  showProductLoader,
  fetchIndividualProduct
} from "actions/Product";
import { fetchAction } from "actions/Action";
import { fetchModule, showModuleLoader } from "actions/Module";

// Icons
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterList from "@material-ui/icons/FilterList";
import Clear from "@material-ui/icons/Clear";
import ResetSearch from "@material-ui/icons/Loop";
import ProductAdd from "@material-ui/icons/AddToQueue";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";

// Components
import Search from "./search";
import Loader from "components/loader/loader";
import DataTableHead from "components/customComponents/DataTableHead/dataTableHead";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      add: false,
      update: false,
      delete: false,
      view: false,
      permissions: null,
      id: "",
      isModalOpen: false,
      name: null,
      code: null,
      columnData: [
        { id: "name", align: false, disablePadding: false, label: "Name" },
        {
          id: "parent",
          align: false,
          disablePadding: false,
          label: "Parent Product"
        },
        { id: "code", align: false, disablePadding: false, label: "Code" },
        {
          id: "status",
          align: false,
          disablePadding: false,
          label: "Status"
        },
        {
          id: "actions",
          align: false,
          disablePadding: false,
          label: "Actions"
        }
      ]
    };
  }

  componentDidMount() {
    if (!this.props.isModules) {
      this.props.showModuleLoader();
      this.props.fetchModule();
    }

    this.props.showProductMainPageLoader();
    this.props.fetchProduct({
      pageNumber: 1,
      pageSize: 10
    });

    localStorage.removeItem("pId");
    localStorage.removeItem("sId");
    localStorage.removeItem("maxStep");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isModules) {
      nextProps.isModules.modules.map(element => {
        if (element.modules.length) {
          this.parent(element);
        } else {
          this.children(element);
        }
      });
    }
  }

  componentDidUpdate() {
    if (this.props.deleteProductSuccess) {
      if (
        (this.props.isMakerCheckerEnabled && this.state.sId) ||
        this.props.isPending
      ) {
        NotificationManager.success("Your changes has been deleted as draft!");
        this.props.history.push("/app/product-management/products/pending");
      } else {
        NotificationManager.success("Product has been deleted!");
      }
    }
    if (this.props.individualProductData && this.props.requestedPage) {
      if (
        this.props.individualProductData.data.page === "view" &&
        this.props.requestedPage.page === "view"
      ) {
        this.props.history.push(
          "/app/product-management/products/approved/view/" +
            this.props.individualProductData.data.id
        );
      }
      if (
        this.props.individualProductData.data.page === "edit" &&
        this.props.requestedPage.page === "edit"
      ) {
        this.props.history.push(
          "/app/product-management/products/approved/edit/" +
            this.props.individualProductData.data.id
        );
      }
    }
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideProductMessage();
      }, 100);
    } else if (this.props.showMainPageMessage) {
      if (
        this.props.alertMainPageMessage ===
        "Request failed with status code 404"
      ) {
        this.props.history.push("/app/extra-pages/error-400");
      } else {
        this.props.history.push("/app/extra-pages/error-500");
      }
      setTimeout(() => {
        this.props.hideProductMainPageMessage();
      }, 100);
    }
  }

  parent = element => {
    element.modules.map(el => {
      if (el.modules.length) {
        this.parent(el);
      } else {
        this.children(el);
      }
    });
  };

  children = element => {
    if (element.route === this.props.history.location.pathname) {
      this.props.fetchAction(element);
      this.setState({
        permissions: element
      });
      if (element.actions) {
        element.actions.map(data => {
          if (data.actionId === permissions.Add) {
            data.isSelected
              ? this.setState({ add: true })
              : this.setState({ add: false });
          } else if (data.actionId === permissions.Update) {
            data.isSelected
              ? this.setState({ update: true })
              : this.setState({ update: false });
          } else if (data.actionId === permissions.Delete) {
            data.isSelected
              ? this.setState({ delete: true })
              : this.setState({ delete: false });
          } else if (data.actionId === permissions.View) {
            data.isSelected
              ? this.setState({ view: true })
              : this.setState({ view: false });
          }
        });
      }
    }
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  handleChangePage = (event, page) => {
    this.props.showProductMainPageLoader();
    this.props.fetchProduct({
      pageNumber: page + 1,
      pageSize: this.state.rowsPerPage
    });
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.showProductMainPageLoader();
    this.props.fetchProduct({
      pageNumber: 1,
      pageSize: event.target.value
    });
    this.setState({ rowsPerPage: event.target.value });
  };

  onClickFilter = () => {
    this.setState({ isModalOpen: true });
  };

  onClickReset = () => {
    this.props.showProductLoader();
    this.setState({
      name: null,
      code: null
    });
    this.props.fetchProduct({
      pageNumber: 1,
      pageSize: 10
    });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSaveFilter = (name, code) => {
    this.setState({ name, code });
  };

  onEditProduct = pId => {
    localStorage.setItem("pId", pId);
    this.props.history.push(
      `/app/product-management/products/approved/edit/${pId}`
    );
  };

  onViewProduct = pId => {
    localStorage.setItem("pId", pId);
    this.props.history.push(
      `/app/product-management/products/approved/view/${pId}`
    );
  };

  onDeleteProduct = pId => {
    if (!window.confirm("Are you sure you want to DELETE this product?"))
      return;
    this.props.showProductDeleteLoader();
    this.props.deleteProduct({
      id: pId,
      pageNumber: 1,
      pageSize: 10
    });
  };

  filterProductName = pId => {
    let tempProduct = this.props.productsList;
    let fp = tempProduct.filter(pro => {
      return pro.id === pId;
    });
    return fp.length > 0 ? fp[0]["name"] : "N/A";
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { showMessage, alertMessage, loader } = this.props;

    return (
      <Paper>
        <Toolbar>
          <div className="title">
            <Typography type="title">Product Listing</Typography>
          </div>
          <div className="actions">
            {this.state.name || this.state.code ? (
              <div className="filterParams">
                {this.state.code ? (
                  <div className="filterItem">
                    <strong>Code: </strong>
                    {this.state.code}
                  </div>
                ) : null}
                {this.state.name ? (
                  <div className="filterItem">
                    <strong>Name: </strong>
                    {this.state.name}
                  </div>
                ) : null}
                <IconButton
                  name="Clear Filter"
                  aria-label="Clear Filter"
                  onClick={this.onClickReset}
                >
                  <Tooltip title="Clear Filter">
                    <Clear />
                  </Tooltip>
                </IconButton>
              </div>
            ) : null}
            <IconButton
              name="AddNewProduct"
              aria-label="Add New Product"
              disabled={this.state.add ? false : true}
              onClick={() =>
                this.props.history.push(
                  "/app/product-management/products/approved/add"
                )
              }
            >
              <Tooltip title="Add New Product">
                <ProductAdd />
              </Tooltip>
            </IconButton>
            <IconButton
              name="Reset Search"
              aria-label="Reset Search"
              onClick={this.onClickReset}
            >
              <Tooltip title="Reset Search">
                <ResetSearch />
              </Tooltip>
            </IconButton>
            <IconButton
              name="Filter"
              aria-label="Filter"
              onClick={this.onClickFilter}
            >
              <Tooltip title="Filter">
                <FilterList />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
        <div className="flex-auto">
          <div className="table-responsive-material">
            {this.props.loader === false && this.props.productsList ? (
              <Table className="">
                <DataTableHead
                  columns={this.state.columnData}
                  data={this.props.productsList}
                />
                <TableBody>
                  {this.props.productsList.map(n => {
                    var str = n.name;
                    var acronym = /\s/g.test(str)
                      ? str.charAt(0) + str.charAt(str.lastIndexOf(" ") + 1)
                      : str.charAt(0);
                    return (
                      <TableRow hover tabIndex={-1} key={n.id}>
                        <TableCell>
                          <div
                            style={{ padding: "0px" }}
                            className="user-profile d-flex flex-row align-items-center"
                          >
                            {n.image ? (
                              <Avatar
                                className="size-40"
                                alt="Avatar"
                                src={n.image}
                              />
                            ) : (
                              <Avatar className="bg-warning">
                                <h3 className="m-0 text-white">
                                  {acronym.toUpperCase()}
                                </h3>
                              </Avatar>
                            )}
                            &nbsp;&nbsp;
                            <div className="user-detail">
                              <h4 className="user-name text-capitalize">
                                {n.name.toUpperCase()}
                              </h4>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {this.filterProductName(n.parentId)}
                        </TableCell>
                        <TableCell>{n.code}</TableCell>
                        <TableCell>
                          {n.status === 0 ? (
                            <Badge color="success">Active</Badge>
                          ) : (
                            <Badge color="light">InActive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "inline-flex" }}>
                            <IconButton
                              name=""
                              disabled={this.state.view ? false : true}
                              aria-label="View"
                              onClick={() => {
                                this.onViewProduct(n.id);
                              }}
                            >
                              <Tooltip title="View">
                                <ViewIcon />
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              name=""
                              disabled={
                                this.state.update
                                  ? n.status === 1
                                    ? true
                                    : false
                                  : true
                              }
                              aria-label="Edit"
                              onClick={() => {
                                this.onEditProduct(n.id);
                              }}
                            >
                              <Tooltip title="Edit">
                                <EditIcon />
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              name=""
                              disabled={this.state.delete ? false : true}
                              aria-label="Delete"
                              onClick={() => {
                                this.onDeleteProduct(n.id);
                              }}
                            >
                              <Tooltip title="Delete">
                                <DeleteIcon />
                              </Tooltip>
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={this.props.paging.totalItems}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <Loader />
            )}
            {loader && <Loader />}
            {showMessage && NotificationManager.error(alertMessage)}
          </div>
        </div>
        {this.state.isModalOpen ? (
          <Search
            onSaveFilter={this.onSaveFilter}
            onCloseModal={this.onCloseModal}
            code={this.state.code}
            name={this.state.name}
          />
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModules: state.modules.moduleData.data,
    productsList: state.productsData.productsList
      ? state.productsData.productsList.data.items
      : "",
    deleteProductSuccess: state.productsData.deleteProductSuccess,
    paging: state.productsData.productsList
      ? state.productsData.productsList.data.paging
      : "",
    showMessage: state.productsData.showMessage,
    alertMessage: state.productsData.alertMessage,
    loader: state.productsData.loader,
    showMainPageMessage: state.productsData.showMainPageMessage,
    alertMainPageMessage: state.productsData.alertMainPageMessage,
    individualProductData: state.productsData.individualProductData,
    isMakerCheckerEnabled: state.actions.actionsData
      ? state.actions.actionsData.isMakerCheckerEnabled
      : "",
    productTypesSuccess: state.productsData.productTypesSuccess
  };
}

export default connect(
  mapStateToProps,
  {
    showModuleLoader,
    fetchModule,
    showProductMainPageLoader,
    fetchProduct,
    hideProductMessage,
    hideProductMainPageMessage,
    fetchAction,
    showProductDeleteLoader,
    deleteProduct,
    showProductLoader,
    fetchIndividualProduct
  }
)(DataTable);
