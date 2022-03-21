import { instance } from "./axios"

export async function getNews() {
  const {data} = await instance.get('/page/news')
  return data
}