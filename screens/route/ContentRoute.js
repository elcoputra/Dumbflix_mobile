// Content adalah routing content utama aplikasi
import React from 'react';

import {StyleSheet, Dimensions} from 'react-native';

import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {createStackNavigator} from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../home';
import Profile from '../profile';
import Movies from '../movies';
import TvSeries from '../TvSeries';
import Search from '../search';
import Upgrade from '../upgrade';
import Episodes from '../episodes';

const Drawer = createDrawerNavigator();

const width = Dimensions.get('screen').width;

const UpgradeStack = createStackNavigator();
function Content(props) {
  const {userState} = props.authReducer;
  const subscribe = userState.subscribe;
  return (
    <>
      <NavigationContainer>
        {subscribe ? (
          <Drawer.Navigator
            drawerStyle={styles.drawerStyle}
            drawerContentOptions={drawerContentOptions}>
            <Drawer.Screen
              name="Home"
              component={HomeRoute}
              options={{
                drawerIcon: ({color, size}) => (
                  <AntDesign name="home" color={color} size={size} />
                ),
              }}
            />
            <Drawer.Screen
              name="Movies"
              component={MoviesRoute}
              options={{
                drawerIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="movie-open"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Tv Series"
              component={TVRoute}
              options={{
                drawerIcon: ({color, size}) => (
                  <Feather name="tv" color={color} size={size} />
                ),
              }}
            />

            {/* Upgrade page pindahin di sesudah register */}
            {/* <Drawer.Screen
            name="Upgrade"
            component={Upgrade}
            options={{
              drawerIcon: ({color, size}) => (
                <SimpleLineIcons name="cup" color={color} size={size} />
              ),
            }}
          /> */}

            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                drawerIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="face-profile"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        ) : (
          <UpgradeStack.Navigator>
            <UpgradeStack.Screen
              options={{headerShown: false}}
              name="Upgrade"
              component={Upgrade}
            />
          </UpgradeStack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

// Home Route Stack\
const HomeStack = createStackNavigator();
function HomeRoute() {
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <HomeStack.Screen
          options={headerNoTitleMatchBodyColor}
          name="Search"
          component={Search}
        />
        <HomeStack.Screen
          options={{headerShown: false}}
          name="Episodes"
          component={Episodes}
        />
      </HomeStack.Navigator>
    </>
  );
}
// Movies Route Stack
const MoviesStack = createStackNavigator();
function MoviesRoute() {
  return (
    <>
      <MoviesStack.Navigator>
        <MoviesStack.Screen
          options={{headerShown: false}}
          name="Movies"
          component={Movies}
        />
        <MoviesStack.Screen
          options={headerNoTitleMatchBodyColor}
          name="Search"
          component={Search}
        />
      </MoviesStack.Navigator>
    </>
  );
}
// TV Series Route Stack
const TVStack = createStackNavigator();
function TVRoute() {
  return (
    <>
      <TVStack.Navigator>
        <TVStack.Screen
          options={{headerShown: false}}
          name="Tv Series"
          component={TvSeries}
        />
        <TVStack.Screen
          options={headerNoTitleMatchBodyColor}
          name="Search"
          component={Search}
        />
      </TVStack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {width: 'auto', margin: 0},
});
const drawerContentOptions = {
  labelStyle: {
    fontSize: 16,
  },
  style: {
    backgroundColor: '#161616',
    borderTopWidth: 0,
  },
  inactiveTintColor: 'white',
  activeTintColor: 'red',
  showIcon: true,
};

const headerNoTitleMatchBodyColor = {
  title: '',
  headerStyle: {
    backgroundColor: 'rgb(22, 22, 22)',
    height: 40,
    elevation: 0,
  },
  headerTintColor: '#ee4622',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps, {})(Content);
