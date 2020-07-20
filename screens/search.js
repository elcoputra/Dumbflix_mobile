import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import {connect} from 'react-redux';

import Navbar from '../components/navbar';

function Search(props) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#161616"
        translucent={false}
      />
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
});

export default Search;
