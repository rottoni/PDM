import axios from 'axios';

// IMPORTANTE sobre a URL base:
// - No navegador (expo web) e no iOS Simulator, 'http://localhost:3000' funciona.
// - No emulador Android, use 'http://10.0.2.2:3000'.
// - Em um celular físico, troque por 'http://SEU_IP_LOCAL:3000'
//   (ex.: http://192.168.0.10:3000) com o celular na mesma rede Wi-Fi.

export const cliente = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});