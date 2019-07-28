import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import {
  showHierarchyLoader,
  searchHierarchy,
  fetchHierarchy
} from "actions/Hierarchy";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import compose from 'recompose/compose';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.3%',
    marginRight: '15px'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary[500],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class SearchHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byName: "",
      byType: "",
      byCode: "",
      typeEnum: null
    };
  }
  onNameSearch(e) {
    e.preventDefault();
    this.setState({
      byName: e.target.value
    });
  }
  onCodeSearch(e) {
    e.preventDefault();
    this.setState({
      byCode: e.target.value
    });
  }
  searchHierarchy(ev) {
    ev.preventDefault();
    if (this.state.byName || this.state.byType || this.state.byCode) {
      const queryObj = {
        byName: this.state.byName,
        byType: this.state.typeEnum,
        byCode: this.state.byCode
      };
      this.props.showHierarchyLoader();
      this.props.searchHierarchy(queryObj);
    } else {
      NotificationManager.error("Please type something!");
    }
  }
  resetUser() {
    const obj = {
      pageNumber: 1,
      pageSize: 5,
      type: 'mainPage'
    };
    this.props.showHierarchyLoader();
    this.props.fetchHierarchy(obj);
  }
  state = {
    byType: "",
    name: "hai"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    if (event.target.value === 'area') {
      this.setState({
        typeEnum: 0
      });
    }
    else if (event.target.value === 'branch') {
      this.setState({
        typeEnum: 1
      });
    }
    else if (event.target.value === 'city') {
      this.setState({
        typeEnum: 2
      });
    }
    else if (event.target.value === 'province') {
      this.setState({
        typeEnum: 3
      });
    }
    else if (event.target.value === 'zone'){
      this.setState({
        typeEnum: 4
      });
    }
    else {
      this.setState({
        typeEnum: null
      })
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <Typography className={classes.heading}>Search Hierarchy</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
           <div className="col-md-4 col-12">
                <TextField name=""
                  id="search"
                  label="Search by Code"
                  margin="normal"
                  onChange={this.onCodeSearch.bind(this)}
                  fullWidth
                />
              </div>
              <div className="col-md-4 col-12">
                <TextField name=""
                  id="search"
                  label="Search by Name"
                  type="search"
                  margin="normal"
                  onChange={this.onNameSearch.bind(this)}
                  fullWidth
                />
              </div>
              <div className="col-md-4 col-12" style={{ marginTop: '16px' }}>
                <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="type">Search by Type</InputLabel>
                  <Select name=""
                    value={this.state.byType || ""}
                    onChange={this.handleChange("byType")}
                    input={<Input name="" id="byType" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="branch">Branch</MenuItem>
                    <MenuItem value="city">City</MenuItem>
                    <MenuItem value="province">Province</MenuItem>
                    <MenuItem value="zone">Zone</MenuItem>
                    <MenuItem value="area">Area</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button name=""
                variant="contained"
                className="jr-btn bg-white text-black"
                onClick={this.resetUser.bind(this)}
              >
                <i className="zmdi zmdi-search-replace"></i>
                <span>View All</span>
              </Button>
              <Button name=""
                variant="contained"
                color="primary"
                className="jr-btn text-white"
                onClick={this.searchHierarchy.bind(this)}
              >
                <i className="zmdi zmdi-search" />
                <span>Search</span>
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}



export default compose(
  withStyles(styles, { withTheme: true }),
  connect(null, {
    showHierarchyLoader,
    searchHierarchy,
    fetchHierarchy
  })
)(SearchHierarchy);
