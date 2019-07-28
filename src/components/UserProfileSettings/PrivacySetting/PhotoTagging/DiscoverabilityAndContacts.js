import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {ScrollView, Text, View} from 'react-native';
import {baseStyles, colors, fonts, margin, padding, radius} from '../../../../styles/base'
import AppHeader from "../../../utility/AppHeader";
import {updateContactsSync, updateDiscoverability} from "../../../../actions/AccountAction";
import {connect} from "react-redux";
import {ListItem} from "react-native-elements";

class DiscoverabilityAndContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user.setting,
      findEmail: true,
      findPhone: true,
      syncAddress: false,
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onChangeEmailOption = (changedVal) => {
    const discoverable_by_email = changedVal ? 1 : 0;
    this.setState({discoverable_by_email});
    this.props.updateDiscoverability({
      discoverable_by_email,
      discoverable_by_phone: this.state.discoverable_by_phone
    });
  };

  onChangePhoneOption = (changedVal) => {
    const discoverable_by_phone = changedVal ? 1 : 0;
    this.setState({discoverable_by_phone});
    this.props.updateDiscoverability({
      discoverable_by_phone,
      discoverable_by_email: this.state.discoverable_by_email
    });
  };

  onChangeContactSyncing = (changedVal) => {
    const enable_contact_syncing = changedVal ? 1 : 0;
    this.setState({enable_contact_syncing});
    this.props.updateContactsSync({enable_contact_syncing});
  };

  render() {
    const {discoverable_by_phone, discoverable_by_email, enable_contact_syncing} = this.state;

    return (
      <ScrollView>
        <AppHeader
          title="DISCOVERABILITY AND CONTACTS"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>Discoverability</Text>
        </View>
        <View style={styles.row}>
          <ListItem
            title="Let others ﬁnd you by your email"
            containerStyle={styles.noSpace}
            titleStyle={styles.heading}
            switch={{
              value: discoverable_by_email === 1,
              thumbColor: discoverable_by_email ? colors.primary : colors.white,
              trackColor: {
                true: '#81daf8',
                false: colors.textColor
              },
              onValueChange: (this.onChangeEmailOption)
            }}
          />
        </View>

        <View style={styles.borderBottomLine}/>

        <View style={styles.row}>
          <ListItem
            title="Let others ﬁnd you by your phone"
            containerStyle={styles.noSpace}
            titleStyle={styles.heading}
            switch={{
              value: discoverable_by_phone === 1,
              thumbColor: discoverable_by_phone ? colors.primary : colors.white,
              trackColor: {
                true: '#81daf8',
                false: colors.textColor
              },
              onValueChange: (this.onChangePhoneOption)
            }}
          />
        </View>

        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>Contacts</Text>
        </View>

        <View style={styles.row}>
          <ListItem
            title="Sync address book contracts"
            containerStyle={styles.noSpace}
            titleStyle={styles.heading}
            switch={{
              value: enable_contact_syncing === 1,
              thumbColor: enable_contact_syncing ? colors.primary : colors.white,
              trackColor: {
                true: '#81daf8',
                false: colors.textColor
              },
              onValueChange: (this.onChangeContactSyncing)
            }}
          />
        </View>
        <View style={styles.subText}>
          <Text>Contacts from this device will be uploaded to MediFellows on an
            ongoing basis to help you connect with people you may know.
            Turning this continuous sync off will not remove previously uploaded
            contacts.</Text>
        </View>
        <View style={{backgroundColor: colors.white, padding: padding.lg, marginTop: margin.sm}}>
          <Text style={styles.warningText}>Remove all contacts</Text>
          <View style={styles.borderBottomLine}/>
          <Text style={{marginTop: margin.sm}}>Remove any contacts you’ve previously uploaded and turn off
            syncing with MediFellowson all devices.
            Please be aware that this will take a little time.</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: padding.lg,
    justifyContent: 'space-between'
  },
  row: {
    paddingVertical: 5,
    paddingHorizontal: padding.lg,
    backgroundColor: colors.white
  },
  noSpace: {
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  heading: {
    color: colors.headingColor,
    fontSize: fonts.lg
  },
  warningText: {
    color: colors.delete,
    fontSize: fonts.lg,
    textAlign: 'center',
    marginBottom: margin.lg
  },
  subText: {
    backgroundColor: colors.white,
    paddingVertical: padding.lg,
    paddingHorizontal: padding.lg
  },
  borderBottomLine: {
    width: '100%',
    borderBottomWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.primary,
    borderBottomRadious: radius.sm
  },
};

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading, error} = commonData;
  return {user, error, loading};
};

export default connect(mapStateToProps, {updateDiscoverability, updateContactsSync})(DiscoverabilityAndContacts);
