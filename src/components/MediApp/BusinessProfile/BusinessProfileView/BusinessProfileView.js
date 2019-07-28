import React, {Component} from 'react';
import {Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {baseStyles, colors, fonts, margin, padding} from "../../../../styles/base";
import {Actions} from "react-native-router-flux";
import connect from "react-redux/es/connect/connect";
import HomeItem from "./HomeItem";
import Reviews from "./Reviews";
import Photos from "./Photos";
import Albums from "./Albums";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import AppHeader from "../../../utility/AppHeader";
import AppComponent from "../../../utility/AppComponent";
import {
  getBusinessPageDetail,
  onUnMountBusinessPage,
  publishUnPublishPage,
  rateBusinessPage,
  updateBusinessPage
} from "../../../../actions/BusinessPageAction";
import Spinner from "react-native-loading-spinner-overlay";
import BusinessProfileNonAdmin from "../BusinessProfileNonAdmin/BusinessProfileNonAdmin";


const tabList = [
  {id: 1, title: 'Home'},
  {id: 2, title: 'Reviews'},
  {id: 3, title: 'Photos'},
  {id: 4, title: 'Albums'},
];

class BusinessProfileView extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  componentWillMount() {
    this.props.getBusinessPageDetail(this.props.id, this.props.user.id)
  }

  componentWillUnmount() {
    this.props.onUnMountBusinessPage(this.props.id)
  }

  onTabItemSelect = (item) => {
    this.setState({selectTab: item.id});
  };

  constructor(props) {
    super(props);
    this.state = {
      selectTab: 1,
    }
  }

  renderScene = (item, businessPage) => {
    switch (item.id) {
      case 1:
        return <View style={{marginBottom: margin.lg}}>
          <HomeItem businessPage={businessPage} updateBusinessPage={this.props.updateBusinessPage}/>
        </View>;
      case 2:
        return <View style={{marginBottom: margin.lg}}>
          <Reviews businessPage={businessPage} rateBusinessPage={this.props.rateBusinessPage}/>
        </View>;
      case 3:
        return <View style={{marginBottom: margin.lg}}>
          <Photos businessPage={businessPage}/>
        </View>;
      case 4:
        return <View style={{marginBottom: margin.lg}}>
          <Albums businessPage={businessPage}/>
        </View>;
    }
  };

  publishUnPublishPage = () => {
    let {businessPage} = this.props;
    if (businessPage.publish === 1) {
      businessPage.publish = 0;
    } else {
      businessPage.publish = 1;
    }
    this.props.publishUnPublishPage(businessPage);
  };

  render() {
    const {selectTab} = this.state;
    const {businessPage} = this.props;


    if (!businessPage) {
      return <Spinner visible={this.props.loading} color='#3367d6'/>
    }

    return (
      <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <AppHeader
          title="PAGE DETAIL"
          icon="chevron-left"
          placement={'center'}
          onPress={() => this.onBackPress()}/>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingTop: padding.md}}>
            <View style={{backgroundColor: colors.white, paddingHorizontal: 15, paddingVertical: 12}}>
              <Image
                style={{width: '100%', height: 225}}
                resizeMode="cover"
                source={{uri: MEDIA_BASE_PATH + businessPage.logo}}/>
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: margin.md}}>
                <Text style={{fontSize: 23, color: colors.primaryText}}>{businessPage.title}</Text>
                <Text style={{fontSize: fonts.lg, color: colors.subHeadingColor}}>{businessPage.category}</Text>
              </View>
            </View>

            {businessPage.isAdmin === 1 ? <View style={styles.container}>
              <TouchableOpacity style={styles.imageList} onPress={() => this.publishUnPublishPage()}>
                <Image
                  style={[styles.imageStyle]}
                  source={require('../../../../assests/profile/message.png')}
                  onPress={() => Actions.pop()}/>
                <Text style={styles.ImageText}>{businessPage.publish === 1 ? "UN PUBLISH" : "PUBLISH"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageList}
                                onPress={() => Actions.createBusinessPage({businessPage: businessPage})}>
                <Image
                  style={[styles.imageStyle, {height: 36, width: 36, marginBottom: 1}]}
                  source={require('../../../../assests/business/edit_business.png')}/>
                <Text style={styles.ImageText}>EDIT PAGE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageList} onPress={() => Actions.gallery()}>
                <Image
                  style={[styles.imageStyle]}
                  source={require('../../../../assests/profile/gallery.png')}/>
                <Text style={styles.ImageText}>PHOTO</Text>
              </TouchableOpacity>
            </View> : <BusinessProfileNonAdmin businessPage={businessPage}/>}

            <FlatList
              style={{
                flexGrow: 0,
                flexDirection: 'row',
                borderColor: colors.bgGrey,
                borderWidth: 1,
                backgroundColor: colors.white,
                marginBottom: 8
              }}
              horizontal={true}
              data={tabList}
              extraData={this.state}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) =>
                <TouchableOpacity key={item.id}
                                  onPress={() => this.onTabItemSelect(item)}
                                  style={[{
                                    padding: padding.sm,
                                    minWidth: 105,
                                    borderColor: colors.bgGrey,
                                    borderRightWidth: 1
                                  }, baseStyles.alignItemsCenter]}>
                  <Text style={item.id === selectTab ? {
                    fontSize: 16,
                    color: colors.primaryText
                  } : {fontSize: 16}}>{item.title}</Text>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index.toString()}
            />
            {this.renderScene(tabList[selectTab - 1], businessPage)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: padding.lg,
    paddingVertical: 2,
    marginTop: margin.sm,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 32,
    width: 32,
    marginBottom: 4
  },
  imageList: {
    alignItems: 'center',
    padding: padding.md,
  },
  ImageText: {
    fontSize: 11,
    fontFamily: 'Roboto-Light',
    color: colors.primaryText,
    textTransform: 'uppercase'
  },
  fellowsStyle: {
    height: 30,
    paddingLeft: padding.md,
    marginBottom: 2,
    marginTop: 5,
    backgroundColor: '#F8F8F8',
  },
};

const mapStateToProps = ({auth, commonData, businessPageData}) => {
  const {user} = auth;
  const {loading} = commonData;
  const {businessPage} = businessPageData;
  return {user, loading, businessPage}
};

export default connect(mapStateToProps, {
  getBusinessPageDetail,
  onUnMountBusinessPage,
  updateBusinessPage,
  publishUnPublishPage,
  rateBusinessPage
})(BusinessProfileView);
