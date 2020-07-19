/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {logoutUser, authAction} from '../redux/actions/auth_action';
import {upgradeAction} from '../redux/actions/upgrade_action';

function Upgrade(props) {
  useEffect(() => {
    props.authAction();
  }, []);
  // hook, di dalem value usesate adalah data di dalam data register
  const [dataSubscribe, setDataSubscribe] = React.useState({});
  // extract value object dala data register
  const {bankAccount, attachment} = dataSubscribe;
  // data dalam objek state data register berubah
  const onChangeText = (text, name) => {
    setDataSubscribe({...dataSubscribe, [name]: text});
    console.log(dataSubscribe);
  };

  const handleSubmit = async () => {
    const {userState} = props.authReducer;
    setDataSubscribe({...dataSubscribe, userId: userState.id});
    await props.upgradeAction(dataSubscribe);
  };

  const logutAccount = async () => {
    AsyncStorage.removeItem('token');
    props.logoutUser();
    props.authAction();
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.containerImage}>
          <Image
            resizeMode="center"
            style={styles.imageHome}
            source={require('../img/dumbsound.png')}
          />
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.btnSearch} onPress={logutAccount}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Subscribe</Text>
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.text1}>
          Just one more step to enjoy all the films.
        </Text>
      </View>
      <View style={styles.containerInfo2}>
        <Text style={styles.dumbflix}>
          Dumbflix <Text style={styles.bank}>Bank account:</Text>
        </Text>
        <Text style={styles.bank}>0981312323</Text>
      </View>
      <View style={styles.inputContainer}>
        <ScrollView style={styles.scrolViewStyle}>
          <View style={styles.inputContainer2}>
            <TextInput
              onChangeText={(text) => {
                onChangeText(text, 'bankAccount');
              }}
              value={bankAccount}
              style={styles.inputStyle}
              placeholderTextColor="#B9B9B9"
              placeholder="Your bank account number"
            />
            <TextInput
              onChangeText={(text) => {
                onChangeText(text, 'attachment');
              }}
              value={attachment}
              style={styles.inputStyle}
              placeholderTextColor="#B9B9B9"
              placeholder="Insert image link of payment"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.warperButton}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonRegister}>
          <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  // Navbar
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    height: 45,
    paddingVertical: 10,
  },
  containerImage: {flex: 0.4},
  imageHome: {height: '100%', width: '100%'},
  searchContainer: {
    flex: 1,
  },
  btnSearch: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'right',
  },
  // Content
  containerTitle: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  textTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  dumbflix: {fontSize: 18, color: 'red', textAlign: 'center'},
  bank: {fontSize: 18, color: 'white', textAlign: 'center'},
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {textAlign: 'center', color: 'white', fontSize: 28},
  inputContainer: {
    flex: 4.1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  scrolViewStyle: {
    width: '100%',
    // backgroundColor: 'gray',
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
    marginTop: 25,
    paddingLeft: 10,
  },
  warperButton: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'purple',
    width: '100%',
    height: '100%',
  },
  buttonRegister: {
    width: '50%',
    height: 50,
    backgroundColor: '#DB202C',
    borderRadius: 10,
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const mapStateToProps = (state) => {
  return {authReducer: state.authReducer};
};
export default connect(mapStateToProps, {
  logoutUser,
  authAction,
  upgradeAction,
})(Upgrade);
