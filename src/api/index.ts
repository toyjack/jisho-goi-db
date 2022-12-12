import { instance } from "./axios"

export async function getAboutContents() {
  const {data} = await instance.get('/page/about')
  return data
}

export async function getNews() {
  const {data} = await instance.get('/page/news')
  return data
}

export async function  searchJiruisho (query: string)  {
  const {data} = await instance.get('/jiruisho/search/'+ query)
  return data
}

export async function  searchRakuyoshu (query: string)  {
  const {data} = await instance.get('/rakuyoshu/search/'+ query)
  return data
}

export async function  searchZozoku (query: string)  {
  const {data} = await instance.get('/zozokutaizen/search/'+ query)
  return data
}
