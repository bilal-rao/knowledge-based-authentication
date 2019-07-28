import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";

import AppHeader from "../../../utility/AppHeader";
import {baseStyles, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import AppTextInput from "../../../utility/AppTextInput";
import AppButton from "../../../utility/AppButton";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import {addUpdatePhoneNumber, verifyPhoneCode} from "../../../../actions/AccountAction";
import {connect} from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

class VerifyPhone extends AppComponent {


  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      verifyCode: '',
      verifyCodeError: '',
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onVerifyCode = () => {
    const verifyCode = this.state;
    if (verifyCode === '') {
      this.setState({verifyCodeError: 'Code is required'})
    } else {
      this.props.verifyPhoneCode(verifyCode);
    }
  };

  onResendSMS = () => {
    const {code, phoneNumber} = this.props;
    this.props.addUpdatePhoneNumber(code, phoneNumber)
  };
  onEditPhone = () => {
    Actions.pop();
    Actions.addNumber();
  };


  render() {
    const {verifyCode, verifyCodeError, isVisible} = this.state;
    const {code, phoneNumber} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <AppHeader
          title="VERIFY PHONE"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingVertical: padding.xl, paddingHorizontal: padding.lg}}>
            <Text style={styles.headingBlock}>
              We sent a code to{"\n"}
              {code}{phoneNumber}
            </Text>
            <View style={baseStyles.marginBottomMd}>
              <AppTextInput
                returnKeyType="next"
                keyboardType="number-pad"
                value={verifyCode}
                errorMessage={verifyCodeError}
                onChangeText={(verifyCode) => this.setState({verifyCode, verifyCodeError: ''})}
                placeholder="Verification code"
              />
            </View>

            <TouchableOpacity style={baseStyles.marginBottomLg} onPress={this.handleToggle}>
              <Text style={styles.linkText}>
                Didn’t receice SMS?
              </Text>
            </TouchableOpacity>

            <AppButton containerStyle={{marginTop: 'auto'}} title="Next" onPress={() => this.onVerifyCode()}/>

            <Dialog dialogStyle={{borderRadius: 20}}
                    visible={isVisible}
                    onTouchOutside={() => this.setState({isVisible: false})}>
              <View>
                <TouchableOpacity onPress={() => this.onResendSMS()}>
                  <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Re-send SMS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onEditPhone()}>
                  <Text style={{fontSize: fonts.lg, color: colors.primary}}>Edit phone number</Text>
                </TouchableOpacity>
              </View>
            </Dialog>
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
    },
  }
;


const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading};

};
export default connect(mapStateToProps, {verifyPhoneCode, addUpdatePhoneNumber})(VerifyPhone);
