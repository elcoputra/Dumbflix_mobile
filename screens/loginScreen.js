import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';

import {connect} from 'react-redux';

import {loginAction} from '../redux/actions/account_action';

function Login(props) {
  // hook, di dalem value usesate adalah data di dalam data register
  const [dataRegister, setdataRegister] = React.useState({});
  // extract value object dala data register
  const {email, password} = dataRegister;
  // data dalam objek state data register berubah
  const onChangeText = (text, name) => {
    setdataRegister({...dataRegister, [name]: text});
  };
  const submitLogin = () => {
    props.loginAction(dataRegister);
    setdataRegister({});
  };
  const {error, errorBool} = props.userReducer;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.imageLogo}
            source={require('../img/dumbsound.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrolViewStyle}>
            <View style={styles.inputContainer2}>
              {errorBool ? (
                <Text style={styles.error}>
                  {error.data.error
                    ? error.data.error
                    : error.data.message
                    ? error.data.message
                    : null}
                </Text>
              ) : null}
              <TextInput
                onChangeText={(text) => {
                  onChangeText(text, 'email');
                }}
                value={email}
                style={styles.inputStyle}
                placeholderTextColor="#B9B9B9"
                placeholder="Email"
              />
              <TextInput
                onChangeText={(text) => {
                  onChangeText(text, 'password');
                }}
                value={password}
                secureTextEntry={true}
                style={styles.inputStyle}
                placeholderTextColor="#B9B9B9"
                placeholder="Password"
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.warperButton}>
            <TouchableOpacity
              onPress={submitLogin}
              style={styles.buttonRegister}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.warperTextBottom}>
            <View style={styles.buttomDetailTextContainer}>
              <View>
                <Text style={styles.textBottom1}>
                  Already have an account ? Click{' '}
                </Text>
              </View>
              <View>
                <Text style={styles.textBottom2}>Here</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
  },
  error: {color: 'red'},
  message: {color: 'green'},
  scrolViewStyle: {
    width: '100%',
    // backgroundColor: 'gray',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'green',
    width: '85%',
  },
  logoContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  imageLogo: {
    maxWidth: '50%',
  },
  inputContainer: {
    flex: 4.1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  inputContainer2: {
    width: '100%',
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  inputStyle: {
    color: 'white',
    height: 70,
    backgroundColor: '#4C4C4C',
    fontWeight: 'bold',
    borderRadius: 5,
    width: '100%',
    borderWidth: 2,
    borderColor: '#C5C5C5',
    marginTop: 50,
    paddingLeft: 10,
  },
  containerDropdown: {
    width: '100%',
  },
  bottomContainer: {
    flex: 1.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
  },
  warperButton: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'purple',
    width: '100%',
    height: '100%',
  },
  buttonRegister: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#DB202C',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warperTextBottom: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#B1B1B1',
    // backgroundColor: 'green',
  },
  textBottom1: {
    color: '#b1b1b1',
    fontSize: 18,
  },
  textBottom2: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttomDetailTextContainer: {
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, {loginAction})(Login);
