import React from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {CheckBox} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import ImagePicker from "react-native-image-crop-picker";

import AppHeaderButton from "../../../utility/AppHeaderButton";
import AppHeader from "../../../utility/AppHeader";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppTextInput from "../../../utility/AppTextInput";
import AppTextArea from "../../../utility/AppTextArea";
import AppPicker from "../../../utility/AppPicker";
import AppToggleItem from "../../../utility/AppToggleItem";
import {baseStyles, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import {businessCategory} from "../CreateBusinessPage/data";
import AppDangerButton from "../../../utility/AppDangerButton";
import AppAvatar from "../../../utility/AppAvatar";
import GlobalHelper, {optionsAws3} from "../../../../appUtility/GlobalHelper";
import {connect} from "react-redux";
import {createBusinessPage, deleteBusinessPage, updateBusinessPage} from "../../../../actions/BusinessPageAction";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import {fetchStart} from "../../../../actions/CommonAction";
import AppComponent from "../../../utility/AppComponent";
import ViewWrapper from "../../../../appUtility/ViewWrapper";

class CreateBusinessPage extends AppComponent {


  onBackPress = () => {
    Actions.pop();
    return true;
  };

  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.description = React.createRef();
    this.contact = React.createRef();
    this.website = React.createRef();
    this.email = React.createRef();
    this.reg_no = React.createRef();

    if (props.businessPage) {
      this.state = {
        ...props.businessPage,
        titleError: '',
        descriptionError: '',
        categoryError: '',
        contactError: '',
        websiteError: '',
        emailError: '',
        isVisible: false,
        imageObj: null,
        message: props.businessPage.message === 1,
        publish: props.businessPage.publish === 1,
      }
    } else {
      this.state = {
        title: '',
        description: '',
        category: '',
        contact: '',
        website: '',
        email: '',
        logo: '',
        titleError: '',
        descriptionError: '',
        categoryError: '',
        contactError: '',
        websiteError: '',
        emailError: '',
        imageObj: null,
        isVisible: false,
        message: true,
        publish: true,
      };
    }
  }

  onOpenGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo"
    }).then(image => {
      this.setState({logo: '', imageObj: image});
      this.handleToggle()
    });
  };

  cameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      this.setState({logo: '', imageObj: image});
      this.handleToggle()
    });
  };


  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };

  choosedImageUrl(image) {
    this.setState({
      logo: image,
      imageObj: null,
    });
  }


  onCreatePage = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {imageObj, logo, email, website, contact, category, title, description} = this.state;
    if (title === '') {
      this.setState({titleError: 'Title is require'});
    } else if (description === '') {
      this.setState({descriptionError: 'Description is require'});
    } else if (category === '') {
      this.setState({categoryError: 'require field'});
    } else if (contact === '') {
      this.setState({contactError: 'require field'});
    } else if (website === '') {
      this.setState({websiteError: 'require field'});
    } else if (email === '') {
      this.setState({emailError: 'email is require'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'email is invalid'});
    }

    else {
      if (imageObj !== null) {
        this.props.fetchStart();
        const extension = GlobalHelper.getFileExtension(imageObj.path);
        const fileName = new Date().getTime() + '.' + extension;
        optionsAws3.keyPrefix = "pages/";
        const file = {
          uri: imageObj.path,
          name: fileName,
          type: imageObj.mime
        };

        GlobalHelper.uploadAWS3(file).then((response) => {
          if (response.status === 201) {
            const s3Response = response.body.postResponse;
            console.log('Successfully uploaded image to s3.', s3Response);
            this.setState({
              logo: s3Response.key,
              imageObj: null
            });
            this.saveOnServer(s3Response.key, email, website, contact, category, title, description);
          } else {
            this.props.fetchError("Failed to upload image to S3");
            console.log('Failed to upload image to S3');
          }
        }).catch(error => {
          console.log('errormesage:', error);
          this.props.fetchError(error.message);
        });
      }
      else {
        this.saveOnServer(logo, email, website, contact, category, title, description);
      }
    }
  };


  saveOnServer = (logo, email, website, contact, category, title, description) => {
    if (this.state.id) {
      this.props.updateBusinessPage({
        id: this.state.id,
        owner_id: this.props.user.id,
        logo,
        email,
        website,
        contact,
        category,
        title,
        description,
        message: this.state.message ? 1 : 0,
        publish: this.state.publish ? 1 : 0
      });
    } else {
      this.props.createBusinessPage({
        owner_id: this.props.user.id,
        logo,
        email,
        website,
        contact,
        category,
        title,
        description,
        message: this.state.message ? 1 : 0,
        publish: this.state.publish ? 1 : 0
      });
    }
  };

  onSelectCategory = (value, index) => {
    this.setState({category: value.title});
    return value.id
  };
  renderCategoryText = (option) => {
    return option.title
  };
  renderCategoryRow = (data, index, isSelected) => {
    return <View style={{
      width: 360,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };


  getPageLogo = () => {
    const {logo, imageObj} = this.state;
    if (imageObj) {
      return {uri: imageObj.path};
    } else if (logo) {
      return {uri: MEDIA_BASE_PATH + logo};
    }
    return require('../../../../assests/camera.png');
  };

  render() {
    const {
      id,
      isVisible, description, title, website, email, contact, contactError,
      message, publish, emailError, websiteError, titleError, descriptionError, category, categoryError
    } = this.state;

    return (
      <ViewWrapper>
        <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
          <AppHeader
            title={id ? "UPDATE PAGE" : "CREATE PAGE"}
            icon="chevron-left"
            onPress={() => this.onBackPress()}
            style={{elevation: 0}}
            rightComponent={
              <AppHeaderButton
                title="Save"
                onPress={this.onCreatePage}
              />}
          />

          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
            <View style={{flex: 1, paddingTop: padding.sm, paddingBottom: 15}}>
              <View style={{backgroundColor: colors.white, paddingHorizontal: padding.lg, paddingVertical: 15}}>
                <View style={styles.profileContainer}>
                  <AppAvatar
                    size={170}
                    rounded
                    source={this.getPageLogo()}
                    activeOpacity={0.1}
                  />
                  <Text style={{
                    textAlign: 'center',
                    fontSize: fonts.md,
                    fontFamily: 'Roboto-Light',
                    color: '#c1c1c1',
                    marginTop: 14,
                    marginBottom: margin.xl
                  }}>
                    Pages with profile pictures show {"\n"}
                    up higher in search results.
                  </Text>
                  <AppButtonGroup
                    btnContainerStyle={{marginBottom: margin.sm, paddingHorizontal: padding.md}}
                    titleLeft={'Choose Photo'}
                    titleRight={'Upload Photo'}
                    onRightPress={this.handleToggle}
                    onLeftPress={() => Actions.gallery({selectImageThis: this})}
                  />
                </View>
                <View>
                  <AppTextInput
                    errorMessage={titleError}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.description.current.focus();
                    }}
                    value={title}
                    onChangeText={(title) => this.setState({title, titleError: ''})}
                    placeholder="Page Title"
                  />
                  <AppTextArea
                    returnKeyType="next"
                    inputRef={this.description}
                    errorMessage={descriptionError}
                    placeholder="Description"
                    value={description}
                    onChangeText={(description) => this.setState({description, descriptionError: ''})}
                  />
                  <AppPicker
                    errorMessage={categoryError}
                    renderButtonText={this.renderCategoryText}
                    defaultValue={category}
                    onSelect={this.onSelectCategory}
                    data={businessCategory}
                    renderRow={this.renderCategoryRow}
                  />
                  <AppTextInput
                    errorMessage={contactError}
                    returnKeyType="next"
                    inputRef={this.contact}
                    onSubmitEditing={() => {
                      this.website.current.focus();
                    }}
                    value={contact}
                    onChangeText={(contact) => this.setState({contact, contactError: ''})}
                    placeholder="Contact number"
                  />
                  <AppTextInput
                    errorMessage={websiteError}
                    returnKeyType="next"
                    inputRef={this.website}
                    onSubmitEditing={() => {
                      this.email.current.focus();
                    }}
                    value={website}
                    onChangeText={(website) => this.setState({website, websiteError: ''})}
                    placeholder="Website"
                  />
                  <AppTextInput
                    errorMessage={emailError}
                    returnKeyType="next"
                    inputRef={this.email}
                    value={email}
                    onChangeText={(email) => this.setState({email, emailError: ''})}
                    placeholder="Email address"
                  />

                  <AppToggleItem
                    title={'Message'}
                    value={message}
                    onPress={(message) => this.setState({message})}
                    description="Allow people to contact my Page privately by showing the Messages button."
                  />
                  <View style={styles.pageVisibleOuter}>
                    <View style={[baseStyles.media, baseStyles.alignItemsCenter]}>
                      <View style={baseStyles.mediaBody}>
                        <Text style={styles.titleStyle}>Page visibility</Text>
                        <Text
                          numberOfLines={2}
                          style={styles.descriptionStyle}>
                          Publishing your Page makes it visible to the public.
                          If you select unpublish, it will only be seen by people with a role on the page.
                        </Text>
                      </View>
                    </View>
                    <CheckBox
                      iconRight
                      title='Publish'
                      textStyle={[baseStyles.mediaBody, publish ? baseStyles.primaryText : baseStyles.subHeadingColor, {
                        fontSize: fonts.md,
                        fontFamily: 'Roboto-Medium',
                        marginLeft: -15
                      }]}
                      containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
                      checkedIcon={<Image source={require('../../../../assests/signUpAssets/checked_radio.png')}
                                          style={{marginRight: -20}}/>}
                      uncheckedIcon={<Image source={require('../../../../assests/signUpAssets/unchaked_radio.png')}
                                            style={{marginRight: -20}}/>}
                      checked={publish}
                      onPress={() => this.setState({publish: true})}
                    />
                    <CheckBox
                      iconRight
                      title='UnPublish'
                      textStyle={[baseStyles.mediaBody, publish ? baseStyles.subHeadingColor : baseStyles.primaryText, {
                        fontSize: fonts.md,
                        fontWeight: 'normal',
                        fontFamily: 'Roboto-Medium',
                        marginLeft: -15
                      }]}
                      containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
                      checkedIcon={<Image source={require('../../../../assests/signUpAssets/checked_radio.png')}
                                          style={{marginRight: -20}}/>}
                      uncheckedIcon={<Image source={require('../../../../assests/signUpAssets/unchaked_radio.png')}
                                            style={{marginRight: -20}}/>}
                      checked={!publish}
                      onPress={() => this.setState({publish: false})}
                    />
                  </View>
                </View>

                <AppDangerButton disabled={!(id && id > 0)}
                                 title="Delete Page"
                                 titleStyle={{fontSize: fonts.lg}}
                                 onPress={() => this.props.deleteBusinessPage(id)}
                                 containerStyle={{marginTop: 15}}/>
              </View>

              <Dialog
                visible={isVisible}
                onTouchOutside={() => this.setState({isVisible: false})}>
                <View>
                  <TouchableOpacity onPress={this.cameraOpen}>
                    <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Open
                      camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onOpenGallery}>
                    <Text style={{fontSize: fonts.lg, color: colors.primary}}>Open Gallery</Text>
                  </TouchableOpacity>
                </View>
              </Dialog>
            </View>
          </ScrollView>


        </View>
      </ViewWrapper>
    )
  }
}

const styles = {
  profileContainer: {
    alignItems: 'center',
  },
  titleStyle: {
    color: colors.headingColor,
    marginBottom: 2,
    fontSize: 13,
  },
  descriptionStyle: {
    fontSize: 13,
    color: '#c1c1c1',
    fontFamily: 'Roboto-Light'
  },
  pageVisibleOuter: {
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: margin.lg,
    marginBottom: margin.md,
    padding: padding.md,
    borderRadius: radius.md,
  }
};
const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};


export default connect(mapStateToProps, {
  fetchStart,
  updateBusinessPage,
  createBusinessPage,
  deleteBusinessPage
})(CreateBusinessPage);
