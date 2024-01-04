"use client";

import { ManualBlocksLicense } from "@/tina/__generated__/types";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function MnaualLicense(props: ManualBlocksLicense) {
  return (
    <article
      className="prose max-w-none"
      data-tina-field={tinaField(props, "licenseContent")}
    >
      <TinaMarkdown content={props.licenseContent} />
    </article>
  );
}

export const manualLicense: Template = {
  name: "license",
  label: "ライセンス",
  ui: {
    defaultItem: () => {
      return {
        licenseContent: {
          type: "root",
          children: [
            {
              type: "h2",
              children: [
                {
                  type: "text",
                  text: "利用条件",
                },
              ],
            },

            {
              type: "p",
              children: [
                {
                  type: "text",
                  text: "クリエイティブ・コモンズ・ライセンスの",
                },
                {
                  type: "a",
                  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja",
                  target: "_blank",
                  children: [
                    {
                      text: "表示 - 非営利 - 継承 4.0 国際（CC BY-NC-SA 4.0）",
                    },
                  ],
                },
                {
                  text: "相当の条件で提供しています。",
                },
              ],
            },
          ],
        },
      };
    },
  },
  fields: [
    {
      type: "rich-text",
      name: "licenseContent",
      label: "内容",
    },
  ],
};
