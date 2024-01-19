"use client";

import {
  ManualQuery,
  ManualQueryVariables,
} from "@/tina/__generated__/types";
import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import SiteStory from "./site-story";

export default function TinaManualComponent(props: {
  data: ManualQuery;
  variables: ManualQueryVariables;
  query: string;
}) {
  const { data } = useTina({
    ...props,
  });

  return (
    <div>
      {data.manual.blocks?.map((block, index) => {
        if (!block) return null;

        switch (block.__typename) {
          case "ManualBlocksManualBlock":
            return (
              <div
                key={index}
                className="prose max-w-none"
                data-tina-field={tinaField(block, "body")}
              >
                <TinaMarkdown content={block.body} components={components} />
              </div>
            );

          case "ManualBlocksManualAlert":
            return (
              <div className="alert alert-warning shadow-lg">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span data-tina-field={tinaField(block,"content")}>{block.content}</span>
                </div>
              </div>
            );

          case "ManualBlocksSiteDescriptionBlock":
            return (
              <SiteStory key={index} />
            );

          case "ManualBlocksDivider":
            return <div className="divider"></div>;

          case "ManualBlocksMembers":
            return (
              <div
                key={index}
                className="from-primary to-secondary text-primary-content bg-gradient-to-br"
              >
                <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {block.members?.map((member, index2) => (
                    <div
                      key={index2}
                      className="text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="avatar">
                        <div className="w-36 rounded-xl">
                          <img
                            className="bg-base-100"
                            src={member?.imageUrl || ""}
                            alt={member?.name || ""}
                          />
                        </div>
                      </div>
                      <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <Link
                          href={member?.linkUrl || "#"}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {member?.name}
                        </Link>
                      </h3>
                      <p>{member?.nameInEnglish}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}

const components = {
  ManualDivider: () => {
    return <div className="divider"></div>;
  },
  CcLicense: () => {
    return (
      <>
        <h2>利用条件</h2>
        <p>
          クリエイティブ・コモンズ・ライセンスの
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja"
            target="_blank"
          >
            表示 - 非営利 - 継承 4.0 国際（CC BY-NC-SA 4.0）
          </a>
          相当の条件で提供しています。
        </p>
      </>
    );
  },
  ManualAlert: (props: { content: string }) => {
    return (
      <div className="alert alert-warning shadow-lg">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{props.content}</span>
        </div>
      </div>
    );
  },
};
