export interface ModuleContract {
  name: string;
  resultsPath: string;
  // 「必ず何らかの結果がヒットする」ことだけを保証するクエリ。
  // 特定の見出し語に依存すると実データの変更でテストが壊れるため、
  // 空文字列の contains マッチ（＝全件ヒット）を基本方針とする。
  knownQuery: Record<string, string>;
  // 結果一覧の各行（詳細ページへのリンクを含む要素）を指すセレクタ。
  resultRowLinkSelector: string;
  // 詳細ページで「空であってはならない」ことを確認するテキスト（見出し語のラベルなど）。
  detailLabelText: string;
}

export const moduleContracts: ModuleContract[] = [
  {
    name: "Jiruisho",
    resultsPath: "/jiruisho/results",
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/jiruisho/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Racvyoxv",
    resultsPath: "/racvyoxv/results",
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/racvyoxv/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Bunmei",
    resultsPath: "/bunmei/results",
    // entry は contains マッチ（db/bunmeibon.ts）なので空文字列で全件ヒット。
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/bunmei/']",
    // 詳細ページで「見出し語」ラベルはコメントアウトされている（app/bunmei/[id]/page.tsx:9）。
    // ページ共通の見出しである「テキストデータ」で代用する。
    detailLabelText: "テキストデータ",
  },
  {
    name: "Gyokuhentaizen",
    resultsPath: "/gyokuhentaizen/results",
    // 注意：entry は完全一致（db/gyokuhentaizen.ts:36 `entry: query.entry`）。
    // 空文字列を渡すと `entry: ""` の完全一致になり0件になり得るため、
    // クエリ自体を付けない（＝undefined のまま）ことで「絞り込みなし」を意味させる。
    knownQuery: {},
    resultRowLinkSelector: "table tbody tr a[href^='/gyokuhentaizen/']",
    // このモジュールでは見出し字のラベルが「見出し語」ではなく「掲出字」（app/gyokuhentaizen/[id]/page.tsx:49）。
    detailLabelText: "掲出字",
  },
  {
    name: "Hzwm",
    resultsPath: "/hzwm/results",
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/hzwm/']",
    // このモジュールのラベルは「見出し語」ではなく「見出し」（app/hzwm/[id]/page.tsx:25）。
    detailLabelText: "見出し",
  },
  {
    name: "Kwrs",
    resultsPath: "/kwrs/results",
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/kwrs/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Wakunnoshiori",
    resultsPath: "/wakunnoshiori/results",
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/wakunnoshiori/']",
    detailLabelText: "見出し語",
  },
];
