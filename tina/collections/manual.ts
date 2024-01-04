import { manualLicense } from "../../components/tina/license";
import { manualArticle } from "../../components/tina/article";
import { manualDivider } from "../../components/tina/divider";
import { pageTitle } from "../../components/tina/title";
import type { Collection } from "tinacms";
import { manualAlert } from "../../components/tina/alert";

const Manual: Collection = {
  label: "データベース説明書ページ",
  name: "manual",
  path: "contents/",
  format:"mdx",
  ui:{
    router:({document})=>{
      if(document._sys.filename==="hzwm"){
        return `/hzwm`
      } 

      return undefined;
    }
  },
  fields:[
    {
      type: "string",
      name: "title",
      label: "Title",
      description: "",
      isTitle: true,
      required: true,
    },
    {
      type:"rich-text",
      name:"body",
      label:"Body",
      isBody:true,
      templates:[
        {
          name:"ManualDivider",
          label:"区切り（水平線）",
          fields:[
            {
              type:"string",
              name:"dividerText",
              label:"Divider's Text"
            }
          ]
        },
        {
          name:"CcLicense",
          label:"CCライセンス",
          fields:[
            {
              type:"string",
              name:"title",
              label:"license name"
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
        {
          name: "ManualSiteStory",
          label: "本サイトについて",
          fields: [
            {
              type: "string",
              name: "title",
            },
          ],
        },
      ]
    }
  ]
}

export default Manual;