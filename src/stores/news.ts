import { defineStore } from 'pinia'
import { getNews } from '../api/news'

interface INews {
  id: number
  pub_date: string
  title: string
  content: string
}

export const useNews = defineStore('news', {
  state: () => {
    return {
      isFetching: true,
      news: <INews[]>[]
    }
  },
  actions: {
    async fetchNews() {
      this.isFetching = true
      this.news = await getNews()
      this.isFetching = false
    }

  }
})