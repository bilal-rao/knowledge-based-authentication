// import React, {Component} from 'react';
// import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// import {connect} from "react-redux";
// import {baseStyles, colors, margin, padding} from "../../../../styles/base";
// import {Image} from "react-native-animatable";
// import {Actions} from "react-native-router-flux";


// class Albums extends Component {

//   onCreateFolder = () => {
//     Actions.createAlbum();
//   };

//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={{backgroundColor: colors.galleryHeading, paddingVertical: 6, paddingHorizontal: 15}}>
//             <Text style={[baseStyles.fontsLg, baseStyles.subHeadingColor]}>Albums</Text>
//           </View>
//           <TouchableOpacity onPress={this.onCreateFolder} style={styles.imgContainer}>
//             <Image source={require('../../../../assests/profile/albumFolder.png')}
//                    style={{width: '100%', height: '100%'}}
//                    resizeMode="contain"/>
//           </TouchableOpacity>
//           <Text style={{marginLeft: margin.md, color: colors.primary}}>Create folder</Text>
//         </View>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },

//   imgContainer: {
//     padding: padding.md,
//     width: 105,
//     height: 105,
//     overflow: 'hidden'
//   },
// });

// const mapStateToProps = ({auth, groupData, commonData}) => {
//   const {user} = auth;
//   const {group} = groupData;
//   const {loading} = commonData;
//   return {user, loading, group}
// };

// export default connect(mapStateToProps, null)(Albums);



import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import { connect } from "react-redux";
import { baseStyles, colors, margin, padding } from "../../../../styles/base";
import { Image } from "react-native-animatable";
import { Actions } from "react-native-router-flux";
import albumFolder from '../../../../assests/profile/albumFolder.png'
import albumEmptyFolder from '../../../../assests/profile/albumEmptyFolder.png'

// import {getGroupDetail} from "../../../../actions/GroupAction";
import {
  getBusinessPageDetail
} from "../../../../actions/BusinessPageAction";

let win = Dimensions.get('window');
class Albums extends Component {
  onCreateFolder(index, item) {
    console.log(this.props.businessPage.galleryData.albumMedia);
    if (index === 0 && (item.album_name===null))
      Actions.createBusinessAlbum({id: this.props.businessPage.id, businessGalleryThis:this, isShowFullImage:true});
    else {
      Actions.albumMediGallery({businessGalleryThis:this, isUploadAvailable:(this.props.businessPage.galleryData.albumMedia[0].album_name === null), albumId:this.props.businessPage.galleryData.albumMedia[index].id, albumData:this.props.businessPage.galleryData.albumMedia[index].albummedia, isShowFullImage:true});
    }
  }

  refreshView() {
    console.log('refreshView');
    // const {groupId} = this.props.businessPage.id;
    this.props.getBusinessPageDetail(this.props.businessPage.id, this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('GalleryAlbums:', nextProps.albumMediaData);
    // if (!nextProps.loading)
    //   this.setState({refreshing: false, isLoadingMore: false});
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <FlatList
              data={this.props.businessPage.galleryData.albumMedia}
              numColumns={3}
              style={{
                width: (win.width - 20),
                marginLeft: 10,
                // backgroundColor: 'gray'
              }}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={this.onCreateFolder.bind(this,index, item)} style={{
                  height: 140,
                  width: (win.width - 20) / 3,
                  marginTop:8
                }}>
                  <Image source={(index === 0 && (item.album_name===null) ? albumFolder : albumEmptyFolder)} style={{
                    // backgroundColor: 'cyan',
                    marginLeft: (index+1 % 3 !== 0 ? 5 : 0),
                    width: ((win.width - 20) / 3) - 5,
                    height: 120,
                    resizeMode: 'contain'
                  }}
                    resizeMode="contain" />
                  <Text style={{ marginLeft: margin.md, color: colors.primary }}>
                  {/* Create folder */}
                  {(index === 0 && (item.album_name===null) ? 'Create folder' : item.album_name)}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => `GalleryPhotos_${index}`}
            />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionContainer: {
    backgroundColor: colors.white,
  },
  // imgContainer: {
  //   padding: padding.md,
  //   width: 105,
  //   height: 105,
  //   overflow: 'hidden'
  // },
  itemContainer: {
    width: ((win.width - 20) / 2),
    alignSelf: 'flex-start',
    // borderRadius: radius.xl,
    overflow: 'hidden',
    // backgroundColor: 'gray'
  }
});

const mapStateToProps = ({auth, businessPageData, commonData}) => {

  console.log('mapStateToProps:',businessPageData);
  const {user} = auth;
  const {businessPage} = businessPageData;
  const {loading} = commonData;
  return {user, loading, businessPage}
};

export default connect(mapStateToProps, {getBusinessPageDetail})(Albums);


// const mapStateToProps = ({commonData, businessPageData}) => {
//   const {loading} = commonData;
//   const {businessPage} = businessPageData;
//   return {loading, businessPage}
// };

// export default connect(mapStateToProps, {
//   getBusinessPageDetail,
//   updateBusinessPage,
//   publishUnPublishPage,
//   rateBusinessPage
// })(BusinessProfileView);