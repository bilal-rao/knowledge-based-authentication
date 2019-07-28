import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {ListItem} from 'react-native-elements'
import {ScrollView, Text, View} from 'react-native';
import {connect} from "react-redux";

import AppHeader from "../../../utility/AppHeader";
import {colors, fonts, padding} from '../../../../styles/base'
import {updatePhotoTagging} from "../../../../actions/AccountAction";
import AppCheckBox from "../../../utility/AppCheckBox";

class PhotoTagging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user.setting
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onChangePhotoTagging = (changedVal) => {
    const enable_photo_tagging = changedVal ? 1 : 0;
    this.setState({enable_photo_tagging});
    this.props.updatePhotoTagging({
      enable_photo_tagging,
      who_can_tag: this.state.who_can_tag
    });
  };

  onChangeWhoCanTag = (who_can_tag) => {
    this.setState({who_can_tag});
    this.props.updatePhotoTagging({
      who_can_tag,
      enable_photo_tagging: this.state.enable_photo_tagging
    });
  };

  render() {
    const {enable_photo_tagging, who_can_tag} = this.state;
    return (
      <ScrollView>
        <AppHeader
          title="PHOTO TAGGING"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <View style={styles.row}>
          <ListItem
            title="Photo Tagging"
            containerStyle={styles.noSpace}
            titleStyle={styles.heading}
            switch={{
              value: enable_photo_tagging === 1,
              thumbColor: enable_photo_tagging ? colors.primary : colors.white,
              trackColor: {
                true: '#81daf8',
                false: colors.textColor
              },
              onValueChange: (this.onChangePhotoTagging)
            }}
          />
        </View>

        <View style={styles.rowContainer}>
          {enable_photo_tagging ?
            <View style={[styles.row, {paddingRight: 15}]}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.heading}>Any one can tag you</Text>
                <AppCheckBox checked={who_can_tag === 'anyone'}
                             containerStyle={styles.noSpace}
                             onPress={() => this.onChangeWhoCanTag('anyone')}/>
              </View>

              <View style={styles.separator}/>

              <View style={styles.checkboxContainer}>
                <Text style={styles.heading}>Only people you follow can tag you</Text>
                <AppCheckBox checked={who_can_tag === 'only_you_follow'}
                             containerStyle={styles.noSpace}
                             onPress={() => this.onChangeWhoCanTag('only_you_follow')}/>
              </View>
            </View>
            :
            <View style={styles.emptyContainer}>
              <Text style={[styles.heading, {marginBottom: 25, textAlign: 'center'}]}>
                You have not turned on photo tagging.
              </Text>
              <Text style={{fontSize: 16, color: '#9B9B9B', textAlign: 'center'}}>
                When you do , people will be able to tag you in photos, and you'll be notified when they do.
              </Text>
            </View>
          }
        </View>

        {/*<Spinner visible={this.props.loading} color='#3367d6'/>*/}
      </ScrollView>
    )
  }
}

const styles = {
  rowContainer: {
    paddingTop: 10
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
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5ECED',
  }
};

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading, error} = commonData;
  return {user, error, loading};
};
export default connect(mapStateToProps, {updatePhotoTagging})(PhotoTagging);
