import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class MCConfirmation extends React.Component {
  render() {
    return (
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={true}
        maxWidth="sm"
      >
        <DialogTitle>
          {this.props.request === "sfa"
            ? "Sent For Approval"
            : this.props.request === "review"
            ? "Sent For Review"
            : this.props.request === "approve"
            ? "Approve"
            : "Reject"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText />
          <TextField
            name="comments"
            autoFocus
            margin="dense"
            id="comments"
            label="Comment"
            type="text"
            onChange={this.props.hc}
            autoComplete="off"
            defaultValue={this.props.comments}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            name="close"
            onClick={() => {this.props.cl()}}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            name="handleRequest"
            onClick={() => {this.props.hr()}}
            disabled={
              this.props.action === 3 || this.props.action === 5
                ? !this.props.comments
                : false
            }
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default MCConfirmation;
