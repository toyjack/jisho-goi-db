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
  format:"md",
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
      type:"object",
      list:true,
      name:"blocks",
      label:"Sections",
      templates:[
        pageTitle,
        manualDivider,
        manualArticle,
        manualLicense,
        manualAlert,
      ]
    }
  ]
}

export default Manual;