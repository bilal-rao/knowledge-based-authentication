import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppAutoComplete from "../../utility/AppAutoComplete";
import AppButton from "../../utility/AppButton";
import AppAccentButton from "../../utility/AppAccentButton";
import {countries} from "../../data";
import {colors, fonts, padding} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";


class GeneralInfo extends Component {
// place of work
  workCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          workText: data.title,
          worksData: [],
          selectedwork: works.filter(works =>
            works.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onWorkTextChange = (text) => {
    console.log("text", text)
    const worksData = works.filter(work =>
      work.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({workText: text, worksData: worksData});
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
// practice number
  practiceCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          practiceText: data.title,
          practiceNumberData: [],
          selectedpractice: practiceNumber.filter(practice =>
            practice.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };
  onPracticeChange = (text) => {
    console.log("text", text)
    const practiceNumberData = practiceNumber.filter(practice =>
      practice.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({practiceText: text, practiceNumberData: practiceNumberData});
  };
  // practice number
  positionCell = (data) => {
    return ( <TouchableHighlight onPress={() => {
        this.setState({
          positionText: data.title,
          positionsData: [],
          selectedPosition: practiceNumber.filter(practice =>
            practice.title.toLowerCase().startsWith(data.title.toLowerCase())
          )[0]
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  };

  //positions
  onPositionTextChange = (text) => {
    console.log("text", text)
    const positionsData = positions.filter(position =>
      position.title.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({positionText: text, positionsData: positionsData});
  };

  constructor(props) {
    super(props);
    this.state = {
      workText: '',
      selectedWork: null,
      worksData: [],
      countryText: '',
      selectedCountry: null,
      countriesData: [],
      practiceText: '',
      selectedPractice: null,
      practiceNumberData: [],
      positionText: '',
      selectedPosition: null,
      positionsData: [],

    };
  }

  render() {
    const {worksData, workText, countriesData, countryText, practiceNumberData, practiceText, positionsData, positionText} = this.state;
    return (
      <ScrollView style={styles.container}>
        <AppHeader
          title="SETUP PROFILE"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <View style={styles.bgGrayWrapper}>
          <Text style={styles.bgGrayWrapperText}>Certificate and Registraion</Text>
        </View>
        <View style={{padding: padding.lg}}>
          <AppAutoComplete
            renderItem={this.workCell}
            data={worksData}
            defaultValue={workText}
            onChangeText={this.onWorkTextChange}
            placeholder="PLACE OF WORK "
          />
          <AppAutoComplete
            renderItem={this.countryCell}
            data={countriesData}
            defaultValue={countryText}
            onChangeText={this.onCountryTextChange}
            placeholder="COUNTRY"/>
          <AppAutoComplete
            renderItem={this.practiceCell}
            data={practiceNumberData}
            defaultValue={practiceText}
            onChangeText={this.onPracticeChange}
            placeholder="PRACTICE NUMBER"
          />
          <AppAutoComplete
            renderItem={this.positionCell}
            data={positionsData}
            defaultValue={positionText}
            onChangeText={this.onPositionTextChange}
            placeholder="POSITIONS"
          />
          <AppButton
            title="Add Qualification"
            icon={<Icon
              name="plus"
              size={15}
              color='#0A7FC1'
            />}
            onPress={() => Actions.pop()}/>
          <View style={{paddingVertical: padding.lg}}>
            <AppAccentButton title="Save" onPress={() => Actions.pop()}/>
          </View>
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
export default GeneralInfo;
