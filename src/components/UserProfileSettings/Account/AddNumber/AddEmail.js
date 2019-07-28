import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";

import AppHeader from "../../../utility/AppHeader";
import {baseStyles, colors, fontFamilyLight, fonts, margin, padding} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import AppTextInput from "../../../utility/AppTextInput";
import AppButton from "../../../utility/AppButton";
import {connect} from "react-redux";
import {updateUserEmail} from "../../../../actions/AccountAction";
import Spinner from "react-native-loading-spinner-overlay";

class AddEmail extends AppComponent {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
  }

  onEmailUpdate = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {email} = this.state;
    if (email === '') {
      this.setState({emailError: 'email is require'});
    }
    else if (reg.test(email) === false) {
      this.setState({emailError: 'email is invalid'});
    }
    else {
      this.props.updateUserEmail(email);
    }
  };
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    const {email, emailError} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <AppHeader
          title="ADD EMAIL"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingVertical: padding.xl, paddingHorizontal: padding.lg}}>
            <AppTextInput
              errorMessage={emailError}
              returnKeyType="next"
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => this.setState({email, emailError: ''})}
              placeholder="Email address"
            />
            <Text style={[fontFamilyLight, baseStyles.marginTopLg]}>Your email is not displayed in your public profile
              on Medifellows.
              Others will be able to find you by email or phone number.
              You can change these settings at any time.</Text>
            <Text style={styles.linkText}>
              Privacy Options
            </Text>
            <AppButton containerStyle={{marginTop: 'auto'}} title="next" onPress={() => this.onEmailUpdate()}/>
          </View>
        </ScrollView>
        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = {
  listHeading: {
    fontSize: fonts.lg,
    marginBottom: margin.lg,
    color: colors.headingColor,
    fontWeight: 'bold'
  },
  linkText: {
    color: colors.primaryText,
    fontSize: 13,
    paddingVertical: 5,
    fontFamily: 'Roboto-Light',
    marginVertical: margin.md
  },

};

const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading};

};
export default connect(mapStateToProps, {updateUserEmail})(AddEmail);
