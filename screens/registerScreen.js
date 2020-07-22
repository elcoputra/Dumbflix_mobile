import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';

import {registerAction} from '../redux/actions/account_action';

function Register(props) {
  // hook, di dalem value usesate adalah data di dalam data register
  const [dataRegister, setdataRegister] = React.useState({
    gender: 'Male',
    isAdmin: false,
  });
  // extract value object dala data register
  const {email, password, fullName, gender, phone, address} = dataRegister;
  // data dalam objek state data register berubah
  const onChangeText = (text, name) => {
    setdataRegister({...dataRegister, [name]: text});
    console.log(dataRegister);
  };
  const submitRegister = () => {
    props.registerAction(dataRegister);
    setdataRegister({gender: 'Male', isAdmin: false});
  };
  const {error, errorBool} = props.userReducer;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {errorBool ? (
          <Text style={styles.error}>
            {error.data.error
              ? error.data.error
              : error.data.message
              ? error.data.message
              : null}
          </Text>
        ) : null}
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
              <TextInput
                onChangeText={(text) => {
                  onChangeText(text, 'fullName');
                }}
                value={fullName}
                style={styles.inputStyle}
                placeholderTextColor="#B9B9B9"
                placeholder="Full Name"
              />
              {/* <TextInput
                style={styles.inputStyle}
                placeholderTextColor="#B9B9B9"
                placeholder="Gender (nanti buat dropdown)"
              /> */}

              {/* <DropDownPicker
                items={[
                  {label: 'Male', value: 'Male'},
                  {label: 'Female', value: 'Female'},
                ]}
                containerStyle={styles.containerStyle}
                style={styles.dropDownAditionalStyle}
                dropDownStyle={styles.dropDownStyle}
                defaultValue={gender}
                showArrow={true}
                onChangeItem={text => {
                  onChangeText(text.value, 'gender');
                }}
              /> */}
              <View style={styles.containerDropdown}>
                <RNPickerSelect
                  placeholder={{}}
                  useNativeAndroidPickerStyle={false}
                  style={{...pickerSelectStyles}}
                  onValueChange={(text) => {
                    onChangeText(text, 'gender');
                  }}
                  Icon={() => {
                    return (
                      <Ionicons
                        name="ios-arrow-down"
                        color="#b9b9b9"
                        size={32}
                      />
                    );
                  }}
                  value={gender}
                  items={[
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'},
                  ]}
                />
              </View>
              <TextInput
                onChangeText={(text) => {
                  onChangeText(text, 'phone');
                }}
                value={phone}
                style={styles.inputStyle}
                placeholderTextColor="#B9B9B9"
                placeholder="Phone"
              />
              <TextInput
                onChangeText={(text) => {
                  onChangeText(text, 'address');
                }}
                value={address}
                style={styles.inputStyle}
                placeholderTextColor="#B9B9B9"
                placeholder="Address"
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.warperButton}>
            <TouchableOpacity
              onPress={submitRegister}
              style={styles.buttonRegister}>
              <Text style={styles.textButton}>Register</Text>
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
    flex: 1.5,
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
    height: 60,
    backgroundColor: '#4C4C4C',
    fontWeight: 'bold',
    borderRadius: 5,
    width: '100%',
    borderWidth: 2,
    borderColor: '#C5C5C5',
    marginTop: 10,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    marginTop: 10,
    height: 60,
    backgroundColor: '#4C4C4C',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    borderRadius: 5,
    color: '#B9B9B9',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginTop: 10,
    height: 60,
    backgroundColor: '#4C4C4C',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#C5C5C5',
    borderRadius: 5,
    color: '#B9B9B9',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 25,
    right: 15,
  },
});
const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};
export default connect(mapStateToProps, {registerAction})(Register);
