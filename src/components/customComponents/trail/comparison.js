import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";


var com = [];

class Comparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      data: null,
      trail: [],
      penData: {},
      appData: {},
      comparison: []
    };
  }

  componentDidMount() {
    this.setState(
      {
        id: this.props.data.id,
        data: this.props.data,
        penData: this.props.data.payload,
        trail: this.props.data.trail ? this.props.data.trail.reverse() : []
      },
      () => {
        this.state.trail.forEach(tr => {
          if (tr.activity === 2) {
            this.setState(
              {
                appData: tr.payload
              },
              () => {
                this.comparison();
              }
            );
          }
        });
      }
    );
  }

  arrayFilter = () => {

  }

  comparison = () => {
    com = [];
    for (var pen in this.state.penData) {
      if (this.state.penData.hasOwnProperty(pen)) {
        this.compareIt(this.state.appData[pen], this.state.penData[pen], pen);
      }
    }
    this.setState({
      comparison: com
    });
  };

  compareIt = (o, n, f) => {
    if (String(n) !== String(o)) {
      com.push({
        name: f,
        old: o ? o : "N/A",
        new: n ? n : "N/A"
      });
      // if (typeof n === "object") {
      //   if (Array.isArray(n)) {
      //     for (var v in n) {
      //       this.compareIt(n[v], o[v], v);
      //     }
      //   } else {

      //   }
      // } else {
      //   com.push({
      //     name: f,
      //     old: o ? o : "N/A",
      //     new: n ? n : "N/A"
      //   });
      // }
    }
  }

  render() {
    return (
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={true}
        maxWidth="md"
      >
        <DialogTitle>Comparison</DialogTitle>
        <DialogContent>
          <Paper>
            <div className="row comparison-container">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="flex-auto">
                  <div className="table-responsive-material">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="none" align="left">
                            Fields
                          </TableCell>
                          <TableCell padding="none" align="left">
                            Previous Value
                          </TableCell>
                          <TableCell padding="none" align="left">
                            New Value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.comparison.map((fl, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell padding="none">
                                <strong>{fl.name}</strong>
                              </TableCell>
                              <TableCell padding="none">{fl.old}</TableCell>
                              <TableCell padding="none">{fl.new}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            name="onCloseModal"
            onClick={this.props.onCloseModal}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Comparison;
