import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import AppAutoComplete from "../../utility/AppAutoComplete";
import {countries, qualifications, universities} from "../../data";
import AppAccentButton from "../../utility/AppAccentButton";
import AppHeader from "../../utility/AppHeader";
import {colors, fonts, padding} from "../../../styles/base";


class StudentIntern extends Component {

// university
  universitiesCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          universityText: data.title,
          universitiesData: [],
          selectedUniversity: universities.filter(universities =>
            universities.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.universityCell}>
          <Text style={styles.universityName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onUniversitiesTextChange = (text) => {
    console.log("text", text);
    const universitiesData = universities.filter(university =>
      university.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({universityText: text, universitiesData: universitiesData});
  };
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
// qualifications
  qualificationsCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          qualifyText: data.title,
          qualificationsData: [],
          selectedQualify: qualifications.filter(qualify =>
            qualify.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.qualifyCell}>
          <Text style={styles.qualifyName}>{data.title}</Text>
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
    };
  }

  render() {
    const {universitiesData, universityText, countriesData, countryText, qualificationsData, qualifyText} = this.state;
    return (
      <ScrollView style={styles.container}>
        <AppHeader
          title="SETUP PROFILE"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <View style={styles.bgGrayWrapper}>
          <Text style={styles.bgGrayWrapperText}>STUDENT INTERN/INFO</Text>
        </View>
        <View style={{padding: 20, flex: 1}}>
          <AppAutoComplete
            renderItem={this.universitiesCell}
            data={universitiesData}
            defaultValue={universityText}
            onChangeText={this.onUniversitiesTextChange}
            placeholder="UNIVERSITY"
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
        </View>
        <View style={{padding: padding.xl, marginTop: 'auto'}}>
          <AppAccentButton title="Save" onPress={() => Actions.mediApp()}/>
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
      paddingVertical: padding.lg,
      paddingHorizontal: padding.lg,
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
export default StudentIntern;
