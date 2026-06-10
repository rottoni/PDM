import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:3000'  // iOS simulator e navegador
  : 'http://10.0.2.2:3000';  // emulador Android


export const cliente = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});