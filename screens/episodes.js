import React from 'react';
import {StyleSheet, View} from 'react-native';

import {connect} from 'react-redux';

function Episodes(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Episodes);
