import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {baseStyles, colors, margin, padding} from "../../../styles/base";
import AppAvatar from "../../utility/AppAvatar";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";


class BusinessListItem extends Component {

  render() {
    const {title, logo, id} = this.props.businessPage;
    return (
      <TouchableWithoutFeedback key={id} onPress={() => Actions.businessProfileView({id: this.props.businessPage.id})}>
        <View style={styles.container}>
          <AppAvatar
            size={40}
            containerStyle={{marginRight: margin.lg}}
            rounded
            source={{uri: MEDIA_BASE_PATH + logo}}/>
          <Text style={[baseStyles.fontsLg, baseStyles.primaryText]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: padding.lg,
  }
};
export default BusinessListItem;
