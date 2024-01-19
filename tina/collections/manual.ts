import type { Collection } from "tinacms";

const Manual: Collection = {
  label: "データベース説明書ページ",
  name: "manual",
  path: "contents/manuals",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const list = [
        'hzwm',
        'kwrs',
        'jiruisho',
        'racvyoxv',
        'bunmei',
        'gyokuhentaizen',
        'wakunnoshiori',
      ]
      if (list.includes(document._sys.filename)) {
        return `/${document._sys.filename}`
      } else {
        return undefined;
      }
    },
    allowedActions: {
      create: true,
      delete: true,
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "タイトル",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      name: "blocks",
      label: "Blocks",
      list: true,
      templates: [
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
          name: "Members",
          label: "メンバー",
          fields: [
            {
              type: "object",
              name: "members",
              label: "メンバー",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "name",
                  label: "名前",
                },
                {
                  type: "string",
                  name: "nameInEnglish",
                  label: "名前(ローマ字)",
                },
                {
                  type: "string",
                  name: "imageUrl",
                  label: "画像URL",
                },
                {
                  type: "string",
                  name: "linkUrl",
                  label: "リンクURL",
                },
              ]
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
              label: "内容",
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