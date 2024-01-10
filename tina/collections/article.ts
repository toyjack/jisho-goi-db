import { Collection } from "tinacms";

const ArticleCollection:Collection = {
  name: "article",
  label: "記事",
  path: "contents/articles",
  format: "md",
  ui: {
    allowedActions: {
      create: true,
      delete: false,
    },
  },
  fields:[
    {
      type:"string",
      name:"title",
      label:"タイトル",
    },
    {
      type:"rich-text",
      name:"body",
      isBody:true,
      label:"本文",
    }
  ]
}

export default ArticleCollection;