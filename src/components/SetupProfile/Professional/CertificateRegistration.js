import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import AppAutoComplete from "../../utility/AppAutoComplete";
import AppButton from "../../utility/AppButton";
import AppAccentButton from "../../utility/AppAccentButton";
import {countries} from "../../data";
import {baseStyles, colors, dimensions, fontFamilyItalic, fontFamilyThin, fonts, padding} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";

class CertificateRegistration extends Component {

  // country
  countryCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          countryText: data.name,
          countriesData: [],
          selectedCountry: countries.filter(country =>
            country.name.toLowerCase().startsWith(data.name.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.countryCell}>
          <Image
            style={styles.image}
            source={{
              uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${data.countryCode.toLocaleLowerCase()}.png`,

            }}
          />
          <Text style={styles.countryName}>{data.name}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onCountryTextChange = (text) => {
    const countriesData = countries.filter(country =>
      country.name.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({countryText: text, countriesData: countriesData});
  };
// license Registration
  licenseCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          licenseText: data.title,
          licenseRegistrationData: [],
          selectedLicense: licenseRegistration.filter(license =>
            license.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onLicenseTextChange = (text) => {

    console.log("text", text)
    const licenseRegistrationData = licenseRegistration.filter(license =>
      license.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({licenseText: text, licenseRegistrationData: licenseRegistrationData});
  };

  constructor(props) {
    super(props);
    this.state = {
      countryText: '',
      selectedCountry: null,
      countriesData: [],
      licenseText: '',
      selectedLicense: null,
      licenseRegistrationData: []

    };
  }

  render() {
    const {countriesData, countryText, licenseRegistrationData, licenseText} = this.state;
    return (
      <ScrollView style={styles.container}>
        <AppHeader
          title="SETUP PROFILE"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <View style={{display: 'flex', flexDirection: 'column', paddingBottom: 10}}>
          <View style={styles.bgGrayWrapper}>
            <Text style={styles.bgGrayWrapperText}>Certificate and Registraion</Text>
          </View>
          <View style={{marginTop: -8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <AppAutoComplete
              renderItem={this.licenseCell}
              data={licenseRegistrationData}
              defaultValue={licenseText}
              onChangeText={this.onLicenseTextChange}
              placeholder="MEDICAL LICENSE/REGISTRATION NO"
            />
            <AppAutoComplete
              renderItem={this.countryCell}
              data={countriesData}
              defaultValue={countryText}
              onChangeText={this.onCountryTextChange}
              placeholder="COUNTRY"
            />
            <View style={[baseStyles.marginTopLg, {paddingHorizontal: padding.lg, marginBottom: '30%'}]}>
              <Text style={[fonts.lg, fontFamilyThin, fontFamilyItalic, {color: '#A5A5A5'}]}>If you’re Medical License
                is not connected with our database then
                please upload your certificate for verification. </Text>
            </View>


            <View style={[baseStyles.marginTopXl, {paddingHorizontal: padding.lg, alignSelf: 'flex-start'}]}>
              <Text style={{fontSize: fonts.md, color: '#A5A5A5'}}>Not listed? Upload certification </Text>
            </View>
            <AppButton
              title="Upload certificate"
              icon={
                <Icon
                  name="plus"
                  size={15}
                  color='#0A7FC1'
                />}
              onPress={() => Actions.pop()}/>
            <AppAccentButton title="Save" onPress={() => Actions.mediApp()}/>

          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
    container: {
      flex: 1,
      height: dimensions.fullHeight,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.secondary
    },
    bgGrayWrapper: {
      backgroundColor: colors.bgGrey,
      paddingHorizontal: padding.lg,
      paddingBottom: 9,
      paddingTop: 13
    },
    bgGrayWrapperText: {
      fontSize: fonts.xl,
      fontFamily: fonts.family,
      color: colors.headingColor
    },
    inputName: {
      flex: 1,
      padding: 10,
      fontSize: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    inputCell: {
      flex: 1,
      padding: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
  }
;
export default CertificateRegistration;
