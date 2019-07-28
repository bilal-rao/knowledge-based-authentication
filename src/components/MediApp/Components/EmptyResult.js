import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";

const EmptyResult = ({title, content}) => {
  return (
    <View style={styles.emptyContainer}>
      {title ?
        <Text style={{fontSize: 28, marginBottom: 25, color: '#9B9B9B', textAlign: 'center'}}>{title}</Text>
        : null
      }

      <Text style={{fontSize: 18, color: '#9B9B9B', textAlign: 'center'}}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5ECED',
  }
});

export default EmptyResult;
