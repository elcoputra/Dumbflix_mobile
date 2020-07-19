import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {DrawerActions} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

function Navbar(props) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.buttonMenu}>
        <AntDesign name="menu-fold" color="white" size={25} />
      </TouchableOpacity>
      <View style={styles.screeTitleContainer}>
        <Text style={styles.screenTitle}>{props.titleScreen}</Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => props.navigation.navigate('Search')}>
          <AntDesign name="search1" color="white" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#161616',
    height: 45,
  },
  screenTitle: {
    color: 'white',
    fontSize: 25,
  },
  buttonMenu: {flex: 0.2},
  titlePage: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  screeTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  },
  searchContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnSearch: {width: '100%', alignItems: 'flex-end'},
});

export default Navbar;
