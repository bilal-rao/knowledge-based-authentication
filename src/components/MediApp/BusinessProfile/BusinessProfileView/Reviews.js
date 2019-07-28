import React, {Component} from 'react';
import {baseStyles, colors, fonts, margin} from "../../../../styles/base";
import Stars from 'react-native-stars';
import {Text, View} from "react-native-animatable";


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {rating: props.businessPage.rating};
  }

  ratingCompleted = (value) => {
    this.setState({rating: value});
    this.props.rateBusinessPage({id: this.props.businessPage.id, rating: value})
  };

  render() {
    const {businessPage} = this.props;
    const {rating} = this.state;

    return (
      <View style={[styles.mainContainer]}>
        {businessPage.isAdmin === 0 ?
          <View style={{padding: 10}}>

            <Text style={{paddingBottom: 10}}>Tell others what you think.</Text>
            <View style={baseStyles.row}>
              <Text style={[styles.ratingText, {paddingRight: 10}]}>Rate this page</Text>
              <Stars
                starSize={26}
                spacing={4}
                emptyStar={require('../../../../assests/business/ratining.png')}
                fullStar={require('../../../../assests/Job/star_fill.png')}
                default={rating}
                update={(value) => this.ratingCompleted(value)}
              />
            </View>
          </View> :
          <View style={{padding: 10}}>
            <Text style={styles.ratingText}>Ratings</Text>
            <Stars
              disabled
              spacing={4}
              starSize={26}
              emptyStar={require('../../../../assests/business/ratining.png')}
              fullStar={require('../../../../assests/Job/star_fill.png')}
              value={businessPage.avgRating}
            />
            <Text style={styles.ratingText}>{businessPage.avgRating}</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginTop: margin.md,
    marginBottom: margin.lg,
    marginHorizontal: 12,
  },
  container: {
    flex: 1
  },
  ratingText: {
    color: colors.primaryText,
    textAlign: 'center',
    fontSize: fonts.lg,
    marginBottom: 8,
    paddingBottom: 10,
  }
};
export default Reviews
