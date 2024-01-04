"use client";

import { ManualBlocksArticle } from "@/tina/__generated__/types";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export function ManualArticle(props: ManualBlocksArticle) {
  return (
    <article className="prose max-w-none" data-tina-field={tinaField(props,"articleContent")}>
      <TinaMarkdown content={props.articleContent} />
    </article>
  )
}

export const manualArticle: Template ={
  name:"article",
  label:"文章",
  fields:[
    {
      type:"rich-text",
      name:"articleContent",
      label:"内容"
    }
  ]
}