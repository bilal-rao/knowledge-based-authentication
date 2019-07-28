import React, {Component} from 'react';
import {Dimensions, FlatList, ScrollView, View} from "react-native";
import {Actions} from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";

import AppComponent from "../../utility/AppComponent";
import {colors, padding} from "../../../styles/base";
import BusinessListItem from "./BusinessListItem";
import {connect} from "react-redux";
import {getBusinessPages} from "../../../actions/BusinessPageAction";
import AppHeader from "../../utility/AppHeader";
import AppHeaderButton from "../../utility/AppHeaderButton";

class BusinessProfile extends AppComponent {


  state = {
    selectedTitle: null,
    refreshing: false,
    text: '',
  };


  componentWillMount() {
    const {page} = this.state;
    this.props.getBusinessPages(false);
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false});
  }


  fetchMore = (page) => {
    this.props.getBusinessPages(true);
  };

  onBackPress = () => {
    Actions.pop();
    return true;
  };


  render() {
    const {refreshing} = this.state;
    const {businessPages} = this.props;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="BUSINESS PAGE"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
          style={{elevation: 0}}
          rightComponent={
            <AppHeaderButton
              title="Create"
              onPress={() => Actions.createBusinessPage()}
            />}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingBottom: padding.xl}}>
            <View style={{backgroundColor: colors.subHeadingBgColor, height: 1}}/>
            <FlatList
              style={{paddingTop: 8}}
              data={businessPages}
              refreshing={refreshing}
              renderItem={(businessPage) => <BusinessListItem key={businessPage.item.id}
                                                              businessPage={businessPage.item}/>}
              onEndReachedThreshold={10}
              keyExtractor={(businessPage) => {
                return businessPage.id + ", " + businessPage.title + ", " + businessPage.logo;
              }}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.props.getBusinessPages(true)
              }}
            />
          </View>
        </ScrollView>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const mapStateToProps = ({commonData, businessPageData}) => {
  const {chatCountValue, loading} = commonData;
  const {businessPages} = businessPageData;
  return {chatCountValue, loading, businessPages}
};
export default connect(mapStateToProps, {getBusinessPages})(BusinessProfile);
