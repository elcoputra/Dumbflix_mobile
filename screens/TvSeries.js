import React from 'react';
import {StyleSheet, View} from 'react-native';

import Navbar from '../components/navbar';

import {connect} from 'react-redux';

function tvSeries(props) {
  return (
    <View style={styles.container}>
      <Navbar navigation={props.navigation} titleScreen="Tv Series" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(tvSeries);
