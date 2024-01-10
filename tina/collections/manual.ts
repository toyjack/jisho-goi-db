import type { Collection } from "tinacms";

const Manual: Collection = {
  label: "データベース説明書ページ",
  name: "manual",
  path: "contents/manuals",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "hzwm") {
        return `/hzwm`
      }

      return undefined;
    },
    allowedActions: {
      create: true,
      delete: true,
    },
  },
  fields: [
    {
      type:"string",
      name:"title",
      label:"タイトル",
      isTitle:true,
      required:true,
    },
    {
      type: "object",
      name: "blocks",
      label: "Blocks",
      list: true,
      templates: [
        {
          name: "SiteDescriptionBlock",
          label: "本サイトについて(「記事」の中の内容によって)",
          fields: [
            {
              type: "string",
              name: "title",
              label: "タイトル",
            }
          ]
        },
        {
          name: "Divider",
          label: "区切り（水平線）",
          fields: [
            {
              type: "string",
              name: "dividerText",
              label: "文字列"
            }
          ]
        },
        {
          name: "ManualBlock",
          label: "説明書文章",
          fields: [
            {
              type: "string",
              name: "title",
              label: "タイトル",
              description: "",
            },
            {
              type: "rich-text",
              name: "body",
              label: "Body",
              templates: [
                {
                  name: "ManualDivider",
                  label: "区切り（水平線）",
                  fields: [
                    {
                      type: "string",
                      name: "dividerText",
                      label: "文字列"
                    }
                  ]
                },
                {
                  name: "CcLicense",
                  label: "CCライセンス",
                  fields: [
                    {
                      type: "string",
                      name: "title",
                      label: "タイトル（記入不用）",
                    }
                  ]
                },
                {
                  name: "ManualAlert",
                  label: "警告",
                  fields: [
                    {
                      type: "string",
                      name: "content",
                      label: "内容",
                    },
                  ],
                },
              ]
            }
          ]
        },

      ]
    }
  ]
}

export default Manual;