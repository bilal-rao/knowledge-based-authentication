import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

// Icons
import SFA from "@material-ui/icons/Rotate90DegreesCcw";
import SFR from "@material-ui/icons/Search";
import APR from "@material-ui/icons/Done";
import REJ from "@material-ui/icons/Clear";
import DEL from "@material-ui/icons/Delete";
import EDT from "@material-ui/icons/Edit";
import COM from "@material-ui/icons/CompareArrows";

class Actions extends React.Component {
  abp = req => {
    if (req === "sfa") {
      return this.props.maker
        ? !(
            this.props.sStatus === 0 &&
            this.props.isModules.userId === this.props.sUserId
          )
        : this.props.sStatus === 1;
    } else if (req === "review") {
      return this.props.checker
        ? !(
            this.props.sStatus === 1 &&
            this.props.isModules.userId !== this.props.sUserId
          )
        : true;
    } else if (req === "approve") {
      return this.props.checker
        ? !(
            this.props.sStatus === 1 &&
            this.props.isModules.userId !== this.props.sUserId
          )
        : true;
    } else if (req === "reject") {
      return this.props.checker
        ? !(
            this.props.sStatus === 1 &&
            this.props.isModules.userId !== this.props.sUserId
          )
        : true;
    } else if (req === "edit") {
      return (
        this.props.mode === "edit" ||
        (this.props.sStatus !== 0 &&
          (this.props.isModules && this.props.isModules.userId) ===
            this.props.sUserId) ||
        this.props.status === 1
      );
    } else if (req === "delete") {
      return this.props.isPending
        ? !(
            this.props.sStatus === 0 ||
            (this.props.sStatus === 3 &&
              this.props.sAction === this.props.sAdded)
          )
        : false;
    } else if (req === "com") {
      return this.props.isPending
        ? this.props.sAction === 1
          ? !this.props.isTrail
          : true
        : true;
    } else return false;
  };

  render() {
    return (
      <div className="floatingActionsContainer">
        <Fab
          name="edit"
          variant="round"
          disabled={this.abp("edit")}
          onClick={() => {
            this.props.history.push(
              this.props.isPending
                ? `/app/${this.props.path}/pending/edit/${this.props.sId}`
                : `/app/${this.props.path}/approved/edit/${this.props.eId}`
            );
          }}
          className={
            this.abp("edit")
              ? "jr-fab-btn text-grey"
              : "jr-fab-btn bg-blue text-white"
          }
        >
          <Tooltip title="Edit">
            <EDT />
          </Tooltip>
        </Fab>

        {this.props.isPending ? (
          <React.Fragment>
            <Fab
              name="com"
              variant="round"
              disabled={this.abp("com")}
              onClick={() => { this.props.onClk("com")}}
              className={
                this.abp("com")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-orange text-white"
              }
            >
              <Tooltip title="Compare">
                <COM />
              </Tooltip>
            </Fab>
            <Fab
              name="sfa"
              variant="round"
              disabled={this.abp("sfa")}
              onClick={() => { this.props.onClk("sfa")}}
              className={
                this.abp("sfa")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-indigo text-white"
              }
            >
              <Tooltip title="Sent For Approval">
                <SFA />
              </Tooltip>
            </Fab>
            <Fab
              name="review"
              variant="round"
              disabled={this.abp("review")}
              onClick={() => { this.props.onClk("review")}}
              className={
                this.abp("review")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-teal text-white"
              }
            >
              <Tooltip title="Sent For Review">
                <SFR />
              </Tooltip>
            </Fab>
            <Fab
              name="approve"
              variant="round"
              disabled={this.abp("approve")}
              onClick={() => { this.props.onClk("approve")}}
              className={
                this.abp("approve")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-success text-white"
              }
            >
              <Tooltip title="Approve">
                <APR />
              </Tooltip>
            </Fab>
            <Fab
              name="reject"
              variant="round"
              disabled={this.abp("reject")}
              onClick={() => { this.props.onClk("reject")}}
              className={
                this.abp("reject")
                  ? "jr-fab-btn text-grey"
                  : "jr-fab-btn bg-deep-orange text-white"
              }
            >
              <Tooltip title="Reject">
                <REJ />
              </Tooltip>
            </Fab>
          </React.Fragment>
        ) : null}

        <Fab
          name="delete"
          variant="round"
          disabled={this.abp("delete")}
          onClick={() => { this.props.onClk("reject")}}
          className={
            this.abp("delete")
              ? "jr-fab-btn text-grey"
              : "jr-fab-btn bg-red text-white"
          }
        >
          <Tooltip title="Delete">
            <DEL />
          </Tooltip>
        </Fab>
      </div>
    );
  }
}

export default Actions;
