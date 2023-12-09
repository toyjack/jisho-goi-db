import type { Collection } from "tinacms";

const Manual: Collection = {
  label: "データベース説明書",
  name: "manual",
  path: "markdown",
  format:"mdx",
  fields:[
    {
      type: "string",
      label: "タイトル",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    }
  ]
}

export default Manual;