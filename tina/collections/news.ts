import { Collection } from "tinacms";

const NewsCollection:Collection = {
  name: "news",
  label: "お知らせ",
  path: "contents/news",
  format: "md",
  ui: {
    allowedActions: {
      create: true,
      delete: true,
    },
  },
  fields:[
    {
      type:"string",
      name:"title",
      label:"タイトル",
      isTitle:true,
      required:true,
    },
    {
      type:"rich-text",
      name:"body",
      label:"本文",
      isBody:true,
    },
    {
      type:"datetime",
      name:"date",
      label:"日付",
    },
    {
      type:"image",
      name:"image",
      label:"画像",
    },
  ]
}

export default NewsCollection;