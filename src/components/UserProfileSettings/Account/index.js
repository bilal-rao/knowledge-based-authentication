import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome";
import {Actions} from "react-native-router-flux";

import {
  baseStyles,
  colors,
  fontFamilyLight,
  fontFamilyMedium,
  fonts,
  margin,
  padding,
  radius
} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import AppComponent from "../../utility/AppComponent";
import {connect} from "react-redux";
import {logOutUser} from "../../../actions/AuthAction";

class Account extends AppComponent {
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    const {user} = this.props;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="ACCOUNT"
          icon="chevron-left"
          placement={'center'}
          onPress={() => {
            this.onBackPress();
          }}/>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: padding.lg, paddingVertical: 14, backgroundColor: colors.bgGrey}}>
              <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                Login and security
              </Text>
            </View>
            <View style={baseStyles.containerFull}>
              <ListItem
                onPress={() => Actions.addNumber()}
                title="Phone"
                titleStyle={styles.ListHeading}
                containerStyle={{paddingHorizontal: padding.lg}}
                rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor]}
                rightSubtitle={user.phone === '' ? 'Add' : 'Edit'}
                rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
              />
              <View style={[baseStyles.marginHorizontalLg, {height: 1, backgroundColor: '#e5eced'}]}/>
              <ListItem
                onPress={() => {
                  if (user.email) {
                    Actions.updateEmail();
                  } else {
                    Actions.addEmail();
                  }
                }}
                title="Email"
                titleStyle={styles.ListHeading}
                containerStyle={{paddingHorizontal: padding.lg}}
                rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor]}
                rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
                rightSubtitle={user.email === '' ? 'Add' : 'Edit'}
              />
              {/*<View style={{backgroundColor: colors.white, paddingLeft: padding.lg, paddingBottom: padding.sm}}>
              <Text>Your new email {user.email} has not been confirmed<Text style={{color: '#0069A7'}}>
                 Resend email or remove email.</Text></Text>
            </View>*/}
              <View style={[baseStyles.marginHorizontalLg, {height: 1, backgroundColor: '#e5eced'}]}/>
              <ListItem
                onPress={() => Actions.changePassword()}
                title="Change Password"
                titleStyle={styles.ListHeading}
                containerStyle={{paddingHorizontal: padding.lg}}
                rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor]}
                rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
              />
              <View style={[baseStyles.marginHorizontalLg, {height: 1, backgroundColor: '#e5eced'}]}/>
              {/*<ListItem*/}
                {/*title="Security"*/}
                {/*onPress={() => Actions.accountSecurity()}*/}
                {/*titleStyle={styles.ListHeading}*/}
                {/*rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}*/}
              {/*/>*/}
            </View>
            {/*<View style={{paddingHorizontal: padding.lg, paddingVertical: 14, backgroundColor: colors.bgGrey}}>
              <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                Data and Premissions
              </Text>
            </View>
            <ListItem
              title="Country"
              containerStyle={{paddingHorizontal: padding.lg}}
              rightSubtitle={user.country ? user.country.name : 'Add'}
              rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor, baseStyles.fontsSm]}
              titleStyle={styles.ListHeading}
              rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
            />
            <View style={{backgroundColor: colors.white, paddingHorizontal: padding.lg, paddingBottom: padding.xxl}}>
              <Text style={[fontFamilyLight, baseStyles.fontsSm]}>Select the country you live in.
                <Text style={{color: colors.primaryText, paddingVertical: 5}}> Learn More</Text></Text>
          </View> */}

            <View style={styles.logOut}>
              <Text style={[fontFamilyMedium, {color: colors.delete, fontSize: fonts.lg}]} onPress={() => {
                this.props.logOutUser();
              }}>
                Log Out
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  logOut: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: 16,
    marginTop: margin.lg
  },
  ListHeading: {
    color: colors.subHeadingColor,
    fontSize: fonts.md,
    fontFamily: 'Roboto-Light',
  },
  borderBottom: {
    width: '100%',
    borderBottomWidth: 0.6,
    borderBottomColor: colors.primary,
    borderBottomRadious: radius.md
  },
};
const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading, error} = commonData;
  return {user, error, loading};
};
export default connect(mapStateToProps, {logOutUser})(Account);
