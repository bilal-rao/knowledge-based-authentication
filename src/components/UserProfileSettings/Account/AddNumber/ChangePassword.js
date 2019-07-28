import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Dimensions, FlatList, ScrollView, Text, View,} from 'react-native';

import AppHeader from "../../../utility/AppHeader";
import AppHeaderButton from "../../../utility/AppHeaderButton";
import {baseStyles, colors, fontFamilyLight, margin, padding} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import AppTextInput from "../../../utility/AppTextInput";
import AppButton from "../../../utility/AppButton";
import {updateUserPassword} from "../../../../actions/AccountAction";
import {connect} from "react-redux";

const requireList = [
  {id: 1, title: 'One uppercase character'},
  {id: 2, title: 'One special character'},
  {id: 3, title: 'One lowercase character'},
  {id: 4, title: '8 characters minimum'},
  {id: 5, title: 'One number'},
];

class ChangePassword extends AppComponent {
  onChangePass = () => {
    const {currentPass, newPass, confirmPass} = this.state;
    if (currentPass === '') {
      this.setState({currentPassError: 'Field is require'})
    } else if (newPass === '') {
      this.setState({newPassError: 'Field is require'})
    } else if (confirmPass === '') {
      this.setState({confirmError: 'Field is require'})
    }
    else if (confirmPass !== newPass) {
      this.setState({newPassError: 'confirm password must match'})
    }
    else {
      //this.setState({currentPassError: '', newPassError: '', confirmError: ''});
      this.props.updateUserPassword(currentPass, newPass,confirmPass);
     // console.log("currentPass,newPass ,confirmPass", currentPass, newPass, confirmPass)
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassError: '',
      newPassError: '',
      confirmError: '',
      currentPass: '',
      newPass: '',
      confirmPass: '',
    }
  };

  render() {
    const {currentPassError, currentPass, newPassError, newPass, confirmPass, confirmError} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#d8d8d8'}}>
        <AppHeader
          title="CHANGE PASSWORD"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1}}>
            <View style={{padding: padding.lg, backgroundColor: colors.white, marginBottom: margin.lg}}>
              <Text style={styles.listHeading}>Current password</Text>
              <AppTextInput
                errorMessage={currentPassError}
                returnKeyType="next"
                value={currentPass}
                onChangeText={(currentPass) => this.setState({currentPass, currentPassError: ''})}
                placeholder="Current Password"
                inputContainerStyle={{marginTop: 0}}
              />
              <Text style={styles.linkText}>Forgot
                Password? </Text>
              <Text style={styles.listHeading}>Password Requirements</Text>
              <FlatList
                style={{flexGrow: 0}}
                data={requireList}
                numColumns={2}
                renderItem={({item, index}) =>
                  <View key={index} style={[{flex: 1, flexDirection: 'row'}, baseStyles.alignItemsCenter,]}>
                    <View style={{
                      backgroundColor: '#a1a1a1',
                      height: 3,
                      width: 3,
                      borderRadius: 100 / 2,
                      marginRight: 15,
                    }}/>
                    <Text style={[fontFamilyLight, {color: '#a6a6a6'}]}>
                      {item.title}
                    </Text>
                  </View>}
              />
            </View>
            <View style={{flex: 1, padding: padding.lg, backgroundColor: colors.white}}>
              <Text style={[styles.listHeading]}>New password</Text>
              <AppTextInput
                errorMessage={newPassError}
                returnKeyType="next"
                value={newPass}
                onChangeText={(newPass) => this.setState({newPass, newPassError: ''})}
                placeholder="New password"
                inputContainerStyle={{marginTop: 0}}
              />
              <Text style={[styles.listHeading, {marginTop: margin.lg}]}>Confirm password</Text>
              <AppTextInput
                errorMessage={confirmError}
                returnKeyType="next"
                value={confirmPass}
                onChangeText={(confirmPass) => this.setState({confirmPass, confirmError: ''})}
                placeholder="Confirm password"
                inputContainerStyle={{marginTop: 0, marginBottom: margin.lg}}
              />

              <AppButton containerStyle={{marginTop: 'auto', marginBottom: margin.md}} title="Next" onPress={() => this.onChangePass()}/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
    listHeading: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 8,
      color: colors.subHeadingColor,
    },
    linkText: {
      color: colors.primaryText,
      fontSize: 13,
      paddingVertical: 5,
      fontFamily: 'Roboto-Light',
      marginTop: margin.sm,
      marginVertical: margin.md
    },
  }
;
const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading};

};
export default connect(mapStateToProps, {updateUserPassword})(ChangePassword);