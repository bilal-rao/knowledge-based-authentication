import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";

import AppHeader from "../../../utility/AppHeader";
import {colors, fonts, margin, padding} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import AppButton from "../../../utility/AppButton";

class CheckEmail extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    if (update && update === 1) {
      Actions.updateEmail();
    } else {
      Actions.addEmail();
    }
    return true;
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <AppHeader
          title="Confirmation"
          icon="chevron-left"
          onPress={() => this.onBackPress()}

        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1, paddingVertical: padding.xl, paddingHorizontal: padding.lg}}>
            <View>
              <Text style={[styles.listHeading, {textAlign: 'center'}]}>
                Please check your email for {"\n"}
                confirmation mail. {"\n"}
                Follow instructions on link. </Text>
              <Text style={{
                fontSize: fonts.lg,
                fontFamily: 'Roboto-Light',
                marginBottom: margin.lg,
                textAlign: 'center'}}>{this.props.email}</Text>
            </View>
            <AppButton containerStyle={{marginTop: 'auto'}} title="Done" onPress={() => {
              Actions.pop();
            }}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
    listHeading: {
      textAlign: 'center',
      fontSize: fonts.xl,
      fontFamily: 'Roboto-Medium',
      color: colors.subHeadingColor,
      marginBottom: 50,
    },
  }
;
export default CheckEmail;
