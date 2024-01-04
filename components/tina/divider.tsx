"use client";

import { ManualBlocksDivider } from "@/tina/__generated__/types";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

export function ManaualDivider(props: ManualBlocksDivider) {
  return (
    <div className="divider" tina-data-field={tinaField(props, "title")}>
      {props.title}
    </div>
  );
}

export const manualDivider: Template = {
  name: "divider",
  label: "区切り（水平線）",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
  ],
};
