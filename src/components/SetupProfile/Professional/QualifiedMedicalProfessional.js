import React, {Component} from 'react';
import {CheckBox,} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import AppAutoComplete from "../../utility/AppAutoComplete";
import AppButton from "../../utility/AppButton";
import {countries, universities} from "../../data";
import {baseStyles, colors, fontFamilyThin, fonts, padding} from "../../../styles/base";
import AppAccentButton from "../../utility/AppAccentButton";
import AppHeader from "../../utility/AppHeader";
import AppTextInput from "../../utility/AppTextInput";


class QualifiedMedicalProfessional extends Component {

// university
  universitiesCell = (data) => {
    return (<TouchableHighlight onPress={() => {
        this.setState({
          universityText: data.title,
          universitiesData: [],
          selectedUniversity: universities.filter(universities =>
            universities.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onUniversitiesTextChange = (text) => {
    console.log("text", text)
    const universitiesData = universities.filter(university =>
      university.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({universityText: text, universitiesData: universitiesData});
  };
  // country
  countryCell = (data) => {
    return (<TouchableHighlight onPress={() => {
        this.setState({
          countryText: data.name,
          countriesData: [],
          selectedCountry: countries.filter(country =>
            country.name.toLowerCase().startsWith(data.name.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Image
            style={styles.image}
            source={{
              uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${data.countryCode.toLocaleLowerCase()}.png`,

            }}
          />
          <Text style={styles.inputName}>{data.name}</Text>
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
// qualifications
  qualificationsCell = (data) => {
    return (<TouchableHighlight onPress={() => {
        this.setState({
          qualifyText: data.title,
          qualificationsData: [],
          selectedQualify: qualifications.filter(qualify =>
            qualify.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onQualificationsTextChange = (text) => {
    console.log("text", text)
    const qualificationsData = qualifications.filter(qualify =>
      qualify.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({qualifyText: text, qualificationsData: qualificationsData});
  };
  // field of interest
  fieldIntrstCell = (data) => {
    return (<TouchableHighlight onPress={() => {
        this.setState({
          fieldText: data.title,
          fieldIntrstData: [],
          selectedField: fieldIntrst.filter(field =>
            field.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onfieldIntrstTextChange = (text) => {
    console.log("text", text)
    const fieldIntrstData = fieldIntrst.filter(field =>
      field.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({qualifyText: text, fieldIntrstData: fieldIntrstData});
  };

  constructor(props) {
    super(props);
    this.state = {
      universityText: '',
      selectedUniversity: null,
      universitiesData: [],
      countryText: '',
      selectedCountry: null,
      countriesData: [],
      qualifyText: '',
      qualifyCountry: null,
      qualificationsData: [],
      QualificationCheck: false,
      fieldText: '',
      selectedfield: null,
      fieldIntrstData: [],
      position: ''
    };
  }

  render() {
    const {universitiesData, universityText, countriesData, countryText, qualificationsData, qualifyText, fieldIntrstData, fieldText, position} = this.state;
    return (
      <ScrollView style={styles.container}>
        <AppHeader
          title="SETUP PROFILE"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <View style={styles.bgGrayWrapper}>
          <Text style={styles.bgGrayWrapperText}>Qualifications</Text>
        </View>
        <View style={{marginTop: -8, justifyContent: 'center', alignItems: 'center'}}>
          <AppAutoComplete
            renderItem={this.universitiesCell}
            data={universitiesData}
            defaultValue={universityText}
            onChangeText={this.onUniversitiesTextChange}
            placeholder="SPECIALITY"
          />
          <AppAutoComplete
            renderItem={this.qualificationsCell}
            data={qualificationsData}
            defaultValue={qualifyText}
            onChangeText={this.onQualificationsTextChange}
            placeholder="QUALIFICATION"
          />
          <AppAutoComplete
            renderItem={this.countryCell}
            data={countriesData}
            defaultValue={countryText}
            onChangeText={this.onCountryTextChange}
            placeholder="COUNTRY"/>

          <CheckBox
            iconRight
            title='Make this my deafult Highest Qualification '
            textStyle={{fontSize: fonts.lg, fontFamilyThin, width: '88%'}}
            containerStyle={{backgroundColor: null, borderWidth: 0, alignSelf: 'flex-start'}}
            checkedIcon={<Image source={require('../../../assests/signUpAssets/checked_radio.png')}/>}
            uncheckedIcon={<Image source={require('../../../assests/signUpAssets/unchaked_radio.png')}/>}
            checked={this.state.QualificationCheck}
            onPress={() => this.setState({QualificationCheck: !this.state.QualificationCheck})}
          />
          <AppButton
            title="Add Qualification"
            icon={<Icon name="plus" size={15} color='#0A7FC1'/>}
            containerStyle={baseStyles.marginBottomLg}
            onPress={() => Actions.pop()}
          />
        </View>
        <View style={styles.bgGrayWrapper}>
          <Text style={styles.bgGrayWrapperText}>Field of Interest</Text>
        </View>
        <View style={{
          marginTop: -8,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 15
        }}>
          <AppAutoComplete
            renderItem={this.fieldIntrstCell}
            data={fieldIntrstData}
            defaultValue={fieldText}
            onChangeText={this.onfieldIntrstTextChange}
            placeholder="Field of interst"
          />
        </View>
        <View style={styles.bgGrayWrapper}>
          <Text style={styles.bgGrayWrapperText}>Current place of work</Text>
        </View>
        <View style={{marginTop: -8, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
          <AppAutoComplete
            renderItem={this.countryCell}
            data={countriesData}
            defaultValue={countryText}
            onChangeText={this.onCountryTextChange}
            placeholder="Current place of work"
          />
          <AppTextInput
            returnKeyType="next"
            value={position}
            onChangeText={(position) => this.setState({position})}
            placeholder="Position"
          />
          <AppAutoComplete
            renderItem={this.countryCell}
            data={countriesData}
            defaultValue={countryText}
            onChangeText={this.onCountryTextChange}
            placeholder="country"
          />
        </View>
        <View style={{paddingBottom: 25}}>
          <AppAccentButton title="Save" onPress={() => Actions.certificateRegistration()}/>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.secondary
    },
    bgGrayWrapper: {
      backgroundColor: colors.bgGrey,
      paddingBottom: 9,
      paddingTop: 13,
      paddingHorizontal: padding.lg
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
export default QualifiedMedicalProfessional;
