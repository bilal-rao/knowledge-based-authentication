import React from 'react';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/HighlightOff";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";

class CustomDateRange extends React.Component {
	render() {
		return (
			<div className="rangeCalender">
				<div className="rangeHeader">
					<h2>Select Date Range</h2>
					<IconButton 
						name="closeDateRangePopUp"
						aria-label="Close"
						onClick={this.props.onCloseDR}>
						<Tooltip title="Close">
							<CloseIcon />
						</Tooltip>
					</IconButton>
				</div>
				<DateRange
					minDate={ this.props.mode === 'add' ? moment() : this.props.minDate && this.props.minDate < moment() ? moment(moment(this.props.minDate, 'YYYYMMDDHHmmss').format()) : moment() }
					startDate={ this.props.fromDate ? moment(moment(this.props.fromDate, 'YYYYMMDDHHmmss').format()) : moment() }
					endDate={ this.props.toDate ? moment(moment(this.props.toDate, 'YYYYMMDDHHmmss').format()) : this.props.fromDate ? moment(moment(this.props.fromDate, 'YYYYMMDDHHmmss').format()) : moment() }
					onChange={this.props.onChangeDR}
				/>
				<div className="p-b-15 p-r-10 text-right">
					<hr />
					<Button 
						name="cancel" 
						variant="contained" 
						className="jr-btn bg-white text-black text-uppercase"
						onClick={this.props.onClearDR}>
						Clear
					</Button>
					<Button
						variant="contained" 
						color="primary" 
						className="jr-btn text-uppercase"
						onClick={this.props.onSaveDR}>
						Select
					</Button>
				</div>
			</div>
		)
	}
}

export default CustomDateRange;