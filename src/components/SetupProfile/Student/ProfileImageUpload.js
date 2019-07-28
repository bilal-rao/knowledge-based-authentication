import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Actions} from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from "react-redux";

import GlobalHelper, {optionsAws3} from "../../../appUtility/GlobalHelper";
import {baseStyles, colors, fonts, padding} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import AppButtonGroup from "../../utility/AppButtonGroup";
import AppAccentButton from "../../utility/AppAccentButton";
import AppHeaderButton from "../../utility/AppHeaderButton";
import {updateProfilePic} from "../../../actions/AuthAction";
import {fetchError, fetchStart, fetchSuccess} from "../../../actions/CommonAction";
import AppAvatar from "../../utility/AppAvatar";

class ProfileImageUpload extends Component {

  /**
   * On Open Mobile media gallery to choose picture
   */
  onOpenGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(imageObj => {
      this.setState({imageObj});
    });
  };
  /**
   * On open Camera to take picture
   */
  onOpenCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true
    }).then(imageObj => {
      this.setState({imageObj});
    });
  };

  uploadProfilePicture = () => {
    this.props.fetchStart();
    if(this.state.imageObj === null){
      this.props.updateProfilePic({profile_pic: "user_profiles/default_user.png"});
      return;
    }

    const extension = GlobalHelper.getFileExtension(this.state.imageObj.path);
    optionsAws3.keyPrefix = "profile/";
    const file = {
      uri: this.state.imageObj.path,
      name: new Date().getTime() + '.' + extension,
      type: this.state.imageObj.mime
    };

    GlobalHelper.uploadAWS3(file).then((response) => {
      if (response.status === 201) {
        const s3Response = response.body.postResponse;
        this.setState({
          url: s3Response.location,
          filePath: s3Response.key
        });
        this.props.updateProfilePic({profile_pic: s3Response.key});
        console.log('Successfully uploaded image to s3.', s3Response);
      } else {
        this.props.fetchError("Failed to upload image to S3");
      }
    }).catch(error => {
      this.props.fetchError(error.message);
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      imageObj: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.profile_pic !== "") {
      Actions.pop();
      Actions.mediApp();
    }
  }

  render() {
    const {imageObj} = this.state;

    return (
      <View style={[styles.container]}>
        <AppHeader
          title="SETUP PROFILE"
          placement={'center'}
          icon="chevron-left"
          onPress={() => Actions.pop()}
          style={{elevation: 0}}
          rightComponent={
            <AppHeaderButton
              title="Skip"
              onPress={() => {
                this.props.fetchStart();
                this.props.updateProfilePic({profile_pic: "user_profiles/default_user.png"});

              }}
            />}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: Dimensions.get('window').height - 50}}>
          <View style={{flex: 1, paddingBottom: padding.lg}}>
            <View style={styles.uploadProfileBlock}>
              <Text style={{
                fontSize: fonts.xl,
                fontFamily: 'Roboto-Medium',
                color: '#5C5C5C',
                textAlign: 'center',
                marginBottom: 15}}>Upload Your Profile Picture</Text>
              <Text style={{fontSize: fonts.md, color: '#5C5C5C', textAlign: 'center'}}>Check your email and click on
                the
                confirmation link to continue.</Text>
            </View>

            <View style={styles.profileContainer}>
              <AppAvatar
                size={200}
                rounded
                source={imageObj === null ? require('../../../assests/signUpAssets/uploadPhoto.png') : {uri: imageObj.path}}
                activeOpacity={0.1}
                containerStyle={{marginVertical: 22}}
              />

              <AppButtonGroup
                titleLeft={'Take new photo'}
                onLeftPress={this.onOpenCamera}
                titleRight={'Upload photo'}
                onRightPress={this.onOpenGallery}/>

            </View>
            <AppAccentButton
              title="Save"
              buttonStyle={{borderColor: colors.primary,}}
              buttonTitleStyle={{fontSize: fonts.lg, fontFamily: 'Roboto-Medium'}}
              containerStyle={[baseStyles.paddingHorizontalLg]}
              onPress={this.uploadProfilePicture}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    paddingHorizontal: padding.lg,
    paddingBottom: padding.xl,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadProfileBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
};


const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading, error} = commonData;

  return {error, user, loading};
};
export default connect(mapStateToProps, {fetchSuccess, fetchStart, fetchError, updateProfilePic})(ProfileImageUpload);
