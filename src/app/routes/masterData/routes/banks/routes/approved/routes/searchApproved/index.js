import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import {
  showBankLoader,
  searchBank,
  fetchBank
} from "actions/Bank";
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

class SearchBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byName: "",
      byCode: "",
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
  searchBank(ev) {
    ev.preventDefault();
    if (this.state.byName || this.state.byCode) {
      const queryObj = {
        byName: this.state.byName,
        byCode: this.state.byCode
      };
      this.props.showBankLoader();
      this.props.searchBank(queryObj);
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
    this.props.showBankLoader();
    this.props.fetchBank(obj);
  }
  state = {
    name: "hai"
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <Typography className={classes.heading}>Search Bank</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
           <div className="col-md-6 col-12">
                <TextField name=""
                  label="Search by Code"
                  margin="normal"
                  onChange={this.onCodeSearch.bind(this)}
                  fullWidth
                />
              </div>
              <div className="col-md-6 col-12">
                <TextField name=""
                  label="Search by Name"
                  margin="normal"
                  onChange={this.onNameSearch.bind(this)}
                  fullWidth
                />
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
                onClick={this.searchBank.bind(this)}
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
    showBankLoader,
    searchBank,
    fetchBank
  })
)(SearchBank);
