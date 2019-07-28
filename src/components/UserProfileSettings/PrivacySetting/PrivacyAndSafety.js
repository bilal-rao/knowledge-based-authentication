import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {ScrollView, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements'
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import AppHeader from "../../utility/AppHeader";
import {baseStyles, colors, fonts, margin, padding, radius} from "../../../styles/base";
import {updateProtectPost, updateReceiveMessages, updateShowReadReceipt} from "../../../actions/AccountAction";

class PrivacyAndSafety extends Component {
  constructor(props) {
    super(props);
    this.state = {
      protectPost: true,
      photoTag: false,
      receiveMsg: true,
      readReceipts: false
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    const {protectPost, receiveMsg, readReceipts} = this.state;
    const {enable_photo_tagging, enable_protect_post, receive_messages_from_anyone, show_read_receipt} = this.props.user.setting;

    return (
      <ScrollView>
        <AppHeader
          title="PRIVACY AND SAFTY"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>Posts</Text>
        </View>
        <ListItem
          title="Protect your posts"
          titleStyle={styles.heading}
          switch={{
            value: enable_protect_post === 1,
            thumbColor: enable_protect_post ? colors.primary : colors.white,
            trackColor: {
              true: '#81daf8',
              false: colors.textColor
            },
            onValueChange: ((changedVal) => this.props.updateProtectPost({enable_protect_post: changedVal? 1: 0}))
          }}
        />
        <View style={styles.subText}>
          <Text>Only show your posts to people who follow you. If
            selected, you will need to approve each new follower.</Text>
          <View style={styles.borderBottom}/>
        </View>
        <ListItem
          title="Photo tagging"
          titleStyle={styles.heading}
          rightSubtitle={enable_photo_tagging? 'On' : 'Off'}
          onPress={() => {Actions.photoTagging();}}
          rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
        />
        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>Direct messages</Text>
        </View>
        <ListItem
          title="Receive messages from anyone"
          titleStyle={styles.heading}
          switch={{
            value: receive_messages_from_anyone === 1,
            thumbColor: receive_messages_from_anyone ? colors.primary : colors.white,
            trackColor: {
              true: '#81daf8',
              false: colors.textColor
            },
            onValueChange: ((changedVal) => this.props.updateReceiveMessages({receive_messages_from_anyone: changedVal? 1: 0}))
          }}
        />
        <View style={styles.subText}>
          <Text>You will be able to recieve Direct Messages from anyone
            outside your Fellows list.</Text>
          <View style={styles.borderBottom}/>
        </View>
        <ListItem
          title="Show read receipts"
          titleStyle={styles.heading}
          switch={{
            value: show_read_receipt === 1,
            thumbColor: show_read_receipt ? colors.primary : colors.white,
            trackColor: {
              true: '#81daf8',
              false: colors.textColor
            },
            onValueChange: ((changedVal) => this.props.updateShowReadReceipt({show_read_receipt: changedVal? 1: 0}))
          }}
        />
        <View style={styles.subText}>
          <Text>When someone sends you a message, people in the
            conversation will know when you’ve seen it. If you turn off
            this setting, you won’t be able to see read receipts from…</Text>
        </View>
        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>Discoverability and contacts</Text>
        </View>
        <ListItem
          onPress={() => {

            Actions.discoverabilityAndContacts();
          }}
          title="Discoverability and contacts"
          titleStyle={styles.heading}
          rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
        />
        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>safety</Text>
        </View>
        <ListItem
          title="Muted"
          titleStyle={styles.heading}
          rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
        />
        <ListItem
          title="Blocked"
          titleStyle={styles.heading}
          rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
        />
        <ListItem
          title="Notifications"
          titleStyle={styles.heading}
          rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
        />
        <View style={{backgroundColor: colors.bgGrey}}>
          <Text style={baseStyles.subHeadingContainer}>Personalizations and data</Text>
        </View>
        <ListItem
          title="Personalization and data"
          titleStyle={styles.heading}
          rightSubtitle="Allow Some"
          rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}

        />
        <View style={styles.subText}>
          <Text style={{fontSize: fonts.sm}}>Control how MediFellows personalizes content and collects data.</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  heading: {
    color: colors.headingColor,
    fontSize: fonts.lg
  },
  subText: {
    backgroundColor: colors.white,
    paddingVertical: padding.lg,
    paddingHorizontal: padding.lg
  },
  borderBottom: {
    width: '100%',
    borderBottomWidth: 0.6,
    alignItems: 'center',
    marginTop: margin.sm,
    borderBottomColor: colors.primary,
    borderBottomRadious: radius.sm
  },
};

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading, error} = commonData;
  return {user, error, loading};
};

export default connect(mapStateToProps, {updateProtectPost, updateReceiveMessages, updateShowReadReceipt})(PrivacyAndSafety);
