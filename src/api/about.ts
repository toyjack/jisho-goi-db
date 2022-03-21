import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 1000,
  headers: { 
    // 'Content-Type':'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
   }
});

export async function getAboutContents() {
  const {data} = await instance.get('/page/about')
  return data
}