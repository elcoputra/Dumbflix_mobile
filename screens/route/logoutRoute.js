// Logut adalah rout untuk welcom screen user tidak login, terdapat navigator initial screen, login, register
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Register from '../registerScreen';
import Login from '../loginScreen';
import Initial from '../initialScreen';

function Logout(props) {
  return (
    <>
      {/* <Regiser /> */}
      {/* <Login /> */}
      {/* <Initial /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={noHeader} name="Welcome" component={Initial} />
          <Stack.Screen
            options={headerNoTitleMatchBodyColor}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={headerNoTitleMatchBodyColor}
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const headerNoTitleMatchBodyColor = {
  title: '',
  headerStyle: {
    backgroundColor: 'rgb(22, 22, 22)',
    elevation: 0,
  },
  headerTintColor: '#ee4622',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
const noHeader = {
  title: '',
  headerStyle: {
    height: 0,
    elevation: 0,
  },
  headerTintColor: '#ee4622',
};

// const mapStateToProps = state => {
//   return {};
// };

// export default connect(
//   mapStateToProps,
//   {},
// )(Logout);

export default Logout;
