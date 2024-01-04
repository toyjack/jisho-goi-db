"use client";

import { ManualBlocksTitleBlock } from '@/tina/__generated__/types'
import { Template } from 'tinacms'
import { tinaField } from 'tinacms/dist/react';

export function TinaPageTitle(props: ManualBlocksTitleBlock) {

  
  return (
    <div className={`text-${props.fontSize}`} data-tina-field={tinaField(props,"title")}>{props.title}</div>
  )
}

export const pageTitle: Template={
  name:"titleBlock",
  label:"タイトルのセクション",
  // ui:{
  //   defaultItem:{
  //     title:"タイトルの内容",
  //     fontSize:"xl"
  //   }
  // },
  fields:[
    {
      type:"string",
      name:"title"
    },
    {
      type:"string",
      name:"fontSize",
      options:[
        {
          value:"xs",
          label:"XS",
        },
        {
          value:"sm",
          label:"SM",
        },
        {
          value:"base",
          label:"BASE",
        },
        {
          value:"lg",
          label:"LG",
        },
        {
          value:"xl",
          label:"XL",
        },
        {
          value:"2xl",
          label:"2XL",
        },
        {
          value:"3xl",
          label:"3XL",
        },
        {
          value:"4xl",
          label:"4XL",
        },
        {
          value:"5xl",
          label:"5XL",
        },
        {
          value:"6xl",
          label:"6XL",
        },
        {
          value:"7xl",
          label:"7XL",
        },
        {
          value:"8xl",
          label:"8XL",
        },
        {
          value:"9xl",
          label:"9XL",
        },
      ]
    }
  ]
}
