import { defineStore } from 'pinia'
import { getAboutContents } from '../api/about'

interface IHelp {
  id: number
  creator: string
  title: string
  about_type: string
  lang: string
  content: string
}

export const useAbout = defineStore('about', {
  state: () => {
    return {
      isFetching: true,
      contents: <IHelp[]>[]
    }
  },
  getters: {
    // doubleCount: (state) => state.counter * 2,
    general_help: (state) => state.contents.filter(v => v['about_type'] == "general").sort((a, b) => Date.parse(b.helpUpdateDate) - Date.parse(a.helpUpdateDate)),
    creator_helps: (state) => state.contents.filter(v => v['about_type'] == "creator"),
    copyright_helps: (state) => state.contents.filter(v => v['about_type'] == "copyright"),
  },
  actions: {
    async fetchAbout() {
      this.isFetching = true
      this.contents = await getAboutContents()
      this.isFetching = false
    }

  }
})