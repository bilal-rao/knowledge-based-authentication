import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Image, Linking, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {baseStyles, colors, fonts, margin, padding, radius} from "../../../../styles/base";

import {connect} from "react-redux";
import AnythingShare from "../../Feed/AnythingShare/index";
import {getPagePosts} from "../../../../actions/BusinessPageAction";
import PostItem from "../../Feed/PostList/PostItem/index";

class HomeItem extends Component {
  state = {
    isLoadingMore: true,
    refreshing: false,
    page: 1
  };

  onPressAnything = () => {
    const {user, businessPage} = this.props;
    Actions.createPost({user: user, business_page_id: businessPage.id});
  };

  componentWillMount() {
    const {businessPage} = this.props;
    this.props.getPagePosts({business_page_id: businessPage.id, page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }


  render() {
    const {user, businessPage, feed} = this.props;
    const {page, refreshing, isLoadingMore} = this.state;

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{marginBottom: 10}} onPress={this.onPressAnything}>
          <AnythingShare user={user}/>
        </TouchableOpacity>
        <View style={styles.mainContainer}>
          <Text style={{fontSize: fonts.lg, marginBottom: margin.sm}}>About</Text>
          <View style={styles.aboutOuter}>
            <Text style={{fontSize: 13, color: colors.subHeadingColor}}>
              {businessPage.description}
            </Text>
          </View>
          <View style={baseStyles.paddingVerticalMd}>
            <View style={[baseStyles.media, {alignItems: 'center'}]}>
              <Image
                source={require('../../../../assests/profile/contact_icon.png')}
                style={[{marginRight: margin.lg, height: 20, width: 20}]}
                resizeMode="contain"
              />
              <Text onPress={() => Linking.openURL('tel:' + businessPage.contact)}
                    style={[baseStyles.mediaBody, styles.textStyle]}>{businessPage.contact}</Text>
            </View>

            <View style={[baseStyles.media, {alignItems: 'center'}]}>
              <Image
                source={require('../../../../assests/profile/website_icon.png')}
                style={[{marginRight: margin.lg, height: 20, width: 20}]}
                resizeMode="contain"
              />
              <Text onPress={() => Linking.openURL(businessPage.website)}
                    style={[baseStyles.mediaBody, styles.textStyle]}>{businessPage.website}</Text>
            </View>

            <View style={[baseStyles.media, {alignItems: 'center', marginBottom: 0}]}>
              <Image
                source={require('../../../../assests/profile/email.png')}
                style={[{marginRight: margin.lg, height: 20, width: 20}]}
                resizeMode="contain"
              />
              <Text onPress={() => Linking.openURL('mailto:' + businessPage.email)}
                    style={[baseStyles.mediaBody, styles.textStyle]}>{businessPage.email}</Text>
            </View>
          </View>
        </View>

        <FlatList
          style={{paddingTop: 8}}
          data={feed}
          refreshing={refreshing}
          renderItem={(post) => <PostItem key={post.item.id} postData={post.item}/>}
          onEndReachedThreshold={10}
          keyExtractor={(post) => {
            return post.id + "," + post.like_detail.count + "," + post.various_status.is_liked + "," + post.comments_count + "," + post.various_status.user_follow_status + "," + post.various_status.notification_status + "," + post.various_status.snooze_status;
          }}
          onEndReached={() => {
            if (this.props.feed.length > 0 && !isLoadingMore && this.props.feed.length === this.state.page * 10) {
              this.fetchMore(page + 1);
              this.setState({isLoadingMore: true, page: page + 1});
            }
          }}
          onRefresh={() => {
            this.setState({refreshing: true, page: 1});
            this.props.getPagePosts({business_page_id: businessPage.id, page: 1})
          }}
          ListFooterComponent={
            isLoadingMore ?
              <View style={{
                flex: 1, paddingBottom: 15
              }}>
                <ActivityIndicator size="small"/>
              </View> :
              null
          }
        />
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
  },
  aboutOuter: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: padding.sm,
    paddingHorizontal: 12,
    marginBottom: margin.sm,
  },
  textStyle: {
    fontSize: fonts.md,
    color: colors.primaryText,
  }

};

const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {feed} = feedData;
  const {loading} = commonData;
  return {user, loading, feed}
};

export default connect(mapStateToProps, {getPagePosts})(HomeItem);
