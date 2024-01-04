"use client";

import { ManualQuery, ManualQueryVariables } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { TinaPageTitle } from "./title";
import { ManaualDivider } from "./divider";
import { ManualArticle } from "./article";
import { MnaualLicense } from "./license";
import ManualAlert from "./alert";

export default function Blocks(props:{
  data: ManualQuery,
  variables: ManualQueryVariables,
  query:string
}) {
  const {data} = useTina({
    ...props
  })

  return (
    <div>
      { data.manual.blocks?.map((block,index)=>{
        switch(block?.__typename){
          case "ManualBlocksTitleBlock":{
            return (
              <TinaPageTitle key={index} {...block} />
            )
          }

          case "ManualBlocksDivider":{
            return (
              <ManaualDivider key={index} />
            )
          }

          case "ManualBlocksArticle":{
            return (
              <ManualArticle key={index} {...block} />
            )
          }

          case "ManualBlocksLicense":{
            return <MnaualLicense key={index} {...block} />
          }

          case "ManualBlocksAlert":{
            return <ManualAlert key={index} {...block} />
          }
         }
      })}
    </div>
  )
}
