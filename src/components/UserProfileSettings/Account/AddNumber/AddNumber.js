import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";

import AppHeader from "../../../utility/AppHeader";
import {baseStyles, colors, fontFamilyLight, fonts, margin, padding} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import AppTextInput from "../../../utility/AppTextInput";
import AppButton from "../../../utility/AppButton";
import {addUpdatePhoneNumber,checkPhonenumber} from "../../../../actions/AccountAction";
import Spinner from "react-native-loading-spinner-overlay";

class AddNumber extends AppComponent {
  onVerifyPhone = () => {
    const {phone, countryCode} = this.state;
    if (countryCode === '') {
      this.setState({countryCodeError: 'field is require'})
    } else if (phone === '') {
      this.setState({phoneError: 'field is require'})
    } else {
      //this.props.checkPhonenumber(countryCode, phone);
      this.props.addUpdatePhoneNumber(countryCode, phone);
    }
  };
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      countryCode: '',
      countryCodeError: '',
      phone: '',
      phoneError: ''
    };
  }

  render() {
    const {phone, countryCode, phoneError, countryCodeError} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <AppHeader
          title="ADD NUMBER"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingVertical: padding.xl, paddingHorizontal: padding.lg}}>
            <Text style={styles.headingBlock}>
              Your phone number keeps {"\n"}
              your account secure and {"\n"}
              makes login easier.
            </Text>
            <View style={baseStyles.marginBottomLg}>
              <AppTextInput
                errorMessage={countryCodeError}
                returnKeyType="next"
                value={countryCode}
                keyboardType="phone-pad"
                onChangeText={(countryCode) => this.setState({countryCode, countryCodeError: ''})}
               placeholder="Country Code"
              />
              <AppTextInput
                errorMessage={phoneError}
                returnKeyType="next"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(phone) => this.setState({phone, phoneError: ''})}
                placeholder="Phone number"
              />
            </View>
            <Text style={fontFamilyLight}>
              We will text a verification code to this number. Standard
              SMS fees may apply. Others will be able to find you by
              email or phone number. You can change these settings
              at any time
            </Text>
            <Text style={styles.linkText}>
              Privacy Options
            </Text>
            <AppButton containerStyle={{marginTop: 'auto'}} title="Next" onPress={() => this.onVerifyPhone()}/>
          </View>
        </ScrollView>
        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = {
    headingBlock: {
      textAlign: 'center',
      fontSize: fonts.xl,
      fontFamily: 'Roboto-Medium',
      color: colors.subHeadingColor,
      marginBottom: 50,
    },
    linkText: {
      color: colors.primaryText,
      fontSize: 13,
      paddingVertical: 5,
      fontFamily: 'Roboto-Light',
      marginVertical: margin.md
    },
  }
;


const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading};

};
export default connect(mapStateToProps, {addUpdatePhoneNumber,checkPhonenumber})(AddNumber);
