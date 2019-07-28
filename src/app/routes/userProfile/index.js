import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import UserProfileCard from './userCard';
import UserProfileLogs from './userProfileLogs';


const appNotification = [

    {
        id: 1,
        title: "Invitation",
        desc: [<a href="javascript:void(0)">Stella</a>, " has sent you an invitation to join project ",
            <a href="javascript:void(0)">Mouldifi</a>],
        image: 'http://via.placeholder.com/150x150'
    },
    {
        id: 2,
        title: "Message",
        desc: [<a href="javascript:void(0)">Jeson Born</a>, " Need your help on ",
            <a href="javascript:void(0)">Jambo</a>],
        image: 'http://via.placeholder.com/150x150'
    },
    {
        id: 3,
        title: "Invitation",
        desc: [<a href="javascript:void(0)">Guptil</a>, " has sent you an invitation to join project ",
            <a href="javascript:void(0)">Mouldifi</a>],
        image: 'http://via.placeholder.com/150x150'
    },
    {
        id: 4,
        title: "Invitation",
        desc: [<a href="javascript:void(0)">Alex Dolgove</a>, " has sent you an invitation to join project ",
            <a href="javascript:void(0)">Mouldifi</a>],
        image: 'http://via.placeholder.com/150x150'
    },
];


export const announcementsNotification = [
    {
        id: 5,
        title: "Invitation",
        desc: [<a href="javascript:void(0)">Alex Dolgove</a>, " has sent you an invitation to join project ",
            <a href="javascript:void(0)">Mouldifi</a>],
        image: 'http://via.placeholder.com/150x150'
    },
    {
        id: 6,
        title: "Message",
        desc: [<a href="javascript:void(0)">Jeson Born</a>, " Need your help on ",
            <a href="javascript:void(0)">Jambo</a>],
        image: 'http://via.placeholder.com/150x150'
    }, {
        id: 7,
        title: "Invitation",
        desc: [<a href="javascript:void(0)">Stella</a>, " has sent you an invitation to join project ",
            <a href="javascript:void(0)">Mouldifi</a>],
        image: 'http://via.placeholder.com/150x150'
    },
    {
        id: 8,
        title: "Invitation",
        desc: [<a href="javascript:void(0)">Guptil</a>, " has sent you an invitation to join project ",
            <a href="javascript:void(0)">Mouldifi</a>],
        image: 'http://via.placeholder.com/150x150'
    },
];
class UserProfile extends React.Component {
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.area.userprofile" />} />
                <div className="row animated slideInUpTiny animation-duration-3">
                    <div className="col-lg-3 col-sm-3 col-md-3">
                        <UserProfileCard headerStyle="bg-success" />
                    </div>
                    <div className="col-lg-9 col-sm-3 col-md-3">
                        <UserProfileLogs appNotification={appNotification}
                            announcementsNotification={announcementsNotification} />
                    </div>
                </div>
            </div>
        );
    }
}
export default UserProfile;