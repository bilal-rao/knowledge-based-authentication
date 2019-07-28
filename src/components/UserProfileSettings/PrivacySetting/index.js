import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

import {baseStyles, colors, fonts, padding} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import {getTitle} from '../../../appUtility/Utils'
import AppComponent from "../../utility/AppComponent";

class PrivacySetting extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    const {user} = this.props;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="PRIVACY SETTING"
          icon="chevron-left"
          placement={'center'}
          onPress={() => {
            this.onBackPress();
          }}/>
        <ScrollView style={styles.scrollView}>

          <View style={{backgroundColor: colors.bgGrey}}>
            <Text style={baseStyles.subHeadingContainer}>
              {getTitle(user.name_title) + " " + user.fname + " " + user.lname}
            </Text>
          </View>
          <Text onPress={() => {
          
            Actions.account();
          }} style={styles.listHeadding}>Accounts</Text>
          <Text onPress={() => {
          
            Actions.privacyAndSafety();
          }} style={styles.listHeadding} >Privacy And Safety</Text>
         { /*<Text style={styles.listHeadding}>Notifications</Text>
          <Text style={styles.listHeadding}>Content Prefrences</Text> */}

          <View style={{alignItems: 'center', marginTop: '70%'}}>
            <Text style={{fontSize: fonts.sm, color: colors.textColor}}> General settings affect all of your Medifellows
              accounts on this device</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listHeadding: {
    fontSize: fonts.lg,
    color: colors.headingColor,
    padding: padding.lg
  }
};

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user};

};
export default connect(mapStateToProps, null)(PrivacySetting);
