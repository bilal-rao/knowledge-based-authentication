import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux"
import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, fontFamilyRegular, padding} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import {CheckBox, Text} from "react-native-elements";
import Avatar from "react-native-elements/src/avatar/Avatar";
import AppHeaderButton from "../../utility/AppHeaderButton";
import {updateTaggedUser} from "../../../actions/FeedAction";
import {connect} from "react-redux";
import {getFellows} from "../../../actions/ConnectionAction";
import {getTitle} from "../../../appUtility/Utils";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";
import AppSearchBar from "../../utility/AppSearchBar";
import AppComponent from "../../utility/AppComponent";
import EmptyResult from "./EmptyResult";
import {messages} from "../Connections/data";
import Spinner from "react-native-loading-spinner-overlay";
import AppAvatar from "../../utility/AppAvatar";

class SelectFellows extends AppComponent {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      text: '',
      selectedUser: props.post_tag_ids ? props.post_tag_ids.split(",") : []
    }
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onItemSelect = (item) => {
    let {selectedUser} = this.state;
    if (selectedUser.find((data) => data.toString() === item.id.toString())) {
      selectedUser.pop(item.id.toString());
    } else {
      selectedUser.push(item.id.toString());
    }
    console.log("selectedUser: ", selectedUser)
    this.setState({selectedUser});

  };

  filterSearch = (text) => {
    const newData = this.props.follows.filter((item) => {
      if (item.fname.toLowerCase().includes(text.toLowerCase())) {
        return item;
      }
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
  };

  componentWillMount() {
    const {id} = this.props.user;
    this.props.getFellows(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: nextProps.fellows});
  }

  renderRow(data) {
    return (
      <TouchableOpacity
        key={data.id}
        style={styles.container}
        onPress={() => this.onItemSelect(data)}>

        <View style={[fontFamilyRegular, baseStyles.row, styles.itemContainer]}>
          <View style={baseStyles.colThree}>
            <View style={[baseStyles.media, {marginBottom: 0}]}>
              <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
                <AppAvatar
                  avatarStyle={[baseStyles.radiusXxl, {borderColor: data.name_title.color_code, borderWidth: 2}]}
                  size={45}
                  rounded
                  source={{uri: MEDIA_BASE_PATH + data.profile_pic, }}
                />
                <View style={styles.badge}/>
              </View>

              <View style={baseStyles.mediaBody}>
                <Text
                  style={[fontFamilyMedium, baseStyles.fontsMd, {color: colors.subHeadingColor}]}>{getTitle(data.name_title) + data.fname + " " + data.lname}</Text>
                <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>{data.email}</Text>
              </View>
            </View>
          </View>

          <View style={baseStyles.colOne}>
            <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}]}>
              <CheckBox
                iconRight
                containerStyle={{backgroundColor: 'transparent', height: 20}}
                checkedIcon={<Image source={require('../../../assests/signUpAssets/checked_radio.png')}/>}
                uncheckedIcon={<Image source={require('../../../assests/signUpAssets/unchaked_radio.png')}/>}
                checked={this.state.selectedUser.find((item) => (data.id.toString() === item.toString())) !== undefined}
                onPress={() => this.onItemSelect(data)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  selectedUsers() {
    this.props.updateTaggedUser(this.state.selectedUser.toString());
    Actions.pop();
  }

  render() {
    const {fellows} = this.props;
    return (
      <View style={styles.container}>
        <AppHeader
          title="Select Tag Users"
          icon={'chevron-left'}
          placement={'center'}
          rightComponent={
            <AppHeaderButton
              title="Done"
              onPress={() => this.selectedUsers()}
            />
          }
          onPress={this.onBackPress}/>
        <View style={[baseStyles.paddingMd]}>
          <AppSearchBar placeholder="Search here.." onChangeText={this.filterSearch}/>
        </View>
        <View style={{backgroundColor: colors.white, height: 7}}/>
        <View style={[styles.fellowsStyle, baseStyles.justifyContentCenter]}>
          <Text
            style={[baseStyles.fontsMd, {fontFamily: 'Roboto-Regular', color: colors.subHeadingColor}]}>Fellows</Text>
        </View>
        <FlatList
          data={fellows}
          enableEmptySections={true}
          renderItem={({item}) =>this.renderRow(item)}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyResult title={messages.fellows.title} content={messages.fellows.content}/>}
          dataSource={this.state.dataSource}/>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  itemContainer: {
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  fellowsStyle: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: padding.lg,
    backgroundColor: '#F8F8F8',
  },
  searchBar: {
    borderWidth: 1,
    height: 40,
    marginTop: 3,
    width: '100%',
    marginLeft: 10,
    borderColor: colors.bgGrey,
    borderRadius: 10,
  },
};

const mapStateToProps = ({auth, commonData, connection}) => {
  const {user} = auth;
  const {loading} = commonData;
  const {fellows} = connection;
  return {user, loading, fellows}
};
export default connect(mapStateToProps, {getFellows, updateTaggedUser})(SelectFellows);
