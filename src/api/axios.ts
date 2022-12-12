import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://portal.kojisho.com/api/v1',
  // baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 1000,
  headers: { 
    'Content-Type':'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
   }
});