import React from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import {
  showRoleLoader,
  searchRole,
  fetchRole
} from "actions/Role";
class SearchRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byName: "",
    };
  }
  onNameSearch(e) {
    e.preventDefault();
    this.setState({
      byName: e.target.value
    })
  }
  searchRole(e) {
    e.preventDefault();    
    if (this.state.byName) {
      const queryObj = {
        byName: this.state.byName,
      };
      this.props.showRoleLoader();
      this.props.searchRole(queryObj);
    } else {
       NotificationManager.error("Please type something!");               
    }
  }
  resetRole() {
    const obj = {
      pageNumber: 1,
      pageSize: 5
    };
    this.props.showRoleLoader();
    this.props.fetchRole(obj);
  }
  render() {
    return (
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="row">
            <CardBox
              styleName="col-lg-12"
              heading={<IntlMessages id="component.searchBar.searchRole" />}
            >
              <form className="row" onSubmit={this.searchRole.bind(this)}>
                <div className="col-md-12 col-12">
                  <TextField name=""
                    id="search"
                    label="Search by Name"
                    type="search"
                    margin="normal"
                    onChange={this.onNameSearch.bind(this)}
                    fullWidth
                  />
                </div>
                <div className="col-md-6 col-12" />
                <div className="col-md-6 col-12" style={{ textAlign: "right" }}>
                  <Button name=""
                    variant="contained"
                    className="jr-btn bg-light-green text-white"
                    onClick={this.resetRole.bind(this)}
                  >
                    {/* <i className="zmdi zmdi-shield-check zmdi-hc-fw" /> */}
                    <span>View All</span>
                  </Button>
                  <Button name="" type="submit" variant="contained" color="primary" className="jr-btn">
                    <i className="zmdi zmdi-search" />
                    <span>Search</span>
                  </Button>
                </div>
              </form>
            </CardBox>
          </div>
        </div>
    );
  }
}

export default connect(
  null,
  {
    showRoleLoader,
    searchRole,
    fetchRole
  }
)(SearchRole);
