import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {connect} from 'react-redux';

function Upgrade() {
  return (
    <View style={styles.container}>
      <Text>Upgrade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
});

export default Upgrade;
