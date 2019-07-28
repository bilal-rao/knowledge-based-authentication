import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import { connect } from "react-redux";
import { userProfile } from '../../../actions/UserProfile'

class UserProfileCard extends React.Component {
    render() {
        return (
            <div className="jr-card text-center">
                <div className={`jr-card-header-color ${this.props.headerStyle}`}>
                    <div className="jr-card-header-top">
                        <IconButton name="" className="jr-menu-icon mr-auto" aria-label="Menu" />
                        <span className="menu-icon bg-white" />
                        {/* </IconButton> */}
                        {/* <IconButton name=""><i className="zmdi zmdi-more-vert text-white" /></IconButton> */}
                    </div>

                    <img className="rounded-circle size-100 avatar-shadow mb-3"
                        src="../../../assets/images/profile1.jpg" alt="Team Member" />

                    <div className="jr-card-hd-content text-white">
                        <h4 className="mb-0">Bilal Rao</h4>
                        <p className="mb-0">Software Engineer</p>
                    </div>
                </div>
                <div className="jr-card-body">
                    <p>Cenas in erat accumsan, hendrerit lorem vel</p>
                </div>
                <Divider /><Divider /><Divider />
                <br />
                <Button name="" className="jr-btn" onClick={() => this.props.userProfile('myProfile')}>
                    <i className="zmdi zmdi-account mr-2" />
                    <span> <IntlMessages id="profile.area.myProfile" /> </span>
                </Button>
                <Button name="" className="jr-btn" onClick={() => this.props.userProfile('security')}>
                    <i className="zmdi zmdi-shield-security mr-2"></i>
                    <span> <IntlMessages id="profile.area.security" /> </span>
                </Button>
                <Button name="" className="jr-btn" onClick={() => this.props.userProfile('setting')}>
                    <i className="zmdi zmdi-settings mr-2"></i>
                    <span> <IntlMessages id="profile.area.settings" /> </span>
                </Button>
            </div>
        );
    }
}


export default connect(
    null,
    {
        userProfile
    }
)(UserProfileCard);

