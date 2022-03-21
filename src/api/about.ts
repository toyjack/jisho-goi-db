import { instance } from "./axios"

export async function getAboutContents() {
  const {data} = await instance.get('/page/about')
  return data
}