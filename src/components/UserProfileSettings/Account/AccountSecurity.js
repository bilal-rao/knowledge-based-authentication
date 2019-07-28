import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {ListItem} from 'react-native-elements'
import {ScrollView, Text, View} from 'react-native';
import {connect} from "react-redux";

import AppHeader from "../../utility/AppHeader";
import {colors, fonts, padding} from '../../../styles/base'
import {updateAccountSecurity} from "../../../actions/AccountAction";

class AccountSecurity extends Component {
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

  onChangeAccountSecurity = (changedVal) => {
    const enable_twoway_auth = changedVal ? 1 : 0;
    this.setState({enable_twoway_auth});
    this.props.updateAccountSecurity({enable_twoway_auth});
  };

  render() {
    const {enable_twoway_auth} = this.state;
    return (
      <ScrollView>
        <AppHeader
          title="SECURITY"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <View style={styles.row}>
          <ListItem
            title="Login Verification"
            containerStyle={styles.noSpace}
            titleStyle={styles.heading}
            switch={{
              value: enable_twoway_auth === 1,
              thumbColor: enable_twoway_auth ? colors.primary : colors.white,
              trackColor: {
                true: '#81daf8',
                false: colors.textColor
              },
              onValueChange: (this.onChangeAccountSecurity)
            }}
          />
        </View>

        <View style={styles.emptyContainer}>
          <Text style={{fontSize: 16, color: '#9B9B9B'}}>
            After you log in, Medifellows will ask you for additional information to confirm your identy and protect your account from being compermised
          </Text>
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
    paddingHorizontal: padding.lg,
    paddingTop: 10,
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
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

export default connect(mapStateToProps, {updateAccountSecurity})(AccountSecurity);
