import axios from 'axios';
import {API_URL} from '@env';

// Set config defaults when creating the instance
export const API = axios.create({
  baseURL: API_URL,
});

// Alter defaults after instance has been created
export const setAuthToken = (token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
