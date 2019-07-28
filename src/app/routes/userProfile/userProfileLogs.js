import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs'; import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CardLayout from "components/CardLayout/index";
import CardMenu from "components/dashboard/Common/CardMenu";
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { userProfile } from '../../../actions/UserProfile'
import Button from "@material-ui/core/Button";
import ReportBox from 'components/ReportBox/index';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardBox from "components/CardBox/index";
import LoginHistory from "./loginHistory";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from 'recharts';

const chartDataWithoutAxis = [
    { name: 'J', amt: 1400 },
    { name: 'F', amt: 2210 },
    { name: 'M', amt: 1000 },
    { name: 'A', amt: 2000 },
    { name: 'M', amt: 1400 },
    { name: 'J', amt: 2300 },
    { name: 'J', amt: 500 },
    { name: 'A', amt: 2000 },
    { name: 'S', amt: 1500 },
    { name: 'O', amt: 1000 },
    { name: 'N', amt: 2000 },
    { name: 'D', amt: 500 },
    { name: 'M', amt: 1000 },
    { name: 'A', amt: 2000 },
    { name: 'M', amt: 1400 },
];


const UserList = ({ users }) => {
    return (
        <div className="pt-4 pb-1">
            {users.map((user, index) => {
                return (
                    <UserCell key={user.id + index} user={user} />
                );
            })}
        </div>
    );

};


const UserCell = ({ user }) => {
    const { id, title, image, desc } = user;
    return (
        <div key={id} className="user-profile d-flex flex-row align-items-center">
            <Avatar
                alt={title}
                src={image}
                className="user-avatar"
            />
            <div className="user-detail">
                <h5 className="text-muted text-uppercase mb-0">
                    <small>{title}</small>
                </h5>
                <div className="user-description">{desc}</div>
            </div>
        </div>

    );
};
function TabContainer({ children, dir }) {
    return (
        <div dir={dir}>
            {children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class UserProfileLogs extends Component {

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleInput = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowNewPasssword = () => {
        this.setState({ showNewPassword: !this.state.showNewPassword });
    };

    handleClickShowComfirmPasssword = () => {
        this.setState({ showComfirmPassword: !this.state.showComfirmPassword });
    };


    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    onOptionMenuSelect = event => {
        this.setState({ menuState: true, anchorEl: event.currentTarget });
    };
    handleRequestClose = () => {
        this.setState({ menuState: false });
    };

    constructor() {
        super();
        this.state = {
            value: 0,
            anchorEl: undefined,
            menuState: false,
            oldPassword: '',
            newPassword: '',
            comfirmPassword: '',
            showNewPassword: false,
            showComfirmPassword: false,
            name: 'Bilal Rao',
            designation: 'Software Engineer',
            empNumber: '22',
            empType: 'Permanent'
        }
    }

    componentWillUnmount() {
        this.props.userProfile('myProfile');
    }

    render() {
        const { anchorEl, menuState } = this.state;
        const { theme } = this.props;
        return (
            this.props.profileLink === 'myProfile' ?
                <CardLayout styleName="col-lg-12">
                    <div className="jr-card-header mb-3 d-flex align-items-center">
                        <div className="mr-auto">
                            <h3 className="card-heading mb-0">
                                <i className="zmdi zmdi-account mr-2" />
                                My Profile
                            </h3>
                        </div>
                    </div>

                    <div className="tab-notifications">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            // scrollable
                            // scrollButtons="on"
                            centered
                            fullWidth
                        >
                            <Tab className="tab" label="Personal Details" icon={<i className="zmdi zmdi-accounts-alt"></i>} />

                            <Tab className="tab" label="Roles" icon={<i className="zmdi zmdi-assignment-check"></i>} />
                        </Tabs>
                    </div>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}>
                            {/* <UserList users={this.props.appNotification} /> */}
                            <div className="pt-4 pb-1" style={{ overflow: 'hidden' }}>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="name">Name</InputLabel>
                                            <Input name=""
                                                id="name"
                                                type="text"
                                                value={this.state.name}
                                                onChange={this.handleInput('name')}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="designation">Designation</InputLabel>
                                            <Input name=""
                                                disabled
                                                id="designation"
                                                type="text"
                                                value={this.state.designation}
                                                onChange={this.handleInput('designation')}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6 col-12" style={{ paddingTop: '14px' }}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="empNumber">Employee Number</InputLabel>
                                            <Input name=""
                                                disabled
                                                id="empNumber"
                                                type="number"
                                                value={this.state.empNumber}
                                                onChange={this.handleInput('empNumber')}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6 col-12" style={{ paddingTop: '14px' }}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="empType">Employee Type</InputLabel>
                                            <Input name=""
                                                disabled
                                                id="empType"
                                                type="text"
                                                value={this.state.empType}
                                                onChange={this.handleInput('empType')}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12 col-12" style={{ textAlign: 'right', paddingTop: '14px' }}>
                                        <Button name="" variant="contained" className="jr-btn bg-light-green text-white">
                                            <i className="zmdi zmdi-plus-square" />
                                            <span>Save</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
                            {/* <UserList users={this.props.announcementsNotification} /> */}
                            <marquee style={{ paddingTop: '100px' }}>Roles are Under Construction</marquee>
                        </TabContainer>

                    </SwipeableViews>
                    <CardMenu menuState={menuState} anchorEl={anchorEl}
                        handleRequestClose={this.handleRequestClose.bind(this)} />
                </CardLayout>
                :
                this.props.profileLink === 'security' ?
                    <CardLayout styleName="col-lg-12">
                        <div className="jr-card-header mb-3 d-flex align-items-center">
                            <div className="mr-auto">
                                <h3 className="card-heading mb-0">
                                    <i className="zmdi zmdi-shield-security mr-2"></i>
                                    Security
                                </h3>
                            </div>
                            {/* <IconButton name="" className="size-30" onClick={this.onOptionMenuSelect.bind(this)}>
                                <i className="zmdi zmdi-more-vert" />
                            </IconButton> */}
                        </div>

                        <div className="tab-notifications">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                textColor="secondary"
                                centered
                                fullWidth
                            >
                                <Tab className="tab" label="Password" icon={<i className="zmdi zmdi-lock"></i>} />

                                <Tab className="tab" label="Login History" icon={<i className="zmdi zmdi-calendar-alt"></i>} />
                            </Tabs>
                        </div>

                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                <center>
                                    <div className="pt-4 pb-1">
                                        <div className="col-md-6 col-12">
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="old-password">Old Password</InputLabel>
                                                <Input name=""
                                                    id="old-password"
                                                    type="password"
                                                    value={this.state.oldPassword}
                                                    onChange={this.handleInput('oldPassword')}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="col-md-6 col-12" style={{ paddingTop: '14px' }}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="new-password">New Password</InputLabel>
                                                <Input name=""
                                                    id="new-password"
                                                    type={this.state.showNewPassword ? 'text' : 'password'}
                                                    value={this.state.newPassword}
                                                    onChange={this.handleInput('newPassword')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton name=""
                                                                onClick={this.handleClickShowNewPasssword}
                                                                onMouseDown={this.handleMouseDownPassword}
                                                            >
                                                                {this.state.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="col-md-6 col-12" style={{ paddingTop: '14px' }}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="comfirm-password">Comfirm Password</InputLabel>
                                                <Input name=""
                                                    id="comfirm-password"
                                                    type={this.state.showComfirmPassword ? 'text' : 'password'}
                                                    value={this.state.comfirmPassword}
                                                    onChange={this.handleInput('comfirmPassword')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton name=""
                                                                onClick={this.handleClickShowComfirmPasssword}
                                                                onMouseDown={this.handleMouseDownPassword}
                                                            >
                                                                {this.state.showComfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="col-md-6 col-12" style={{ textAlign: 'right', paddingTop: '14px' }}>
                                            <Button name="" variant="contained" className="jr-btn bg-light-green text-white">
                                                <i className="zmdi zmdi-plus-square" />
                                                <span>Save</span>
                                            </Button>
                                        </div>
                                    </div>
                                </center>
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <br /><br />
                                <ReportBox heading="Login" title="45:45min" detail="Average Login Time">
                                    <BarChart data={chartDataWithoutAxis}>
                                        <Bar dataKey='amt' fill='#3f51b5' maxBarSize={10} />
                                        <XAxis stroke="#3f51b5" dataKey="name" />
                                    </BarChart>
                                </ReportBox>
                                <CardBox
                                    styleName="col-12"
                                    cardStyle=" p-0"
                                    // heading={<IntlMessages id="table.heading.employeeListing"/>}
                                    headerOutside
                                >
                                    <LoginHistory />
                                </CardBox>
                            </TabContainer>
                        </SwipeableViews>
                        <CardMenu menuState={menuState} anchorEl={anchorEl}
                            handleRequestClose={this.handleRequestClose.bind(this)} />
                    </CardLayout>
                    :
                    this.props.profileLink === 'setting' ?
                        <CardLayout styleName="col-lg-12">
                            <div className="jr-card-header mb-3 d-flex align-items-center">
                                <div className="mr-auto">
                                    <h3 className="card-heading mb-0">
                                        <i className="zmdi zmdi-settings mr-2"></i>
                                        Settings
                                    </h3>
                                </div>
                                {/* <IconButton name="" className="size-30" onClick={this.onOptionMenuSelect.bind(this)}>
                                    <i className="zmdi zmdi-more-vert" />
                                </IconButton> */}
                            </div>

                            <div className="tab-notifications">
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    centered
                                    fullWidth
                                >
                                    <Tab className="tab" label="General" icon={<i className="zmdi zmdi-settings-square"></i>} />

                                    <Tab className="tab" label="Security" icon={<i className="zmdi zmdi-shield-security"></i>} />
                                </Tabs>
                            </div>

                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                            >
                                <TabContainer dir={theme.direction}>
                                    <marquee style={{ paddingTop: '50px' }}>General Setting work is Under Construction</marquee>
                                    {/* <UserList users={this.props.appNotification} /> */}
                                </TabContainer>
                                <TabContainer dir={theme.direction}>
                                    <marquee style={{ paddingTop: '50px' }}>Security work is Under Construction</marquee>
                                    {/* <UserList users={this.props.announcementsNotification} /> */}
                                </TabContainer>

                            </SwipeableViews>
                            <CardMenu menuState={menuState} anchorEl={anchorEl}
                                handleRequestClose={this.handleRequestClose.bind(this)} />
                        </CardLayout>
                        :
                        ''
        );
    }
}

UserProfileLogs.propTypes = {
    theme: PropTypes.object.isRequired,
};

// export default withStyles(null, {withTheme: true})(UserProfileLogs);


function mapStateToProps(state) {
    console.log('state --- ', state)
    return {
        profileLink: state.userProfile.profilePage
    }
}

export default compose(
    withStyles(null, { withTheme: true }),
    connect(mapStateToProps, { userProfile })
)(UserProfileLogs);
