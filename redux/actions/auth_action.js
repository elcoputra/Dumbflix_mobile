import {
  AUTH_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCSESS,
  LOGOUT_USER,
} from '../actionTypes';
import {API, setAuthToken} from '../../config/axiosConfig';
import {openModalLogin} from '../actions/modal_actions';
import {clearUserData} from '../actions/account_action';
import AsyncStorage from '@react-native-community/async-storage';

export const authAction = (input) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token di action auth', token);
      setAuthToken(token);
      dispatch({
        type: AUTH_REQUEST,
        payload: true,
      });
      if (token) {
        const response = await API.get('/auth');
        dispatch({
          type: AUTH_SUCCSESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: AUTH_SUCCSESS,
          payload: false,
        });
        dispatch(openModalLogin());
        console.log('gagal login');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response,
      });
    }
  };
};

export function logoutUser() {
  return function (dispatch) {
    dispatch({type: LOGOUT_USER});
    dispatch(clearUserData());
  };
}
