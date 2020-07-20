import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import Navbar from '../components/navbar';

import {connect} from 'react-redux';

function VideoPlayer(props) {
  return (
    <View style={styles.container}>
      <Navbar navigation={props.navigation} titleScreen="Movies" />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
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

export default connect(mapStateToProps, {})(VideoPlayer);
