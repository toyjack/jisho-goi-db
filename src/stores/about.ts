import { defineStore } from 'pinia'

export const useAbout = defineStore('about', {
  state: () => {
    return {
      contents: [
        {
          helpType: "general",
          helpTitle: "header and footer",
          helpContent: "lorem",
          helpUpdateDate: "2022/03/19"
        },
        {
          helpType: "general",
          helpTitle: "header and footer",
          helpContent: "lorem",
          helpUpdateDate: "2022-03-21"
        },
        {
          helpType: "general",
          helpTitle: "header and footer",
          helpContent: "lorem",
          helpUpdateDate: "2022-03-20"
        },
        {
          helpType: "creator",
          helpTitle: "作業者一覧",
          helpContent: "lorem",
          helpUpdateDate: "2022-03-21"
        },
        {
          helpType: "copyright",
          helpTitle: "利用条件",
          helpContent: "lorem",
          helpUpdateDate: "2022-03-21"
        },
      ]
    }
  }
})