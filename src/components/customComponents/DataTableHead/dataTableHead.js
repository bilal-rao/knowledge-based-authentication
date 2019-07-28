import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

class DataTableHead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "name",
      data: null
    };
  }

  handleRequestSort = property => event => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.props.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  render() {
    const { columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
              >
                {column.id === "actions" ? (
                  column.label
                ) : (
                  <Tooltip
                    title={`Sort by ${column.label}`}
                    placement={column.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={this.state.orderBy === column.id}
                      direction={this.state.order}
                      onClick={this.handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                )}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default DataTableHead;
