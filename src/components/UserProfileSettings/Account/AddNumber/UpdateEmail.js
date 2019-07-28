import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";

import AppHeader from "../../../utility/AppHeader";
import {baseStyles, colors, fontFamilyLight, fonts, margin, padding} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import AppTextInput from "../../../utility/AppTextInput";
import AppButton from "../../../utility/AppButton";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {updateUserEmail} from "../../../../actions/AccountAction";

class UpdateEmail extends AppComponent {
  onEmailUpdate = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {email, eamilError} = this.state;
    if (email === '') {
      this.setState({emailError: 'Email is required'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'Email is invalid'});
    }
    else {
      console.log("eamil", email);
      this.props.updateUserEmail(email, 1);
    }
  };
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {email: '', emailError: ''};
  }

  render() {
    const {email, emailError} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <AppHeader
          title="UPDATE EMAIL"
          icon="chevron-left"
          onPress={() => Actions.pop()}/>

        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingTop: padding.lg, paddingBottom: padding.xl, paddingHorizontal: padding.lg}}>
            <Text style={styles.listHeading}>Current</Text>
            <Text style={{
              fontSize: fonts.md,
              fontFamily: 'Roboto-Light',
              marginBottom: 25,
              color: colors.subHeadingColor
            }}>{this.props.user.email}</Text>

            <Text style={[styles.listHeading]}>New</Text>
            <AppTextInput
              errorMessage={emailError}
              returnKeyType="next"
              value={email}
              onChangeText={(email) => this.setState({email, emailError: ''})}
              placeholder="Email address"
              inputContainerStyle={{marginTop: 5}}
            />
            <Text style={[fontFamilyLight, baseStyles.marginTopLg]}>Your email is not displayed in your public profile
              on Medifellows.
              Others will be able to find you by email or phone number.
              You can change these settings at any time.</Text>
            <Text style={styles.linkText}>
              Privacy Options
            </Text>
            <AppButton containerStyle={{marginTop: 'auto'}} title="Next" onPress={() => this.onEmailUpdate()}/>
          </View>
        </ScrollView>
        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = {
  listHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor,
    marginBottom: margin.sm,
  },
  linkText: {
    color: colors.primaryText,
    fontSize: 13,
    paddingVertical: 5,
    fontFamily: 'Roboto-Light',
    marginVertical: margin.md
  },

};


const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading, error} = commonData;
  return {user, error, loading};

};
export default connect(mapStateToProps, {updateUserEmail})(UpdateEmail);
