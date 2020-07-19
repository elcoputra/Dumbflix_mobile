/* eslint-disable react-hooks/exhaustive-deps */
// Data music yang sedang di play saya kirim lewat props ke music player props, biar simple,
// music player track tidak usah pake redux, callbacknya sudah mewakili data object music yang sedang di mainkan
import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ScrollView,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

function Home({navigation}) {
  useEffect(() => {}, []);

  const openSideMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.btnMenu} onPress={openSideMenu}>
            <AntDesign name="menu-fold" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <Image
          resizeMode={'contain'}
          style={styles.imageHome}
          source={require('../img/dumbsound.png')}
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.btnSearch}
            onPress={() => navigation.navigate('Search')}>
            <AntDesign name="search1" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#161616',
    height: 45,
  },
  menuContainer: {flex: 0.3},
  btnMenu: {width: '100%'},
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageHome: {flex: 1, height: '100%'},

  searchContainer: {
    flex: 0.3,
  },
  btnSearch: {
    width: '100%',
    alignItems: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Home);
