import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {colors, compHeight, fonts, margin, padding} from "../../../../styles/base";
import {Labels} from "../CreateBusinessPage/data";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import {connect} from "react-redux";
import {followBusinessPage, unFollowBusinessPage} from "../../../../actions/BusinessPageAction";
import { MEDIA_BASE_PATH } from '../../../../constant/AppConst';

class BusinessProfileNonAdmin extends Component {
  state = {
    dialogVisible: false,
  };

  //toggleDialog
  toggleDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };


  followUnFollow = () => {
    const {businessPage} = this.props;
    if(businessPage.isFollowing){
      this.props.unFollowBusinessPage(businessPage.id)
    }else{
      this.props.followBusinessPage(businessPage.id)
    }
    this.setState({dialogVisible: false});
  };

  openMessage() {
    console.log('user:', this.props.user.id, '    friend:', this.props.businessPage);
      

      // let friendUserName = `mediUser${this.props.user.id}`;
      // let friendNickName = `${this.props.user.name_title.short_code} ${this.props.user.fname} ${this.props.user.lname}__%%_${this.props.user.email}__%%_${this.props.user.name_title.color_code}`;
      // let friendProfileImage = MEDIA_BASE_PATH + this.props.user.profile_pic;

      // var shortname = '';
      // var name = friendNickName;
      // var colorValue = colors.primary;
      // var emailIdValue = '';
      // if (friendNickName.split('__%%_').length > 2) {
      //   name = friendNickName.split('__%%_')[0];
      //   emailIdValue = friendNickName.split('__%%_')[1];
      //   colorValue = friendNickName.split('__%%_')[2];
      // }
      // var array = name.split(' ');

      // if (array[1]) {
      //   shortname = array[1].slice(0, 2).toLocaleUpperCase();
      // } else {
      //   shortname = name.slice(0, 2).toLocaleUpperCase();
      // }
      // console.log('not available:', {
      //   color: colorValue,
      //   userId: friendUserName,
      //   groupName: name,
      //   shortName: shortname,
      //   emailId: emailIdValue,
      //   groupCoverImage: friendProfileImage,
      //   status: 0,
      //   isActive: false,
      //   lastMessage: 'No message',
      //   isAlreadyExist: false
      // });

      // Actions.mediChatScreen({ item: {
      //   color: colorValue,
      //   userId: friendUserName,
      //   groupName: name,
      //   shortName: shortname,
      //   emailId: emailIdValue,
      //   groupCoverImage: friendProfileImage,
      //   status: 0,
      //   isActive: false,
      //   lastMessage: 'No message',
      //   isAlreadyExist: false
      // } });
  }

  render() {
    const {dialogVisible} = this.state;
    const {businessPage} = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageList} onPress={() => this.followUnFollow()}>
          {businessPage.isFollowing ?
            <Image source={require('../../../../assests/profile/following.png')}
                   style={[styles.imageStyle, {width: 39, height: 26}]}/> :
            <Image source={require('../../../../assests/profile/followers.png')}
                   style={[styles.imageStyle, {width: 39, height: 26}]}/>
          }
          <Text style={styles.ImageText}>{businessPage.isFollowing?"FOLLOWING":"FOLLOW"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageList} onPress={() => Actions.gallery()}>
          <Image source={require('../../../../assests/profile/gallery.png')}
                 style={[styles.imageStyle, {width: 31, height: 29}]}/>
          <Text style={styles.ImageText}>GALLERY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageList} onPress={this.openMessage.bind(this)}>
          <Image source={require('../../../../assests/profile/message.png')}
                 style={[styles.imageStyle, {width: 32, height: 30}]}/>
          <Text style={styles.ImageText}>MESSAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageList} onPress={this.toggleDialog}>
          <Image source={require('../../../../assests/business/more_btn.png')}
                 style={[styles.imageStyle, {width: 32, height: 30}]}/>
          <Text style={styles.ImageText}>MORE</Text>
        </TouchableOpacity>

        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <TouchableOpacity
              key="1"
              style={[styles.optionStyle, {paddingTop: 0}]}
              onPress={() => this.followUnFollow()}>
              <Text style={styles.optionLabel}>{businessPage.isFollowing ? "FOLLOWING" : "FOLLOW"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="2"
              style={styles.optionStyle}
              onPress={() => this.toggleDialog()}>
              <Text style={styles.optionLabel}>{Labels.copyLink}</Text>
            </TouchableOpacity>
          </ScrollView>
        </Dialog>
      </View>
    )
  }
}

const styles = {
  container: {
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    marginBottom: margin.sm,
    backgroundColor: colors.white,
    marginTop: margin.sm,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: compHeight.sm,
    marginBottom: margin.sm

  },
  imageList: {
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '22%',
    paddingHorizontal: 2,
    flexDirection: 'column',
  },
  ImageText: {
    fontSize: 8,
    color: colors.primary,
    textTransform: 'uppercase'
  },
  optionStyle: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3db'
  },
  optionLabel: {
    color: '#007AFE',
    fontSize: fonts.xl,
    textAlign: 'center'
  },
  dialogStyle: {
    borderRadius: 15,
  }
};

const mapStateToProps = ({auth, commonData, businessPageData}) => {
  const {user} = auth;
  const {loading} = commonData;
  const {businessPage} = businessPageData;
  return {user, loading, businessPage}
};

export default connect(mapStateToProps, {
  followBusinessPage,
  unFollowBusinessPage
})(BusinessProfileNonAdmin);
