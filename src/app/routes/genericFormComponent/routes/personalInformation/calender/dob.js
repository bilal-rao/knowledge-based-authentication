import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
export default class DOB extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <DatePicker
            keyboard
            label="DOB"
            format="DD/MM/YYYY"
            // placeholder="10/10/2018"
            // handle clearing outside => pass plain array if you are not controlling value outside
            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
            value={selectedDate}
            onChange={this.handleDateChange}
            disableOpenOnEnter
            animateYearScrolling={false}
          />
        </div>
      </Fragment>
    );
  }
}