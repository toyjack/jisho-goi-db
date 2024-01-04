"use client";

import { ManualQuery, ManualQueryVariables } from "@/tina/__generated__/types";
import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function TinaManualComponent(props: {
  data: ManualQuery;
  variables: ManualQueryVariables;
  query: string;
  siteStory: {
    data: ManualQuery;
    variables: ManualQueryVariables;
    query: string;
  };
}) {
  const { data } = useTina({
    ...props,
  });
  const { data: siteStroyData } = useTina({
    ...props.siteStory,
  });
  return (
    <div className="prose max-w-none">
      <div data-tina-field={tinaField(props.data.manual, "body")}>
        <TinaMarkdown content={data.manual.body} components={components} />
      </div>

      <div className="divider"></div>

      <div data-tina-field={tinaField(props.siteStory.data.manual, "body")}>
        <TinaMarkdown
          content={siteStroyData.manual.body}
          components={components}
        />
      </div>
    </div>
  );
}

const components = {
  ManualDivider: () => {
    return (
      <>
        <div className="divider"></div>
      </>
    );
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
        <div>
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

  ManualSiteStory: () => {
    return (
      <>
        <h2>本サイトについて</h2>
        <p>
          辞書語彙データベースの収録辞書は、次のとおりです。
          詳細は各データベースのページをご覧ください。
        </p>
        <ul>
          <li>
            <Link href={`/hzwm`}>『本草和名』</Link>（底本：寛政八年刊記本）
          </li>
          <li>
            <Link href="/kwrs">古活字版『和名類聚抄』</Link>
          </li>
          <li>
            <Link href="/jiruisho">『三巻本色葉字類抄』</Link>
          </li>
          <li>
            <Link href="/racvyoxv">『落葉集本篇』</Link>
          </li>
          <li>
            <Link href="/bunmei">『文明本節用集』</Link>
            （底本：
            <Link href="https://dl.ndl.go.jp/pid/1286982" target="_blank">
              国立国会図書館蔵〔雑字類書〕
            </Link>
            ）
          </li>
          <li>
            <Link href="/gyokuhentaizen">『増続大広益会玉篇大全』</Link>
          </li>
          <li>
            <Link href="/wakunnoshiori">『版本和訓栞』</Link>
          </li>
        </ul>

        <p>
          辞書語彙データベースの構築と公開は、下記の助成を受けて行っています。
        </p>

        <ul>
          <li>
            [『色葉字類抄』の語彙研究および総合データベースの構築（21H00529）](https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-21H00529/)
          </li>
          <li>
            [異種古辞書間におけるデータ連携モデルの構築（21K18364）](https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-21K18364/)
          </li>
          <li>
            [日本初の国語辞書『色葉字類抄』に採録された漢籍出典語彙の院政期における使用状況（2021
            年度稲盛研究助成）](https://www.inamori-f.or.jp/recipient/fujimoto-akari/)
          </li>
        </ul>
      </>
    );
  },
};
